import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const ProfitCard = ({ data, value = '0' }) => {
    const { isDark } = useTheme();

    const chartData = data && data.length > 0 ? data : [
        { value: 20 },
        { value: 45 },
        { value: 30 },
        { value: 60 },
        { value: 40 },
        { value: 55 },
        { value: 70 },
    ];

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="mb-2">
                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Intensity</h3>
                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Average Score</p>
            </div>

            <div style={{ width: '100%', height: 60 }}>
                <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00CFE8" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#00CFE8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#00CFE8"
                            strokeWidth={2}
                            fill="url(#profitGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between mt-2">
                <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</span>
                <span className="flex items-center gap-1 text-sm font-medium text-[#28C76F]">
                    <TrendingUp className="w-4 h-4" />
                    +8.24%
                </span>
            </div>
        </div>
    );
};

export default ProfitCard;
