import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { TrendingUp, ShoppingCart, Eye } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const SalesOverview = () => {
    const [stats, setStats] = useState({
        totalSales: 42500,
        orders: 62.2,
        visits: 25.5
    });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashboard/statistics`);
            const apiData = response.data.success ? response.data.data : {};

            setStats({
                totalSales: (apiData.totalRecords * 42.5).toFixed(0),
                orders: ((apiData.avgIntensity || 6) * 10).toFixed(1),
                visits: ((apiData.avgLikelihood || 2.5) * 10).toFixed(1)
            });

            // Generate sample line data
            const sampleData = Array.from({ length: 7 }, (_, i) => ({
                day: i,
                value: Math.random() * 50 + 30
            }));
            setChartData(sampleData);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 h-[200px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold text-gray-800">${Number(stats.totalSales).toLocaleString()}</span>
                        <span className="px-2 py-0.5 text-xs font-semibold text-green-600 bg-green-100 rounded-full">
                            +18.2%
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Order</p>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-gray-800">{stats.orders}%</span>
                            <span className="text-xs text-gray-400">vs</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                        <Eye className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Visits</p>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-gray-800">{stats.visits}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
                        style={{ width: `${Math.min(stats.orders, 100)}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SalesOverview;
