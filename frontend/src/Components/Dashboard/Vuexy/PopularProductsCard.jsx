import React from 'react';
import { Database, FileText } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const PopularProductsCard = ({ data, sources = [] }) => {
    const { isDark } = useTheme();

    const sourceIcons = ['📰', '📊', '💻', '🌐', '📈'];

    const products = sources && sources.length > 0
        ? sources.slice(0, 4).map((s, index) => ({
            icon: sourceIcons[index % sourceIcons.length],
            name: (s._id || 'Unknown Source').length > 20 ? (s._id || 'Unknown Source').substring(0, 20) + '...' : (s._id || 'Unknown Source'),
            item: `${s.count || 0} articles`,
            price: `Int: ${(s.avgIntensity || 0).toFixed(1)}`
        }))
        : (data || [
            {
                icon: '📰',
                name: 'Loading...',
                item: 'Fetching data',
                price: '-'
            },
        ]);

    const totalRecords = sources.reduce((a, b) => a + (b.count || 0), 0);

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Top Sources</h3>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Total {totalRecords.toLocaleString()} records</p>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00CFE8]/10' : 'bg-cyan-50'}`}>
                    <Database className="w-5 h-5 text-[#00CFE8]" />
                </div>
            </div>

            <div className="space-y-4">
                {products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
                                {product.icon}
                            </div>
                            <div>
                                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{product.name}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{product.item}</p>
                            </div>
                        </div>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{product.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularProductsCard;
