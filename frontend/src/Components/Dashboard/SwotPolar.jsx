import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MoreVertical, CheckCircle, AlertTriangle, TrendingUp, Shield } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const SWOT_CONFIG = {
    'Strength': { color: '#10B981', icon: CheckCircle, bgColor: 'bg-emerald-100', textColor: 'text-emerald-600' },
    'Weakness': { color: '#EF4444', icon: AlertTriangle, bgColor: 'bg-red-100', textColor: 'text-red-600' },
    'Opportunity': { color: '#7C3AED', icon: TrendingUp, bgColor: 'bg-violet-100', textColor: 'text-violet-600' },
    'Threat': { color: '#F59E0B', icon: Shield, bgColor: 'bg-amber-100', textColor: 'text-amber-600' },
};

const SwotPolar = () => {
    const [data, setData] = useState([
        { name: 'Strength', value: 120, color: '#10B981' },
        { name: 'Weakness', value: 80, color: '#EF4444' },
        { name: 'Opportunity', value: 150, color: '#7C3AED' },
        { name: 'Threat', value: 60, color: '#F59E0B' },
    ]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(410);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashboard/swot-analysis`);
            const apiData = response.data.success ? response.data.data : {};
            const swotArray = apiData.details || [];
            if (swotArray.length > 0) {
                const formattedData = swotArray.map(item => ({
                    name: item.type,
                    value: item.count,
                    color: SWOT_CONFIG[item.type]?.color || '#6B7280'
                }));
                setData(formattedData);
                setTotal(formattedData.reduce((acc, item) => acc + item.value, 0));
            }
        } catch (error) {
            console.error('Error fetching SWOT data:', error);
            // Keep default sample data
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">SWOT Analysis</h2>
                    <p className="text-sm text-gray-500">Strategic breakdown</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative flex-shrink-0" style={{ width: 160, height: 160 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={70}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xl font-bold text-gray-800">{total}</span>
                        <span className="text-xs text-gray-500">Total</span>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-3">
                    {data.map((item) => {
                        const config = SWOT_CONFIG[item.name] || { bgColor: 'bg-gray-100', textColor: 'text-gray-600', icon: CheckCircle };
                        const IconComponent = config.icon || CheckCircle;
                        return (
                            <div key={item.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.bgColor}`}>
                                    <IconComponent className={`w-5 h-5 ${config.textColor}`} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">{item.name}</p>
                                    <p className="font-semibold text-gray-800">{item.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SwotPolar;
