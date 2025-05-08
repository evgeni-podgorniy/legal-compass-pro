
import React, { useState } from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import { CheckCircle, CreditCard, Banknote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/BackButton';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

// Define TypeScript interfaces for subscription plans
interface BasicPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
}

interface PremiumPlan extends BasicPlan {
  originalPrice?: string;
  discount?: string;
}

const Premium = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'sbp' | null>(null);

  const monthlySubscriptionPlans: BasicPlan[] = [
    {
      id: 'basic',
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
      id: 'standard',
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
      id: 'premium',
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

  const yearlySubscriptionPlans: PremiumPlan[] = [
    {
      id: 'basic',
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
      id: 'standard',
      name: 'Стандарт',
      price: '4 990 ₽',
      period: 'в год',
      originalPrice: '5 988 ₽',
      discount: 'Экономия 17%',
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
      id: 'premium',
      name: 'Премиум',
      price: '9 990 ₽',
      period: 'в год',
      originalPrice: '11 988 ₽',
      discount: 'Экономия 17%',
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

  const subscriptionPlans = billingPeriod === 'monthly' ? monthlySubscriptionPlans : yearlySubscriptionPlans;

  const handleSelectPlan = (planId: string) => {
    if (planId === 'basic') {
      toast.success("Вы уже используете базовый план");
      return;
    }
    setSelectedPlan(planId);
    setPaymentStep(true);
  };

  const handlePaymentMethodSelect = (method: 'card' | 'sbp') => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      toast.error("Пожалуйста, выберите метод оплаты");
      return;
    }

    // Здесь будет интеграция с платежной системой
    toast.success("Оплата успешно выполнена! Ваша подписка активирована.");
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleBackToPlans = () => {
    setPaymentStep(false);
    setPaymentMethod(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <BackButton />
          </div>
          
          {!paymentStep ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Выберите подходящий план</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Получите доступ к расширенным возможностям Правового Компаса с нашими гибкими тарифными планами
                </p>
                
                <div className="mt-8 mb-12 inline-flex bg-muted rounded-lg p-1">
                  <Tabs 
                    value={billingPeriod}
                    className="w-full max-w-xs mx-auto"
                    onValueChange={(value) => setBillingPeriod(value as 'monthly' | 'yearly')}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="monthly">Ежемесячно</TabsTrigger>
                      <TabsTrigger value="yearly">Ежегодно</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
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
                      {'originalPrice' in plan && plan.originalPrice && (
                        <div className="mt-1">
                          <span className="text-muted-foreground line-through text-sm">{plan.originalPrice}</span>
                          <span className="ml-2 text-green-600 text-sm font-medium">{plan.discount}</span>
                        </div>
                      )}
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
                        variant={plan.id === 'basic' ? 'outline' : 'default'}
                        disabled={plan.id === 'basic'}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <Button variant="ghost" onClick={handleBackToPlans} className="flex items-center mb-4">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Вернуться к выбору плана
                </Button>
                <h2 className="text-2xl font-bold mb-2">Оплата подписки</h2>
                <p className="text-muted-foreground mb-6">
                  Выберите предпочитаемый способ оплаты для вашей подписки
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <p className="font-medium mb-1">Выбранный план:</p>
                <p className="text-lg font-bold mb-1">
                  {subscriptionPlans.find(p => p.id === selectedPlan)?.name} - {subscriptionPlans.find(p => p.id === selectedPlan)?.price} {subscriptionPlans.find(p => p.id === selectedPlan)?.period}
                </p>
              </div>

              <div className="mb-8">
                <p className="mb-3 font-medium">Способ оплаты:</p>
                <div className="grid grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer hover:border-legal-primary transition-colors ${paymentMethod === 'card' ? 'border-legal-primary bg-blue-50' : ''}`}
                    onClick={() => handlePaymentMethodSelect('card')}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <CreditCard className="h-8 w-8 mb-3 text-legal-primary" />
                      <p className="font-medium">Банковская карта</p>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer hover:border-legal-primary transition-colors ${paymentMethod === 'sbp' ? 'border-legal-primary bg-blue-50' : ''}`}
                    onClick={() => handlePaymentMethodSelect('sbp')}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Banknote className="h-8 w-8 mb-3 text-legal-primary" />
                      <p className="font-medium">СБП</p>
                    </CardContent>
                  </Card>
                </div>
                {paymentMethod === 'card' && (
                  <div className="mt-6 p-4 border rounded-md">
                    <p className="font-medium mb-4">Введите данные карты:</p>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Номер карты</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-md" 
                        placeholder="0000 0000 0000 0000" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Срок действия</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="MM/ГГ" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">CVV/CVC</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="123" 
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Имя владельца</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-md" 
                        placeholder="IVAN IVANOV" 
                      />
                    </div>
                  </div>
                )}
                {paymentMethod === 'sbp' && (
                  <div className="mt-6 p-4 border rounded-md">
                    <div className="flex flex-col items-center justify-center">
                      <div className="border-2 border-legal-primary p-4 rounded-md mb-4">
                        <div className="bg-slate-100 h-32 w-32 flex items-center justify-center">
                          QR-код СБП
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        Отсканируйте QR-код через приложение вашего банка для оплаты через Систему Быстрых Платежей
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={handlePaymentSubmit} 
                className="w-full bg-legal-primary hover:bg-blue-600"
                disabled={!paymentMethod}
              >
                Оплатить
              </Button>
            </div>
          )}
          
          <div className="bg-slate-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Часто задаваемые вопросы</h2>
              <p className="text-muted-foreground">Ответы на распространенные вопросы о наших тарифных планах</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Как оформить подписку?</h3>
                <p className="text-muted-foreground">
                  Выберите подходящий план и нажмите кнопку "Выбрать план". Далее вы будете перенаправлены на страницу оплаты, где сможете выбрать способ оплаты.
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

              <div>
                <h3 className="text-xl font-semibold mb-2">Какие способы оплаты доступны?</h3>
                <p className="text-muted-foreground">
                  Мы принимаем оплату банковскими картами Visa, Mastercard, МИР, а также через Систему Быстрых Платежей (СБП).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Безопасны ли платежи?</h3>
                <p className="text-muted-foreground">
                  Да, все платежные данные защищены по стандартам PCI DSS. Мы не храним данные ваших карт на наших серверах.
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
