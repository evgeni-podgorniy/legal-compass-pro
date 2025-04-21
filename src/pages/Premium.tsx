
import React from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import { CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/BackButton';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

const Premium = () => {
  const subscriptionPlans = [
    {
      name: 'Базовый',
      price: '0 ₽',
      period: 'бесплатно',
      description: 'Основные функции для личного использования',
      features: [
        'Базовые юридические консультации',
        'Доступ к общим шаблонам',
        'Ограниченное количество запросов (5 в день)',
        'Ограниченный анализ документов (до 3 страниц)'
      ],
      isPopular: false,
      buttonText: 'Текущий план'
    },
    {
      name: 'Стандарт',
      price: '499 ₽',
      period: 'в месяц',
      description: 'Расширенные возможности для активных пользователей',
      features: [
        'Все функции бесплатного плана',
        'Неограниченные консультации',
        'Доступ ко всем шаблонам',
        'Анализ документов до 20 страниц',
        'Приоритетная поддержка'
      ],
      isPopular: true,
      buttonText: 'Выбрать план'
    },
    {
      name: 'Премиум',
      price: '999 ₽',
      period: 'в месяц',
      description: 'Максимальные возможности для профессионалов',
      features: [
        'Все функции стандартного плана',
        'Расширенный анализ документов',
        'Консультации по сложным вопросам',
        'Индивидуальные шаблоны',
        'Приоритетная поддержка 24/7',
        'Экспорт документов в различных форматах'
      ],
      isPopular: false,
      buttonText: 'Выбрать план'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <BackButton />
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Выберите подходящий план</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Получите доступ к расширенным возможностям Правового Компаса с нашими гибкими тарифными планами
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {subscriptionPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`subscription-card ${plan.isPopular ? 'premium shadow-lg relative' : ''}`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 mt-4 mr-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-legal-primary text-white">
                      Популярный выбор
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 mt-0.5 text-legal-primary">
                          <CheckCircle className="h-5 w-5" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.isPopular ? 'bg-legal-primary hover:bg-blue-600' : ''}`} 
                    variant={plan.name === 'Базовый' ? 'outline' : 'default'}
                    disabled={plan.name === 'Базовый'}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Часто задаваемые вопросы</h2>
              <p className="text-muted-foreground">Ответы на распространенные вопросы о наших тарифных планах</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Как оформить подписку?</h3>
                <p className="text-muted-foreground">
                  Выберите подходящий план и нажмите кнопку "Выбрать план". Далее вы будете перенаправлены на страницу оплаты.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Могу ли я отменить подписку?</h3>
                <p className="text-muted-foreground">
                  Да, вы можете отменить подписку в любое время в разделе настроек вашего профиля.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Есть ли пробный период?</h3>
                <p className="text-muted-foreground">
                  Да, для новых пользователей доступен 7-дневный пробный период на тарифе "Стандарт".
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Что будет после окончания подписки?</h3>
                <p className="text-muted-foreground">
                  После окончания подписки вы будете автоматически переведены на базовый тарифный план.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Premium;
