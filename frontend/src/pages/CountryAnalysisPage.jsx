import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, ComposedChart, Area, Line
} from 'recharts';
import {
    Globe, TrendingUp, Zap, Target, MapPin, RefreshCw, Flag
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ['#7367F0', '#28C76F', '#FF9F43', '#EA5455', '#00CFE8', '#9E95F5', '#FFE800', '#1E90FF', '#FF6B6B', '#4ECDC4'];

// Country to region color mapping
const REGION_COLORS = {
    'Northern America': '#7367F0',
    'Central America': '#28C76F',
    'South America': '#FF9F43',
    'Western Europe': '#00CFE8',
    'Eastern Europe': '#EA5455',
    'Asia': '#9E95F5',
    'Africa': '#FFE800',
    'World': '#1E90FF',
    'default': '#6B6D8C'
};

const CountryAnalysisPage = () => {
    const { isDark } = useTheme();
    const [data, setData] = useState({
        countries: [],
        topCountries: [],
        regionData: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [countryRes, topCountryRes, statsRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/country-analysis?limit=50`),
                axios.get(`${API_URL}/api/dashboard/top-countries?limit=15`),
                axios.get(`${API_URL}/api/dashboard/statistics`)
            ]);

            setData({
                countries: countryRes.data?.data || [],
                topCountries: topCountryRes.data?.data || [],
                regionData: statsRes.data?.data?.byRegion || []
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
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading Country Analysis...</p>
                </div>
            </div>
        );
    }

    const totalInsights = data.countries.reduce((sum, c) => sum + c.count, 0);
    const uniqueRegions = [...new Set(data.countries.map(c => c.region).filter(r => r))].length;

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Geographic Analysis</h1>
                        <p className={isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}>Explore insights by country and region</p>
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
                        title="Total Countries"
                        value={data.countries.length}
                        subtitle="With data insights"
                        icon={Flag}
                        color="#7367F0"
                    />
                    <StatCard
                        title="Regions Covered"
                        value={uniqueRegions}
                        subtitle="Geographic regions"
                        icon={Globe}
                        color="#28C76F"
                    />
                    <StatCard
                        title="Top Country"
                        value={data.topCountries[0]?.country?.substring(0, 15) || '-'}
                        subtitle={`${data.topCountries[0]?.percentage || 0}% of insights`}
                        icon={TrendingUp}
                        color="#FF9F43"
                    />
                    <StatCard
                        title="Avg Intensity"
                        value={data.topCountries[0]?.avgIntensity || '0'}
                        subtitle="For top country"
                        icon={Zap}
                        color="#00CFE8"
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Top Countries Bar Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Top Countries</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>By number of insights</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={data.topCountries.slice(0, 10)} layout="vertical">
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af' }} />
                                    <YAxis
                                        type="category"
                                        dataKey="country"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: isDark ? '#A3A4CC' : '#6b7280', fontSize: 11 }}
                                        width={130}
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
                                        {data.topCountries.slice(0, 10).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Region Distribution */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Regional Distribution</h3>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Insights by region</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={data.regionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        dataKey="count"
                                        nameKey="_id"
                                        label={({ _id, count }) => `${_id?.substring(0, 8) || 'Unknown'}`}
                                    >
                                        {data.regionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={REGION_COLORS[entry._id] || COLORS[index % COLORS.length]} />
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

                {/* Charts Row 2 - Intensity by Country */}
                <div className={`rounded-xl p-5 mb-6 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Country Metrics Comparison</h3>
                            <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Intensity, Likelihood, and Relevance by top countries</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 280 }}>
                        <ResponsiveContainer width="100%" height={280}>
                            <ComposedChart data={data.topCountries.slice(0, 10)}>
                                <XAxis dataKey="country" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#25293C' : '#fff',
                                        border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                        borderRadius: 8
                                    }}
                                />
                                <Bar dataKey="avgIntensity" fill="#7367F0" radius={[4, 4, 0, 0]} name="Intensity" />
                                <Line type="monotone" dataKey="avgLikelihood" stroke="#28C76F" strokeWidth={2} name="Likelihood" dot={{ fill: '#28C76F', r: 4 }} />
                                <Line type="monotone" dataKey="avgRelevance" stroke="#FF9F43" strokeWidth={2} name="Relevance" dot={{ fill: '#FF9F43', r: 4 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Country Cards Grid */}
                <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Country Overview</h3>
                            <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Detailed country breakdown</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {data.countries.slice(0, 16).map((country, index) => (
                            <div
                                key={country.country}
                                className={`rounded-xl p-4 transition-all hover:scale-102 ${isDark ? 'bg-[#25293C] hover:bg-[#3B3F5C]' : 'bg-gray-50 hover:bg-gray-100'}`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                                            style={{ backgroundColor: REGION_COLORS[country.region] || COLORS[index % COLORS.length] }}
                                        >
                                            {country.country?.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                {country.country?.substring(0, 20) || 'Unknown'}
                                            </p>
                                            <p className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>
                                                {country.region || 'Global'}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-[#7367F0]/20 text-[#7367F0]' : 'bg-[#7367F0]/10 text-[#7367F0]'}`}>
                                        {country.percentage}%
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className={`rounded-lg p-2 ${isDark ? 'bg-[#2F3349]' : 'bg-white'}`}>
                                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{country.count}</p>
                                        <p className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Insights</p>
                                    </div>
                                    <div className={`rounded-lg p-2 ${isDark ? 'bg-[#2F3349]' : 'bg-white'}`}>
                                        <p className={`text-lg font-bold text-[#FF9F43]`}>{country.avgIntensity}</p>
                                        <p className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Intensity</p>
                                    </div>
                                    <div className={`rounded-lg p-2 ${isDark ? 'bg-[#2F3349]' : 'bg-white'}`}>
                                        <p className={`text-lg font-bold text-[#28C76F]`}>{country.sectorCount}</p>
                                        <p className={`text-xs ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Sectors</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryAnalysisPage;
