import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Globe, TrendingUp } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const ProjectStatusCard = ({ data, regions = [], total = 0 }) => {
    const { isDark } = useTheme();

    const chartData = data && data.length > 0 ? data : [
        { name: 'W1', value: 40 },
        { name: 'W2', value: 65 },
        { name: 'W3', value: 45 },
        { name: 'W4', value: 80 },
        { name: 'W5', value: 55 },
        { name: 'W6', value: 70 },
    ];

    const topRegions = regions.slice(0, 2);

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Region Overview</h3>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-[#FF9F43]/10' : 'bg-orange-50'}`}>
                    <Globe className="w-5 h-5 text-[#FF9F43]" />
                </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#28C76F20] flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#28C76F]" />
                </div>
                <div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{regions.length}</p>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Unique Regions</p>
                </div>
                <span className="ml-auto flex items-center gap-1 text-sm font-medium text-[#28C76F]">
                    <TrendingUp className="w-4 h-4" />
                    {total} records
                </span>
            </div>

            <div style={{ width: '100%', height: 120 }} className="mb-4">
                <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="projectGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF9F43" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#FF9F43" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? '#25293C' : '#fff',
                                border: isDark ? '1px solid #3B3F5C' : '1px solid #E5E7EB',
                                borderRadius: '8px',
                                color: isDark ? '#fff' : '#1F2937'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#FF9F43"
                            strokeWidth={2}
                            fill="url(#projectGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className={`space-y-3 pt-4 border-t ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                {topRegions.map((region, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>
                            {(region._id || 'Unknown').substring(0, 20)}
                        </span>
                        <div className="flex items-center gap-3">
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{region.count || 0}</span>
                            <span className="text-sm text-[#28C76F]">
                                Avg: {(region.avgIntensity || 0).toFixed(1)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectStatusCard;
