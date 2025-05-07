
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Предустановленный API ключ для демонстрационного доступа
// В реальном приложении следует использовать серверный API или хранить ключ в безопасном месте
const DEFAULT_API_KEY = "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";
const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY || DEFAULT_API_KEY;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  isLoading?: boolean;
  error?: boolean;
}

interface ChatInterfaceProps {
  initialMessage?: string;
}

const ChatInterface = ({ initialMessage }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Здравствуйте! Я ваш юридический помощник. Чем я могу вам помочь?',
      sender: 'bot',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState(PERPLEXITY_API_KEY);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (initialMessage) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const saveApiKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setShowApiKeyInput(false);
      localStorage.setItem('perplexityApiKey', apiKeyInput.trim());
      toast({
        title: "API ключ сохранен",
        description: "Ваш API ключ был сохранен в локальном хранилище браузера."
      });
    }
  };

  useEffect(() => {
    // Попытка восстановления API ключа из localStorage при загрузке
    const savedApiKey = localStorage.getItem('perplexityApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
    }
  }, []);

  const getGPTResponse = async (message: string) => {
    // Проверяем наличие API ключа
    if (!apiKey) {
      setShowApiKeyInput(true);
      return 'Пожалуйста, введите ваш API ключ Perplexity AI для использования чата.';
    }

    // Правовой контекст для GPT
    const legalContext = `Ты — профессиональный юрист-консультант. Отвечай на вопросы, основываясь на законодательстве РФ. 
    Давай четкие, структурированные ответы с указанием конкретных статей законов. Используй простой язык, понятный неюристам.`;
    
    setNetworkError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 секунд тайм-аут
      
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: legalContext
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        
        if (response.status === 401) {
          setShowApiKeyInput(true);
          return 'Ошибка аутентификации. Пожалуйста, проверьте ваш API ключ Perplexity AI.';
        }
        
        if (response.status === 429) {
          return 'Превышен лимит запросов к API. Пожалуйста, попробуйте позже.';
        }
        
        throw new Error(`Ошибка API: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error:', error);
      
      let errorMessage = 'Извините, произошла ошибка при обработке вашего запроса.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Запрос был отменен из-за превышения времени ожидания. Проверьте ваше интернет-соединение и попробуйте снова.';
        } else if (error.message.includes('Failed to fetch')) {
          setNetworkError('Не удалось подключиться к серверу API. Проверьте ваше интернет-соединение.');
          errorMessage = 'Не удалось подключиться к серверу API. Проверьте ваше интернет-соединение.';
        }
      }
      
      return errorMessage;
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Добавляем временное сообщение для индикации загрузки
    const loadingMessageId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: loadingMessageId,
      content: '',
      sender: 'bot',
      isLoading: true,
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Получаем ответ от GPT
      const gptResponse = await getGPTResponse(messageText);

      // Заменяем временное сообщение на реальный ответ
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessageId 
          ? {
              id: msg.id,
              content: gptResponse,
              sender: 'bot',
              error: gptResponse.includes('ошибка') || gptResponse.includes('Не удалось')
            }
          : msg
      ));
    } catch (error) {
      // В случае ошибки показываем сообщение об ошибке вместо загрузки
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessageId 
          ? {
              id: msg.id,
              content: 'Произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте снова.',
              sender: 'bot',
              error: true
            }
          : msg
      ));
      
      toast({
        title: "Ошибка соединения",
        description: "Не удалось получить ответ от сервера. Проверьте подключение к интернету.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleRetry = (originalMessage: string) => {
    handleSendMessage(originalMessage);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)] border rounded-lg overflow-hidden bg-gray-50">
      {showApiKeyInput && (
        <div className="p-4 bg-white border-b">
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Для использования чата необходимо добавить API ключ Perplexity AI. Ключ будет сохранен только в локальном хранилище вашего браузера.
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Input 
              type="password"
              placeholder="Введите ваш API ключ Perplexity AI"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={saveApiKey} disabled={!apiKeyInput.trim()}>
              Сохранить
            </Button>
          </div>
        </div>
      )}
      
      {networkError && (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка сети</AlertTitle>
          <AlertDescription>
            {networkError}
            <div className="mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setNetworkError(null)}
              >
                Закрыть
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex items-start gap-2 rounded-lg p-4',
              message.sender === 'user' 
                ? 'ml-auto bg-legal-primary text-white max-w-[80%]' 
                : message.error 
                  ? 'mr-auto bg-white border border-red-200 max-w-[80%]'
                  : 'mr-auto bg-white border max-w-[80%]'
            )}
          >
            {message.sender === 'bot' && (
              <Bot className={cn("h-5 w-5 mt-1 flex-shrink-0", message.error && "text-red-500")} />
            )}
            <div className="w-full">
              {message.isLoading ? (
                <div className="flex space-x-2 items-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-500">Обработка запроса...</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )}
              
              {message.error && !message.isLoading && (
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      // Находим сообщение пользователя перед этим сообщением с ошибкой
                      const index = messages.findIndex(m => m.id === message.id);
                      if (index > 0) {
                        const userMessage = messages
                          .slice(0, index)
                          .reverse()
                          .find(m => m.sender === 'user');
                        
                        if (userMessage) {
                          handleRetry(userMessage.content);
                        }
                      }
                    }}
                    className="text-xs"
                  >
                    Повторить запрос
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 bg-white p-4 flex items-center"
      >
        <Input
          placeholder="Напишите ваш вопрос..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 mr-2"
          disabled={isLoading || showApiKeyInput}
        />
        <Button 
          type="submit"
          size="icon" 
          disabled={isLoading || !input.trim() || showApiKeyInput}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
