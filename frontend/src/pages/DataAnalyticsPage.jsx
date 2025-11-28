import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar,
    PolarGrid, PolarAngleAxis, Legend
} from 'recharts';
import {
    Database, Calendar, Zap, TrendingUp,
    Filter, Download, RefreshCw, MoreVertical, ArrowUp, ArrowDown, Target
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ['#7367F0', '#28C76F', '#FF9F43', '#EA5455', '#00CFE8', '#9E95F5', '#FFE800', '#1E90FF'];

const DataAnalyticsPage = () => {
    const { isDark } = useTheme();
    const [data, setData] = useState({
        byRegion: [],
        bySector: [],
        byTopic: [],
        bySource: [],
        byPestle: [],
        byCountry: [],
        timeline: [],
        statistics: {}
    });
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [statsRes, sectorRes, sourceRes, timelineRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/statistics`),
                axios.get(`${API_URL}/api/dashboard/sector-breakdown`),
                axios.get(`${API_URL}/api/dashboard/source-distribution`),
                axios.get(`${API_URL}/api/dashboard/timeline`),
            ]);

            const stats = statsRes.data?.data || {};

            setData({
                byRegion: stats.byRegion || [],
                bySector: sectorRes.data?.data || stats.bySector || [],
                byPestle: stats.byPestle || [],
                bySource: sourceRes.data?.data || [],
                byTopic: stats.byTopic || [],
                statistics: {
                    totalRecords: stats.totalRecords || 0,
                    avgIntensity: stats.avgIntensity || 0,
                    avgLikelihood: stats.avgLikelihood || 0,
                    avgRelevance: stats.avgRelevance || 0,
                },
                timeline: timelineRes.data?.data?.timeline || stats.byYear || [],
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, change, icon: Icon, color }) => (
        <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{title}</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</p>
                    {change && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${change > 0 ? 'text-[#28C76F]' : 'text-[#EA5455]'}`}>
                            {change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                            {Math.abs(change)}%
                        </div>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#7367F0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading Analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Data Analytics</h1>
                        <p className={isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}>Comprehensive insights from your data</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark ? 'bg-[#2F3349] text-[#A3A4CC] hover:bg-[#3B3F5C]' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'}`}>
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark ? 'bg-[#2F3349] text-[#A3A4CC] hover:bg-[#3B3F5C]' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'}`}>
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button
                            onClick={fetchAllData}
                            className="flex items-center gap-2 px-4 py-2 bg-[#7367F0] text-white rounded-lg hover:bg-[#685DD8] transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard
                        title="Total Records"
                        value={data.statistics.totalRecords?.toLocaleString() || '0'}
                        change={12.5}
                        icon={Database}
                        color="#7367F0"
                    />
                    <StatCard
                        title="Avg Intensity"
                        value={data.statistics.avgIntensity?.toFixed(1) || '0'}
                        change={8.2}
                        icon={Zap}
                        color="#FF9F43"
                    />
                    <StatCard
                        title="Avg Likelihood"
                        value={data.statistics.avgLikelihood?.toFixed(1) || '0'}
                        change={-3.1}
                        icon={Target}
                        color="#28C76F"
                    />
                    <StatCard
                        title="Avg Relevance"
                        value={data.statistics.avgRelevance?.toFixed(1) || '0'}
                        change={5.7}
                        icon={TrendingUp}
                        color="#00CFE8"
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Region Distribution */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Region Distribution</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Data by geographic regions</p>
                            </div>
                            <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-[#3B3F5C]' : 'hover:bg-gray-100'}`}>
                                <MoreVertical className={`w-5 h-5 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-400'}`} />
                            </button>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={data.byRegion.slice(0, 8)} layout="vertical">
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af' }} />
                                    <YAxis
                                        type="category"
                                        dataKey="_id"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: isDark ? '#A3A4CC' : '#6b7280', fontSize: 12 }}
                                        width={120}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: 8,
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#7367F0" radius={[0, 4, 4, 0]}>
                                        {data.byRegion.slice(0, 8).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Sector Distribution */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Sector Distribution</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Data by industry sectors</p>
                            </div>
                            <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-[#3B3F5C]' : 'hover:bg-gray-100'}`}>
                                <MoreVertical className={`w-5 h-5 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-400'}`} />
                            </button>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={data.bySector.slice(0, 6)}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        dataKey="count"
                                        nameKey="_id"
                                    >
                                        {data.bySector.slice(0, 6).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: 8,
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        formatter={(value) => <span style={{ color: isDark ? '#A3A4CC' : '#6b7280' }}>{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* PESTLE Analysis */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>PESTLE Analysis</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Factor intensity overview</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <RadarChart data={data.byPestle}>
                                    <PolarGrid stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <PolarAngleAxis dataKey="_id" tick={{ fill: isDark ? '#A3A4CC' : '#6b7280', fontSize: 11 }} />
                                    <Radar
                                        name="Intensity"
                                        dataKey="avgIntensity"
                                        stroke="#7367F0"
                                        fill="#7367F0"
                                        fillOpacity={0.3}
                                    />
                                    <Radar
                                        name="Count"
                                        dataKey="count"
                                        stroke="#00CFE8"
                                        fill="#00CFE8"
                                        fillOpacity={0.3}
                                    />
                                    <Legend formatter={(value) => <span style={{ color: isDark ? '#A3A4CC' : '#6b7280' }}>{value}</span>} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Timeline Trend */}
                    <div className={`rounded-xl p-5 lg:col-span-2 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Timeline Trend</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Data trends over time</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={data.timeline}>
                                    <defs>
                                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7367F0" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#7367F0" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: 8,
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#7367F0"
                                        strokeWidth={2}
                                        fill="url(#colorCount)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Source Distribution */}
                <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Top Data Sources</h3>
                            <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Distribution by source</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {data.bySource.slice(0, 10).map((source, index) => (
                            <div key={source._id || index} className={`rounded-lg p-4 text-center ${isDark ? 'bg-[#25293C]' : 'bg-gray-50'}`}>
                                <div
                                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                >
                                    {source._id?.charAt(0) || '?'}
                                </div>
                                <p className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>{source._id || 'Unknown'}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{source.count} records</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataAnalyticsPage;
