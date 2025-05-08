
/**
 * Конфигурация доступных функций приложения
 */
export const features = {
  // Базовые функции (доступны всем пользователям)
  basic: {
    chat: {
      enabled: true,
      dailyLimit: 5,
      responseLength: 'short'
    },
    documents: {
      enabled: true,
      uploadLimit: 3,
      maxFileSize: 5, // в МБ
      supportedFormats: ['pdf', 'doc', 'docx']
    },
    analysis: {
      enabled: true,
      documentLimit: 3,
      pageLimit: 5
    }
  },
  
  // Стандартные функции (подписка Стандарт)
  standard: {
    chat: {
      enabled: true,
      dailyLimit: 30,
      responseLength: 'medium',
      prioritySupport: true
    },
    documents: {
      enabled: true,
      uploadLimit: 10,
      maxFileSize: 20, // в МБ
      supportedFormats: ['pdf', 'doc', 'docx', 'txt', 'rtf']
    },
    analysis: {
      enabled: true,
      documentLimit: 10,
      pageLimit: 20,
      advancedTools: true
    },
    export: {
      enabled: true,
      formats: ['pdf', 'doc']
    }
  },
  
  // Премиум функции (подписка Премиум)
  premium: {
      chat: {
        enabled: true,
        dailyLimit: -1, // неограниченно
        responseLength: 'long',
        prioritySupport: true
      },
      documents: {
        enabled: true,
        uploadLimit: -1, // неограниченно
        maxFileSize: 50, // в МБ
        supportedFormats: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'xlsx', 'ppt', 'pptx']
      },
      analysis: {
        enabled: true,
        documentLimit: -1, // неограниченно
        pageLimit: 100,
        advancedTools: true
      },
      export: {
        enabled: true,
        formats: ['pdf', 'doc', 'docx', 'txt', 'rtf']
      },
      templates: {
        enabled: true,
        customTemplates: true
      },
      support: {
        enabled: true,
        priority: 'high',
        response24h: true
      }
  }
};

/**
 * Возвращает конфигурацию функций в зависимости от выбранного тарифного плана
 * @param subscriptionTier - тарифный план пользователя
 */
export const getFeaturesBySubscription = (subscriptionTier: string | null): Record<string, any> => {
  switch (subscriptionTier) {
    case 'Премиум':
      return features.premium;
    case 'Стандарт':
      return features.standard;
    default:
      return features.basic;
  }
};
