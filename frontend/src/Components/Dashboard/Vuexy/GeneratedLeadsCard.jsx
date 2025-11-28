import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const GeneratedLeadsCard = ({ data, total = 0, topCount = 0 }) => {
    const { isDark } = useTheme();

    const chartData = data && data.length > 0 ? data : [
        { name: 'Top Topics', value: topCount || 10 },
        { name: 'Others', value: Math.max(0, (total || 20) - (topCount || 10)) },
    ];

    const COLORS = ['#28C76F', isDark ? '#3B3F5C' : '#E5E7EB'];

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="mb-4">
                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Topics Analysis</h3>
                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Coverage Report</p>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{total}</p>
                    <div className="flex items-center gap-1 mt-2 text-[#28C76F]">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">Unique Topics</span>
                    </div>
                </div>

                <div className="relative" style={{ width: 100, height: 100 }}>
                    <ResponsiveContainer width={100} height={100}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={45}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                )}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>{topCount}</span>
                        <span className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Top</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratedLeadsCard;
