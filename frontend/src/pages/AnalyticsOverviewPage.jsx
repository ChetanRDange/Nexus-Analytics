import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import {
  TrendingUp,
  Globe,
  Layers,
  BarChart3,
  Calendar,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';

// Import Nivo Charts
import { NivoLineChart } from '../Components/Charts/NivoCharts/NivoLineChart';
import { NivoAreaChart } from '../Components/Charts/NivoCharts/NivoAreaChart';
import { NivoGroupedBarChart } from '../Components/Charts/NivoCharts/NivoGroupedBarChart';
import { NivoStackedBarChart } from '../Components/Charts/NivoCharts/NivoStackedBarChart';
import { NivoHorizontalBarChart } from '../Components/Charts/NivoCharts/NivoHorizontalBarChart';
import { NivoPieChart } from '../Components/Charts/NivoCharts/NivoPieChart';
import { chartColors } from '../Components/Charts/NivoCharts/nivoTheme';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Card Component
const Card = ({ children, className = '', isDark }) => (
  <div className={`rounded-xl border p-5 overflow-hidden ${isDark ? 'bg-[#2f3349] border-gray-700' : 'bg-white border-gray-200'} ${className}`}>
    {children}
  </div>
);

// Chart Card Header
const ChartHeader = ({ title, subtitle, action, isDark }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="min-w-0 flex-1">
      <h3 className={`font-semibold truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
      {subtitle && <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

// Stat Widget
const StatWidget = ({ title, value, change, trend, icon: Icon, color, isDark }) => (
  <Card isDark={isDark}>
    <div className="flex items-start justify-between">
      <div>
        <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
        <h3 className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</h3>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {change}%
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>vs last month</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
    </div>
  </Card>
);

// Progress Bar
const ProgressBar = ({ label, value, max, color, isDark }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</span>
      </div>
      <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const AnalyticsOverviewPage = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    statistics: null,
    monthlyTrends: [],
    sectorBreakdown: [],
    topCountries: [],
    regionSector: [],
    pestleAnalysis: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, trendsRes, sectorRes, countriesRes, regionRes, pestleRes] = await Promise.all([
        axios.get(`${API_BASE}/api/dashboard/statistics`),
        axios.get(`${API_BASE}/api/dashboard/monthly-trends`),
        axios.get(`${API_BASE}/api/dashboard/sector-breakdown`),
        axios.get(`${API_BASE}/api/dashboard/top-countries`),
        axios.get(`${API_BASE}/api/dashboard/region-sector`),
        axios.get(`${API_BASE}/api/dashboard/pestle-analysis`),
      ]);

      setData({
        statistics: statsRes.data.data,
        monthlyTrends: trendsRes.data.data || [],
        sectorBreakdown: sectorRes.data.data || [],
        topCountries: countriesRes.data.data || [],
        regionSector: regionRes.data.data || [],
        pestleAnalysis: pestleRes.data.data || [],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare chart data
  const overview = data.statistics?.overview?.[0] || {};

  // Line chart data for monthly trends
  const trendLineData = [
    {
      id: 'Intensity',
      data: data.monthlyTrends.map(m => ({
        x: m.month?.substring(0, 3) || '',
        y: parseFloat(m.avgIntensity) || 0,
      })),
    },
    {
      id: 'Likelihood',
      data: data.monthlyTrends.map(m => ({
        x: m.month?.substring(0, 3) || '',
        y: parseFloat(m.avgLikelihood) || 0,
      })),
    },
    {
      id: 'Relevance',
      data: data.monthlyTrends.map(m => ({
        x: m.month?.substring(0, 3) || '',
        y: parseFloat(m.avgRelevance) || 0,
      })),
    },
  ];

  // Area chart for count trends
  const countAreaData = [{
    id: 'Insights',
    data: data.monthlyTrends.map(m => ({
      x: m.month?.substring(0, 3) || '',
      y: m.count || 0,
    })),
  }];

  // Grouped bar for sector comparison
  const sectorCompareData = data.sectorBreakdown.slice(0, 8).map(s => ({
    id: s.sector?.substring(0, 10) || 'Unknown',
    Intensity: parseFloat(s.avgIntensity) || 0,
    Likelihood: parseFloat(s.avgLikelihood) || 0,
    Relevance: parseFloat(s.avgRelevance) || 0,
  }));

  // Horizontal bar for countries
  const countryBarData = data.topCountries.slice(0, 8).map(c => ({
    id: c.country?.substring(0, 15) || 'Unknown',
    count: c.count,
  }));

  // Pie chart for PESTLE
  const pestlePieData = data.pestleAnalysis.map(p => ({
    id: p.pestle,
    label: p.pestle,
    value: p.count,
  }));

  // Stacked bar for region-sector
  const regionStackedData = data.regionSector.slice(0, 6).map(r => {
    const obj = { id: r.region?.substring(0, 12) || 'Unknown' };
    r.sectors?.slice(0, 3).forEach(s => {
      obj[s.name?.substring(0, 10) || 'Other'] = s.count;
    });
    return obj;
  });
  const regionStackedKeys = [...new Set(data.regionSector.slice(0, 6).flatMap(r =>
    r.sectors?.slice(0, 3).map(s => s.name?.substring(0, 10) || 'Other') || []
  ))];

  if (loading) {
    return (
      <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293c]' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center h-96">
          <RefreshCw className="w-10 h-10 text-[#7367f0] animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293c]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Analytics Overview
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Comprehensive insights with multiple chart views
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-[#7367f0] text-white rounded-lg hover:bg-[#685dd8] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatWidget
          title="Total Records"
          value={overview.totalRecords?.toLocaleString() || '0'}
          change={12.5}
          trend="up"
          icon={Activity}
          color="#7367f0"
          isDark={isDark}
        />
        <StatWidget
          title="Unique Sectors"
          value={data.sectorBreakdown.length}
          change={5.2}
          trend="up"
          icon={Layers}
          color="#28c76f"
          isDark={isDark}
        />
        <StatWidget
          title="Countries"
          value={data.topCountries.length}
          change={2.1}
          trend="up"
          icon={Globe}
          color="#00cfe8"
          isDark={isDark}
        />
        <StatWidget
          title="PESTLE Factors"
          value={data.pestleAnalysis.length}
          trend="up"
          icon={BarChart3}
          color="#ff9f43"
          isDark={isDark}
        />
      </div>

      {/* Row 1: Line Chart + Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <Card isDark={isDark}>
          <ChartHeader title="Monthly Metrics Trend" subtitle="Intensity, Likelihood & Relevance" isDark={isDark} />
          <NivoLineChart
            data={trendLineData}
            height={220}
            colors={chartColors.rainbow}
            showLegend={true}
            curve="monotoneX"
          />
        </Card>

        <Card isDark={isDark}>
          <ChartHeader title="Insights Volume" subtitle="Monthly count distribution" isDark={isDark} />
          <NivoAreaChart
            data={countAreaData}
            height={220}
            colors={['#7367f0']}
            showLegend={false}
          />
        </Card>
      </div>

      {/* Row 2: Grouped Bar + Horizontal Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <Card isDark={isDark}>
          <ChartHeader title="Sector Comparison" subtitle="Metrics by sector" isDark={isDark} />
          <NivoGroupedBarChart
            data={sectorCompareData}
            keys={['Intensity', 'Likelihood', 'Relevance']}
            indexBy="id"
            height={240}
            colors={chartColors.rainbow}
            showLegend={true}
          />
        </Card>

        <Card isDark={isDark}>
          <ChartHeader title="Top Countries" subtitle="By insight count" isDark={isDark} />
          <NivoHorizontalBarChart
            data={countryBarData}
            keys={['count']}
            indexBy="id"
            height={240}
            colors={chartColors.rainbow}
          />
        </Card>
      </div>

      {/* Row 3: Stacked Bar + Pie + Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <Card isDark={isDark} className="lg:col-span-2">
          <ChartHeader title="Region-Sector Distribution" subtitle="Stacked by top sectors" isDark={isDark} />
          <NivoStackedBarChart
            data={regionStackedData}
            keys={regionStackedKeys}
            indexBy="id"
            height={240}
            colors={chartColors.rainbow}
            showLegend={true}
          />
        </Card>

        <Card isDark={isDark}>
          <ChartHeader title="PESTLE Distribution" subtitle="Factor breakdown" isDark={isDark} />
          <NivoPieChart
            data={pestlePieData}
            height={240}
            colors={chartColors.rainbow}
            enableArcLinkLabels={false}
          />
        </Card>
      </div>

      {/* Row 4: Top Sectors Progress + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card isDark={isDark}>
          <ChartHeader title="Top Sectors" subtitle="By insight count" isDark={isDark} />
          <div className="mt-2">
            {data.sectorBreakdown.slice(0, 6).map((sector, i) => (
              <ProgressBar
                key={sector.sector}
                label={sector.sector}
                value={sector.count}
                max={data.sectorBreakdown[0]?.count || 1}
                color={chartColors.rainbow[i % chartColors.rainbow.length]}
                isDark={isDark}
              />
            ))}
          </div>
        </Card>

        <Card isDark={isDark}>
          <ChartHeader title="PESTLE Metrics" subtitle="Average values by factor" isDark={isDark} />
          <div className="mt-2">
            {data.pestleAnalysis.slice(0, 6).map((pestle, i) => (
              <div key={pestle.pestle} className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'} last:border-0`}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: chartColors.rainbow[i % chartColors.rainbow.length] }}
                  />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{pestle.pestle}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Int: <strong className={isDark ? 'text-white' : 'text-gray-800'}>{pestle.avgIntensity}</strong>
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Lik: <strong className={isDark ? 'text-white' : 'text-gray-800'}>{pestle.avgLikelihood}</strong>
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Rel: <strong className={isDark ? 'text-white' : 'text-gray-800'}>{pestle.avgRelevance}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsOverviewPage;
