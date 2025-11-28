import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MoreVertical, TrendingUp } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const IntensityBarChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [groupBy, setGroupBy] = useState('topic');
    const [totalEarnings, setTotalEarnings] = useState(0);

    useEffect(() => {
        fetchData();
    }, [groupBy]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashboard/intensity-analysis?groupBy=${groupBy}`);
            const apiData = response.data.success ? response.data.data : {};
            const limitedData = (apiData.analysis || []).slice(0, 7);
            if (limitedData.length > 0) {
                setData(limitedData);
                const total = limitedData.reduce((acc, item) => acc + (item.avgIntensity || 0), 0);
                setTotalEarnings(total.toFixed(0));
            } else {
                // Sample data
                const sampleData = [
                    { _id: 'Mon', avgIntensity: 65, avgLikelihood: 45 },
                    { _id: 'Tue', avgIntensity: 78, avgLikelihood: 52 },
                    { _id: 'Wed', avgIntensity: 55, avgLikelihood: 38 },
                    { _id: 'Thu', avgIntensity: 90, avgLikelihood: 65 },
                    { _id: 'Fri', avgIntensity: 72, avgLikelihood: 48 },
                    { _id: 'Sat', avgIntensity: 85, avgLikelihood: 58 },
                    { _id: 'Sun', avgIntensity: 68, avgLikelihood: 42 },
                ];
                setData(sampleData);
                setTotalEarnings('468');
            }
        } catch (error) {
            console.error('Error fetching intensity data:', error);
            const sampleData = [
                { _id: 'Mon', avgIntensity: 65, avgLikelihood: 45 },
                { _id: 'Tue', avgIntensity: 78, avgLikelihood: 52 },
                { _id: 'Wed', avgIntensity: 55, avgLikelihood: 38 },
                { _id: 'Thu', avgIntensity: 90, avgLikelihood: 65 },
                { _id: 'Fri', avgIntensity: 72, avgLikelihood: 48 },
                { _id: 'Sat', avgIntensity: 85, avgLikelihood: 58 },
                { _id: 'Sun', avgIntensity: 68, avgLikelihood: 42 },
            ];
            setData(sampleData);
            setTotalEarnings('468');
        } finally {
            setLoading(false);
        }
    };

    const getBarColor = (index) => {
        const colors = ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE', '#F5F3FF'];
        return colors[index % colors.length];
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-1">{label}</p>
                    {payload.map((item, idx) => (
                        <p key={idx} className="text-sm" style={{ color: item.color }}>
                            {item.name}: {item.value?.toFixed(2)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Earning Reports</h2>
                    <p className="text-sm text-gray-500">Weekly Intensity Overview</p>
                </div>
                <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                >
                    <option value="topic">By Topic</option>
                    <option value="sector">By Sector</option>
                    <option value="region">By Region</option>
                    <option value="country">By Country</option>
                </select>
            </div>

            <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl font-bold text-gray-800">${totalEarnings}</span>
                <span className="px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +4.2%
                </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">You informed of this week compared to last week</p>

            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="_id"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9CA3AF' }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="avgIntensity"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={40}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                        <span className="text-violet-600">$</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Earnings</p>
                        <p className="font-semibold text-gray-800">${(totalEarnings * 1.16).toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <span className="text-green-600">$</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Profit</p>
                        <p className="font-semibold text-gray-800">${(totalEarnings * 0.55).toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                        <span className="text-red-600">$</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Expense</p>
                        <p className="font-semibold text-gray-800">${(totalEarnings * 0.16).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntensityBarChart;
