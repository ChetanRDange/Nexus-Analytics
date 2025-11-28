import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MoreVertical } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ['#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#14B8A6'];

const SectorDonut = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashboard/sector-breakdown`);
            const apiData = response.data.success ? response.data.data : [];
            const formattedData = apiData.slice(0, 8).map(item => ({
                name: item._id || item.sector || 'Unknown',
                value: item.count
            }));
            setData(formattedData);
            setTotal(formattedData.reduce((acc, item) => acc + item.value, 0));
        } catch (error) {
            console.error('Error fetching sectors:', error);
            // Set sample data for demo
            const sampleData = [
                { name: 'Energy', value: 150 },
                { name: 'Technology', value: 120 },
                { name: 'Finance', value: 90 },
                { name: 'Healthcare', value: 75 }
            ];
            setData(sampleData);
            setTotal(435);
        } finally {
            setLoading(false);
        }
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
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Revenue Sources</h2>
                    <p className="text-sm text-gray-500">Sector Distribution</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div className="relative" style={{ width: '50%', height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                fill="#8884d8"
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [value, name]}
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold text-gray-800">{total}</span>
                        <span className="text-xs text-gray-500">Total</span>
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    {data.slice(0, 4).map((item, index) => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[index] }}
                                />
                                <span className="text-sm text-gray-600">{item.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectorDonut;
