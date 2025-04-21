
import React, { useEffect } from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import { Briefcase, Users, Scale, Car, Landmark, FileText, MessageSquare, FileScan, BookOpen, CheckSquare, UserCheck, ChevronRight, Award, Shield, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Приветственное сообщение при первом посещении
    const isFirstVisit = !localStorage.getItem('hasVisited');
    if (isFirstVisit) {
      toast({
        title: "Добро пожаловать в Правовой Компас!",
        description: "Ваш персональный юридический помощник теперь доступен.",
      });
      localStorage.setItem('hasVisited', 'true');
    }
  }, [toast]);

  const categories = [
    {
      title: 'Трудовое право',
      description: 'Увольнение, трудовые споры, отпуск, зарплата',
      icon: Briefcase,
      link: '/chat?category=employment'
    },
    {
      title: 'Семейное право',
      description: 'Развод, алименты, раздел имущества',
      icon: Users,
      link: '/chat?category=family'
    },
    {
      title: 'Гражданское право',
      description: 'Договоры, сделки, право собственности',
      icon: Scale,
      link: '/chat?category=civil'
    },
    {
      title: 'Автомобильное право',
      description: 'ДТП, штрафы, страхование',
      icon: Car,
      link: '/chat?category=auto'
    },
    {
      title: 'Долги и кредиты',
      description: 'Взыскание долгов, банкротство',
      icon: Landmark,
      link: '/chat?category=debt'
    },
    {
      title: 'Документы',
      description: 'Создание и проверка документов',
      icon: FileText,
      link: '/documents'
    },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "Консультации 24/7",
      description: "Получите ответы на ваши вопросы в любое время дня и ночи"
    },
    {
      icon: FileText,
      title: "Создание документов",
      description: "Генерируйте юридические документы по вашим требованиям"
    },
    {
      icon: FileScan,
      title: "Анализ договоров",
      description: "Проверяйте документы на наличие рисков и подводных камней"
    },
    {
      icon: BookOpen,
      title: "База знаний",
      description: "Доступ к актуальным законам и юридической информации"
    },
    {
      icon: CheckSquare,
      title: "Чек-листы",
      description: "Пошаговые инструкции для типичных юридических ситуаций"
    },
    {
      icon: UserCheck,
      title: "Консультация юриста",
      description: "Возможность связаться с профессиональным юристом при необходимости"
    }
  ];

  const premiumFeatures = [
    {
      icon: Zap,
      title: "Мгновенные ответы",
      description: "Получите ответы на ваши вопросы без ожидания в очереди"
    },
    {
      icon: Shield,
      title: "Расширенная защита",
      description: "Дополнительный уровень защиты ваших данных и документов"
    },
    {
      icon: Clock,
      title: "Неограниченный доступ",
      description: "Используйте все функции приложения без ограничений"
    },
    {
      icon: Award,
      title: "Премиум шаблоны",
      description: "Доступ к расширенной коллекции юридических шаблонов"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-legal-secondary relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[url('https://plus.unsplash.com/premium_photo-1677553953058-2a42e3659608?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] opacity-5"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl animate-fade-in">
                  Правовой Компас
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-700 md:text-xl animate-fade-in" style={{animationDelay: "0.2s"}}>
                  Ваш интеллектуальный юридический помощник. Получите ответы на правовые вопросы и создайте нужные документы легко и быстро.
                </p>
              </div>
              
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto pt-4 pb-8 animate-fade-in" style={{animationDelay: "0.4s"}}>
                <SearchBar />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: "0.6s"}}>
                <Button asChild size="lg" className="bg-legal-primary hover:bg-blue-600 transition-all">
                  <Link to="/chat">Задать вопрос</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-legal-primary text-legal-primary hover:bg-legal-primary/10">
                  <Link to="/documents">Создать документ</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Волнистый разделитель */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
              <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Выберите категорию
              </h2>
              <p className="mx-auto max-w-[600px] text-slate-500 md:text-lg">
                Найдите информацию по интересующей вас правовой теме
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  link={category.link}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-legal-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Возможности сервиса
              </h2>
              <p className="mx-auto max-w-[600px] text-slate-600 md:text-lg">
                Всё необходимое для решения юридических вопросов
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow card-hover-effect">
                  <div className="rounded-full p-3 bg-legal-secondary mb-4 feature-icon">
                    <feature.icon className="h-6 w-6 text-legal-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-slate-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Section */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Премиум возможности
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Расширенные функции <br/>для профессионалов
                </h2>
                <p className="text-lg text-slate-600">
                  Получите доступ к премиум функциям и улучшенному сервису с нашей подпиской. Экономьте время и получайте более глубокие правовые анализы.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="rounded-full p-1 bg-blue-100 shrink-0 mt-1">
                        <feature.icon className="h-4 w-4 text-legal-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-base">{feature.title}</h4>
                        <p className="text-sm text-slate-500">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button asChild size="lg" className="bg-legal-primary hover:bg-blue-600 transition-all">
                    <Link to="/premium" className="flex items-center gap-2">
                      Подробнее о Премиум
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="lg:w-1/2 premium-container p-8 rounded-2xl animate-float">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold">Премиум аккаунт</h3>
                      <p className="text-slate-500">Расширенный доступ</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Популярный
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">999 ₽</span>
                    <span className="text-slate-500">/месяц</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-green-500 mr-2" />
                      <span>Неограниченные консультации</span>
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-green-500 mr-2" />
                      <span>Расширенный анализ документов</span>
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-green-500 mr-2" />
                      <span>Доступ ко всем шаблонам</span>
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-green-500 mr-2" />
                      <span>Приоритетная поддержка 24/7</span>
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-green-500 mr-2" />
                      <span>Экспорт в различных форматах</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full bg-legal-primary hover:bg-blue-600" asChild>
                    <Link to="/premium">Получить Премиум</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-legal-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Готовы начать?</h2>
                <p className="text-blue-100">
                  Задайте ваш первый юридический вопрос прямо сейчас или создайте документ
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="outline" className="bg-white text-legal-primary hover:bg-blue-50 border-white">
                  <Link to="/chat">Задать вопрос</Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-white hover:bg-white/10">
                  <Link to="/documents">Создать документ</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
