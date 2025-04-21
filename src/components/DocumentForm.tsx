
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

// Расширенный список юридических документов для РФ
const documentTemplates: DocumentTemplate[] = [
  {
    id: 'claim',
    name: 'Претензия потребителя',
    category: 'Потребительские права',
    description: 'Претензия на некачественный товар или услугу по ФЗ "О защите прав потребителей"',
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
    description: 'Заявление на увольнение по собственному желанию согласно ТК РФ',
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
    description: 'Общий шаблон искового заявления в суд согласно ГПК РФ',
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
  // Добавлены новые шаблоны
  {
    id: 'alimony',
    name: 'Заявление о взыскании алиментов',
    category: 'Семейное право',
    description: 'Заявление на взыскание алиментов на содержание ребенка согласно СК РФ',
    fields: [
      { id: 'court', label: 'Наименование суда', type: 'text', placeholder: 'В Пресненский районный суд г. Москвы', required: true },
      { id: 'plaintiff', label: 'Истец (ФИО)', type: 'text', placeholder: 'Иванова Мария Ивановна', required: true },
      { id: 'plaintiffAddress', label: 'Адрес истца', type: 'text', placeholder: 'г. Москва, ул. Примерная, д. 1, кв. 1', required: true },
      { id: 'defendant', label: 'Ответчик (ФИО)', type: 'text', placeholder: 'Иванов Иван Иванович', required: true },
      { id: 'defendantAddress', label: 'Адрес ответчика', type: 'text', placeholder: 'г. Москва, ул. Другая, д. 10, кв. 5', required: true },
      { id: 'childName', label: 'ФИО ребенка', type: 'text', placeholder: 'Иванов Петр Иванович', required: true },
      { id: 'childBirthDate', label: 'Дата рождения ребенка', type: 'date', placeholder: '', required: true },
      { id: 'alimonyAmount', label: 'Размер алиментов', type: 'text', placeholder: '25% от заработка', required: true },
      { id: 'circumstances', label: 'Обстоятельства дела', type: 'textarea', placeholder: 'Укажите, что является основанием для взыскания алиментов', required: true },
    ],
  },
  {
    id: 'housing',
    name: 'Жалоба в жилищную инспекцию',
    category: 'Жилищное право',
    description: 'Жалоба на управляющую компанию или ТСЖ',
    fields: [
      { id: 'recipient', label: 'Кому (должность, орган)', type: 'text', placeholder: 'Начальнику ГЖИ г. Москвы', required: true },
      { id: 'applicant', label: 'ФИО заявителя', type: 'text', placeholder: 'Иванов Иван Иванович', required: true },
      { id: 'address', label: 'Адрес заявителя', type: 'text', placeholder: 'г. Москва, ул. Примерная, д. 1, кв. 1', required: true },
      { id: 'phone', label: 'Телефон', type: 'text', placeholder: '+7 (900) 123-45-67', required: true },
      { id: 'company', label: 'Наименование УК/ТСЖ', type: 'text', placeholder: 'ООО "УК Домовой"', required: true },
      { id: 'issue', label: 'Суть жалобы', type: 'textarea', placeholder: 'Опишите проблему с качеством обслуживания дома', required: true },
      { id: 'laws', label: 'Нарушенные нормы', type: 'textarea', placeholder: 'Укажите нормы ЖК РФ и других нормативных актов', required: false },
      { id: 'demand', label: 'Требование', type: 'textarea', placeholder: 'Укажите, что должна сделать жилищная инспекция', required: true },
    ],
  },
  {
    id: 'divorce',
    name: 'Исковое заявление о расторжении брака',
    category: 'Семейное право',
    description: 'Заявление для расторжения брака через суд',
    fields: [
      { id: 'court', label: 'Наименование суда', type: 'text', placeholder: 'В Тверской районный суд г. Москвы', required: true },
      { id: 'plaintiff', label: 'Истец (ФИО)', type: 'text', placeholder: 'Иванова Мария Ивановна', required: true },
      { id: 'plaintiffAddress', label: 'Адрес истца', type: 'text', placeholder: 'г. Москва, ул. Примерная, д. 1, кв. 1', required: true },
      { id: 'defendant', label: 'Ответчик (ФИО)', type: 'text', placeholder: 'Иванов Иван Иванович', required: true },
      { id: 'defendantAddress', label: 'Адрес ответчика', type: 'text', placeholder: 'г. Москва, ул. Другая, д. 10, кв. 5', required: true },
      { id: 'marriageDate', label: 'Дата заключения брака', type: 'date', placeholder: '', required: true },
      { id: 'marriageOffice', label: 'ЗАГС регистрации брака', type: 'text', placeholder: 'Тверской отдел ЗАГС г. Москвы', required: true },
      { id: 'children', label: 'Сведения о детях', type: 'textarea', placeholder: 'ФИО и даты рождения несовершеннолетних детей', required: false },
      { id: 'reason', label: 'Причина развода', type: 'textarea', placeholder: 'Укажите причину расторжения брака', required: true },
    ],
  },
  {
    id: 'labor_dispute',
    name: 'Жалоба в трудовую инспекцию',
    category: 'Трудовое право',
    description: 'Жалоба на нарушение трудовых прав работодателем',
    fields: [
      { id: 'recipient', label: 'Кому (должность, орган)', type: 'text', placeholder: 'Руководителю Государственной инспекции труда в г. Москве', required: true },
      { id: 'applicant', label: 'ФИО заявителя', type: 'text', placeholder: 'Иванов Иван Иванович', required: true },
      { id: 'address', label: 'Адрес заявителя', type: 'text', placeholder: 'г. Москва, ул. Примерная, д. 1, кв. 1', required: true },
      { id: 'phone', label: 'Телефон', type: 'text', placeholder: '+7 (900) 123-45-67', required: true },
      { id: 'company', label: 'Наименование работодателя', type: 'text', placeholder: 'ООО "Компания"', required: true },
      { id: 'companyAddress', label: 'Адрес работодателя', type: 'text', placeholder: 'г. Москва, ул. Деловая, д. 10', required: true },
      { id: 'position', label: 'Должность заявителя', type: 'text', placeholder: 'Менеджер по продажам', required: true },
      { id: 'issue', label: 'Суть нарушения', type: 'textarea', placeholder: 'Опишите нарушение трудовых прав', required: true },
      { id: 'laws', label: 'Нарушенные нормы', type: 'textarea', placeholder: 'Укажите нормы ТК РФ', required: false },
      { id: 'demand', label: 'Требование', type: 'textarea', placeholder: 'Укажите, что должна сделать трудовая инспекция', required: true },
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
