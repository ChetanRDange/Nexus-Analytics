import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const RevenueGrowthCard = ({ data, value = '0' }) => {
    const { isDark } = useTheme();

    const chartData = data || [
        { day: 'M', value: 60 },
        { day: 'T', value: 80 },
        { day: 'W', value: 50 },
        { day: 'T', value: 90 },
        { day: 'F', value: 70 },
        { day: 'S', value: 100 },
        { day: 'S', value: 85 },
    ];

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Avg Relevance</h3>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Overall Score</p>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</span>
                <span className="flex items-center gap-1 text-sm font-medium text-[#28C76F] bg-[#28C76F20] px-2 py-1 rounded">
                    <TrendingUp className="w-4 h-4" />
                    +5.8%
                </span>
            </div>

            <div style={{ width: '100%', height: 100 }}>
                <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={chartData} barSize={12}>
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#6B6D8C' : '#9CA3AF', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                backgroundColor: isDark ? '#25293C' : '#fff',
                                border: isDark ? '1px solid #3B3F5C' : '1px solid #E5E7EB',
                                borderRadius: '8px',
                                color: isDark ? '#fff' : '#374151'
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill="#28C76F"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueGrowthCard;
