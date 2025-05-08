
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getFeaturesBySubscription } from '@/config/features';

interface SubscriptionContextType {
  isPremium: boolean;
  subscriptionTier: string | null;
  daysLeft: number;
  features: Record<string, any>;
  checkSubscription: () => void;
}

const defaultContext: SubscriptionContextType = {
  isPremium: false,
  subscriptionTier: null,
  daysLeft: 0,
  features: getFeaturesBySubscription(null),
  checkSubscription: () => {}
};

const SubscriptionContext = createContext<SubscriptionContextType>(defaultContext);

export const useSubscription = () => useContext(SubscriptionContext);

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscriptionData, setSubscriptionData] = useState({
    isPremium: false,
    subscriptionTier: null as string | null,
    daysLeft: 0,
    features: getFeaturesBySubscription(null)
  });

  const checkSubscription = async () => {
    try {
      // В реальном приложении здесь будет запрос к API для проверки подписки
      // Имитируем получение данных о подписке
      const hasSubscription = Math.random() > 0.7; // 30% вероятность наличия подписки для демонстрации
      
      let tier = null;
      let days = 0;
      
      if (hasSubscription) {
        tier = Math.random() > 0.5 ? 'Стандарт' : 'Премиум';
        days = Math.floor(Math.random() * 30) + 1;
      }
      
      setSubscriptionData({
        isPremium: hasSubscription,
        subscriptionTier: tier,
        daysLeft: days,
        features: getFeaturesBySubscription(tier)
      });
    } catch (error) {
      console.error('Ошибка при проверке подписки:', error);
    }
  };
  
  // Проверяем подписку при первой загрузке
  useEffect(() => {
    checkSubscription();
  }, []);

  return (
    <SubscriptionContext.Provider value={{
      ...subscriptionData,
      checkSubscription
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
