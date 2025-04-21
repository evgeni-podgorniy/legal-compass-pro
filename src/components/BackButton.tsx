
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={goBack} 
      className={`flex items-center gap-1 hover:bg-slate-100 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Назад</span>
    </Button>
  );
};

export default BackButton;
