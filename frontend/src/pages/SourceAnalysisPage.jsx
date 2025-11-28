import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Treemap
} from 'recharts';
import {
    Database, TrendingUp, Zap, Globe, RefreshCw, ExternalLink, BookOpen
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ['#7367F0', '#28C76F', '#FF9F43', '#EA5455', '#00CFE8', '#9E95F5', '#FFE800', '#1E90FF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

const SourceAnalysisPage = () => {
    const { isDark } = useTheme();
    const [data, setData] = useState({
        sources: [],
        stats: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [sourceRes, statsRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/source-distribution?limit=30`),
                axios.get(`${API_URL}/api/dashboard/statistics`)
            ]);

            setData({
                sources: sourceRes.data?.data || [],
                stats: statsRes.data?.data || null
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
        <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{title}</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</p>
                    {subtitle && <p className={`text-xs mt-1 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{subtitle}</p>}
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#7367F0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading Source Analysis...</p>
                </div>
            </div>
        );
    }

    const totalInsights = data.sources.reduce((sum, s) => sum + s.count, 0);
    const sourcesWithPercentage = data.sources.map(s => ({
        ...s,
        percentage: ((s.count / totalInsights) * 100).toFixed(1)
    }));

    const treemapData = sourcesWithPercentage.slice(0, 15).map((s, i) => ({
        name: s.source,
        size: s.count,
        fill: COLORS[i % COLORS.length]
    }));

    const CustomTreemapContent = ({ x, y, width, height, name, fill }) => {
        if (width < 50 || height < 30) return null;
        return (
            <g>
                <rect x={x} y={y} width={width} height={height} fill={fill} stroke={isDark ? '#25293C' : '#fff'} strokeWidth={2} rx={4} />
                <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#fff" fontSize={width > 80 ? 12 : 10} fontWeight="500">
                    {name?.substring(0, width > 80 ? 15 : 8)}
                </text>
            </g>
        );
    };

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Source Analysis</h1>
                        <p className={isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}>Explore data sources and their contributions</p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-2 bg-[#7367F0] text-white rounded-lg hover:bg-[#685DD8] transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard
                        title="Total Sources"
                        value={data.sources.length}
                        subtitle="Unique data sources"
                        icon={Database}
                        color="#7367F0"
                    />
                    <StatCard
                        title="Top Source"
                        value={sourcesWithPercentage[0]?.source || '-'}
                        subtitle={`${sourcesWithPercentage[0]?.count || 0} insights`}
                        icon={TrendingUp}
                        color="#28C76F"
                    />
                    <StatCard
                        title="Top Source Share"
                        value={`${sourcesWithPercentage[0]?.percentage || 0}%`}
                        subtitle="Of all insights"
                        icon={Globe}
                        color="#FF9F43"
                    />
                    <StatCard
                        title="Avg Intensity"
                        value={sourcesWithPercentage[0]?.avgIntensity || '0'}
                        subtitle="For top source"
                        icon={Zap}
                        color="#00CFE8"
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Sources Bar Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Top Sources by Volume</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Most contributing sources</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={sourcesWithPercentage.slice(0, 12)} layout="vertical">
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af' }} />
                                    <YAxis
                                        type="category"
                                        dataKey="source"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: isDark ? '#A3A4CC' : '#6b7280', fontSize: 11 }}
                                        width={120}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: 8,
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                        formatter={(value, name) => [value, name === 'count' ? 'Insights' : name]}
                                    />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                        {sourcesWithPercentage.slice(0, 12).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Source Distribution Pie */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Source Distribution</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Share of insights by source</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={sourcesWithPercentage.slice(0, 8)}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        dataKey="count"
                                        nameKey="source"
                                        label={({ source, percentage }) => `${source?.substring(0, 8)}... ${percentage}%`}
                                    >
                                        {sourcesWithPercentage.slice(0, 8).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: 8
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Treemap */}
                <div className={`rounded-xl p-5 mb-6 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Source Treemap</h3>
                            <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Visual representation by volume</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <Treemap
                                data={treemapData}
                                dataKey="size"
                                stroke={isDark ? '#25293C' : '#fff'}
                                fill="#7367F0"
                                content={<CustomTreemapContent />}
                            />
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sources Grid */}
                <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>All Sources</h3>
                            <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Complete source breakdown</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {sourcesWithPercentage.slice(0, 18).map((source, index) => (
                            <div
                                key={source.source}
                                className={`rounded-xl p-4 text-center transition-all hover:scale-105 ${isDark ? 'bg-[#25293C] hover:bg-[#3B3F5C]' : 'bg-gray-50 hover:bg-gray-100'}`}
                            >
                                <div
                                    className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center"
                                    style={{ backgroundColor: `${COLORS[index % COLORS.length]}20` }}
                                >
                                    <BookOpen className="w-6 h-6" style={{ color: COLORS[index % COLORS.length] }} />
                                </div>
                                <p className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    {source.source}
                                </p>
                                <p className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    {source.count}
                                </p>
                                <p className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>
                                    {source.percentage}% share
                                </p>
                                <div className={`mt-2 text-xs ${isDark ? 'text-[#FF9F43]' : 'text-orange-500'}`}>
                                    Intensity: {source.avgIntensity}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SourceAnalysisPage;
