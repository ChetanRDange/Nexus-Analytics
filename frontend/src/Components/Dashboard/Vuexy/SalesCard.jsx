import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const SalesCard = ({ data, total }) => {
    const { isDark } = useTheme();

    const chartData = data && data.length > 0 ? data : [
        { name: 'Mon', value: 40 },
        { name: 'Tue', value: 65 },
        { name: 'Wed', value: 50 },
        { name: 'Thu', value: 80 },
        { name: 'Fri', value: 55 },
        { name: 'Sat', value: 90 },
        { name: 'Sun', value: 70 },
    ];

    const totalSales = total ? (total > 1000 ? `${(total / 1000).toFixed(1)}k` : total.toString()) : '0';
    const growth = 8.5;
    const isPositive = growth > 0;

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex flex-col h-full">
                <div className="mb-2">
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Topics</h3>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>By Count</p>
                </div>

                <div className="flex-1 my-3" style={{ minHeight: 60 }}>
                    <ResponsiveContainer width="100%" height={60}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#28C76F" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="#28C76F" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#25293C' : '#fff',
                                    border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#374151'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#28C76F"
                                strokeWidth={2}
                                fill="url(#salesGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-between">
                    <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{totalSales}</span>
                    <span className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-[#28C76F]' : 'text-[#EA5455]'}`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {isPositive ? '+' : ''}{growth}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SalesCard;
