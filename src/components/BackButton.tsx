
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const goBack = () => {
    if (location.pathname === '/') {
      toast({
        title: "Вы уже на главной странице",
        description: "Навигация недоступна",
      });
    } else {
      navigate(-1);
      toast({
        description: "Возвращаемся назад",
      });
    }
  };

  // Don't show back button on home page
  if (location.pathname === '/') return null;

  return (
    <Button 
      variant="ghost" 
      size="lg" 
      onClick={goBack} 
      className={`fixed top-4 left-4 z-50 flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-sm hover:shadow-md ${className}`}
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="font-medium">Назад</span>
    </Button>
  );
};

export default BackButton;
