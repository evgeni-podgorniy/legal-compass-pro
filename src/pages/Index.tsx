
import React from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import { Briefcase, Users, Scale, Car, Landmark, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-b from-white to-legal-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Правовой Компас
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Ваш интеллектуальный юридический помощник. Получите ответы на правовые вопросы и создайте нужные документы.
                </p>
              </div>
              
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto pt-4 pb-8">
                <SearchBar />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/chat">Задать вопрос</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/documents">Создать документ</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Выберите категорию
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg">
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
        <section className="py-12 md:py-24 bg-legal-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Возможности сервиса
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg">
                Всё необходимое для решения юридических вопросов
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="rounded-full p-3 bg-white mb-4">
                  <MessageSquare className="h-6 w-6 text-legal-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Консультации 24/7</h3>
                <p className="text-gray-500">
                  Получите ответы на ваши вопросы в любое время дня и ночи
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="rounded-full p-3 bg-white mb-4">
                  <FileText className="h-6 w-6 text-legal-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Создание документов</h3>
                <p className="text-gray-500">
                  Генерируйте юридические документы по вашим требованиям
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="rounded-full p-3 bg-white mb-4">
                  <FileScan className="h-6 w-6 text-legal-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Анализ договоров</h3>
                <p className="text-gray-500">
                  Проверяйте документы на наличие рисков и подводных камней
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="rounded-full p-3 bg-white mb-4">
                  <BookOpen className="h-6 w-6 text-legal-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">База знаний</h3>
                <p className="text-gray-500">
                  Доступ к актуальным законам и юридической информации
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="rounded-full p-3 bg-white mb-4">
                  <CheckSquare className="h-6 w-6 text-legal-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Чек-листы</h3>
                <p className="text-gray-500">
                  Пошаговые инструкции для типичных юридических ситуаций
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="rounded-full p-3 bg-white mb-4">
                  <UserCheck className="h-6 w-6 text-legal-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Консультация юриста</h3>
                <p className="text-gray-500">
                  Возможность связаться с профессиональным юристом при необходимости
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

import { MessageSquare, FileScan, BookOpen, CheckSquare, UserCheck } from 'lucide-react';

export default Index;
