'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: 'from-blue-500/10 to-blue-600/10 text-blue-500',
  green: 'from-green-500/10 to-green-600/10 text-green-500',
  purple: 'from-purple-500/10 to-purple-600/10 text-purple-500',
  orange: 'from-orange-500/10 to-orange-600/10 text-orange-500',
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6
        hover:border-neutral-700 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-neutral-400 font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-white mb-1">{value}</p>
          {trend && (
            <div className="flex items-center space-x-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-neutral-500">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={`
            p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}
          `}
        >
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
}
