
import React, { useState } from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import ContractAnalysis from '@/components/ContractAnalysis';
import { FileScan, Info, CheckCircle, AlertTriangle, Download, Share } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Analysis = () => {
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { toast } = useToast();
  
  const handleAnalysisComplete = () => {
    setAnalysisComplete(true);
    toast({
      title: "Анализ завершен",
      description: "Документ был успешно проанализирован.",
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Отчет загружен",
      description: "Отчет об анализе документа был загружен в формате PDF."
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Поделиться отчетом",
      description: "Ссылка на отчет скопирована в буфер обмена."
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <main className="flex-1 py-6 md:py-8 lg:py-10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6">
            <div className="flex items-center space-x-2">
              <FileScan className="h-6 w-6 text-legal-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Анализ договоров</h1>
            </div>
            
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle>Проверка юридических документов</CardTitle>
                <CardDescription>
                  Загрузите договор или другой юридический документ для проверки на наличие рисков и спорных положений.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <ContractAnalysis onAnalysisComplete={handleAnalysisComplete} />
                  </CardContent>
                  {analysisComplete && (
                    <CardFooter className="flex justify-between border-t p-4">
                      <div className="text-sm text-muted-foreground">
                        Анализ завершен. Вы можете скачать отчет или поделиться им.
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleDownload}>
                          <Download className="h-4 w-4 mr-1" />
                          Скачать отчет
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleShare}>
                          <Share className="h-4 w-4 mr-1" />
                          Поделиться
                        </Button>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">Что проверяет система</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Риски и подводные камни</span>
                          <p className="text-muted-foreground">Выявление положений, которые могут быть истолкованы не в вашу пользу</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Неоднозначные формулировки</span>
                          <p className="text-muted-foreground">Поиск нечетких определений, которые могут привести к разночтениям</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Соответствие законодательству</span>
                          <p className="text-muted-foreground">Проверка на соответствие нормам российского права</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Отсутствующие пункты</span>
                          <p className="text-muted-foreground">Выявление важных условий, которые отсутствуют в договоре</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Рекомендации</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground space-y-3">
                      <p>
                        Система анализирует документы автоматически с помощью искусственного интеллекта.
                      </p>
                      <p>
                        Для сложных и ответственных договоров рекомендуем дополнительно проконсультироваться с юристом.
                      </p>
                      <p>
                        Обратите особое внимание на положения о ответственности, порядке расторжения и разрешении споров.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        title: "Справочная информация",
                        description: "Дополнительные сведения о проверке договоров будут доступны в ближайшее время."
                      });
                    }}>
                      Подробнее о проверке
                    </Button>
                  </CardFooter>
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

export default Analysis;
