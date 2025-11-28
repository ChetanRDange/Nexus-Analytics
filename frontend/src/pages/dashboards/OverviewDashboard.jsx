import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../ThemeContext';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, AreaChart, Area, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { TrendingUp, Database, Target, Activity } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#00CFE8', '#9E95F5', '#4BC0C0', '#FF6384'];

const OverviewDashboard = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/dashboard/statistics`);
            if (response.data.success) {
                setStatistics(response.data.data);
            }
        } catch (err) {
            setError('Failed to fetch statistics');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#7367F0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading Overview...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
                <div className={`p-6 rounded-xl ${isDark ? 'bg-[#2F3349]' : 'bg-white'}`}>
                    <p className="text-[#EA5455]">{error}</p>
                    <button onClick={fetchStatistics} className="mt-4 px-4 py-2 bg-[#7367F0] text-white rounded-lg">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const overview = statistics?.overview?.[0] || {};
    const bySector = statistics?.bySector || [];
    const byRegion = statistics?.byRegion || [];
    const byTopic = statistics?.byTopic?.slice(0, 10) || [];
    const byPestle = statistics?.byPestle || [];

    const statCards = [
        { title: 'Total Records', value: overview.totalRecords?.toLocaleString() || '0', icon: Database, color: '#7367F0' },
        { title: 'Avg Intensity', value: overview.avgIntensity?.toFixed(1) || '0', icon: Activity, color: '#28C76F' },
        { title: 'Avg Likelihood', value: overview.avgLikelihood?.toFixed(1) || '0', icon: Target, color: '#FF9F43' },
        { title: 'Avg Relevance', value: overview.avgRelevance?.toFixed(1) || '0', icon: TrendingUp, color: '#00CFE8' },
    ];

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Overview Dashboard</h1>
                    <p className={`text-sm ${isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}`}>Key metrics and statistics from your data</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {statCards.map((stat, index) => (
                        <div key={index} className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                                </div>
                                <div>
                                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{stat.value}</p>
                                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{stat.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Sector Distribution Bar Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Records by Sector
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={bySector.slice(0, 8)} layout="vertical" margin={{ left: 90, right: 15 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} horizontal={false} />
                                    <XAxis type="number" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 11 }} />
                                    <YAxis dataKey="_id" type="category" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 10 }} width={85} tickFormatter={v => v?.length > 12 ? `${v.substring(0, 12)}..` : v} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#7367F0" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* PESTLE Pie Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            PESTLE Distribution
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={byPestle}
                                        dataKey="count"
                                        nameKey="_id"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        label={({ _id, percent }) => `${_id?.substring(0, 6)} (${(percent * 100).toFixed(0)}%)`}
                                        labelLine={{ stroke: isDark ? '#6B6D8C' : '#9ca3af', strokeWidth: 1 }}
                                    >
                                        {byPestle.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Region Distribution */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Records by Region
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={byRegion.slice(0, 8)} margin={{ bottom: 60 }}>
                                    <defs>
                                        <linearGradient id="regionGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7367F0" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#7367F0" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} vertical={false} />
                                    <XAxis dataKey="_id" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 9 }} angle={-45} textAnchor="end" height={60} tickFormatter={v => v?.length > 10 ? `${v.substring(0, 10)}..` : v} />
                                    <YAxis tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 11 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Area type="monotone" dataKey="count" stroke="#7367F0" fill="url(#regionGradient)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Topics Radar */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Top Topics by Intensity
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <RadarChart data={byTopic.slice(0, 6).map(t => ({ ...t, topic: t._id?.substring(0, 10) || 'N/A' }))}>
                                    <PolarGrid stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <PolarAngleAxis dataKey="topic" tick={{ fill: isDark ? '#A3A4CC' : '#6b7280', fontSize: 9 }} />
                                    <PolarRadiusAxis tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 9 }} />
                                    <Radar name="Avg Intensity" dataKey="avgIntensity" stroke="#7367F0" fill="#7367F0" fillOpacity={0.5} />
                                    <Radar name="Avg Relevance" dataKey="avgRelevance" stroke="#28C76F" fill="#28C76F" fillOpacity={0.3} />
                                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Full Width Chart - Sector Intensity Comparison */}
                <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Sector Metrics Comparison
                    </h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={bySector.slice(0, 10)} margin={{ bottom: 70 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} vertical={false} />
                                <XAxis dataKey="_id" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 9 }} angle={-45} textAnchor="end" height={70} tickFormatter={v => v?.length > 8 ? `${v.substring(0, 8)}..` : v} />
                                <YAxis tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 11 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#25293C' : '#fff',
                                        border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                        borderRadius: '8px',
                                        color: isDark ? '#fff' : '#374151'
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '11px' }} />
                                <Bar dataKey="avgIntensity" name="Avg Intensity" fill="#7367F0" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="avgLikelihood" name="Avg Likelihood" fill="#28C76F" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="avgRelevance" name="Avg Relevance" fill="#FF9F43" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewDashboard;
