import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import {
    Search, Filter, Download, RefreshCw, ChevronDown, ChevronLeft, ChevronRight,
    ExternalLink, MoreVertical, Eye, Trash2, Edit, ArrowUpDown,
    TrendingUp, Database, Zap, Target, Globe, Layers, Calendar
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const InsightsListPage = () => {
    const { isDark } = useTheme();
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });
    const [filters, setFilters] = useState({
        search: '',
        sector: '',
        region: '',
        topic: ''
    });
    const [filterOptions, setFilterOptions] = useState({
        sectors: [],
        regions: [],
        topics: []
    });
    const [sortConfig, setSortConfig] = useState({ key: 'added', order: 'desc' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        avgIntensity: 0,
        avgLikelihood: 0,
        avgRelevance: 0
    });

    useEffect(() => {
        fetchFilterOptions();
        fetchStats();
    }, []);

    useEffect(() => {
        fetchInsights();
    }, [pagination.page, pagination.limit, filters, sortConfig]);

    const fetchFilterOptions = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/dashboard/filters`);
            if (res.data?.data) {
                setFilterOptions({
                    sectors: res.data.data.sectors || [],
                    regions: res.data.data.regions || [],
                    topics: res.data.data.topics || []
                });
            }
        } catch (error) {
            console.error('Error fetching filters:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/dashboard/statistics`);
            if (res.data?.data?.overview?.[0]) {
                setStats(res.data.data.overview[0]);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchInsights = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: pagination.page,
                limit: pagination.limit,
                sortBy: sortConfig.key,
                sortOrder: sortConfig.order,
                ...(filters.search && { search: filters.search }),
                ...(filters.sector && { sector: filters.sector }),
                ...(filters.region && { region: filters.region }),
                ...(filters.topic && { topic: filters.topic }),
            });

            const res = await axios.get(`${API_URL}/api/dashboard/insights-list?${params}`);
            if (res.data?.data) {
                setInsights(res.data.data.insights || []);
                setPagination(prev => ({
                    ...prev,
                    total: res.data.data.pagination.total,
                    totalPages: res.data.data.pagination.totalPages
                }));
            }
        } catch (error) {
            console.error('Error fetching insights:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === insights.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(insights.map(i => i.id));
        }
    };

    const toggleSelectRow = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const getIntensityColor = (value) => {
        if (value >= 7) return 'text-[#EA5455] bg-[#EA5455]/10';
        if (value >= 5) return 'text-[#FF9F43] bg-[#FF9F43]/10';
        if (value >= 3) return 'text-[#28C76F] bg-[#28C76F]/10';
        return 'text-[#00CFE8] bg-[#00CFE8]/10';
    };

    const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
        <div className={`rounded-xl p-4 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</p>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{title}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Insights Explorer</h1>
                    <p className={isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}>Browse and analyze all data insights from your dataset</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard title="Total Insights" value={stats.totalRecords?.toLocaleString() || '0'} icon={Database} color="#7367F0" />
                    <StatCard title="Avg Intensity" value={stats.avgIntensity?.toFixed(1) || '0'} icon={Zap} color="#FF9F43" />
                    <StatCard title="Avg Likelihood" value={stats.avgLikelihood?.toFixed(1) || '0'} icon={Target} color="#28C76F" />
                    <StatCard title="Avg Relevance" value={stats.avgRelevance?.toFixed(1) || '0'} icon={TrendingUp} color="#00CFE8" />
                </div>

                {/* Filters Section */}
                <div className={`rounded-xl p-5 mb-6 ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Filters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Sector Filter */}
                        <div className="relative">
                            <select
                                value={filters.sector}
                                onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
                                className={`w-full px-4 py-2.5 rounded-lg appearance-none cursor-pointer ${isDark ? 'bg-[#25293C] text-white border-[#3B3F5C]' : 'bg-gray-50 text-gray-800 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-[#7367F0]/50`}
                            >
                                <option value="">All Sectors</option>
                                {filterOptions.sectors.map(sector => (
                                    <option key={sector} value={sector}>{sector}</option>
                                ))}
                            </select>
                            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-400'}`} />
                        </div>

                        {/* Region Filter */}
                        <div className="relative">
                            <select
                                value={filters.region}
                                onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                                className={`w-full px-4 py-2.5 rounded-lg appearance-none cursor-pointer ${isDark ? 'bg-[#25293C] text-white border-[#3B3F5C]' : 'bg-gray-50 text-gray-800 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-[#7367F0]/50`}
                            >
                                <option value="">All Regions</option>
                                {filterOptions.regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-400'}`} />
                        </div>

                        {/* Topic Filter */}
                        <div className="relative">
                            <select
                                value={filters.topic}
                                onChange={(e) => setFilters(prev => ({ ...prev, topic: e.target.value }))}
                                className={`w-full px-4 py-2.5 rounded-lg appearance-none cursor-pointer ${isDark ? 'bg-[#25293C] text-white border-[#3B3F5C]' : 'bg-gray-50 text-gray-800 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-[#7367F0]/50`}
                            >
                                <option value="">All Topics</option>
                                {filterOptions.topics.slice(0, 50).map(topic => (
                                    <option key={topic} value={topic}>{topic}</option>
                                ))}
                            </select>
                            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-400'}`} />
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Search insights..."
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${isDark ? 'bg-[#25293C] text-white border-[#3B3F5C] placeholder-[#6B6D8C]' : 'bg-gray-50 text-gray-800 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-[#7367F0]/50`}
                            />
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
                    {/* Table Header Actions */}
                    <div className={`flex flex-wrap items-center justify-between gap-4 p-5 border-b ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <select
                                    value={pagination.limit}
                                    onChange={(e) => setPagination(prev => ({ ...prev, limit: Number(e.target.value), page: 1 }))}
                                    className={`px-3 py-2 pr-8 rounded-lg appearance-none ${isDark ? 'bg-[#25293C] text-white border-[#3B3F5C]' : 'bg-gray-50 text-gray-800 border-gray-200'} border`}
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-400'}`} />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark ? 'bg-[#25293C] text-[#A3A4CC] hover:bg-[#3B3F5C]' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                            <button
                                onClick={fetchInsights}
                                className="flex items-center gap-2 px-4 py-2 bg-[#7367F0] text-white rounded-lg hover:bg-[#685DD8] transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={isDark ? 'bg-[#25293C]' : 'bg-gray-50'}>
                                    <th className="w-12 px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === insights.length && insights.length > 0}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-[#3B3F5C] text-[#7367F0] focus:ring-[#7367F0]"
                                        />
                                    </th>
                                    <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>
                                        <button onClick={() => handleSort('title')} className="flex items-center gap-1 hover:text-[#7367F0]">
                                            Insight <ArrowUpDown className="w-3 h-3" />
                                        </button>
                                    </th>
                                    <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Sector</th>
                                    <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Topic</th>
                                    <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Region</th>
                                    <th className={`px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>
                                        <button onClick={() => handleSort('intensity')} className="flex items-center gap-1 hover:text-[#7367F0]">
                                            Intensity <ArrowUpDown className="w-3 h-3" />
                                        </button>
                                    </th>
                                    <th className={`px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>
                                        <button onClick={() => handleSort('likelihood')} className="flex items-center gap-1 hover:text-[#7367F0]">
                                            Likelihood <ArrowUpDown className="w-3 h-3" />
                                        </button>
                                    </th>
                                    <th className={`px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>
                                        <button onClick={() => handleSort('relevance')} className="flex items-center gap-1 hover:text-[#7367F0]">
                                            Relevance <ArrowUpDown className="w-3 h-3" />
                                        </button>
                                    </th>
                                    <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Source</th>
                                    <th className={`px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDark ? 'divide-[#3B3F5C]' : 'divide-gray-200'}`}>
                                {loading ? (
                                    <tr>
                                        <td colSpan="10" className="px-4 py-12 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-6 h-6 border-2 border-[#7367F0] border-t-transparent rounded-full animate-spin" />
                                                <span className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading insights...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : insights.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="px-4 py-12 text-center">
                                            <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>No insights found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    insights.map((insight) => (
                                        <tr key={insight.id} className={`${isDark ? 'hover:bg-[#25293C]' : 'hover:bg-gray-50'} transition-colors`}>
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(insight.id)}
                                                    onChange={() => toggleSelectRow(insight.id)}
                                                    className="w-4 h-4 rounded border-[#3B3F5C] text-[#7367F0] focus:ring-[#7367F0]"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="max-w-xs">
                                                    <p className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                        {insight.title?.substring(0, 60) || 'Untitled'}...
                                                    </p>
                                                    <p className={`text-xs truncate mt-0.5 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>
                                                        {insight.insight?.substring(0, 40) || ''}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-[#7367F0]/20 text-[#7367F0]' : 'bg-[#7367F0]/10 text-[#7367F0]'}`}>
                                                    {insight.sector || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`text-sm ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>
                                                    {insight.topic || '-'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4 text-[#00CFE8]" />
                                                    <span className={`text-sm ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>
                                                        {insight.region || 'Global'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getIntensityColor(insight.intensity)}`}>
                                                    {insight.intensity}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                    {insight.likelihood}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                    {insight.relevance}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`text-sm ${isDark ? 'text-[#A3A4CC]' : 'text-gray-600'}`}>
                                                    {insight.source || '-'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    {insight.url && (
                                                        <a
                                                            href={insight.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#3B3F5C] text-[#A3A4CC]' : 'hover:bg-gray-100 text-gray-500'}`}
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    <button className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-[#3B3F5C] text-[#A3A4CC]' : 'hover:bg-gray-100 text-gray-500'}`}>
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className={`flex flex-wrap items-center justify-between gap-4 p-5 border-t ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                        <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>
                            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                                className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-[#25293C] text-[#A3A4CC] hover:bg-[#3B3F5C]' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                let pageNum;
                                if (pagination.totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (pagination.page <= 3) {
                                    pageNum = i + 1;
                                } else if (pagination.page >= pagination.totalPages - 2) {
                                    pageNum = pagination.totalPages - 4 + i;
                                } else {
                                    pageNum = pagination.page - 2 + i;
                                }
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${pagination.page === pageNum
                                            ? 'bg-[#7367F0] text-white'
                                            : isDark ? 'bg-[#25293C] text-[#A3A4CC] hover:bg-[#3B3F5C]' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page === pagination.totalPages}
                                className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-[#25293C] text-[#A3A4CC] hover:bg-[#3B3F5C]' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightsListPage;
