import React from 'react';
import { Database, TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const TotalSalesCard = ({ value = 0 }) => {
    const { isDark } = useTheme();
    const displayValue = value > 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
    const change = 12.4;
    const isPositive = change > 0;

    return (
        <div className={`rounded-xl p-5 h-full flex flex-col justify-between ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="w-12 h-12 rounded-lg bg-[#28C76F20] flex items-center justify-center mb-3">
                <Database className="w-6 h-6 text-[#28C76F]" />
            </div>

            <div>
                <h3 className={`text-sm font-medium ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Total Records</h3>
                <p className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-400'}`}>In Database</p>
            </div>

            <div className="mt-3">
                <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{displayValue}</span>
            </div>

            <div className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium w-fit ${isPositive ? 'bg-[#28C76F20] text-[#28C76F]' : 'bg-[#EA545520] text-[#EA5455]'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                +{change}%
            </div>
        </div>
    );
};

export default TotalSalesCard;
