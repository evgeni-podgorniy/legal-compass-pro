
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, HelpCircle, Info, Briefcase, Users, Car, Scale, Landmark } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q');
  const category = searchParams.get('category');
  const [categoryInfo, setCategoryInfo] = useState<{title: string; description: string; icon: React.ReactNode} | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');
  
  // Отслеживаем состояние подключения к интернету
  useEffect(() => {
    const handleOnline = () => setConnectionStatus('online');
    const handleOffline = () => setConnectionStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Установить начальное состояние
    setConnectionStatus(navigator.onLine ? 'online' : 'offline');
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (category) {
      const categoryData = {
        employment: {
          title: 'Трудовое право',
          description: 'Консультация по вопросам трудового законодательства РФ: трудовые договоры, увольнение, отпуск, компенсации, споры с работодателем.',
          icon: <Briefcase className="h-6 w-6" />
        },
        family: {
          title: 'Семейное право',
          description: 'Консультация по семейным правоотношениям: брак, развод, алименты, усыновление, раздел имущества.',
          icon: <Users className="h-6 w-6" />
        },
        civil: {
          title: 'Гражданское право',
          description: 'Консультация по гражданско-правовым вопросам: договоры, сделки, наследство, право собственности, защита прав.',
          icon: <Scale className="h-6 w-6" />
        },
        auto: {
          title: 'Автомобильное право',
          description: 'Консультация по вопросам, связанным с автомобилями: ДТП, страхование, штрафы, права водителя.',
          icon: <Car className="h-6 w-6" />
        },
        debt: {
          title: 'Долги и кредиты',
          description: 'Консультация по вопросам задолженности: взыскание долгов, кредиты, займы, банкротство физических лиц.',
          icon: <Landmark className="h-6 w-6" />
        }
      };
      
      setCategoryInfo(
        category in categoryData 
          ? categoryData[category as keyof typeof categoryData] 
          : null
      );
    }
  }, [category]);

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <main className="flex-1 py-6 md:py-8 lg:py-10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-legal-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Юридическая консультация</h1>
            </div>
            
            {connectionStatus === 'offline' && (
              <Alert variant="destructive">
                <AlertTitle>Нет подключения к интернету</AlertTitle>
                <AlertDescription>
                  Для корректной работы чата требуется подключение к интернету. Пожалуйста, проверьте ваше соединение.
                </AlertDescription>
              </Alert>
            )}
            
            {categoryInfo && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    {categoryInfo.icon}
                    <CardTitle>{categoryInfo.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{categoryInfo.description}</CardDescription>
                </CardContent>
              </Card>
            )}
            
            <div className="grid gap-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <ChatInterface initialMessage={initialQuery || undefined} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">Полезная информация</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p>В случае сложного юридического вопроса, требующего индивидуального подхода, рекомендуем обратиться к профессиональному юристу.</p>
                    <p className="mt-2">Ответы бота основаны на общих положениях законодательства РФ и могут не учитывать все детали вашей ситуации.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
