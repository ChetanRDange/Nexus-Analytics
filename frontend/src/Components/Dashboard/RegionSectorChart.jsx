import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { MoreVertical } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ['#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

const RegionSectorChart = () => {
    const [data, setData] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashboard/region-sector`);
            const rawData = response.data.success ? response.data.data : [];

            if (rawData.length > 0) {
                // Get unique sectors
                const allSectors = [...new Set(rawData.flatMap(item => item.sectors.map(s => s.name || s.sector)))];
                setSectors(allSectors);

                // Format data for stacked bar - limit to 6 regions
                const formattedData = rawData.slice(0, 6).map(item => {
                    const regionData = { region: item.region || item._id };
                    item.sectors.forEach(s => {
                        regionData[s.name || s.sector] = s.count;
                    });
                    return regionData;
                });

                setData(formattedData);
            } else {
                // Sample data
                const sampleSectors = ['Energy', 'Technology', 'Finance', 'Healthcare'];
                setSectors(sampleSectors);
                const sampleData = [
                    { region: 'North America', Energy: 45, Technology: 65, Finance: 35, Healthcare: 28 },
                    { region: 'Europe', Energy: 38, Technology: 52, Finance: 48, Healthcare: 32 },
                    { region: 'Asia', Energy: 55, Technology: 78, Finance: 42, Healthcare: 38 },
                    { region: 'South America', Energy: 28, Technology: 35, Finance: 25, Healthcare: 18 },
                    { region: 'Africa', Energy: 32, Technology: 28, Finance: 22, Healthcare: 15 },
                ];
                setData(sampleData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Sample data on error
            const sampleSectors = ['Energy', 'Technology', 'Finance', 'Healthcare'];
            setSectors(sampleSectors);
            const sampleData = [
                { region: 'North America', Energy: 45, Technology: 65, Finance: 35, Healthcare: 28 },
                { region: 'Europe', Energy: 38, Technology: 52, Finance: 48, Healthcare: 32 },
                { region: 'Asia', Energy: 55, Technology: 78, Finance: 42, Healthcare: 38 },
                { region: 'South America', Energy: 28, Technology: 35, Finance: 25, Healthcare: 18 },
                { region: 'Africa', Energy: 32, Technology: 28, Finance: 22, Healthcare: 15 },
            ];
            setData(sampleData);
        } finally {
            setLoading(false);
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-2">{label}</p>
                    {payload.map((item, idx) => (
                        <p key={idx} className="text-sm flex items-center gap-2" style={{ color: item.color }}>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                            {item.name}: {item.value}
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
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Region-Sector Distribution</h2>
                    <p className="text-sm text-gray-500">Regional breakdown by sectors</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="region"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#9CA3AF' }}
                        interval={0}
                        angle={-30}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#9CA3AF' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                        iconSize={8}
                    />
                    {sectors.slice(0, 6).map((sector, index) => (
                        <Bar
                            key={sector}
                            dataKey={sector}
                            stackId="a"
                            fill={COLORS[index % COLORS.length]}
                            radius={index === sectors.slice(0, 6).length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RegionSectorChart;
