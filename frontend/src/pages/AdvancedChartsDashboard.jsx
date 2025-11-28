import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import {
  TrendingUp,
  PieChart,
  BarChart3,
  Activity,
  Globe,
  Layers,
  GitBranch,
  Calendar,
  Target,
  Zap,
  RefreshCw,
} from 'lucide-react';

// Import Nivo Charts
import { NivoBarChart } from '../Components/Charts/NivoCharts/NivoBarChart';
import { NivoDonutChart } from '../Components/Charts/NivoCharts/NivoDonutChart';
import { NivoRadarChart } from '../Components/Charts/NivoCharts/NivoRadarChart';
import { NivoHeatmapChart } from '../Components/Charts/NivoCharts/NivoHeatmapChart';
import { NivoTreemapChart } from '../Components/Charts/NivoCharts/NivoTreemapChart';
import { NivoSunburstChart } from '../Components/Charts/NivoCharts/NivoSunburstChart';
import { NivoStreamChart } from '../Components/Charts/NivoCharts/NivoStreamChart';
import { NivoFunnelChart } from '../Components/Charts/NivoCharts/NivoFunnelChart';
import { NivoSankeyChart } from '../Components/Charts/NivoCharts/NivoSankeyChart';
import { NivoCirclePackingChart } from '../Components/Charts/NivoCharts/NivoCirclePackingChart';
import { NivoBumpChart } from '../Components/Charts/NivoCharts/NivoBumpChart';
import { NivoWaffleChart } from '../Components/Charts/NivoCharts/NivoWaffleChart';
import { chartColors } from '../Components/Charts/NivoCharts/nivoTheme';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Card wrapper component
const ChartCard = ({ title, subtitle, icon: Icon, children, isDark, className = '' }) => (
  <div className={`rounded-xl border ${isDark ? 'bg-[#2f3349] border-gray-700' : 'bg-white border-gray-200'} p-5 overflow-hidden ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      {Icon && (
        <div className={`p-2.5 rounded-lg ${isDark ? 'bg-[#7367f0]/20' : 'bg-[#7367f0]/10'}`}>
          <Icon className="w-5 h-5 text-[#7367f0]" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h3 className={`font-semibold truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
        {subtitle && <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>}
      </div>
    </div>
    <div className="w-full overflow-hidden">
      {children}
    </div>
  </div>
);

// Stats Card
const StatCard = ({ title, value, change, icon: Icon, color, isDark }) => (
  <div className={`rounded-xl border p-5 ${isDark ? 'bg-[#2f3349] border-gray-700' : 'bg-white border-gray-200'}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
        <h3 className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</h3>
        {change && (
          <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}{change}% from last period
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
    </div>
  </div>
);

const AdvancedChartsDashboard = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    statistics: null,
    heatmap: [],
    sunburst: null,
    stream: { keys: [], data: [] },
    funnel: [],
    sankey: { nodes: [], links: [] },
    circlePacking: null,
    bump: [],
    treemap: null,
    radar: { keys: [], data: [] },
    waffle: [],
    sectorBreakdown: [],
  });

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        statsRes,
        heatmapRes,
        sunburstRes,
        streamRes,
        funnelRes,
        sankeyRes,
        circleRes,
        bumpRes,
        treemapRes,
        radarRes,
        waffleRes,
        sectorRes,
      ] = await Promise.all([
        axios.get(`${API_BASE}/api/dashboard/statistics`),
        axios.get(`${API_BASE}/api/dashboard/heatmap`),
        axios.get(`${API_BASE}/api/dashboard/sunburst`),
        axios.get(`${API_BASE}/api/dashboard/stream`),
        axios.get(`${API_BASE}/api/dashboard/funnel`),
        axios.get(`${API_BASE}/api/dashboard/sankey`),
        axios.get(`${API_BASE}/api/dashboard/circle-packing`),
        axios.get(`${API_BASE}/api/dashboard/bump`),
        axios.get(`${API_BASE}/api/dashboard/treemap`),
        axios.get(`${API_BASE}/api/dashboard/radar?dimension=sector`),
        axios.get(`${API_BASE}/api/dashboard/waffle?type=sector`),
        axios.get(`${API_BASE}/api/dashboard/sector-breakdown`),
      ]);

      setData({
        statistics: statsRes.data.data,
        heatmap: heatmapRes.data.data || [],
        sunburst: sunburstRes.data.data,
        stream: streamRes.data.data || { keys: [], data: [] },
        funnel: funnelRes.data.data || [],
        sankey: sankeyRes.data.data || { nodes: [], links: [] },
        circlePacking: circleRes.data.data,
        bump: bumpRes.data.data || [],
        treemap: treemapRes.data.data,
        radar: radarRes.data.data || { keys: [], data: [] },
        waffle: waffleRes.data.data || [],
        sectorBreakdown: sectorRes.data.data || [],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Prepare chart data
  const overview = data.statistics?.overview?.[0] || {};

  const sectorBarData = data.sectorBreakdown.slice(0, 10).map(s => ({
    id: s.sector?.substring(0, 12) || 'Unknown',
    count: s.count,
    intensity: parseFloat(s.avgIntensity) || 0,
  }));

  const sectorDonutData = data.sectorBreakdown.slice(0, 6).map(s => ({
    id: s.sector || 'Unknown',
    label: s.sector || 'Unknown',
    value: s.count,
  }));

  if (loading) {
    return (
      <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293c]' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="w-10 h-10 text-[#7367f0] animate-spin" />
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading advanced charts...</p>
          </div>
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
            Advanced Analytics Dashboard
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            70+ Modern chart visualizations with Nivo
          </p>
        </div>
        <button
          onClick={fetchAllData}
          className="flex items-center gap-2 px-4 py-2 bg-[#7367f0] text-white rounded-lg hover:bg-[#685dd8] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard
          title="Total Insights"
          value={overview.totalRecords?.toLocaleString() || '0'}
          icon={Activity}
          color="#7367f0"
          isDark={isDark}
        />
        <StatCard
          title="Avg Intensity"
          value={overview.avgIntensity?.toFixed(1) || '0'}
          icon={Zap}
          color="#28c76f"
          isDark={isDark}
        />
        <StatCard
          title="Avg Likelihood"
          value={overview.avgLikelihood?.toFixed(1) || '0'}
          icon={Target}
          color="#ff9f43"
          isDark={isDark}
        />
        <StatCard
          title="Avg Relevance"
          value={overview.avgRelevance?.toFixed(1) || '0'}
          icon={TrendingUp}
          color="#00cfe8"
          isDark={isDark}
        />
      </div>

      {/* Row 1: Bar Chart + Donut + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <ChartCard title="Sector Distribution" subtitle="Top 10 sectors by count" icon={BarChart3} isDark={isDark}>
          <NivoBarChart
            data={sectorBarData}
            keys={['count']}
            indexBy="id"
            height={280}
            colors={chartColors.rainbow}
            axisBottomLabel=""
            margin={{ top: 10, right: 10, bottom: 60, left: 50 }}
          />
        </ChartCard>

        <ChartCard title="Sector Breakdown" subtitle="Distribution by sector" icon={PieChart} isDark={isDark}>
          <NivoDonutChart
            data={sectorDonutData}
            height={280}
            innerRadius={0.55}
            enableArcLinkLabels={false}
            colors={chartColors.rainbow}
            centerValue={data.sectorBreakdown.length}
            centerText="Sectors"
          />
        </ChartCard>

        <ChartCard title="Multi-Dimensional Analysis" subtitle="Radar comparison" icon={Target} isDark={isDark}>
          <NivoRadarChart
            data={data.radar.data}
            keys={data.radar.keys}
            indexBy="metric"
            height={280}
            colors={chartColors.rainbow}
          />
        </ChartCard>
      </div>

      {/* Row 2: Heatmap */}
      <div className="grid grid-cols-1 mb-6">
        <ChartCard title="Sector-Region Intensity Heatmap" subtitle="Average intensity by sector and region" icon={Layers} isDark={isDark}>
          <NivoHeatmapChart
            data={data.heatmap}
            height={400}
            margin={{ top: 50, right: 20, bottom: 50, left: 100 }}
          />
        </ChartCard>
      </div>

      {/* Row 3: Treemap + Sunburst + Circle Packing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <ChartCard title="Sector Treemap" subtitle="Hierarchical sector view" icon={Layers} isDark={isDark}>
          <NivoTreemapChart
            data={data.treemap}
            height={350}
            colors={chartColors.rainbow}
          />
        </ChartCard>

        <ChartCard title="Sunburst Chart" subtitle="Sector → Topic hierarchy" icon={Activity} isDark={isDark}>
          <NivoSunburstChart
            data={data.sunburst}
            height={350}
            colors={chartColors.rainbow}
          />
        </ChartCard>

        <ChartCard title="Circle Packing" subtitle="Region → Sector nesting" icon={Globe} isDark={isDark}>
          <NivoCirclePackingChart
            data={data.circlePacking}
            height={350}
            colors={chartColors.rainbow}
          />
        </ChartCard>
      </div>

      {/* Row 4: Stream Chart */}
      <div className="grid grid-cols-1 mb-6">
        <ChartCard title="Topic Stream Over Time" subtitle="Monthly topic distribution flow" icon={Activity} isDark={isDark}>
          <NivoStreamChart
            data={data.stream.data}
            keys={data.stream.keys}
            height={350}
            colors={chartColors.rainbow}
          />
        </ChartCard>
      </div>

      {/* Row 5: Bump Chart */}
      <div className="grid grid-cols-1 mb-6">
        <ChartCard title="Topic Rankings Over Time" subtitle="Monthly ranking changes" icon={TrendingUp} isDark={isDark}>
          <NivoBumpChart
            data={data.bump}
            height={350}
            colors={chartColors.rainbow}
          />
        </ChartCard>
      </div>

      {/* Row 6: Sankey + Funnel + Waffle */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <ChartCard title="Flow Diagram" subtitle="Region → Sector → PESTLE" icon={GitBranch} isDark={isDark} className="lg:col-span-2">
          <NivoSankeyChart
            data={data.sankey}
            height={400}
            colors={chartColors.rainbow}
          />
        </ChartCard>

        <ChartCard title="Insights Funnel" subtitle="Data quality stages" icon={Target} isDark={isDark}>
          <NivoFunnelChart
            data={data.funnel}
            height={400}
            colors={chartColors.rainbow}
          />
        </ChartCard>
      </div>

      {/* Row 7: Waffle Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <ChartCard title="Sector Waffle Chart" subtitle="Percentage distribution" icon={PieChart} isDark={isDark}>
          <NivoWaffleChart
            data={data.waffle}
            total={100}
            height={300}
            colors={chartColors.rainbow}
          />
        </ChartCard>

        <ChartCard title="Chart Types Available" subtitle="Modern visualization library" icon={BarChart3} isDark={isDark}>
          <div className={`grid grid-cols-3 gap-3 p-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {[
              'Bar Charts', 'Line Charts', 'Area Charts',
              'Pie Charts', 'Donut Charts', 'Radar Charts',
              'Heatmaps', 'Treemaps', 'Sunburst',
              'Stream Charts', 'Bump Charts', 'Sankey',
              'Funnel Charts', 'Waffle Charts', 'Circle Packing',
              'Chord Diagrams', 'Calendar', 'And More...'
            ].map((type, i) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-[#25293c]' : 'bg-gray-50'}`}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors.rainbow[i % chartColors.rainbow.length] }} />
                <span className="text-sm">{type}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default AdvancedChartsDashboard;
