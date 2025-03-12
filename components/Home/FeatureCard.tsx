"use client";

import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  isHighlighted?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  step,
  isHighlighted = false,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative mb-6">
        <div
          className={`relative rounded-full w-32 h-32 flex items-center justify-center
          ${isHighlighted ? "bg-gradient-to-r from-indigo-900 to-indigo-500" : "bg-white bg-opacity-10"}
          border-4 border-dashed border-indigo-400 shadow-lg`}
        >
          <div className="text-indigo-300 text-4xl">{icon}</div>
          <motion.div
            className="absolute -top-3 -right-3 bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md"
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            {step}
          </motion.div>
        </div>
      </div>
      <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-200 text-center max-w-xs text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
