import React from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const ActivityTimelineCard = ({ data, pestle = [] }) => {
    const { isDark } = useTheme();

    const pestleColors = ['#7367F0', '#28C76F', '#00CFE8', '#FF9F43', '#EA5455', '#7367F0'];

    const activities = pestle && pestle.length > 0
        ? pestle.slice(0, 5).map((p, index) => ({
            color: pestleColors[index % pestleColors.length],
            title: p._id || 'Unknown Category',
            description: `${p.count || 0} records with average intensity ${(p.avgIntensity || 0).toFixed(1)}`,
            time: `Rel: ${(p.avgRelevance || 0).toFixed(1)}`,
            stats: {
                count: p.count || 0,
                intensity: (p.avgIntensity || 0).toFixed(1),
                likelihood: (p.avgLikelihood || 0).toFixed(1)
            }
        }))
        : (data || [
            {
                color: '#7367F0',
                title: 'Loading...',
                description: 'Fetching PESTLE analysis data',
                time: '...',
            },
        ]);

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                    <BarChart2 className={`w-5 h-5 ${isDark ? 'text-[#7367F0]' : 'text-purple-600'}`} />
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>PESTLE Analysis</h3>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-[#28C76F]/10' : 'bg-green-50'}`}>
                    <TrendingUp className="w-5 h-5 text-[#28C76F]" />
                </div>
            </div>

            <div className="relative">
                {activities.map((activity, index) => (
                    <div key={index} className="relative pl-6 pb-6 last:pb-0">
                        {/* Timeline line */}
                        {index < activities.length - 1 && (
                            <div className={`absolute left-[7px] top-4 bottom-0 w-0.5 ${isDark ? 'bg-[#3B3F5C]' : 'bg-gray-200'}`} />
                        )}

                        {/* Timeline dot */}
                        <div
                            className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 ${isDark ? 'bg-[#2F3349]' : 'bg-white'}`}
                            style={{ borderColor: activity.color }}
                        />

                        {/* Content */}
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h4 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{activity.title}</h4>
                                <p className={`text-sm mb-2 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{activity.description}</p>

                                {/* Stats badges */}
                                {activity.stats && (
                                    <div className="flex gap-2 flex-wrap">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${isDark ? 'bg-[#7367F0]/10 text-[#7367F0]' : 'bg-purple-100 text-purple-600'}`}>
                                            {activity.stats.count} records
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${isDark ? 'bg-[#28C76F]/10 text-[#28C76F]' : 'bg-green-100 text-green-600'}`}>
                                            Int: {activity.stats.intensity}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${isDark ? 'bg-[#FF9F43]/10 text-[#FF9F43]' : 'bg-orange-100 text-orange-600'}`}>
                                            Like: {activity.stats.likelihood}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <span className={`text-xs whitespace-nowrap ml-4 px-2 py-1 rounded ${isDark ? 'bg-[#25293C] text-[#A3A4CC]' : 'bg-gray-100 text-gray-600'}`}>{activity.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityTimelineCard;
