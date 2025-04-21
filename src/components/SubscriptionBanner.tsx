
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SubscriptionBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-legal-primary to-blue-400 text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
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
