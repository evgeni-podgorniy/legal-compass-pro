
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface AnalysisIssue {
  id: string;
  type: 'warning' | 'info' | 'success';
  text: string;
  recommendation: string;
}

const ContractAnalysis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisIssue[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file type (in a real app, we would validate PDF/DOCX)
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.docx') && !selectedFile.name.endsWith('.pdf')) {
        toast({
          title: "Неподдерживаемый формат файла",
          description: "Пожалуйста, загрузите документ в формате PDF или DOCX",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "Файл слишком большой",
          description: "Максимальный размер файла - 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      setAnalysisResults(null);
    }
  };

  const handleAnalyzeContract = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate contract analysis (in a real app, this would be an API call)
    setTimeout(() => {
      // Demo results
      const demoResults: AnalysisIssue[] = [
        {
          id: '1',
          type: 'warning',
          text: 'Пункт 5.3 содержит неоднозначную формулировку об ответственности сторон.',
          recommendation: 'Рекомендуется конкретизировать ответственность каждой стороны и указать точные суммы штрафов/неустоек.',
        },
        {
          id: '2',
          type: 'warning',
          text: 'В договоре отсутствует срок для претензионного порядка.',
          recommendation: 'Добавьте пункт о сроке рассмотрения претензий (рекомендуется указать 10-30 дней).',
        },
        {
          id: '3',
          type: 'info',
          text: 'Условия расторжения договора требуют уведомления за 30 дней.',
          recommendation: 'Обратите внимание на длительный срок уведомления о расторжении.',
        },
        {
          id: '4',
          type: 'success',
          text: 'Платежные условия четко определены в пункте 3.1.',
          recommendation: 'Пункт составлен корректно и не требует изменений.',
        },
      ];
      
      setAnalysisResults(demoResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Анализ завершен",
        description: `Найдено ${demoResults.length} замечаний в документе`,
      });
    }, 2000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={triggerFileInput}>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx,.doc"
        />
        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Загрузите договор для анализа</h3>
        <p className="text-sm text-muted-foreground mb-2">Перетащите файл сюда или нажмите для выбора</p>
        <p className="text-xs text-muted-foreground">Поддерживаемые форматы: PDF, DOCX (до 5MB)</p>
      </div>

      {file && (
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <Button
              onClick={handleAnalyzeContract}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Анализируем...' : 'Проанализировать договор'}
            </Button>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="border rounded-lg p-6 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
          <p className="mt-4 text-muted-foreground">Анализируем ваш документ...</p>
        </div>
      )}

      {analysisResults && (
        <div className="border rounded-lg p-6 bg-card">
          <h3 className="text-lg font-medium mb-4">Результаты анализа:</h3>
          <div className="space-y-4">
            {analysisResults.map((issue) => (
              <div key={issue.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  {issue.type === 'warning' && (
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  )}
                  {issue.type === 'info' && (
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  )}
                  {issue.type === 'success' && (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className={cn(
                      "font-medium",
                      issue.type === 'warning' && "text-amber-700",
                      issue.type === 'info' && "text-blue-700",
                      issue.type === 'success' && "text-green-700",
                    )}>
                      {issue.text}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {issue.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractAnalysis;
