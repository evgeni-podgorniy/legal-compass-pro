
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

const CategoryCard = ({ title, description, icon: Icon, link }: CategoryCardProps) => {
  return (
    <Link to={link} className="block transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="rounded-full p-3 bg-legal-secondary mb-4">
            <Icon className="h-6 w-6 text-legal-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
