import React, { useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { MoreVertical, BarChart3, Activity, Layers, Target } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const EarningReportsCard = ({ data, sectors = [], topics = [], regions = [] }) => {
    const [activeTab, setActiveTab] = useState('sectors');
    const { isDark } = useTheme();

    const getChartData = () => {
        switch (activeTab) {
            case 'sectors':
                return sectors.slice(0, 9).map(s => ({ name: (s._id || s.name || 'N/A').substring(0, 3), value: s.count || s.value || 0 }));
            case 'topics':
                return topics.slice(0, 9).map(t => ({ name: (t._id || t.name || 'N/A').substring(0, 3), value: t.count || t.value || 0 }));
            case 'regions':
                return regions.slice(0, 9).map(r => ({ name: (r._id || r.name || 'N/A').substring(0, 3), value: r.count || r.value || 0 }));
            default:
                return data && data.length > 0 ? data : [
                    { name: 'Jan', value: 28 },
                    { name: 'Feb', value: 10 },
                    { name: 'Mar', value: 45 },
                ];
        }
    };

    const chartData = getChartData();

    const tabs = [
        { id: 'sectors', label: 'Sectors', icon: Layers },
        { id: 'topics', label: 'Topics', icon: Target },
        { id: 'regions', label: 'Regions', icon: Activity },
    ];

    const getBarColor = (index) => {
        const maxValue = Math.max(...chartData.map(d => d.value));
        if (chartData[index]?.value === maxValue) return '#7367F0';
        return isDark ? '#3B3F5C' : '#e5e7eb';
    };

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Data Reports</h3>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Category Overview</p>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-[#7367F0]/10' : 'bg-purple-50'}`}>
                    <BarChart3 className="w-5 h-5 text-[#7367F0]" />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                            ? 'bg-[#7367F0]/10 text-[#7367F0] border border-[#7367F0]'
                            : isDark
                                ? 'bg-[#25293C] text-[#A3A4CC] border border-transparent hover:border-[#3B3F5C]'
                                : 'bg-gray-100 text-gray-600 border border-transparent hover:border-gray-300'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} barSize={20}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 11 }}
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
                            formatter={(value) => [value, 'Count']}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EarningReportsCard;
