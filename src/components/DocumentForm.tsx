
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date';
  placeholder: string;
  required: boolean;
}

interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  fields: FormField[];
}

// Sample document templates
const documentTemplates: DocumentTemplate[] = [
  {
    id: 'claim',
    name: 'Претензия потребителя',
    category: 'Потребительские права',
    description: 'Претензия на некачественный товар или услугу',
    fields: [
      { id: 'name', label: 'ФИО заявителя', type: 'text', placeholder: 'Иванов Иван Иванович', required: true },
      { id: 'address', label: 'Адрес заявителя', type: 'text', placeholder: 'г. Москва, ул. Примерная, д. 1, кв. 1', required: true },
      { id: 'phone', label: 'Телефон', type: 'text', placeholder: '+7 (900) 123-45-67', required: true },
      { id: 'company', label: 'Наименование организации', type: 'text', placeholder: 'ООО "Компания"', required: true },
      { id: 'companyAddress', label: 'Адрес организации', type: 'text', placeholder: 'г. Москва, ул. Примерная, д. 10', required: true },
      { id: 'purchaseDate', label: 'Дата покупки', type: 'date', placeholder: '', required: true },
      { id: 'productName', label: 'Наименование товара/услуги', type: 'text', placeholder: 'Стиральная машина Model X', required: true },
      { id: 'issue', label: 'Описание проблемы', type: 'textarea', placeholder: 'Опишите проблему с товаром или услугой', required: true },
      { id: 'demand', label: 'Требование', type: 'textarea', placeholder: 'Укажите ваше требование (возврат денег, замена товара и т.д.)', required: true },
    ],
  },
  {
    id: 'resignation',
    name: 'Заявление на увольнение',
    category: 'Трудовое право',
    description: 'Заявление на увольнение по собственному желанию',
    fields: [
      { id: 'name', label: 'ФИО сотрудника', type: 'text', placeholder: 'Иванов Иван Иванович', required: true },
      { id: 'position', label: 'Должность', type: 'text', placeholder: 'Менеджер', required: true },
      { id: 'company', label: 'Наименование организации', type: 'text', placeholder: 'ООО "Компания"', required: true },
      { id: 'director', label: 'ФИО руководителя', type: 'text', placeholder: 'Петрову П.П.', required: true },
      { id: 'date', label: 'Дата увольнения', type: 'date', placeholder: '', required: true },
      { id: 'reason', label: 'Причина увольнения', type: 'text', placeholder: 'По собственному желанию', required: false },
    ],
  },
  {
    id: 'court',
    name: 'Исковое заявление в суд',
    category: 'Гражданское право',
    description: 'Общий шаблон искового заявления в суд',
    fields: [
      { id: 'court', label: 'Наименование суда', type: 'text', placeholder: 'В Преображенский районный суд г. Москвы', required: true },
      { id: 'plaintiff', label: 'Истец (ФИО)', type: 'text', placeholder: 'Иванов Иван Иванович', required: true },
      { id: 'plaintiffAddress', label: 'Адрес истца', type: 'text', placeholder: 'г. Москва, ул. Примерная, д. 1, кв. 1', required: true },
      { id: 'defendant', label: 'Ответчик', type: 'text', placeholder: 'ООО "Компания"', required: true },
      { id: 'defendantAddress', label: 'Адрес ответчика', type: 'text', placeholder: 'г. Москва, ул. Примерная, д. 10', required: true },
      { id: 'claimAmount', label: 'Цена иска', type: 'text', placeholder: '50 000 рублей', required: false },
      { id: 'claimSubject', label: 'Предмет иска', type: 'text', placeholder: 'О защите прав потребителя', required: true },
      { id: 'circumstances', label: 'Обстоятельства дела', type: 'textarea', placeholder: 'Опишите обстоятельства дела', required: true },
      { id: 'laws', label: 'Правовое обоснование', type: 'textarea', placeholder: 'Укажите законы и нормы, на которые вы ссылаетесь', required: true },
      { id: 'demands', label: 'Требования', type: 'textarea', placeholder: 'Перечислите ваши требования к ответчику', required: true },
    ],
  },
];

const DocumentForm = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [documentGenerated, setDocumentGenerated] = useState(false);
  const { toast } = useToast();

  const handleTemplateSelect = (templateId: string) => {
    const template = documentTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setFormData({});
      setDocumentGenerated(false);
    }
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleGenerateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check required fields
    if (selectedTemplate) {
      const missingFields = selectedTemplate.fields
        .filter((field) => field.required && !formData[field.id])
        .map((field) => field.label);

      if (missingFields.length > 0) {
        toast({
          title: "Ошибка",
          description: `Необходимо заполнить обязательные поля: ${missingFields.join(', ')}`,
          variant: "destructive",
        });
        return;
      }

      // In a real app, this would call an API to generate the document
      setTimeout(() => {
        setDocumentGenerated(true);
        toast({
          title: "Документ сгенерирован",
          description: "Вы можете скачать его или отредактировать данные",
        });
      }, 1000);
    }
  };

  const handleDownloadDocument = () => {
    // In a real app, this would download the actual document
    toast({
      title: "Загрузка документа",
      description: "Документ будет загружен в формате PDF",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="template">Выберите шаблон документа</Label>
        <Select onValueChange={handleTemplateSelect}>
          <SelectTrigger id="template">
            <SelectValue placeholder="Выберите шаблон" />
          </SelectTrigger>
          <SelectContent>
            {documentTemplates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTemplate && (
        <div className="border rounded-lg p-6 bg-card">
          <h3 className="text-lg font-medium mb-2">{selectedTemplate.name}</h3>
          <p className="text-sm text-muted-foreground mb-6">{selectedTemplate.description}</p>

          <form onSubmit={handleGenerateDocument} className="space-y-4">
            {selectedTemplate.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    required={field.required}
                  />
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                <FileText className="mr-2 h-4 w-4" />
                Сгенерировать документ
              </Button>
              
              {documentGenerated && (
                <Button type="button" variant="outline" onClick={handleDownloadDocument}>
                  <Download className="mr-2 h-4 w-4" />
                  Скачать PDF
                </Button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DocumentForm;
