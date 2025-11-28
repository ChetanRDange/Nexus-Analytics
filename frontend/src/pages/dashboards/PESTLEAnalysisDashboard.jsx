import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../ThemeContext';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, Radar, AreaChart, Area
} from 'recharts';
import { Zap, TrendingUp, Target, Shield } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const PESTLE_COLORS = {
    'Political': '#EA5455',
    'Economic': '#28C76F',
    'Social': '#FF9F43',
    'Technological': '#7367F0',
    'Legal': '#00CFE8',
    'Environmental': '#9E95F5'
};

const DEFAULT_COLORS = ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#00CFE8', '#9E95F5'];

const PESTLEAnalysisDashboard = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [pestleData, setPestleData] = useState([]);
    const [intensityData, setIntensityData] = useState([]);
    const [, setStatistics] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsRes, intensityRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/statistics`),
                axios.get(`${API_URL}/api/dashboard/intensity-analysis?groupBy=pestle`)
            ]);

            if (statsRes.data.success) {
                setStatistics(statsRes.data.data);
                setPestleData(statsRes.data.data.byPestle || []);
            }
            if (intensityRes.data.success) {
                setIntensityData(intensityRes.data.data.analysis || []);
            }
        } catch (err) {
            setError('Failed to fetch PESTLE data');
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
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading PESTLE Analysis...</p>
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

    const totalRecords = pestleData.reduce((sum, p) => sum + p.count, 0);
    const topPestle = pestleData[0];
    const avgIntensity = intensityData.length > 0
        ? (intensityData.reduce((sum, p) => sum + (p.avgIntensity || 0), 0) / intensityData.length).toFixed(2)
        : 'N/A';

    // Prepare radar data
    const radarData = intensityData.map(p => ({
        subject: p._id?.substring(0, 10) || 'N/A',
        intensity: p.avgIntensity || 0,
        likelihood: p.avgLikelihood || 0,
        relevance: p.avgRelevance || 0,
        fullMark: 10
    }));

    // Get color for PESTLE type
    const getPestleColor = (pestle, index) => {
        return PESTLE_COLORS[pestle] || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
    };

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>PESTLE Analysis</h1>
                    <p className={`text-sm ${isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}`}>Political, Economic, Social, Technological, Legal & Environmental breakdown</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#7367F020] flex items-center justify-center">
                                <Zap className="w-6 h-6 text-[#7367F0]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{pestleData.length}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>PESTLE Categories</p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#28C76F20] flex items-center justify-center">
                                <Target className="w-6 h-6 text-[#28C76F]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{totalRecords.toLocaleString()}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Total Records</p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#FF9F4320] flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-[#FF9F43]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{topPestle?._id || 'N/A'}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Top Category</p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#00CFE820] flex items-center justify-center">
                                <Shield className="w-6 h-6 text-[#00CFE8]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{avgIntensity}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Avg Intensity</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* PESTLE Distribution Pie */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            PESTLE Distribution
                        </h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pestleData}
                                        dataKey="count"
                                        nameKey="_id"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={50}
                                        label={({ _id, percent }) => `${_id?.substring(0, 6)} (${(percent * 100).toFixed(0)}%)`}
                                        labelLine={{ stroke: isDark ? '#6B6D8C' : '#9ca3af' }}
                                    >
                                        {pestleData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getPestleColor(entry._id, index)} />
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
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* PESTLE Radar Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            PESTLE Metrics Radar
                        </h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? '#A3A4CC' : '#6b7280', fontSize: 11 }} />
                                    <PolarRadiusAxis tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 10 }} domain={[0, 10]} />
                                    <Radar name="Intensity" dataKey="intensity" stroke="#7367F0" fill="#7367F0" fillOpacity={0.5} strokeWidth={2} />
                                    <Radar name="Likelihood" dataKey="likelihood" stroke="#28C76F" fill="#28C76F" fillOpacity={0.3} strokeWidth={2} />
                                    <Radar name="Relevance" dataKey="relevance" stroke="#FF9F43" fill="#FF9F43" fillOpacity={0.2} strokeWidth={2} />
                                    <Legend />
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

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* PESTLE Bar Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Records by PESTLE Category
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={pestleData} layout="vertical" margin={{ left: 80 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <XAxis type="number" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }} />
                                    <YAxis dataKey="_id" type="category" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 11 }} width={80} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                        {pestleData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getPestleColor(entry._id, index)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* PESTLE Intensity Area Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Intensity by PESTLE Category
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={intensityData}>
                                    <defs>
                                        <linearGradient id="pestleIntensityGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7367F0" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#7367F0" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <XAxis dataKey="_id" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                                    <YAxis tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                        formatter={(value) => [typeof value === 'number' ? value.toFixed(2) : value]}
                                    />
                                    <Legend />
                                    <Area type="monotone" dataKey="avgIntensity" name="Avg Intensity" stroke="#7367F0" fill="url(#pestleIntensityGrad)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="avgLikelihood" name="Avg Likelihood" stroke="#28C76F" fill="none" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* PESTLE Details Table */}
                <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        PESTLE Category Details
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={`border-b ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                                    <th className={`text-left py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Category</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Records</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Share %</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Intensity</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Likelihood</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Relevance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {intensityData.map((pestle, index) => {
                                    const share = totalRecords > 0 ? ((pestle.totalRecords / totalRecords) * 100).toFixed(1) : 0;
                                    return (
                                        <tr key={index} className={`border-b ${isDark ? 'border-[#3B3F5C] hover:bg-[#3B3F5C]/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                                            <td className={`py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getPestleColor(pestle._id, index) }}></span>
                                                    {pestle._id}
                                                </div>
                                            </td>
                                            <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{pestle.totalRecords?.toLocaleString() || 0}</td>
                                            <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{share}%</td>
                                            <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{pestle.avgIntensity?.toFixed(2) || 'N/A'}</td>
                                            <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{pestle.avgLikelihood?.toFixed(2) || 'N/A'}</td>
                                            <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{pestle.avgRelevance?.toFixed(2) || 'N/A'}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PESTLEAnalysisDashboard;
