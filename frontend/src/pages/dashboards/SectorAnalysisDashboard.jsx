import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../ThemeContext';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, LineChart, Line, ComposedChart
} from 'recharts';
import { Layers, TrendingUp, BarChart3, PieChartIcon } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#00CFE8', '#9E95F5', '#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56'];

const SectorAnalysisDashboard = () => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(true);
    const [sectorData, setSectorData] = useState([]);
    const [, setStatistics] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [sectorRes, statsRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/sector-breakdown`),
                axios.get(`${API_URL}/api/dashboard/statistics`)
            ]);

            if (sectorRes.data.success) {
                setSectorData(sectorRes.data.data);
            }
            if (statsRes.data.success) {
                setStatistics(statsRes.data.data);
            }
        } catch (err) {
            setError('Failed to fetch sector data');
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
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading Sector Analysis...</p>
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

    const topSectors = sectorData.slice(0, 10);
    const totalRecords = sectorData.reduce((sum, s) => sum + s.count, 0);

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Sector Analysis</h1>
                    <p className={`text-sm ${isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}`}>Deep dive into sector-wise data distribution</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#7367F020] flex items-center justify-center">
                                <Layers className="w-6 h-6 text-[#7367F0]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{sectorData.length}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Total Sectors</p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#28C76F20] flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-[#28C76F]" />
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
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{topSectors[0]?.sector || 'N/A'}</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Top Sector</p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#00CFE820] flex items-center justify-center">
                                <PieChartIcon className="w-6 h-6 text-[#00CFE8]" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{topSectors[0]?.percentage || '0'}%</p>
                                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Top Sector Share</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Sector Distribution Horizontal Bar */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Sector Distribution
                        </h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={topSectors.slice(0, 8)} layout="vertical" margin={{ left: 90, right: 15 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} horizontal={false} />
                                    <XAxis type="number" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 11 }} />
                                    <YAxis dataKey="sector" type="category" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 10 }} width={85} tickFormatter={v => v?.length > 14 ? `${v.substring(0, 14)}..` : v} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#25293C' : '#fff',
                                            border: `1px solid ${isDark ? '#3B3F5C' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            color: isDark ? '#fff' : '#374151'
                                        }}
                                        formatter={(value, name) => [value.toLocaleString(), name === 'count' ? 'Records' : name]}
                                    />
                                    <Bar dataKey="count" fill="#7367F0" radius={[0, 4, 4, 0]}>
                                        {topSectors.slice(0, 8).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Sector Pie Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Sector Share Distribution
                        </h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={topSectors.slice(0, 8)}
                                        dataKey="count"
                                        nameKey="sector"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={45}
                                        label={({ sector, percentage }) => `${sector?.substring(0, 8)}.. (${percentage}%)`}
                                        labelLine={{ stroke: isDark ? '#6B6D8C' : '#9ca3af', strokeWidth: 1 }}
                                    >
                                        {topSectors.slice(0, 8).map((entry, index) => (
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
                                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Sector Intensity Line Chart */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Sector Intensity Analysis
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={topSectors}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <XAxis dataKey="sector" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
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
                                    <Line type="monotone" dataKey="avgIntensity" name="Avg Intensity" stroke="#7367F0" strokeWidth={3} dot={{ fill: '#7367F0', r: 5 }} />
                                    <Line type="monotone" dataKey="avgLikelihood" name="Avg Likelihood" stroke="#28C76F" strokeWidth={3} dot={{ fill: '#28C76F', r: 5 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Sector Metrics Composed */}
                    <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                        <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Sector Metrics Overview
                        </h3>
                        <div style={{ width: '100%', height: 280 }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <ComposedChart data={topSectors.slice(0, 8)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#3B3F5C' : '#e5e7eb'} />
                                    <XAxis dataKey="sector" tick={{ fill: isDark ? '#6B6D8C' : '#9ca3af', fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
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
                                    <Bar yAxisId="left" dataKey="count" name="Record Count" fill="#7367F020" stroke="#7367F0" />
                                    <Line yAxisId="right" type="monotone" dataKey="avgRelevance" name="Avg Relevance" stroke="#FF9F43" strokeWidth={3} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Full Width - Detailed Sector Table */}
                <div className={`rounded-xl p-5 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Detailed Sector Metrics
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={`border-b ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                                    <th className={`text-left py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Sector</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Records</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Share %</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Intensity</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Likelihood</th>
                                    <th className={`text-right py-3 px-4 ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Avg Relevance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sectorData.slice(0, 15).map((sector, index) => (
                                    <tr key={index} className={`border-b ${isDark ? 'border-[#3B3F5C] hover:bg-[#3B3F5C]/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                                        <td className={`py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                                {sector.sector}
                                            </div>
                                        </td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{sector.count.toLocaleString()}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{sector.percentage}%</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{sector.avgIntensity}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{sector.avgLikelihood}</td>
                                        <td className={`text-right py-3 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{sector.avgRelevance}</td>
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

export default SectorAnalysisDashboard;
