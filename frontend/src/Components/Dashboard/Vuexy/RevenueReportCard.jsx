import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const RevenueReportCard = ({ data, total = 0, average = 0 }) => {
    const { isDark } = useTheme();

    const chartData = data && data.length > 0 ? data : [
        { month: 'Jan', intensity: 12, likelihood: 8 },
        { month: 'Feb', intensity: 18, likelihood: 12 },
        { month: 'Mar', intensity: 10, likelihood: 6 },
        { month: 'Apr', intensity: 22, likelihood: 15 },
        { month: 'May', intensity: 8, likelihood: 5 },
        { month: 'Jun', intensity: 15, likelihood: 9 },
    ];

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Monthly Trends</h3>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#7367F0]"></span>
                            <span className={`text-sm ${isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}`}>Intensity</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#FF9F43]"></span>
                            <span className={`text-sm ${isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}`}>Likelihood</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-8 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#28C76F20] flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-[#28C76F]" />
                    </div>
                    <div>
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{total}</p>
                        <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Avg: {average}</p>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={chartData} barGap={8}>
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                backgroundColor: isDark ? '#25293C' : '#fff',
                                border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                borderRadius: '8px',
                                color: isDark ? '#fff' : '#374151'
                            }}
                        />
                        <Bar dataKey="intensity" fill="#7367F0" radius={[4, 4, 0, 0]} barSize={12} />
                        <Bar dataKey="likelihood" fill="#FF9F43" radius={[0, 0, 4, 4]} barSize={12} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueReportCard;
