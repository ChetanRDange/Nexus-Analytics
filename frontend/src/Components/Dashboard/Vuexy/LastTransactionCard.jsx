import React from 'react';
import { MoreVertical, TrendingUp, TrendingDown, Database } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const LastTransactionCard = ({ data, topics = [] }) => {
    const { isDark } = useTheme();

    const topicColors = ['#7367F0', '#28C76F', '#00CFE8', '#FF9F43', '#EA5455'];

    const transactions = topics && topics.length > 0
        ? topics.slice(0, 5).map((t, i) => ({
            topic: t._id || 'Unknown',
            type: 'Topic',
            icon: (t._id || 'T')[0].toUpperCase(),
            iconBg: topicColors[i % topicColors.length],
            iconColor: '#fff',
            date: `${t.count || 0} records`,
            dateDetail: `Avg Int: ${(t.avgIntensity || 0).toFixed(1)}`,
            status: (t.avgIntensity || 0) > 5 ? 'High' : (t.avgIntensity || 0) > 3 ? 'Medium' : 'Low',
            statusColor: (t.avgIntensity || 0) > 5 ? '#28C76F' : (t.avgIntensity || 0) > 3 ? '#FF9F43' : '#6B6D8C',
            trend: `+${(t.avgRelevance || 0).toFixed(1)}`
        }))
        : (data || []);

    const getStatusBg = (color) => `${color}20`;

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                    <Database className={`w-5 h-5 ${isDark ? 'text-[#7367F0]' : 'text-purple-600'}`} />
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Top Topics</h3>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-[#7367F0]/10' : 'bg-purple-50'}`}>
                    <TrendingUp className="w-5 h-5 text-[#7367F0]" />
                </div>
            </div>

            {/* Table Header */}
            <div className={`grid grid-cols-4 gap-4 pb-3 border-b text-sm font-medium uppercase ${isDark ? 'border-[#3B3F5C] text-[#6B6D8C]' : 'border-gray-200 text-gray-500'}`}>
                <span>Topic</span>
                <span>Records</span>
                <span>Level</span>
                <span className="text-right">Relevance</span>
            </div>

            {/* Table Body */}
            <div className={`divide-y ${isDark ? 'divide-[#3B3F5C]' : 'divide-gray-200'}`}>
                {transactions.map((tx, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 py-3 items-center">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                                style={{ backgroundColor: tx.iconBg, color: tx.iconColor }}
                            >
                                {tx.icon}
                            </div>
                            <div className="min-w-0">
                                <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    {(tx.topic || '').length > 12 ? (tx.topic || '').substring(0, 12) + '...' : tx.topic}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className={isDark ? 'text-white' : 'text-gray-800'}>{tx.date}</p>
                            <p className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{tx.dateDetail}</p>
                        </div>
                        <div>
                            <span
                                className="px-2 py-1 rounded text-xs font-medium"
                                style={{
                                    backgroundColor: getStatusBg(tx.statusColor),
                                    color: tx.statusColor
                                }}
                            >
                                {tx.status}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="font-medium text-[#28C76F]">
                                {tx.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LastTransactionCard;
