import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureBoxProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ title, description, Icon }) => {
  return (
    <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="bg-primary/10 group-hover:bg-primary/20 p-4 rounded-full inline-flex mb-4 transition-colors">
        <Icon size={24} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-secondary">{title}</h3>
      <p className="text-neutral-700">{description}</p>
    </div>
  );
};

export default FeatureBox;