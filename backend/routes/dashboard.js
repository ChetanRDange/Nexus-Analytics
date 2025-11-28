const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  getFilterOptions,
  getStatistics,
  getIntensityAnalysis,
  getLikelihoodRelevanceData,
  getTimelineData,
  getTopCountries,
  getSectorBreakdown,
  getSwotAnalysis,
  getRegionSectorDistribution,
  getMonthlyTrends,
  getSourceDistribution,
  getTopicAnalysis,
  getCountryAnalysis,
  getInsightsList,
  getPestleAnalysis,
  // New advanced chart endpoints
  getHeatmapData,
  getSunburstData,
  getChordData,
  getStreamData,
  getSankeyData,
  getFunnelData,
  getWaffleData,
  getCalendarData,
  getCirclePackingData,
  getBumpData,
  getTreemapData,
  getRadarData,
} = require("../controllers/dashboard-api-controller");

router.get("/data", getDashboardData);
router.get("/filters", getFilterOptions);
router.get("/statistics", getStatistics);
router.get("/intensity-analysis", getIntensityAnalysis);
router.get("/likelihood-relevance", getLikelihoodRelevanceData);
router.get("/timeline", getTimelineData);
router.get("/top-countries", getTopCountries);
router.get("/sector-breakdown", getSectorBreakdown);
router.get("/swot-analysis", getSwotAnalysis);
router.get("/region-sector", getRegionSectorDistribution);
router.get("/monthly-trends", getMonthlyTrends);
router.get("/source-distribution", getSourceDistribution);
router.get("/topic-analysis", getTopicAnalysis);
router.get("/country-analysis", getCountryAnalysis);
router.get("/insights-list", getInsightsList);
router.get("/pestle-analysis", getPestleAnalysis);

// New advanced chart routes
router.get("/heatmap", getHeatmapData);
router.get("/sunburst", getSunburstData);
router.get("/chord", getChordData);
router.get("/stream", getStreamData);
router.get("/sankey", getSankeyData);
router.get("/funnel", getFunnelData);
router.get("/waffle", getWaffleData);
router.get("/calendar", getCalendarData);
router.get("/circle-packing", getCirclePackingData);
router.get("/bump", getBumpData);
router.get("/treemap", getTreemapData);
router.get("/radar", getRadarData);

module.exports = router;
