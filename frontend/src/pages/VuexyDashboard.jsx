import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import OrdersCard from '../Components/Dashboard/Vuexy/OrdersCard';
import SalesCard from '../Components/Dashboard/Vuexy/SalesCard';
import TotalProfitCard from '../Components/Dashboard/Vuexy/TotalProfitCard';
import TotalSalesCard from '../Components/Dashboard/Vuexy/TotalSalesCard';
import RevenueGrowthCard from '../Components/Dashboard/Vuexy/RevenueGrowthCard';
import EarningReportsCard from '../Components/Dashboard/Vuexy/EarningReportsCard';
import SalesRadarCard from '../Components/Dashboard/Vuexy/SalesRadarCard';
import SalesByCountriesCard from '../Components/Dashboard/Vuexy/SalesByCountriesCard';
import ProjectStatusCard from '../Components/Dashboard/Vuexy/ProjectStatusCard';
import ActiveProjectsCard from '../Components/Dashboard/Vuexy/ActiveProjectsCard';
import LastTransactionCard from '../Components/Dashboard/Vuexy/LastTransactionCard';
import ActivityTimelineCard from '../Components/Dashboard/Vuexy/ActivityTimelineCard';
import WelcomeCard from '../Components/Dashboard/Vuexy/WelcomeCard';
import StatisticsCard from '../Components/Dashboard/Vuexy/StatisticsCard';
import ProfitCard from '../Components/Dashboard/Vuexy/ProfitCard';
import ExpensesCard from '../Components/Dashboard/Vuexy/ExpensesCard';
import RevenueReportCard from '../Components/Dashboard/Vuexy/RevenueReportCard';
import GeneratedLeadsCard from '../Components/Dashboard/Vuexy/GeneratedLeadsCard';
import EarningReportsListCard from '../Components/Dashboard/Vuexy/EarningReportsListCard';
import PopularProductsCard from '../Components/Dashboard/Vuexy/PopularProductsCard';
import OrdersByCountriesCard from '../Components/Dashboard/Vuexy/OrdersByCountriesCard';

const API_URL = import.meta.env.VITE_API_URL;

const VuexyDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const { isDark } = useTheme();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, intensityRes, timelineRes, sectorRes, regionRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/statistics`),
                axios.get(`${API_URL}/api/dashboard/intensity-analysis?groupBy=sector`),
                axios.get(`${API_URL}/api/dashboard/timeline`),
                axios.get(`${API_URL}/api/dashboard/sector-breakdown`),
                axios.get(`${API_URL}/api/dashboard/regional-distribution`)
            ]);

            const statistics = statsRes.data.success ? statsRes.data.data : {};
            const intensity = intensityRes.data.success ? intensityRes.data.data : {};
            const timeline = timelineRes.data.success ? timelineRes.data.data : {};
            const sectors = sectorRes.data.success ? sectorRes.data.data : [];
            const regions = regionRes.data.success ? regionRes.data.data : [];

            setDashboardData({
                statistics,
                intensity,
                timeline,
                sectors,
                regions,
                overview: statistics?.overview?.[0] || {},
                byCountry: statistics?.byCountry || [],
                bySector: statistics?.bySector || [],
                byTopic: statistics?.byTopic || [],
                byPestle: statistics?.byPestle || [],
                byYear: statistics?.byYear || [],
                byRegion: statistics?.byRegion || []
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#7367F0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className={isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}>Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    // Prepare data for components
    const overview = dashboardData?.overview || {};
    const totalRecords = overview.totalRecords || 0;
    const avgIntensity = overview.avgIntensity?.toFixed(1) || 0;
    const avgLikelihood = overview.avgLikelihood?.toFixed(1) || 0;
    const avgRelevance = overview.avgRelevance?.toFixed(1) || 0;

    // Statistics card data
    const statisticsData = [
        { label: 'Records', value: totalRecords.toLocaleString(), color: '#7367F0' },
        { label: 'Intensity', value: avgIntensity, color: '#28C76F' },
        { label: 'Likelihood', value: avgLikelihood, color: '#EA5455' },
        { label: 'Relevance', value: avgRelevance, color: '#FF9F43' },
    ];

    // Orders card data - using sector data
    const ordersData = dashboardData?.bySector?.slice(0, 7).map((s, i) => ({
        name: s._id?.substring(0, 3) || `S${i}`,
        value: s.count || 0
    })) || [];

    // Sales card data - using topic data
    const salesData = dashboardData?.byTopic?.slice(0, 7).map((t, i) => ({
        name: t._id?.substring(0, 3) || `T${i}`,
        value: t.count || 0
    })) || [];

    // Countries data for SalesByCountries
    const countryFlags = {
        'United States': '🇺🇸', 'USA': '🇺🇸', 'Brazil': '🇧🇷', 'India': '🇮🇳', 'Australia': '🇦🇺',
        'France': '🇫🇷', 'China': '🇨🇳', 'Germany': '🇩🇪', 'Japan': '🇯🇵', 'United Kingdom': '🇬🇧',
        'Canada': '🇨🇦', 'Russia': '🇷🇺', 'Mexico': '🇲🇽', 'Spain': '🇪🇸', 'Italy': '🇮🇹',
        'South Korea': '🇰🇷', 'Indonesia': '🇮🇩', 'Saudi Arabia': '🇸🇦', 'Iran': '🇮🇷', 'Iraq': '🇮🇶',
        'Egypt': '🇪🇬', 'Nigeria': '🇳🇬', 'South Africa': '🇿🇦', 'Poland': '🇵🇱', 'Lebanon': '🇱🇧',
        'Libya': '🇱🇾', 'Syria': '🇸🇾', 'Kuwait': '🇰🇼', 'Venezuela': '🇻🇪', 'Angola': '🇦🇴'
    };

    const countriesData = dashboardData?.byCountry?.slice(0, 6).map((c, i) => ({
        country: c._id || 'Unknown',
        flag: countryFlags[c._id] || '🌍',
        amount: `${c.count?.toLocaleString() || 0}`,
        change: c.avgIntensity?.toFixed(1) || 0,
        isPositive: (c.avgIntensity || 0) > 3
    })) || [];

    // Revenue Report data - using year data
    const revenueData = dashboardData?.byYear?.map(y => ({
        month: y._id || 'N/A',
        earning: Math.round(y.avgIntensity * 20) || 0,
        expense: -Math.round((y.avgIntensity || 0) * 8)
    })) || [];

    // Radar data for sales
    const radarData = dashboardData?.byPestle?.map(p => ({
        subject: p._id?.substring(0, 6) || 'N/A',
        sales: Math.round((p.avgIntensity || 0) * 15),
        visits: p.count || 0
    })) || [];

    // Earning reports data - using sector intensity
    const earningReportsData = dashboardData?.bySector?.slice(0, 9).map((s, i) => ({
        month: s._id?.substring(0, 3) || `S${i}`,
        value: Math.round(s.avgIntensity * 10) || 0
    })) || [];

    // Sectors as projects
    const projectsData = dashboardData?.bySector?.slice(0, 4).map((s, i) => ({
        name: s._id || `Sector ${i + 1}`,
        progress: Math.min(Math.round((s.avgIntensity || 0) * 15), 100),
        color: ['#7367F0', '#28C76F', '#00CFE8', '#FF9F43'][i % 4]
    })) || [];

    // Topics as active projects
    const activeProjectsData = dashboardData?.byTopic?.slice(0, 5).map((t, i) => ({
        name: t._id || `Topic ${i + 1}`,
        count: t.count || 0,
        percentage: Math.round((t.count / totalRecords) * 100) || 0
    })) || [];

    // Regions as transactions
    const transactionsData = dashboardData?.byRegion?.slice(0, 5).map((r, i) => ({
        name: r._id || `Region ${i + 1}`,
        amount: r.count || 0,
        type: i % 2 === 0 ? 'credit' : 'debit',
        date: new Date().toLocaleDateString()
    })) || [];

    // PESTLE as timeline
    const timelineData = dashboardData?.byPestle?.map((p, i) => ({
        title: p._id || `PESTLE ${i + 1}`,
        description: `${p.count || 0} records with avg intensity ${p.avgIntensity?.toFixed(1) || 0}`,
        type: ['primary', 'success', 'warning', 'info', 'danger'][i % 5]
    })) || [];

    // Popular products - using topics
    const popularProductsData = dashboardData?.byTopic?.slice(0, 5).map((t, i) => ({
        name: t._id || `Topic ${i + 1}`,
        sales: t.count || 0,
        revenue: `$${(t.count * 10).toLocaleString()}`
    })) || [];

    // Orders by countries - using regions
    const ordersByCountriesData = dashboardData?.byRegion?.slice(0, 6).map((r, i) => ({
        country: r._id || 'Unknown',
        orders: r.count || 0,
        percentage: Math.round((r.count / totalRecords) * 100) || 0
    })) || [];

    // Profit chart data - using intensity analysis
    const profitData = dashboardData?.intensity?.analysis?.slice(0, 7).map((item) => ({
        value: Math.round(item.avgIntensity * 10) || 0
    })) || [];

    return (
        <div className={`min-h-screen p-6 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            <div className="max-w-[1600px] mx-auto">
                {/* Top Row - Welcome & Statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                    <div className="lg:col-span-4">
                        <WelcomeCard userName="Admin" amount={`${totalRecords.toLocaleString()}`} subtitle="Total Records" />
                    </div>
                    <div className="lg:col-span-8">
                        <StatisticsCard data={statisticsData} />
                    </div>
                </div>

                {/* Second Row - Profit, Expenses, Revenue Report */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 mb-6">
                    <div className="lg:col-span-2">
                        <ProfitCard data={profitData} value={avgIntensity} />
                    </div>
                    <div className="lg:col-span-2">
                        <ExpensesCard value={avgLikelihood} percentage={(avgLikelihood / 5) * 100} />
                    </div>
                    <div className="lg:col-span-5">
                        <RevenueReportCard
                            data={dashboardData?.byYear?.map(y => ({
                                month: String(y._id || '').slice(-2) || 'N/A',
                                intensity: Math.round(y.avgIntensity || 0),
                                likelihood: Math.round(y.avgLikelihood || 0)
                            })) || []}
                            total={totalRecords}
                            average={avgIntensity}
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <GeneratedLeadsCard
                            total={dashboardData?.byTopic?.length || 0}
                            topCount={Math.min(10, dashboardData?.byTopic?.length || 0)}
                        />
                    </div>
                </div>

                {/* Third Row - Small Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                    <OrdersCard data={ordersData} total={dashboardData?.bySector?.reduce((a, b) => a + (b.count || 0), 0) || 0} />
                    <SalesCard data={salesData} total={dashboardData?.byTopic?.reduce((a, b) => a + (b.count || 0), 0) || 0} />
                    <TotalProfitCard avgIntensity={avgIntensity} maxIntensity={Math.max(...(dashboardData?.bySector?.map(s => s.avgIntensity) || [10]))} />
                    <TotalSalesCard sectorCount={dashboardData?.bySector?.length || 0} />
                    <RevenueGrowthCard byYear={dashboardData?.byYear || []} />
                </div>

                {/* Fourth Row - Earning Reports & Sales Radar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                        <EarningReportsCard
                            sectors={dashboardData?.bySector || []}
                            topics={dashboardData?.byTopic || []}
                            regions={dashboardData?.byRegion || []}
                        />
                    </div>
                    <SalesRadarCard pestle={dashboardData?.byPestle || []} />
                </div>

                {/* Fifth Row - Sales by Countries, Project Status, Active Projects */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <SalesByCountriesCard data={dashboardData?.byCountry || []} />
                    <ProjectStatusCard regions={dashboardData?.byRegion || []} total={totalRecords} />
                    <ActiveProjectsCard sectors={dashboardData?.bySector || []} />
                </div>

                {/* Sixth Row - Earning Reports List, Popular Products, Orders by Countries */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <EarningReportsListCard sectors={dashboardData?.bySector || []} />
                    <PopularProductsCard sources={dashboardData?.byTopic || []} />
                    <OrdersByCountriesCard regions={dashboardData?.byRegion || []} />
                </div>

                {/* Seventh Row - Last Transaction & Activity Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LastTransactionCard topics={dashboardData?.byTopic || []} />
                    <ActivityTimelineCard pestle={dashboardData?.byPestle || []} />
                </div>
            </div>
        </div>
    );
};

export default VuexyDashboard;
