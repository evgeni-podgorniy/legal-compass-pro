
import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SubscriptionBannerProps {
  isPremium?: boolean;
  subscriptionTier?: string;
  daysLeft?: number;
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ 
  isPremium = false, 
  subscriptionTier = '', 
  daysLeft = 0 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  if (isPremium) {
    return (
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span className="text-sm md:text-base">
              У вас активна подписка <span className="font-bold">{subscriptionTier}</span>. 
              {daysLeft > 0 && ` Осталось ${daysLeft} дней.`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" asChild variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link to="/premium">Управление</Link>
            </Button>
            <button 
              onClick={handleDismiss} 
              className="text-white hover:text-slate-200"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-legal-primary to-blue-400 text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Star className="mr-2 h-4 w-4" />
          <span className="text-sm md:text-base">
            🔥 Получите доступ ко всем функциям приложения с подпиской "Премиум"
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" asChild className="bg-white text-legal-primary hover:bg-slate-100">
            <Link to="/premium">Подробнее</Link>
          </Button>
          <button 
            onClick={handleDismiss} 
            className="text-white hover:text-slate-200"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
