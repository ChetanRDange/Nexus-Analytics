import React from 'react';
import { TrendingUp, Globe } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const countryFlags = {
    'United States of America': '🇺🇸',
    'United States': '🇺🇸',
    'USA': '🇺🇸',
    'Brazil': '🇧🇷',
    'India': '🇮🇳',
    'Australia': '🇦🇺',
    'France': '🇫🇷',
    'China': '🇨🇳',
    'Germany': '🇩🇪',
    'United Kingdom': '🇬🇧',
    'Canada': '🇨🇦',
    'Japan': '🇯🇵',
    'Russia': '🇷🇺',
    'Mexico': '🇲🇽',
    'South Africa': '🇿🇦',
    'Nigeria': '🇳🇬',
    'Egypt': '🇪🇬',
    'Saudi Arabia': '🇸🇦',
    'Iran': '🇮🇷',
    'Iraq': '🇮🇶',
    'Indonesia': '🇮🇩',
    'Pakistan': '🇵🇰',
    'Poland': '🇵🇱',
    'Spain': '🇪🇸',
    'Italy': '🇮🇹',
};

const getFlag = (country) => countryFlags[country] || '🌍';

const SalesByCountriesCard = ({ data }) => {
    const { isDark } = useTheme();

    const countriesData = data && data.length > 0 ? data.slice(0, 6).map((item, index) => ({
        country: item._id || item.country || 'Unknown',
        flag: getFlag(item._id || item.country),
        amount: item.count || item.amount || 0,
        avgIntensity: item.avgIntensity ? item.avgIntensity.toFixed(1) : '0',
    })) : [
        { country: 'Loading...', flag: '🌍', amount: 0, avgIntensity: '0' },
    ];

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Data by Countries</h3>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Records Overview</p>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-[#7367F0]/10' : 'bg-purple-50'}`}>
                    <Globe className="w-5 h-5 text-[#7367F0]" />
                </div>
            </div>

            <div className="space-y-4">
                {countriesData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.flag}</span>
                            <div>
                                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.amount} records</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{item.country.length > 20 ? item.country.substring(0, 20) + '...' : item.country}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium text-[#28C76F]">
                            <TrendingUp className="w-4 h-4" />
                            {item.avgIntensity}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SalesByCountriesCard;
