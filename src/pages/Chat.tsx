
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, HelpCircle, Info, Briefcase, Users, Car, Scale, Landmark, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';

const Chat = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const initialQuery = searchParams.get('q');
  const category = searchParams.get('category');
  const [categoryInfo, setCategoryInfo] = useState<{title: string; description: string; icon: React.ReactNode} | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>(navigator.onLine ? 'online' : 'offline');
  
  // Отслеживаем состояние подключения к интернету
  useEffect(() => {
    const handleOnline = () => {
      setConnectionStatus('online');
      toast({
        title: "Подключение восстановлено",
        description: "Интернет-соединение восстановлено. Все функции чата доступны."
      });
    };
    
    const handleOffline = () => {
      setConnectionStatus('offline');
      toast({
        title: "Отсутствует подключение",
        description: "Работа в автономном режиме. Доступны только базовые ответы.",
        variant: "destructive"
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

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

  // Функция для переключения категории
  const handleCategoryChange = (newCategory: string) => {
    window.location.href = `/chat?category=${newCategory}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <main className="flex-1 py-6 md:py-8 lg:py-10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-legal-primary" />
                <h1 className="text-2xl font-bold tracking-tight">Юридическая консультация</h1>
              </div>
              <div className="flex items-center">
                {connectionStatus === 'online' ? (
                  <div className="flex items-center text-green-500 text-sm">
                    <Wifi className="h-5 w-5 mr-1" />
                    <span className="hidden md:inline">Подключено</span>
                  </div>
                ) : (
                  <div className="flex items-center text-orange-500 text-sm">
                    <WifiOff className="h-5 w-5 mr-1" />
                    <span className="hidden md:inline">Автономный режим</span>
                  </div>
                )}
              </div>
            </div>
            
            {connectionStatus === 'offline' && (
              <Alert variant="destructive">
                <AlertTitle>Нет подключения к интернету</AlertTitle>
                <AlertDescription>
                  Чат работает в автономном режиме с ограниченной функциональностью. Доступны только базовые ответы на типичные вопросы.
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
                    <p className="mt-2">Ответы основаны на общих положениях законодательства РФ и могут не учитывать все детали вашей ситуации.</p>
                    {connectionStatus === 'offline' && (
                      <p className="mt-2 text-orange-500">Внимание: в автономном режиме доступны только базовые консультации!</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <div className="w-full">
                    <p className="text-sm font-medium mb-2">Выбрать категорию права:</p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCategoryChange('employment')}
                        className={category === 'employment' ? 'bg-secondary' : ''}
                      >
                        <Briefcase className="h-4 w-4 mr-1" />
                        Трудовое
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCategoryChange('family')}
                        className={category === 'family' ? 'bg-secondary' : ''}
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Семейное
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCategoryChange('civil')}
                        className={category === 'civil' ? 'bg-secondary' : ''}
                      >
                        <Scale className="h-4 w-4 mr-1" />
                        Гражданское
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCategoryChange('auto')}
                        className={category === 'auto' ? 'bg-secondary' : ''}
                      >
                        <Car className="h-4 w-4 mr-1" />
                        Автомобильное
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCategoryChange('debt')}
                        className={category === 'debt' ? 'bg-secondary' : ''}
                      >
                        <Landmark className="h-4 w-4 mr-1" />
                        Долги и кредиты
                      </Button>
                    </div>
                  </div>
                </CardFooter>
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
