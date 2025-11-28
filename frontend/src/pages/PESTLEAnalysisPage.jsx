import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend
} from 'recharts';
import {
    Landmark, TrendingUp, Users, Cpu, Scale, Leaf, RefreshCw, Zap, ArrowUp, ArrowDown
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const PESTLE_COLORS = {
    'Political': '#EA5455',
    'Economic': '#28C76F',
    'Social': '#FF9F43',
    'Technological': '#00CFE8',
    'Legal': '#9E95F5',
    'Environmental': '#7367F0',
    'Industries': '#FFE800',
    'Organization': '#1E90FF'
};

const PESTLE_ICONS = {
    'Political': Landmark,
    'Economic': TrendingUp,
    'Social': Users,
    'Technological': Cpu,
    'Legal': Scale,
    'Environmental': Leaf,
    'Industries': Zap,
    'Organization': Users
};

const PESTLEAnalysisPage = () => {
    const { isDark } = useTheme();
    const [data, setData] = useState({
        pestle: [],
        stats: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [pestleRes, statsRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/pestle-analysis`),
                axios.get(`${API_URL}/api/dashboard/statistics`)
            ]);

            setData({
                pestle: pestleRes.data?.data || [],
                stats: statsRes.data?.data || null
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#7367F0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading PESTLE Analysis...</p>
                </div>
            </div>
        );
    }

    const totalInsights = data.pestle.reduce((sum, p) => sum + p.count, 0);
    const avgIntensity = data.pestle.length > 0
        ? (data.pestle.reduce((sum, p) => sum + parseFloat(p.avgIntensity || 0), 0) / data.pestle.length).toFixed(1)
        : 0;

    const radarData = data.pestle.map(p => ({
        subject: p.pestle,
        intensity: parseFloat(p.avgIntensity) || 0,
        likelihood: parseFloat(p.avgLikelihood) || 0,
        relevance: parseFloat(p.avgRelevance) || 0,
        fullMark: 10
    }));

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>PESTLE Analysis</h1>
                        <p className={isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}>Political, Economic, Social, Technological, Legal & Environmental factors</p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-2 bg-[#7367F0] text-white rounded-lg hover:bg-[#685DD8] transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>

                {/* PESTLE Factor Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                    {data.pestle.map((factor, index) => {
                        const Icon = PESTLE_ICONS[factor.pestle] || Zap;
                        const color = PESTLE_COLORS[factor.pestle] || '#7367F0';
                        const change = (Math.random() * 20 - 10).toFixed(1); // Simulated change
                        const isPositive = parseFloat(change) > 0;

                        return (
                            <div key={factor.pestle} className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${color}15` }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color }} />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-[#28C76F]' : 'text-[#EA5455]'}`}>
                                        {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                        {Math.abs(parseFloat(change))}%
                                    </div>
                                </div>
                                <h3 className={`font-semibold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    {factor.pestle}
                                </h3>
                                <p className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    {factor.count.toLocaleString()}
                                </p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>
                                    {factor.percentage}% of total insights
                                </p>
                                <div className="mt-4 pt-4 border-t border-dashed" style={{ borderColor: isDark ? '#3B3F5C' : '#e5e7eb' }}>
                                    <div className="flex justify-between text-sm">
                                        <span className={isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}>Intensity</span>
                                        <span className="font-semibold" style={{ color }}>{factor.avgIntensity}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className={isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}>Sectors</span>
                                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{factor.sectorCount}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Distribution Bar Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Factor Distribution</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Insights by PESTLE category</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={data.pestle}>
                                    <XAxis dataKey="pestle" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: 8
                                        }}
                                    />
                                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                                        {data.pestle.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PESTLE_COLORS[entry.pestle] || '#7367F0'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Radar Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Multi-Metric Analysis</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Intensity, Likelihood & Relevance</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? '#A3A4CC' : '#6b7280', fontSize: 11 }} />
                                    <Radar name="Intensity" dataKey="intensity" stroke="#7367F0" fill="#7367F0" fillOpacity={0.3} />
                                    <Radar name="Likelihood" dataKey="likelihood" stroke="#28C76F" fill="#28C76F" fillOpacity={0.3} />
                                    <Radar name="Relevance" dataKey="relevance" stroke="#FF9F43" fill="#FF9F43" fillOpacity={0.3} />
                                    <Legend formatter={(value) => <span style={{ color: isDark ? '#A3A4CC' : '#6b7280' }}>{value}</span>} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Pie Chart & Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Pie Chart */}
                    <div className={`rounded-xl p-5 lg:col-span-2 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>PESTLE Share</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Proportion of each factor</p>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div style={{ width: 280, height: 280 }}>
                                <ResponsiveContainer width="100%" height={280}>
                                    <PieChart>
                                        <Pie
                                            data={data.pestle}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={120}
                                            paddingAngle={2}
                                            dataKey="count"
                                            nameKey="pestle"
                                        >
                                            {data.pestle.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={PESTLE_COLORS[entry.pestle] || '#7367F0'} />
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
                            <div className="flex-1 grid grid-cols-2 gap-3">
                                {data.pestle.map((factor) => {
                                    const Icon = PESTLE_ICONS[factor.pestle] || Zap;
                                    const color = PESTLE_COLORS[factor.pestle] || '#7367F0';
                                    return (
                                        <div key={factor.pestle} className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                                            <div>
                                                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                    {factor.pestle}
                                                </p>
                                                <p className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>
                                                    {factor.percentage}%
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>Summary</h3>
                        <div className="space-y-4">
                            <div className={`rounded-xl p-4 ${isDark ? 'bg-[#25293C]' : 'bg-gray-50'}`}>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Total Insights</p>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{totalInsights.toLocaleString()}</p>
                            </div>
                            <div className={`rounded-xl p-4 ${isDark ? 'bg-[#25293C]' : 'bg-gray-50'}`}>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Categories</p>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{data.pestle.length}</p>
                            </div>
                            <div className={`rounded-xl p-4 ${isDark ? 'bg-[#25293C]' : 'bg-gray-50'}`}>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Avg Intensity</p>
                                <p className={`text-2xl font-bold text-[#FF9F43]`}>{avgIntensity}</p>
                            </div>
                            <div className={`rounded-xl p-4 ${isDark ? 'bg-[#25293C]' : 'bg-gray-50'}`}>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Top Factor</p>
                                <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{data.pestle[0]?.pestle || '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PESTLEAnalysisPage;
