import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { MoreVertical } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ['#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#14B8A6'];

const CustomizedContent = ({ x, y, width, height, index, name, value }) => {
    if (width < 4 || height < 4) return null;

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: COLORS[index % COLORS.length],
                    stroke: '#fff',
                    strokeWidth: 2,
                    rx: 4,
                    ry: 4,
                }}
            />
            {width > 60 && height > 40 && (
                <>
                    <text
                        x={x + width / 2}
                        y={y + height / 2 - 8}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize={12}
                        fontWeight="600"
                    >
                        {name?.length > 15 ? name.substring(0, 12) + '...' : name}
                    </text>
                    <text
                        x={x + width / 2}
                        y={y + height / 2 + 12}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.8)"
                        fontSize={11}
                    >
                        {value}
                    </text>
                </>
            )}
        </g>
    );
};

const SourceTreeMap = () => {
    const [data, setData] = useState([
        { name: 'EIA', value: 120, size: 120 },
        { name: 'Reuters', value: 95, size: 95 },
        { name: 'Bloomberg', value: 85, size: 85 },
        { name: 'OPEC', value: 72, size: 72 },
        { name: 'IEA', value: 65, size: 65 },
        { name: 'WSJ', value: 58, size: 58 },
        { name: 'NYTimes', value: 48, size: 48 },
        { name: 'BBC', value: 42, size: 42 },
    ]);
    const [loading, setLoading] = useState(true);
    const [topSources, setTopSources] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashboard/source-distribution`);
            const apiData = response.data.success ? response.data.data : [];
            if (apiData.length > 0) {
                const formattedData = apiData.map(item => ({
                    name: item.source || item._id || 'Unknown',
                    value: item.count,
                    size: item.count
                }));
                setData(formattedData);
                setTopSources(formattedData.slice(0, 5));
            } else {
                // Keep default sample data
                setTopSources(data.slice(0, 5));
            }
        } catch (error) {
            console.error('Error fetching source data:', error);
            // Keep default sample data
            setTopSources(data.slice(0, 5));
        } finally {
            setLoading(false);
        }
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800">{payload[0].payload.name}</p>
                    <p className="text-sm text-gray-600">Count: {payload[0].payload.value}</p>
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
                    <h2 className="text-lg font-semibold text-gray-800">Source Distribution</h2>
                    <p className="text-sm text-gray-500">Data sources breakdown</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            <ResponsiveContainer width="100%" height={250}>
                <Treemap
                    data={data}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomizedContent />}
                >
                    <Tooltip content={<CustomTooltip />} />
                </Treemap>
            </ResponsiveContainer>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-3">
                    {topSources.map((source, index) => (
                        <div
                            key={source.name}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-sm"
                        >
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-gray-700">{source.name?.substring(0, 20)}</span>
                            <span className="text-gray-400 text-xs">({source.value})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SourceTreeMap;
