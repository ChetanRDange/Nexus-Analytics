import React from 'react';
import { BarChart2, TrendingUp, Target, Activity } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const StatisticsCard = ({ data }) => {
    const { isDark } = useTheme();

    const icons = [BarChart2, TrendingUp, Target, Activity];

    const stats = data || [
        { label: 'Records', value: '0', color: '#7367F0' },
        { label: 'Intensity', value: '0', color: '#28C76F' },
        { label: 'Likelihood', value: '0', color: '#EA5455' },
        { label: 'Relevance', value: '0', color: '#FF9F43' },
    ];

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Statistics</h3>
                <span className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Live Data</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = icons[index % icons.length];
                    return (
                        <div key={index} className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${stat.color}20` }}
                            >
                                <Icon className="w-5 h-5" style={{ color: stat.color }} />
                            </div>
                            <div>
                                <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{stat.value}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatisticsCard;
