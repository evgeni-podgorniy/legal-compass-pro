
import React from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import DocumentForm from '@/components/DocumentForm';
import { FileText, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Documents = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <main className="flex-1 py-6 md:py-8 lg:py-10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-legal-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Генератор документов</h1>
            </div>
            
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle>Создание юридических документов</CardTitle>
                <CardDescription>
                  Выберите шаблон документа и заполните необходимые поля для создания готового к использованию документа.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <DocumentForm />
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">Информация</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground space-y-4">
                      <p>
                        Все документы составлены в соответствии с действующим законодательством РФ.
                      </p>
                      <p>
                        После заполнения всех полей вы сможете скачать документ в формате PDF или DOCX.
                      </p>
                      <p>
                        Обратите внимание: сгенерированные документы являются шаблонами и могут требовать дополнительной доработки в зависимости от конкретной ситуации.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Популярные документы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="text-sm">
                        <span className="font-medium">Претензия продавцу</span>
                        <p className="text-muted-foreground">Для возврата товара или денег</p>
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Заявление на отпуск</span>
                        <p className="text-muted-foreground">Для оформления ежегодного отпуска</p>
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Доверенность</span>
                        <p className="text-muted-foreground">Для представления интересов</p>
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Расписка о получении денег</span>
                        <p className="text-muted-foreground">Для подтверждения передачи средств</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documents;
