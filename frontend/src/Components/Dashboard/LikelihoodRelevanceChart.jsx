import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const LikelihoodRelevanceChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalEarning, setTotalEarning] = useState(87);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashboard/likelihood-relevance`);
            const apiData = response.data.success ? response.data.data : [];

            if (apiData.length > 0) {
                // Transform for bar chart display
                const transformedData = apiData.slice(0, 9).map((item, index) => ({
                    name: item.sector?.substring(0, 3) || `S${index}`,
                    fullName: item.sector,
                    value: item.avgLikelihood || 0,
                    relevance: item.avgRelevance || 0,
                    count: item.count
                }));
                setData(transformedData);

                // Calculate percentage based on average
                const avgLikelihood = apiData.reduce((acc, item) => acc + (item.avgLikelihood || 0), 0) / (apiData.length || 1);
                setTotalEarning(Math.min(99, Math.max(50, avgLikelihood * 20)).toFixed(0));
            } else {
                // Sample data
                const sampleData = [
                    { name: 'Jan', fullName: 'January', value: 65, relevance: 45, count: 120 },
                    { name: 'Feb', fullName: 'February', value: 78, relevance: 52, count: 150 },
                    { name: 'Mar', fullName: 'March', value: 55, relevance: 38, count: 90 },
                    { name: 'Apr', fullName: 'April', value: 90, relevance: 65, count: 180 },
                    { name: 'May', fullName: 'May', value: 72, relevance: 48, count: 130 },
                    { name: 'Jun', fullName: 'June', value: 85, relevance: 58, count: 160 },
                    { name: 'Jul', fullName: 'July', value: 68, relevance: 42, count: 110 },
                    { name: 'Aug', fullName: 'August', value: 82, relevance: 55, count: 145 },
                    { name: 'Sep', fullName: 'September', value: 75, relevance: 50, count: 125 },
                ];
                setData(sampleData);
                setTotalEarning('87');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Sample data on error
            const sampleData = [
                { name: 'Jan', fullName: 'January', value: 65, relevance: 45, count: 120 },
                { name: 'Feb', fullName: 'February', value: 78, relevance: 52, count: 150 },
                { name: 'Mar', fullName: 'March', value: 55, relevance: 38, count: 90 },
                { name: 'Apr', fullName: 'April', value: 90, relevance: 65, count: 180 },
                { name: 'May', fullName: 'May', value: 72, relevance: 48, count: 130 },
                { name: 'Jun', fullName: 'June', value: 85, relevance: 58, count: 160 },
                { name: 'Jul', fullName: 'July', value: 68, relevance: 42, count: 110 },
                { name: 'Aug', fullName: 'August', value: 82, relevance: 55, count: 145 },
                { name: 'Sep', fullName: 'September', value: 75, relevance: 50, count: 125 },
            ];
            setData(sampleData);
            setTotalEarning('87');
        } finally {
            setLoading(false);
        }
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-1">{payload[0].payload.fullName}</p>
                    <p className="text-sm text-violet-600">Likelihood: {payload[0].payload.value?.toFixed(2)}</p>
                    <p className="text-sm text-cyan-600">Relevance: {payload[0].payload.relevance?.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Count: {payload[0].payload.count}</p>
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
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Total Earning</h2>
                    <p className="text-sm text-gray-500">Sector Performance</p>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-800">{totalEarning}%</span>
                <span className="px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> 25.8%
                </span>
            </div>

            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} barCategoryGap="25%">
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#9CA3AF' }}
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="value"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={30}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index % 2 === 0 ? '#7C3AED' : '#A78BFA'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LikelihoodRelevanceChart;
