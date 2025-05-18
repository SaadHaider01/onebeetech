import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  Icon: LucideIcon;
  description: string;
  details: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, Icon, description, details }) => {
  return (
    <div className="service-card h-[280px] w-full">
      <div className="service-card-inner h-full w-full">
        <div className="service-card-front h-full rounded-xl bg-white/10 p-6 flex flex-col items-center text-center">
          <div className="bg-primary/20 p-4 rounded-full mb-4">
            <Icon size={30} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-white/80">{description}</p>
          <div className="mt-auto">
            <motion.span
              className="text-primary text-sm flex items-center justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Hover to learn more
            </motion.span>
          </div>
        </div>
        <div className="service-card-back h-full rounded-xl bg-primary p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
          <p className="text-white/90">{details}</p>
          <a 
            href="#contact" 
            className="mt-auto bg-white text-primary px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;