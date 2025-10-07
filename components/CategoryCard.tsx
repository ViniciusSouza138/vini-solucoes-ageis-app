import React from 'react';
import { ServiceCategory } from '../types';

interface CategoryCardProps {
  category: ServiceCategory;
  onSelect: (category: ServiceCategory) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  const Icon = category.icon;

  return (
    <div
      onClick={() => onSelect(category)}
      className="bg-brand-gray p-6 rounded-lg shadow-lg hover:shadow-brand-red/50 hover:scale-105 transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center"
    >
      {Icon && <Icon className="w-12 h-12 text-brand-red mb-4" />}
      <h3 className="text-xl font-bold font-montserrat">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;