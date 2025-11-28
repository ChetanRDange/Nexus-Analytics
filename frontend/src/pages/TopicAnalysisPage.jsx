import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Treemap, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend
} from 'recharts';
import {
    Target, TrendingUp, Zap, Globe, Layers, RefreshCw, MoreVertical
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ['#7367F0', '#28C76F', '#FF9F43', '#EA5455', '#00CFE8', '#9E95F5', '#FFE800', '#1E90FF', '#FF6B6B', '#4ECDC4'];

const TopicAnalysisPage = () => {
    const { isDark } = useTheme();
    const [data, setData] = useState({
        topics: [],
        stats: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [topicRes, statsRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/topic-analysis?limit=30`),
                axios.get(`${API_URL}/api/dashboard/statistics`)
            ]);

            setData({
                topics: topicRes.data?.data || [],
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
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading Topic Analysis...</p>
                </div>
            </div>
        );
    }

    const topTopics = data.topics.slice(0, 10);
    const treemapData = data.topics.slice(0, 15).map((t, i) => ({
        name: t.topic,
        size: t.count,
        fill: COLORS[i % COLORS.length]
    }));

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Topic Analysis</h1>
                        <p className={isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}>Explore insights by topic categories</p>
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
                        title="Total Topics"
                        value={data.topics.length}
                        subtitle="Unique topics identified"
                        icon={Target}
                        color="#7367F0"
                    />
                    <StatCard
                        title="Top Topic"
                        value={topTopics[0]?.topic || '-'}
                        subtitle={`${topTopics[0]?.count || 0} insights`}
                        icon={TrendingUp}
                        color="#28C76F"
                    />
                    <StatCard
                        title="Avg Intensity"
                        value={topTopics[0]?.avgIntensity || '0'}
                        subtitle="For top topic"
                        icon={Zap}
                        color="#FF9F43"
                    />
                    <StatCard
                        title="Coverage"
                        value={`${data.topics.reduce((sum, t) => sum + parseInt(t.sectorCount || 0), 0)}`}
                        subtitle="Sector connections"
                        icon={Layers}
                        color="#00CFE8"
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Top Topics Bar Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Top Topics by Volume</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Most discussed topics</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={topTopics} layout="vertical">
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af' }} />
                                    <YAxis
                                        type="category"
                                        dataKey="topic"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: isDark ? '#A3A4CC' : '#6b7280', fontSize: 12 }}
                                        width={100}
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
                                        {topTopics.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Topic Distribution Pie */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Topic Distribution</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Share of insights by topic</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={topTopics.slice(0, 8)}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={95}
                                        paddingAngle={2}
                                        dataKey="count"
                                        nameKey="topic"
                                        label={({ topic, percentage }) => `${topic?.substring(0, 6)}... ${percentage}%`}
                                    >
                                        {topTopics.slice(0, 8).map((entry, index) => (
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

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Intensity by Topic */}
                    <div className={`rounded-xl p-5 lg:col-span-2 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Intensity by Topic</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Average intensity scores</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={topTopics}>
                                    <XAxis dataKey="topic" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: 8
                                        }}
                                    />
                                    <Bar dataKey="avgIntensity" fill="#7367F0" radius={[4, 4, 0, 0]} name="Avg Intensity" />
                                    <Bar dataKey="avgRelevance" fill="#00CFE8" radius={[4, 4, 0, 0]} name="Avg Relevance" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Topic Radar */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Top 6 Comparison</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Multi-metric view</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart data={topTopics.slice(0, 6)}>
                                    <PolarGrid stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <PolarAngleAxis dataKey="topic" tick={{ fill: isDark ? '#A3A4CC' : '#6b7280', fontSize: 10 }} />
                                    <Radar name="Intensity" dataKey="avgIntensity" stroke="#7367F0" fill="#7367F0" fillOpacity={0.3} />
                                    <Radar name="Relevance" dataKey="avgRelevance" stroke="#28C76F" fill="#28C76F" fillOpacity={0.3} />
                                    <Legend formatter={(value) => <span style={{ color: isDark ? '#A3A4CC' : '#6b7280' }}>{value}</span>} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Topics Table */}
                <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <div className={`px-5 py-4 border-b ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                        <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>All Topics Overview</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={isDark ? 'bg-[#25293C]' : 'bg-gray-50'}>
                                    <th className={`px-5 py-3 text-left text-xs font-semibold uppercase ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>#</th>
                                    <th className={`px-5 py-3 text-left text-xs font-semibold uppercase ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Topic</th>
                                    <th className={`px-5 py-3 text-center text-xs font-semibold uppercase ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Insights</th>
                                    <th className={`px-5 py-3 text-center text-xs font-semibold uppercase ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Share</th>
                                    <th className={`px-5 py-3 text-center text-xs font-semibold uppercase ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Intensity</th>
                                    <th className={`px-5 py-3 text-center text-xs font-semibold uppercase ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Likelihood</th>
                                    <th className={`px-5 py-3 text-center text-xs font-semibold uppercase ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Relevance</th>
                                    <th className={`px-5 py-3 text-center text-xs font-semibold uppercase ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Sectors</th>
                                    <th className={`px-5 py-3 text-center text-xs font-semibold uppercase ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Regions</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDark ? 'divide-[#3B3F5C]' : 'divide-gray-200'}`}>
                                {data.topics.slice(0, 20).map((topic, index) => (
                                    <tr key={topic.topic} className={`${isDark ? 'hover:bg-[#25293C]' : 'hover:bg-gray-50'} transition-colors`}>
                                        <td className={`px-5 py-3 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{index + 1}</td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                                                    {topic.topic?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{topic.topic}</span>
                                            </div>
                                        </td>
                                        <td className={`px-5 py-3 text-center font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{topic.count}</td>
                                        <td className="px-5 py-3 text-center">
                                            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${isDark ? 'bg-[#7367F0]/20 text-[#7367F0]' : 'bg-[#7367F0]/10 text-[#7367F0]'}`}>
                                                {topic.percentage}%
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${isDark ? 'bg-[#FF9F43]/20 text-[#FF9F43]' : 'bg-[#FF9F43]/10 text-[#FF9F43]'}`}>
                                                {topic.avgIntensity}
                                            </span>
                                        </td>
                                        <td className={`px-5 py-3 text-center ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>{topic.avgLikelihood}</td>
                                        <td className={`px-5 py-3 text-center ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>{topic.avgRelevance}</td>
                                        <td className={`px-5 py-3 text-center ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>{topic.sectorCount}</td>
                                        <td className={`px-5 py-3 text-center ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>{topic.regionCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicAnalysisPage;
