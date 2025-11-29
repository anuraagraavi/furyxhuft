import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  bg?: 'cream' | 'white' | 'stone';
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, bg = 'cream' }) => {
  const bgColors = {
    cream: 'bg-cream',
    white: 'bg-white',
    stone: 'bg-stone-50',
  };

  return (
    <section id={id} className={`py-20 md:py-28 ${bgColors[bg]} ${className} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};
