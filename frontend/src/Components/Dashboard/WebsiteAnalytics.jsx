import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL;

const WebsiteAnalytics = () => {
    const [stats, setStats] = useState({
        conversionRate: 28.5,
        sources: [
            { name: 'Direct', value: 268, color: '#7C3AED' },
            { name: 'Organic', value: 890, color: '#06B6D4' },
            { name: 'Referral', value: 622, color: '#10B981' },
            { name: 'Campaign', value: 1200, color: '#F59E0B' },
        ]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashboard/statistics`);
            const apiData = response.data.success ? response.data.data : {};

            const total = apiData.totalRecords || 1000;
            setStats({
                conversionRate: ((apiData.avgIntensity || 2.85) * 10).toFixed(1),
                sources: [
                    { name: 'Direct', value: Math.round(total * 0.27), color: '#7C3AED' },
                    { name: 'Organic', value: Math.round(total * 0.89), color: '#06B6D4' },
                    { name: 'Referral', value: Math.round(total * 0.62), color: '#10B981' },
                    { name: 'Campaign', value: Math.round(total * 1.2), color: '#F59E0B' },
                ]
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl shadow-sm p-6 h-[320px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 text-white overflow-hidden relative">
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10"></div>
            <div className="absolute -right-5 top-20 w-20 h-20 rounded-full bg-white/10"></div>

            <div className="relative z-10">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Website Analytics</h2>
                    <p className="text-sm text-violet-200">Total {stats.conversionRate}% Conversion Rate</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-sm font-medium text-violet-200 mb-3">Revenue Sources</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {stats.sources.map((source, index) => (
                            <div key={source.name} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: source.color }}
                                />
                                <span className="text-sm">{source.value}</span>
                                <span className="text-sm text-violet-200">{source.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end -mr-6 -mb-6" style={{ width: 150, height: 150 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={stats.sources}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={60}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {stats.sources.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default WebsiteAnalytics;
