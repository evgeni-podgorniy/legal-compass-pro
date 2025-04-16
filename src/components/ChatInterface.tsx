
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  isLoading?: boolean;
}

interface ChatInterfaceProps {
  initialMessage?: string;
}

const ChatInterface = ({ initialMessage }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Здравствуйте! Я ваш юридический помощник на базе GPT. Чем я могу вам помочь?',
      sender: 'bot',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
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

  const getGPTResponse = async (message: string) => {
    // Правовой контекст для GPT
    const legalContext = `Ты — профессиональный юрист-консультант. Отвечай на вопросы, основываясь на законодательстве РФ. 
    Давай четкие, структурированные ответы с указанием конкретных статей законов. Используй простой язык, понятный неюристам.`;
    
    const prompt = `${legalContext}\n\nВопрос пользователя: ${message}`;
    
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
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
      });

      if (!response.ok) {
        throw new Error('Ошибка при получении ответа');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error:', error);
      return 'Извините, произошла ошибка при обработке вашего запроса. Попробуйте переформулировать вопрос.';
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
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      sender: 'bot',
      isLoading: true,
    };
    setMessages(prev => [...prev, loadingMessage]);

    // Получаем ответ от GPT
    const gptResponse = await getGPTResponse(messageText);

    // Заменяем временное сообщение на реальный ответ
    setMessages(prev => prev.map(msg => 
      msg.id === loadingMessage.id 
        ? {
            id: msg.id,
            content: gptResponse,
            sender: 'bot',
          }
        : msg
    ));
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)] border rounded-lg overflow-hidden bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex items-start gap-2 rounded-lg p-4',
              message.sender === 'user' 
                ? 'ml-auto bg-legal-primary text-white max-w-[80%]' 
                : 'mr-auto bg-white border max-w-[80%]'
            )}
          >
            {message.sender === 'bot' && (
              <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
            )}
            <div>
              {message.isLoading ? (
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
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
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
