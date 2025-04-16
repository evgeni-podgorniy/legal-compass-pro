
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
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

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response (would be replaced with actual API call)
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        default: 'Для ответа на ваш вопрос мне нужно больше информации. Не могли бы вы уточнить детали?',
        увольнение: 'При увольнении важно знать, что работодатель обязан выплатить все причитающиеся суммы в день увольнения (ст. 140 ТК РФ). Если вы считаете, что вас уволили незаконно, у вас есть 1 месяц для обращения в суд (ст. 392 ТК РФ).',
        развод: 'Для расторжения брака необходимо подать заявление в ЗАГС (при взаимном согласии и отсутствии несовершеннолетних детей) или в суд. Срок расторжения в ЗАГСе - 1 месяц со дня подачи заявления (ст. 19 СК РФ).',
        дтп: 'После ДТП необходимо: остановиться, включить аварийную сигнализацию, выставить знак аварийной остановки (не менее 15 м от ТС в населенных пунктах и 30 м вне их), вызвать ГИБДД и скорую при необходимости (ст. 2.5, 2.6 ПДД).',
        долг: 'По долговым обязательствам срок исковой давности составляет 3 года (ст. 196 ГК РФ). Обязательно сохраняйте все документы, подтверждающие долг и его возврат.',
        договор: 'При заключении договора важно проверить: реквизиты сторон, предмет договора, права и обязанности, ответственность сторон, порядок расторжения, реквизиты и подписи сторон.',
      };

      let botResponse = botResponses.default;
      const lowerCaseMessage = messageText.toLowerCase();

      // Simple keyword matching
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (lowerCaseMessage.includes(keyword)) {
          botResponse = response;
          break;
        }
      }

      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)] border rounded-lg overflow-hidden bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'chat-message',
              message.sender === 'user' ? 'user' : 'bot'
            )}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message bot animate-pulse">
            <div className="flex space-x-2">
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        )}
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
