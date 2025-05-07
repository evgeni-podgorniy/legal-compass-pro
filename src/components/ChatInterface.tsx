
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Предустановленный API ключ для доступа
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

// Расширенная локальная база ответов на частые вопросы (для работы без интернет-соединения)
const offlineResponses: Record<string, string> = {
  default: "К сожалению, нет подключения к интернету. При отсутствии подключения я могу предоставлять только базовые юридические консультации.",
  трудовой: "Трудовые отношения регулируются Трудовым кодексом РФ. Основные права работника: оплата труда, отдых, безопасные условия труда. Трудовой договор - основной документ, регулирующий отношения работника и работодателя.",
  увольнение: "Увольнение может быть по инициативе работника (по собственному желанию) или работодателя. При увольнении по собственному желанию работник должен предупредить работодателя в письменной форме за 2 недели. Статья 80 ТК РФ регулирует этот процесс.",
  договор: "Договорные отношения регулируются Гражданским кодексом РФ. Для действительности договора необходимо соблюдение формы, дееспособность сторон, законность содержания и соблюдение воли сторон.",
  наследство: "Наследование регулируется частью 3 Гражданского кодекса РФ. Наследование возможно по закону и по завещанию. Срок принятия наследства - 6 месяцев со дня смерти наследодателя.",
  штраф: "Штрафы за нарушение ПДД регулируются КоАП РФ. Срок обжалования - 10 дней с момента вынесения постановления. Оплата в течение 20 дней со дня вынесения даёт право на 50% скидку.",
  развод: "Расторжение брака регламентируется Семейным кодексом РФ. При наличии несовершеннолетних детей или при отсутствии согласия одного из супругов развод производится через суд.",
  алименты: "Алиментные обязательства регулируются Семейным кодексом РФ. Размер алиментов на несовершеннолетних детей: на 1 ребенка - 1/4, на 2 детей - 1/3, на 3 и более - 1/2 заработка.",
  осаго: "ОСАГО - обязательное страхование гражданской ответственности владельцев транспортных средств. Регулируется ФЗ «Об обязательном страховании гражданской ответственности владельцев транспортных средств». Срок выплаты - 20 дней с момента подачи документов.",
  суд: "Для обращения в суд необходимо составить исковое заявление согласно требованиям ГПК РФ. К иску нужно приложить документы, подтверждающие требования. Госпошлина рассчитывается в зависимости от цены иска.",
  привет: "Здравствуйте! Я ваш юридический помощник, работающий сейчас в офлайн режиме. Могу ответить на базовые правовые вопросы, но для детальной консультации потребуется подключение к интернету."
};

const findOfflineResponse = (query: string): string => {
  query = query.toLowerCase();
  
  for (const [keyword, response] of Object.entries(offlineResponses)) {
    if (query.includes(keyword.toLowerCase())) {
      return response;
    }
  }
  
  return offlineResponses.default;
};

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
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
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

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Подключение восстановлено",
        description: "Интернет-соединение восстановлено. Теперь доступны все функции чата.",
      });
      
      // Сбросить счетчик повторных попыток при восстановлении соединения
      setRetryCount(0);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Отсутствует подключение",
        description: "Работа в автономном режиме. Доступны только базовые ответы.",
        variant: "destructive"
      });
      setShowOfflineAlert(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

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

  // Проверка сетевого соединения с сервером API
  const checkApiConnection = async (): Promise<boolean> => {
    try {
      if (!navigator.onLine) {
        return false;
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://api.perplexity.ai/healthz', {
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.error('API connection check failed:', error);
      return false;
    }
  };

  const getGPTResponse = async (message: string) => {
    // Проверяем наличие API ключа
    if (!apiKey) {
      setShowApiKeyInput(true);
      return 'Пожалуйста, введите ваш API ключ Perplexity AI для использования чата.';
    }

    // Если нет подключения или превышено количество повторных попыток, используем офлайн-ответы
    if (!isOnline || retryCount > 2) {
      if (retryCount > 2) {
        setNetworkError("Не удалось подключиться к серверу после нескольких попыток. Работаем в автономном режиме.");
      }
      return findOfflineResponse(message);
    }

    // Проверяем соединение с API
    const isApiAvailable = await checkApiConnection();
    if (!isApiAvailable) {
      // Увеличиваем счетчик повторных попыток
      setRetryCount(prev => prev + 1);
      setNetworkError("Сервер API недоступен. Работаем в автономном режиме.");
      return findOfflineResponse(message);
    }

    // Если соединение восстановлено, сбрасываем счетчик
    setRetryCount(0);

    // Правовой контекст для модели
    const legalContext = `Ты — профессиональный юрист-консультант. Отвечай на вопросы, основываясь на законодательстве РФ. 
    Давай четкие, структурированные ответы с указанием конкретных статей законов. Используй простой язык, понятный неюристам.`;
    
    setNetworkError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 секунд тайм-аут
      
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
          errorMessage = 'Не удалось подключиться к серверу API. Работаем в автономном режиме.';
          return findOfflineResponse(message);
        }
      }
      
      // Увеличиваем счетчик попыток при ошибках
      setRetryCount(prev => prev + 1);
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
    setRetryMessage(messageText);

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
      // Получаем ответ
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
      
      // Сбросить сообщение для повтора после успешного получения ответа
      setRetryMessage(null);
    } catch (error) {
      console.error('Error sending message:', error);
      
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

  const handleRetry = () => {
    if (retryMessage) {
      handleSendMessage(retryMessage);
    }
  };

  const handleCloseNetworkError = () => {
    setNetworkError(null);
    // Если в автономном режиме, показываем уведомление об автономной работе
    if (!isOnline) {
      setShowOfflineAlert(true);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)] border rounded-lg overflow-hidden bg-gray-50">
      {showOfflineAlert && !isOnline && (
        <AlertDialog open={showOfflineAlert} onOpenChange={setShowOfflineAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Автономный режим</AlertDialogTitle>
              <AlertDialogDescription>
                В настоящий момент отсутствует подключение к интернету. Чат будет работать в ограниченном режиме с базовыми ответами на типичные вопросы.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowOfflineAlert(false)}>
                Понятно
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      
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
                onClick={handleCloseNetworkError}
              >
                Закрыть
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex items-center justify-between p-2 bg-white border-b">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-legal-primary" />
          <span className="text-sm font-medium">Юридический ассистент</span>
        </div>
        <div className="flex items-center">
          {isOnline ? (
            <div className="flex items-center text-green-500 text-xs">
              <Wifi className="h-4 w-4 mr-1" />
              <span>Онлайн</span>
            </div>
          ) : (
            <div className="flex items-center text-orange-500 text-xs">
              <WifiOff className="h-4 w-4 mr-1" />
              <span>Офлайн</span>
            </div>
          )}
        </div>
      </div>
      
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
              
              {message.error && !message.isLoading && retryMessage && (
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRetry}
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
          isLoading={isLoading}
        >
          {!isLoading && <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
