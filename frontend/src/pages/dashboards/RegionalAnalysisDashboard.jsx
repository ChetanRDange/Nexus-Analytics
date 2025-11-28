import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../ThemeContext';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, ScatterChart, Scatter, ZAxis, AreaChart, Area
} from 'recharts';
import { Globe, MapPin, TrendingUp, Users } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#00CFE8', '#9E95F5', '#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56'];

const RegionalAnalysisDashboard = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [countryData, setCountryData] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const [, setRegionSectorData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [countryRes, statsRes, regionSectorRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/top-countries?limit=20`),
                axios.get(`${API_URL}/api/dashboard/statistics`),
                axios.get(`${API_URL}/api/dashboard/region-sector`)
            ]);

            if (countryRes.data.success) {
                setCountryData(countryRes.data.data);
            }
            if (statsRes.data.success) {
                setRegionData(statsRes.data.data.byRegion || []);
            }
            if (regionSectorRes.data.success) {
                setRegionSectorData(regionSectorRes.data.data);
            }
        } catch (err) {
            setError('Failed to fetch regional data');
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
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading Regional Analysis...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
                <div className={`p-6 rounded-xl ${isDark ? 'bg-[#2F3349]' : 'bg-white'}`}>
                    <p className="text-[#EA5455]">{error}</p>
                    <button onClick={fetchData} className="mt-4 px-4 py-2 bg-[#7367F0] text-white rounded-lg">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const totalCountries = countryData.length;
    const totalRegions = regionData.length;
    const topCountry = countryData[0];
    const topRegion = regionData[0];

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Regional Analysis</h1>
                    <p className={`text-sm ${isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}`}>Geographic distribution and regional insights</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#7367F020] flex items-center justify-center">
                                <Globe className="w-6 h-6 text-[#7367F0]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{totalRegions}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Regions</p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#28C76F20] flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-[#28C76F]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{totalCountries}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Countries</p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#FF9F4320] flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-[#FF9F43]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{topCountry?.country || 'N/A'}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Top Country</p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#00CFE820] flex items-center justify-center">
                                <Users className="w-6 h-6 text-[#00CFE8]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{topRegion?._id || 'N/A'}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Top Region</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Top Countries Bar Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Top Countries by Records
                        </h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={countryData.slice(0, 10)} layout="vertical" margin={{ left: 85, right: 15 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} horizontal={false} />
                                    <XAxis type="number" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 11 }} />
                                    <YAxis dataKey="country" type="category" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 10 }} width={80} tickFormatter={v => v?.length > 12 ? `${v.substring(0, 12)}..` : v} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#7367F0" radius={[0, 4, 4, 0]}>
                                        {countryData.slice(0, 10).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Region Pie Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Records by Region
                        </h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={regionData.slice(0, 8)}
                                        dataKey="count"
                                        nameKey="_id"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={50}
                                        label={({ _id, percent }) => `${_id?.substring(0, 10) || 'N/A'} (${(percent * 100).toFixed(0)}%)`}
                                        labelLine={{ stroke: isDark ? '#6B6D8C' : '#9ca3af', strokeWidth: 1 }}
                                    >
                                        {regionData.slice(0, 8).map((entry, index) => (
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
                    {/* Country Intensity Scatter */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Country Intensity vs Likelihood
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <XAxis
                                        type="number"
                                        dataKey="avgIntensity"
                                        name="Avg Intensity"
                                        tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }}
                                        label={{ value: 'Avg Intensity', position: 'bottom', fill: isDark ? '#6B6D8C' : '#9ca3af' }}
                                    />
                                    <YAxis
                                        type="number"
                                        dataKey="avgLikelihood"
                                        name="Avg Likelihood"
                                        tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }}
                                        label={{ value: 'Avg Likelihood', angle: -90, position: 'insideLeft', fill: isDark ? '#6B6D8C' : '#9ca3af' }}
                                    />
                                    <ZAxis type="number" dataKey="count" range={[50, 400]} name="Records" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                        formatter={(value, name) => [Number(value).toFixed(2), name]}
                                        labelFormatter={(label) => countryData.find(c => c.avgIntensity == label)?.country || ''}
                                    />
                                    <Scatter
                                        name="Countries"
                                        data={countryData.map(c => ({
                                            ...c,
                                            avgIntensity: parseFloat(c.avgIntensity),
                                            avgLikelihood: parseFloat(c.avgLikelihood)
                                        }))}
                                        fill="#7367F0"
                                    />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Region Intensity Area Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Regional Metrics Overview
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={regionData.slice(0, 8)}>
                                    <defs>
                                        <linearGradient id="intensityGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7367F0" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#7367F0" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="likelihoodGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#28C76F" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#28C76F" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <XAxis dataKey="_id" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
                                    <YAxis tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Legend />
                                    <Area type="monotone" dataKey="avgIntensity" name="Avg Intensity" stroke="#7367F0" fill="url(#intensityGrad)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="avgLikelihood" name="Avg Likelihood" stroke="#28C76F" fill="url(#likelihoodGrad)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Full Width - Country Details Table */}
                <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Country-wise Detailed Metrics
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={`border-b ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                                    <th className={`text-left py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Country</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Records</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Share %</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Intensity</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Likelihood</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Relevance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countryData.map((country, index) => (
                                    <tr key={index} className={`border-b ${isDark ? 'border-[#3B3F5C] hover:bg-[#3B3F5C]/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                                        <td className={`py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                                {country.country}
                                            </div>
                                        </td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{country.count.toLocaleString()}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{country.percentage}%</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{country.avgIntensity}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{country.avgLikelihood}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{country.avgRelevance}</td>
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

export default RegionalAnalysisDashboard;
