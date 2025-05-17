import React from 'react';
import { motion } from 'framer-motion';
import CountUpAnimation from '../animations/CountUpAnimation';

const StatCard = ({ title, value, prefix = '', suffix = '' }: { 
  title: string; 
  value: number;
  prefix?: string;
  suffix?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700"
  >
    <div className="text-3xl lg:text-4xl font-bold text-primary">
      <CountUpAnimation end={value} prefix={prefix} suffix={suffix} />
    </div>
    <div className="text-sm text-muted-foreground mt-2">{title}</div>
  </motion.div>
);

export default function StatsSection() {
  return (
    <section className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Trusted by users across India
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Join thousands of Indians managing their finances smarter and achieving their financial goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatCard title="Active Users" value={5000} suffix="+" />
          <StatCard title="Expenses Tracked" value={10} prefix="₹" suffix="Cr+" />
          <StatCard title="Avg. Savings Increase" value={15} suffix="%" />
          <StatCard title="Transactions Daily" value={12000} suffix="+" />
        </div>
      </div>
    </section>
  );
}