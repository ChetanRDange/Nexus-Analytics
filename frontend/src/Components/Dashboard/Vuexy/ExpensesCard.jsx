import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../ThemeContext';

const ExpensesCard = ({ data, value = '0', percentage = 0 }) => {
    const { isDark } = useTheme();

    const chartData = data && data.length > 0 ? data : [
        { name: 'Score', value: percentage || 50 },
        { name: 'Remaining', value: 100 - (percentage || 50) },
    ];

    const COLORS = ['#7367F0', isDark ? '#3B3F5C' : '#e5e7eb'];

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</p>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Relevance</p>
                </div>
            </div>

            <div className="relative" style={{ width: 80, height: 80, margin: '0 auto' }}>
                <ResponsiveContainer width={80} height={80}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={38}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>{Math.round(percentage)}%</span>
                </div>
            </div>

            <div className="text-center mt-3">
                <p className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Average relevance</p>
                <p className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>score from dataset</p>
            </div>
        </div>
    );
};

export default ExpensesCard;
