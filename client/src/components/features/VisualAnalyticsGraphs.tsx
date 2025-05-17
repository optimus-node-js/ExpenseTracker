import React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

const monthlyData = [
  { name: 'Jan', expense: 25000, income: 45000 },
  { name: 'Feb', expense: 28000, income: 46000 },
  { name: 'Mar', expense: 32000, income: 47000 },
  { name: 'Apr', expense: 30000, income: 48000 },
  { name: 'May', expense: 27000, income: 50000 },
  { name: 'Jun', expense: 29000, income: 49000 },
  { name: 'Jul', expense: 31000, income: 51000 },
  { name: 'Aug', expense: 26000, income: 52000 },
];

const categoryData = [
  { name: 'Housing', value: 32 },
  { name: 'Food', value: 25 },
  { name: 'Transport', value: 15 },
  { name: 'Shopping', value: 12 },
  { name: 'Bills', value: 10 },
  { name: 'Others', value: 6 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function VisualAnalyticsGraphs() {
  return (
    <div className="space-y-8">
      <div className="p-6 border rounded-lg bg-card">
        <h3 className="text-xl font-medium mb-4">Monthly Income vs Expenses</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend />
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorIncome)"
              />
              <Area
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorExpense)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-xl font-medium mb-4">Expense Categories</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-xl font-medium mb-4">Monthly Savings</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `₹${(name === 'Savings' ? value : 0).toLocaleString()}`,
                    'Monthly Savings'
                  ]}
                />
                <Legend />
                <Bar 
                  name="Savings"
                  dataKey={(data) => data.income - data.expense} 
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}