import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../ThemeContext';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, BarChart, Bar, Legend, ComposedChart
} from 'recharts';
import { Calendar, TrendingUp, Clock, Activity } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

// eslint-disable-next-line no-unused-vars
const COLORS = ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#00CFE8'];

const TimelineAnalysisDashboard = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [timelineData, setTimelineData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [yearData, setYearData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [timelineRes, monthlyRes, statsRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/timeline`),
                axios.get(`${API_URL}/api/dashboard/monthly-trends`),
                axios.get(`${API_URL}/api/dashboard/statistics`)
            ]);

            if (timelineRes.data.success) {
                setTimelineData(timelineRes.data.data.timeline || []);
            }
            if (monthlyRes.data.success) {
                setMonthlyData(monthlyRes.data.data || []);
            }
            if (statsRes.data.success) {
                setYearData(statsRes.data.data.byYear || []);
            }
        } catch (err) {
            setError('Failed to fetch timeline data');
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
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading Timeline Analysis...</p>
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

    // Sort timeline data by year
    const sortedTimeline = [...timelineData].sort((a, b) => parseInt(a._id) - parseInt(b._id));
    const sortedYearData = [...yearData].sort((a, b) => parseInt(a._id) - parseInt(b._id));

    const totalYears = sortedTimeline.length;
    const totalRecords = sortedTimeline.reduce((sum, t) => sum + t.count, 0);
    const latestYear = sortedTimeline[sortedTimeline.length - 1]?._id || 'N/A';
    const peakYear = sortedTimeline.reduce((max, t) => t.count > (max?.count || 0) ? t : max, null)?._id || 'N/A';

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Timeline Analysis</h1>
                    <p className={`text-sm ${isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}`}>Historical trends and time-based insights</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#7367F020] flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-[#7367F0]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{totalYears}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Years of Data</p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#28C76F20] flex items-center justify-center">
                                <Activity className="w-6 h-6 text-[#28C76F]" />
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
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{peakYear}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Peak Year</p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#00CFE820] flex items-center justify-center">
                                <Clock className="w-6 h-6 text-[#00CFE8]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{latestYear}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Latest Year</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Width - Yearly Trend Line Chart */}
                <div className={`rounded-xl p-5 mb-6 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Yearly Records Trend
                    </h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={sortedTimeline}>
                                <defs>
                                    <linearGradient id="yearlyGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7367F0" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#7367F0" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                <XAxis
                                    dataKey="_id"
                                    tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }}
                                    label={{ value: 'Year', position: 'bottom', fill: isDark ? '#6B6D8C' : '#9ca3af' }}
                                />
                                <YAxis
                                    tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }}
                                    label={{ value: 'Records', angle: -90, position: 'insideLeft', fill: isDark ? '#6B6D8C' : '#9ca3af' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#25293C' : '#fff',
                                        border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                        borderRadius: '8px',
                                        color: isDark ? '#fff' : '#374151'
                                    }}
                                    formatter={(value, name) => [value.toLocaleString(), name === 'count' ? 'Records' : name]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    name="Records"
                                    stroke="#7367F0"
                                    fill="url(#yearlyGradient)"
                                    strokeWidth={3}
                                    dot={{ fill: '#7367F0', r: 4 }}
                                    activeDot={{ r: 6, fill: '#7367F0' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Yearly Metrics Line Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Yearly Intensity Trend
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={sortedTimeline}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <XAxis dataKey="_id" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }} />
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
                                    <Line type="monotone" dataKey="avgIntensity" name="Avg Intensity" stroke="#7367F0" strokeWidth={3} dot={{ fill: '#7367F0', r: 4 }} />
                                    <Line type="monotone" dataKey="avgLikelihood" name="Avg Likelihood" stroke="#28C76F" strokeWidth={3} dot={{ fill: '#28C76F', r: 4 }} />
                                    <Line type="monotone" dataKey="avgRelevance" name="Avg Relevance" stroke="#FF9F43" strokeWidth={3} dot={{ fill: '#FF9F43', r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Yearly Bar Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Records by Year
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={sortedYearData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <XAxis dataKey="_id" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }} />
                                    <YAxis tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Bar dataKey="count" name="Records" fill="#7367F0" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Monthly Trend */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Monthly Distribution
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <XAxis dataKey="month" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                                    <YAxis tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Bar dataKey="count" name="Records" fill="#28C76F" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Monthly Metrics Composed Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Monthly Metrics Overview
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <ComposedChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <XAxis dataKey="month" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                                    <YAxis yAxisId="left" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }} />
                                    <YAxis yAxisId="right" orientation="right" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                    />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="count" name="Records" fill="#7367F020" stroke="#7367F0" />
                                    <Line yAxisId="right" type="monotone" dataKey="avgIntensity" name="Avg Intensity" stroke="#FF9F43" strokeWidth={3} />
                                    <Line yAxisId="right" type="monotone" dataKey="avgLikelihood" name="Avg Likelihood" stroke="#00CFE8" strokeWidth={3} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Year Details Table */}
                <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Year-wise Details
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={`border-b ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                                    <th className={`text-left py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Year</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Records</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Intensity</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Likelihood</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Relevance</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Topics</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedTimeline.map((year, index) => (
                                    <tr key={index} className={`border-b ${isDark ? 'border-[#3B3F5C] hover:bg-[#3B3F5C]/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                                        <td className={`py-3 px-4 font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{year._id}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{year.count.toLocaleString()}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{year.avgIntensity?.toFixed(2) || 'N/A'}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{year.avgLikelihood?.toFixed(2) || 'N/A'}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{year.avgRelevance?.toFixed(2) || 'N/A'}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{year.topics?.length || 0}</td>
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

export default TimelineAnalysisDashboard;
