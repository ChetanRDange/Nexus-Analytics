import React from 'react';
import { BarChart2, TrendingUp, Layers, Activity, Target } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const EarningReportsListCard = ({ data, sectors = [] }) => {
    const { isDark } = useTheme();

    const iconList = [Layers, Activity, Target, BarChart2, TrendingUp];
    const colorList = ['#28C76F', '#7367F0', '#FF9F43', '#00CFE8', '#EA5455'];

    const reports = sectors && sectors.length > 0
        ? sectors.slice(0, 4).map((s, index) => ({
            icon: iconList[index % iconList.length],
            iconBg: colorList[index % colorList.length],
            title: (s._id || 'Unknown').length > 15 ? (s._id || 'Unknown').substring(0, 15) + '...' : (s._id || 'Unknown'),
            subtitle: `${s.count || 0} records`,
            amount: (s.avgIntensity || 0).toFixed(1),
            change: (s.avgLikelihood || 0).toFixed(1),
            isPositive: (s.avgIntensity || 0) > 3
        }))
        : (data || [
            {
                icon: Layers,
                iconBg: '#28C76F',
                title: 'Loading...',
                subtitle: 'Fetching data',
                amount: '0',
                change: 0,
                isPositive: true
            },
        ]);

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Sector Analysis</h3>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Intensity Overview</p>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-[#28C76F]/10' : 'bg-green-50'}`}>
                    <TrendingUp className="w-5 h-5 text-[#28C76F]" />
                </div>
            </div>

            <div className="space-y-4">
                {reports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${report.iconBg}20` }}
                            >
                                <report.icon className="w-5 h-5" style={{ color: report.iconBg }} />
                            </div>
                            <div>
                                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{report.title}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{report.subtitle}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Int: {report.amount}</p>
                            <div className={`flex items-center justify-end gap-1 text-sm ${report.isPositive ? 'text-[#28C76F]' : 'text-[#EA5455]'}`}>
                                <TrendingUp className="w-3 h-3" />
                                Like: {report.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EarningReportsListCard;
