import React from 'react';

const MetricCard = ({ title, value, icon, trend, trendUp, subtitle, gradient = 'from-violet-500 to-purple-600' }) => {
    const gradients = {
        purple: 'from-violet-500 to-purple-600',
        blue: 'from-blue-500 to-cyan-500',
        green: 'from-emerald-500 to-teal-500',
        orange: 'from-orange-400 to-amber-500',
        pink: 'from-pink-500 to-rose-500',
        indigo: 'from-indigo-500 to-blue-600',
    };

    const selectedGradient = gradients[gradient] || gradient;

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className={`bg-gradient-to-r ${selectedGradient} p-4`}>
                <div className="flex items-center justify-between">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <span className="text-white">{icon}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                        {trendUp ? '↑' : '↓'} {trend}
                    </span>
                </div>
            </div>
            <div className="p-4">
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <h3 className="text-gray-500 text-sm font-medium mt-1">{title}</h3>
                {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
            </div>
        </div>
    );
};

export default MetricCard;
