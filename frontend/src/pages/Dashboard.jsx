import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MetricCard from '../Components/Dashboard/MetricCard';
import CountryChart from '../Components/Dashboard/CountryChart';
import SectorDonut from '../Components/Dashboard/SectorDonut';
import IntensityBarChart from '../Components/Dashboard/IntensityBarChart';
import TimelineTrend from '../Components/Dashboard/TimelineTrend';
import LikelihoodRelevanceChart from '../Components/Dashboard/LikelihoodRelevanceChart';
import RegionSectorChart from '../Components/Dashboard/RegionSectorChart';
import PestleRadar from '../Components/Dashboard/PestleRadar';
import SwotPolar from '../Components/Dashboard/SwotPolar';
import SourceTreeMap from '../Components/Dashboard/SourceTreeMap';
import WebsiteAnalytics from '../Components/Dashboard/WebsiteAnalytics';
import SalesOverview from '../Components/Dashboard/SalesOverview';
import CampaignState from '../Components/Dashboard/CampaignState';
import { BarChart3, TrendingUp, Globe, Target, ShoppingCart, Users, DollarSign, Activity } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    totalRecords: 0,
    avgIntensity: 0,
    avgLikelihood: 0,
    avgRelevance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/dashboard/statistics`);
      const apiData = response.data.success ? response.data.data : {};
      setStatistics({
        totalRecords: apiData.totalRecords || 0,
        avgIntensity: apiData.avgIntensity || 0,
        avgLikelihood: apiData.avgLikelihood || 0,
        avgRelevance: apiData.avgRelevance || 0
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your data.</p>
        </div>

        {/* Top Row - Website Analytics, Daily Sales, Sales Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-6">
          {/* Website Analytics - Large Card */}
          <div className="lg:col-span-4">
            <WebsiteAnalytics />
          </div>

          {/* Average Daily Sales */}
          <div className="lg:col-span-4">
            <TimelineTrend />
          </div>

          {/* Sales Overview */}
          <div className="lg:col-span-4">
            <SalesOverview />
          </div>
        </div>

        {/* Second Row - Earning Reports & Support Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IntensityBarChart />
          <PestleRadar />
        </div>

        {/* Third Row - Sales by Countries, Total Earning, Monthly Campaign */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <CountryChart />
          <LikelihoodRelevanceChart />
          <CampaignState />
        </div>

        {/* Fourth Row - Sector Donut & Region Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SectorDonut />
          <RegionSectorChart />
        </div>

        {/* Fifth Row - SWOT & Source TreeMap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SwotPolar />
          <SourceTreeMap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
