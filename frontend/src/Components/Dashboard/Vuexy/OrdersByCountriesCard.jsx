import React, { useState } from 'react';
import { MapPin, Globe } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const OrdersByCountriesCard = ({ data, regions = [] }) => {
    const { isDark } = useTheme();
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'high', label: 'High Int.' },
        { id: 'low', label: 'Low Int.' },
    ];

    const colorList = ['#28C76F', '#7367F0', '#FF9F43', '#00CFE8', '#EA5455'];

    const getFilteredRegions = () => {
        if (!regions || regions.length === 0) return [];
        switch (activeTab) {
            case 'high':
                return regions.filter(r => (r.avgIntensity || 0) > 5);
            case 'low':
                return regions.filter(r => (r.avgIntensity || 0) <= 5);
            default:
                return regions;
        }
    };

    const filteredRegions = getFilteredRegions().slice(0, 4);

    const orders = filteredRegions.length > 0
        ? filteredRegions.map((r, index) => ({
            type: (r.avgIntensity || 0) > 5 ? 'HIGH' : 'MEDIUM',
            name: (r._id || 'Unknown Region').length > 25 ? (r._id || 'Unknown Region').substring(0, 25) + '...' : (r._id || 'Unknown Region'),
            address: `${r.count || 0} records | Avg Int: ${(r.avgIntensity || 0).toFixed(1)} | Like: ${(r.avgLikelihood || 0).toFixed(1)}`,
            color: colorList[index % colorList.length]
        }))
        : (data || [{
            type: 'LOADING',
            name: 'Fetching data...',
            address: 'Please wait',
            color: '#7367F0'
        }]);

    const totalRecords = regions.reduce((a, b) => a + (b.count || 0), 0);

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Data by Regions</h3>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{totalRecords.toLocaleString()} total records</p>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-[#7367F0]/10' : 'bg-purple-50'}`}>
                    <Globe className="w-5 h-5 text-[#7367F0]" />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id
                            ? 'bg-[#7367F0]/10 text-[#7367F0] border border-[#7367F0]'
                            : isDark ? 'text-[#A3A4CC] hover:text-white border border-transparent' : 'text-gray-500 hover:text-gray-700 border border-transparent'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.map((order, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="mt-1">
                            <MapPin className="w-4 h-4" style={{ color: order.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium" style={{ color: order.color }}>{order.type}</p>
                            <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>{order.name}</p>
                            <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{order.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersByCountriesCard;
