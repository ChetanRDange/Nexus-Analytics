const DashboardData = require("../models/DashboardData");

/**
 * Get all dashboard data with advanced filtering
 * Supports multiple filters: year, topic, sector, region, pestle, source, swot, country, city
 */
const getDashboardData = async (req, res) => {
  try {
    const {
      end_year,
      start_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city,
      minIntensity,
      maxIntensity,
      minLikelihood,
      maxLikelihood,
      minRelevance,
      maxRelevance,
      limit = 1000,
      skip = 0,
      sortBy = "added",
      sortOrder = "desc",
    } = req.query;

    // Build filter object
    const filter = {};

    // Text filters - support multiple values separated by comma
    if (end_year)
      filter.end_year = { $in: end_year.split(",").map((y) => y.trim()) };
    if (start_year)
      filter.start_year = { $in: start_year.split(",").map((y) => y.trim()) };
    if (topic) filter.topic = { $in: topic.split(",").map((t) => t.trim()) };
    if (sector) filter.sector = { $in: sector.split(",").map((s) => s.trim()) };
    if (region) filter.region = { $in: region.split(",").map((r) => r.trim()) };
    if (pestle) filter.pestle = { $in: pestle.split(",").map((p) => p.trim()) };
    if (source) filter.source = { $in: source.split(",").map((s) => s.trim()) };
    if (swot) filter.swot = { $in: swot.split(",").map((s) => s.trim()) };
    if (country)
      filter.country = { $in: country.split(",").map((c) => c.trim()) };
    if (city) filter.city = { $in: city.split(",").map((c) => c.trim()) };

    // Numeric range filters
    if (minIntensity || maxIntensity) {
      filter.intensity = {};
      if (minIntensity) filter.intensity.$gte = Number(minIntensity);
      if (maxIntensity) filter.intensity.$lte = Number(maxIntensity);
    }

    if (minLikelihood || maxLikelihood) {
      filter.likelihood = {};
      if (minLikelihood) filter.likelihood.$gte = Number(minLikelihood);
      if (maxLikelihood) filter.likelihood.$lte = Number(maxLikelihood);
    }

    if (minRelevance || maxRelevance) {
      filter.relevance = {};
      if (minRelevance) filter.relevance.$gte = Number(minRelevance);
      if (maxRelevance) filter.relevance.$lte = Number(maxRelevance);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Execute query with filters
    const data = await DashboardData.find(filter)
      .sort(sort)
      .limit(Number(limit))
      .skip(Number(skip))
      .lean();

    // Get total count for pagination
    const total = await DashboardData.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        records: data,
        pagination: {
          total,
          limit: Number(limit),
          skip: Number(skip),
          hasMore: total > Number(skip) + Number(limit),
        },
        filters: filter,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: error.message,
    });
  }
};

/**
 * Get distinct filter values for dropdown options
 */
const getFilterOptions = async (req, res) => {
  try {
    const [
      endYears,
      startYears,
      topics,
      sectors,
      regions,
      pestles,
      sources,
      swots,
      countries,
      cities,
    ] = await Promise.all([
      DashboardData.distinct("end_year").then((vals) => vals.filter((v) => v)),
      DashboardData.distinct("start_year").then((vals) =>
        vals.filter((v) => v)
      ),
      DashboardData.distinct("topic").then((vals) => vals.filter((v) => v)),
      DashboardData.distinct("sector").then((vals) => vals.filter((v) => v)),
      DashboardData.distinct("region").then((vals) => vals.filter((v) => v)),
      DashboardData.distinct("pestle").then((vals) => vals.filter((v) => v)),
      DashboardData.distinct("source").then((vals) => vals.filter((v) => v)),
      DashboardData.distinct("swot").then((vals) => vals.filter((v) => v)),
      DashboardData.distinct("country").then((vals) => vals.filter((v) => v)),
      DashboardData.distinct("city").then((vals) => vals.filter((v) => v)),
    ]);

    res.status(200).json({
      success: true,
      message: "Filter options fetched successfully",
      data: {
        endYears: endYears.sort(),
        startYears: startYears.sort(),
        topics: topics.sort(),
        sectors: sectors.sort(),
        regions: regions.sort(),
        pestles: pestles.sort(),
        sources: sources.sort(),
        swots: swots.sort(),
        countries: countries.sort(),
        cities: cities.sort(),
      },
    });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching filter options",
      error: error.message,
    });
  }
};

/**
 * Get aggregated statistics for visualization
 */
const getStatistics = async (req, res) => {
  try {
    const stats = await DashboardData.aggregate([
      {
        $facet: {
          // Overall statistics
          overview: [
            {
              $group: {
                _id: null,
                totalRecords: { $sum: 1 },
                avgIntensity: { $avg: "$intensity" },
                avgLikelihood: { $avg: "$likelihood" },
                avgRelevance: { $avg: "$relevance" },
                maxIntensity: { $max: "$intensity" },
                maxLikelihood: { $max: "$likelihood" },
                maxRelevance: { $max: "$relevance" },
              },
            },
          ],
          // By sector
          bySector: [
            {
              $group: {
                _id: "$sector",
                count: { $sum: 1 },
                avgIntensity: { $avg: "$intensity" },
                avgLikelihood: { $avg: "$likelihood" },
                avgRelevance: { $avg: "$relevance" },
              },
            },
            { $match: { _id: { $ne: "" } } },
            { $sort: { count: -1 } },
            { $limit: 20 },
          ],
          // By region
          byRegion: [
            {
              $group: {
                _id: "$region",
                count: { $sum: 1 },
                avgIntensity: { $avg: "$intensity" },
                avgLikelihood: { $avg: "$likelihood" },
              },
            },
            { $match: { _id: { $ne: "" } } },
            { $sort: { count: -1 } },
          ],
          // By country
          byCountry: [
            {
              $group: {
                _id: "$country",
                count: { $sum: 1 },
                avgIntensity: { $avg: "$intensity" },
              },
            },
            { $match: { _id: { $ne: "" } } },
            { $sort: { count: -1 } },
            { $limit: 20 },
          ],
          // By topic
          byTopic: [
            {
              $group: {
                _id: "$topic",
                count: { $sum: 1 },
                avgIntensity: { $avg: "$intensity" },
                avgRelevance: { $avg: "$relevance" },
              },
            },
            { $match: { _id: { $ne: "" } } },
            { $sort: { count: -1 } },
            { $limit: 20 },
          ],
          // By PESTLE
          byPestle: [
            {
              $group: {
                _id: "$pestle",
                count: { $sum: 1 },
                avgIntensity: { $avg: "$intensity" },
              },
            },
            { $match: { _id: { $ne: "" } } },
            { $sort: { count: -1 } },
          ],
          // By year
          byYear: [
            {
              $match: {
                end_year: { $ne: "" },
              },
            },
            {
              $group: {
                _id: "$end_year",
                count: { $sum: 1 },
                avgIntensity: { $avg: "$intensity" },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Statistics fetched successfully",
      data: stats[0],
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

/**
 * Get intensity analysis by different dimensions
 */
const getIntensityAnalysis = async (req, res) => {
  try {
    const { groupBy = "sector" } = req.query;

    const validGroupFields = [
      "sector",
      "region",
      "country",
      "topic",
      "pestle",
      "source",
    ];
    if (!validGroupFields.includes(groupBy)) {
      return res.status(400).json({
        success: false,
        message: `Invalid groupBy field. Must be one of: ${validGroupFields.join(
          ", "
        )}`,
      });
    }

    const analysis = await DashboardData.aggregate([
      {
        $match: {
          [groupBy]: { $ne: "" },
          intensity: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: `$${groupBy}`,
          totalRecords: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          maxIntensity: { $max: "$intensity" },
          minIntensity: { $min: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
        },
      },
      {
        $sort: { avgIntensity: -1 },
      },
      {
        $limit: 50,
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Intensity analysis fetched successfully",
      data: {
        groupBy,
        analysis,
      },
    });
  } catch (error) {
    console.error("Error in intensity analysis:", error);
    res.status(500).json({
      success: false,
      message: "Error in intensity analysis",
      error: error.message,
    });
  }
};

/**
 * Get likelihood vs relevance correlation data
 */
const getLikelihoodRelevanceData = async (req, res) => {
  try {
    const data = await DashboardData.aggregate([
      {
        $match: {
          likelihood: { $gt: 0 },
          relevance: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: {
            likelihood: "$likelihood",
            relevance: "$relevance",
            sector: "$sector",
          },
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
        },
      },
      {
        $project: {
          _id: 0,
          likelihood: "$_id.likelihood",
          relevance: "$_id.relevance",
          sector: "$_id.sector",
          count: 1,
          avgIntensity: 1,
        },
      },
      { $limit: 500 },
    ]);

    res.status(200).json({
      success: true,
      message: "Likelihood vs Relevance data fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching correlation data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching correlation data",
      error: error.message,
    });
  }
};

/**
 * Get timeline data (year-based trends)
 */
const getTimelineData = async (req, res) => {
  try {
    const { yearField = "end_year" } = req.query;

    if (!["end_year", "start_year"].includes(yearField)) {
      return res.status(400).json({
        success: false,
        message: "Invalid yearField. Must be either end_year or start_year",
      });
    }

    const timeline = await DashboardData.aggregate([
      {
        $match: {
          [yearField]: { $ne: "", $regex: /^\d{4}$/ }, // Only 4-digit years
        },
      },
      {
        $group: {
          _id: `$${yearField}`,
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          sectors: { $addToSet: "$sector" },
          topics: { $addToSet: "$topic" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Timeline data fetched successfully",
      data: {
        yearField,
        timeline,
      },
    });
  } catch (error) {
    console.error("Error fetching timeline data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching timeline data",
      error: error.message,
    });
  }
};

/**
 * Get top countries with record counts and metrics
 */
const getTopCountries = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const topCountries = await DashboardData.aggregate([
      {
        $match: {
          country: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: Number(limit),
      },
    ]);

    // Calculate total for percentage
    const total = topCountries.reduce((sum, item) => sum + item.count, 0);

    const countriesWithPercentage = topCountries.map((country) => ({
      country: country._id,
      count: country.count,
      percentage: ((country.count / total) * 100).toFixed(2),
      avgIntensity: country.avgIntensity ? country.avgIntensity.toFixed(2) : 0,
      avgLikelihood: country.avgLikelihood
        ? country.avgLikelihood.toFixed(2)
        : 0,
      avgRelevance: country.avgRelevance ? country.avgRelevance.toFixed(2) : 0,
    }));

    res.status(200).json({
      success: true,
      message: "Top countries fetched successfully",
      data: countriesWithPercentage,
    });
  } catch (error) {
    console.error("Error fetching top countries:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching top countries",
      error: error.message,
    });
  }
};

/**
 * Get sector breakdown with percentages
 */
const getSectorBreakdown = async (req, res) => {
  try {
    const sectorData = await DashboardData.aggregate([
      {
        $match: {
          sector: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$sector",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const total = sectorData.reduce((sum, item) => sum + item.count, 0);

    const sectorsWithPercentage = sectorData.map((sector) => ({
      sector: sector._id,
      count: sector.count,
      percentage: ((sector.count / total) * 100).toFixed(2),
      avgIntensity: sector.avgIntensity ? sector.avgIntensity.toFixed(2) : 0,
      avgLikelihood: sector.avgLikelihood ? sector.avgLikelihood.toFixed(2) : 0,
      avgRelevance: sector.avgRelevance ? sector.avgRelevance.toFixed(2) : 0,
    }));

    res.status(200).json({
      success: true,
      message: "Sector breakdown fetched successfully",
      data: sectorsWithPercentage,
      total,
    });
  } catch (error) {
    console.error("Error fetching sector breakdown:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching sector breakdown",
      error: error.message,
    });
  }
};

/**
 * Get SWOT analysis distribution
 */
const getSwotAnalysis = async (req, res) => {
  try {
    const swotData = await DashboardData.aggregate([
      {
        $match: {
          swot: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$swot",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
        },
      },
    ]);

    const swotMap = {
      strength: 0,
      weakness: 0,
      opportunity: 0,
      threat: 0,
    };

    const details = [];

    swotData.forEach((item) => {
      const swotType = item._id.toLowerCase();
      details.push({
        type: item._id,
        count: item.count,
        avgIntensity: item.avgIntensity ? item.avgIntensity.toFixed(2) : 0,
      });

      if (swotType.includes("strength")) swotMap.strength += item.count;
      else if (swotType.includes("weakness")) swotMap.weakness += item.count;
      else if (swotType.includes("opportunity"))
        swotMap.opportunity += item.count;
      else if (swotType.includes("threat")) swotMap.threat += item.count;
    });

    res.status(200).json({
      success: true,
      message: "SWOT analysis fetched successfully",
      data: {
        summary: swotMap,
        details,
      },
    });
  } catch (error) {
    console.error("Error fetching SWOT analysis:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching SWOT analysis",
      error: error.message,
    });
  }
};

/**
 * Get region-sector cross distribution
 */
const getRegionSectorDistribution = async (req, res) => {
  try {
    const distribution = await DashboardData.aggregate([
      {
        $match: {
          region: { $ne: "" },
          sector: { $ne: "" },
        },
      },
      {
        $group: {
          _id: {
            region: "$region",
            sector: "$sector",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.region",
          sectors: {
            $push: {
              name: "$_id.sector",
              count: "$count",
            },
          },
          totalCount: { $sum: "$count" },
        },
      },
      {
        $sort: { totalCount: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Region-sector distribution fetched successfully",
      data: distribution.map((item) => ({
        region: item._id,
        totalCount: item.totalCount,
        sectors: item.sectors.sort((a, b) => b.count - a.count),
      })),
    });
  } catch (error) {
    console.error("Error fetching region-sector distribution:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching region-sector distribution",
      error: error.message,
    });
  }
};

/**
 * Get monthly trends for a specific year
 */
const getMonthlyTrends = async (req, res) => {
  try {
    const { year } = req.query;

    // Extract month from 'added' field and aggregate
    const trends = await DashboardData.aggregate([
      {
        $match: {
          added: { $ne: "" },
        },
      },
      {
        $addFields: {
          month: {
            $substr: ["$added", 0, { $indexOfBytes: ["$added", ","] }],
          },
        },
      },
      {
        $group: {
          _id: "$month",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const sortedTrends = trends
      .sort((a, b) => monthOrder.indexOf(a._id) - monthOrder.indexOf(b._id))
      .map((item) => ({
        month: item._id,
        count: item.count,
        avgIntensity: item.avgIntensity ? item.avgIntensity.toFixed(2) : 0,
        avgLikelihood: item.avgLikelihood ? item.avgLikelihood.toFixed(2) : 0,
        avgRelevance: item.avgRelevance ? item.avgRelevance.toFixed(2) : 0,
      }));

    res.status(200).json({
      success: true,
      message: "Monthly trends fetched successfully",
      data: sortedTrends,
    });
  } catch (error) {
    console.error("Error fetching monthly trends:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching monthly trends",
      error: error.message,
    });
  }
};

/**
 * Get source distribution for tree map
 */
const getSourceDistribution = async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const sources = await DashboardData.aggregate([
      {
        $match: {
          source: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: Number(limit),
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Source distribution fetched successfully",
      data: sources.map((item) => ({
        source: item._id,
        count: item.count,
        avgIntensity: item.avgIntensity ? item.avgIntensity.toFixed(2) : 0,
      })),
    });
  } catch (error) {
    console.error("Error fetching source distribution:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching source distribution",
      error: error.message,
    });
  }
};

/**
 * Get topic analysis with detailed breakdown
 */
const getTopicAnalysis = async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const topics = await DashboardData.aggregate([
      {
        $match: {
          topic: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          sectors: { $addToSet: "$sector" },
          regions: { $addToSet: "$region" },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: Number(limit),
      },
    ]);

    const total = topics.reduce((sum, item) => sum + item.count, 0);

    res.status(200).json({
      success: true,
      message: "Topic analysis fetched successfully",
      data: topics.map((item) => ({
        topic: item._id,
        count: item.count,
        percentage: ((item.count / total) * 100).toFixed(2),
        avgIntensity: item.avgIntensity ? item.avgIntensity.toFixed(2) : 0,
        avgLikelihood: item.avgLikelihood ? item.avgLikelihood.toFixed(2) : 0,
        avgRelevance: item.avgRelevance ? item.avgRelevance.toFixed(2) : 0,
        sectorCount: item.sectors.filter((s) => s).length,
        regionCount: item.regions.filter((r) => r).length,
      })),
      total,
    });
  } catch (error) {
    console.error("Error fetching topic analysis:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching topic analysis",
      error: error.message,
    });
  }
};

/**
 * Get country detailed analysis
 */
const getCountryAnalysis = async (req, res) => {
  try {
    const { limit = 30 } = req.query;

    const countries = await DashboardData.aggregate([
      {
        $match: {
          country: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          sectors: { $addToSet: "$sector" },
          topics: { $addToSet: "$topic" },
          region: { $first: "$region" },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: Number(limit),
      },
    ]);

    const total = countries.reduce((sum, item) => sum + item.count, 0);

    res.status(200).json({
      success: true,
      message: "Country analysis fetched successfully",
      data: countries.map((item) => ({
        country: item._id,
        region: item.region || "Unknown",
        count: item.count,
        percentage: ((item.count / total) * 100).toFixed(2),
        avgIntensity: item.avgIntensity ? item.avgIntensity.toFixed(2) : 0,
        avgLikelihood: item.avgLikelihood ? item.avgLikelihood.toFixed(2) : 0,
        avgRelevance: item.avgRelevance ? item.avgRelevance.toFixed(2) : 0,
        sectorCount: item.sectors.filter((s) => s).length,
        topicCount: item.topics.filter((t) => t).length,
      })),
      total,
    });
  } catch (error) {
    console.error("Error fetching country analysis:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching country analysis",
      error: error.message,
    });
  }
};

/**
 * Get insights list with pagination and filtering
 */
const getInsightsList = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sector = "",
      region = "",
      topic = "",
      sortBy = "added",
      sortOrder = "desc",
    } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { insight: { $regex: search, $options: "i" } },
        { topic: { $regex: search, $options: "i" } },
      ];
    }
    if (sector) filter.sector = sector;
    if (region) filter.region = region;
    if (topic) filter.topic = topic;

    const skip = (Number(page) - 1) * Number(limit);
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [insights, total] = await Promise.all([
      DashboardData.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      DashboardData.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: "Insights list fetched successfully",
      data: {
        insights: insights.map((item, index) => ({
          id: item._id,
          index: skip + index + 1,
          title: item.title || "Untitled Insight",
          insight: item.insight || "",
          sector: item.sector || "General",
          topic: item.topic || "General",
          region: item.region || "Global",
          country: item.country || "",
          source: item.source || "Unknown",
          intensity: item.intensity || 0,
          likelihood: item.likelihood || 0,
          relevance: item.relevance || 0,
          pestle: item.pestle || "",
          published: item.published || "",
          added: item.added || "",
          url: item.url || "",
        })),
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
          hasNext: skip + Number(limit) < total,
          hasPrev: Number(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching insights list:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching insights list",
      error: error.message,
    });
  }
};

/**
 * Get PESTLE detailed analysis
 */
const getPestleAnalysis = async (req, res) => {
  try {
    const pestleData = await DashboardData.aggregate([
      {
        $match: {
          pestle: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$pestle",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          sectors: { $addToSet: "$sector" },
          topics: { $addToSet: "$topic" },
          regions: { $addToSet: "$region" },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const total = pestleData.reduce((sum, item) => sum + item.count, 0);

    res.status(200).json({
      success: true,
      message: "PESTLE analysis fetched successfully",
      data: pestleData.map((item) => ({
        pestle: item._id,
        count: item.count,
        percentage: ((item.count / total) * 100).toFixed(2),
        avgIntensity: item.avgIntensity ? item.avgIntensity.toFixed(2) : 0,
        avgLikelihood: item.avgLikelihood ? item.avgLikelihood.toFixed(2) : 0,
        avgRelevance: item.avgRelevance ? item.avgRelevance.toFixed(2) : 0,
        sectorCount: item.sectors.filter((s) => s).length,
        topicCount: item.topics.filter((t) => t).length,
        regionCount: item.regions.filter((r) => r).length,
      })),
      total,
    });
  } catch (error) {
    console.error("Error fetching PESTLE analysis:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching PESTLE analysis",
      error: error.message,
    });
  }
};

/**
 * Get heatmap data - Sector vs Region intensity
 */
const getHeatmapData = async (req, res) => {
  try {
    const heatmapData = await DashboardData.aggregate([
      {
        $match: {
          sector: { $ne: "" },
          region: { $ne: "" },
        },
      },
      {
        $group: {
          _id: {
            sector: "$sector",
            region: "$region",
          },
          avgIntensity: { $avg: "$intensity" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.sector",
          data: {
            $push: {
              x: "$_id.region",
              y: { $round: ["$avgIntensity", 1] },
            },
          },
        },
      },
      {
        $project: {
          id: "$_id",
          data: 1,
          _id: 0,
        },
      },
      { $sort: { id: 1 } },
      { $limit: 12 },
    ]);

    res.status(200).json({
      success: true,
      message: "Heatmap data fetched successfully",
      data: heatmapData,
    });
  } catch (error) {
    console.error("Error fetching heatmap data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching heatmap data",
      error: error.message,
    });
  }
};

/**
 * Get sunburst/hierarchy data - Sector > Topic > Source
 */
const getSunburstData = async (req, res) => {
  try {
    const hierarchyData = await DashboardData.aggregate([
      {
        $match: {
          sector: { $ne: "" },
          topic: { $ne: "" },
        },
      },
      {
        $group: {
          _id: {
            sector: "$sector",
            topic: "$topic",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.sector",
          topics: {
            $push: {
              name: "$_id.topic",
              value: "$count",
            },
          },
          total: { $sum: "$count" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 10 },
    ]);

    const sunburstData = {
      name: "Insights",
      children: hierarchyData.map((sector) => ({
        name: sector._id,
        children: sector.topics
          .sort((a, b) => b.value - a.value)
          .slice(0, 8)
          .map((topic) => ({
            name: topic.name,
            value: topic.value,
          })),
      })),
    };

    res.status(200).json({
      success: true,
      message: "Sunburst data fetched successfully",
      data: sunburstData,
    });
  } catch (error) {
    console.error("Error fetching sunburst data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching sunburst data",
      error: error.message,
    });
  }
};

/**
 * Get chord diagram data - Sector relationships via shared regions
 */
const getChordData = async (req, res) => {
  try {
    const sectors = await DashboardData.distinct("sector").then((vals) =>
      vals.filter((v) => v).slice(0, 8)
    );

    // Create matrix of sector co-occurrences via region
    const coOccurrence = await DashboardData.aggregate([
      {
        $match: {
          sector: { $in: sectors },
          region: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$region",
          sectors: { $addToSet: "$sector" },
        },
      },
    ]);

    // Initialize matrix
    const matrix = sectors.map(() => sectors.map(() => 0));

    // Fill matrix based on sectors sharing regions
    coOccurrence.forEach((region) => {
      const regionSectors = region.sectors;
      regionSectors.forEach((s1, i1) => {
        regionSectors.forEach((s2, i2) => {
          if (i1 !== i2) {
            const idx1 = sectors.indexOf(s1);
            const idx2 = sectors.indexOf(s2);
            if (idx1 >= 0 && idx2 >= 0) {
              matrix[idx1][idx2] += 1;
            }
          }
        });
      });
    });

    res.status(200).json({
      success: true,
      message: "Chord data fetched successfully",
      data: {
        keys: sectors,
        matrix,
      },
    });
  } catch (error) {
    console.error("Error fetching chord data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching chord data",
      error: error.message,
    });
  }
};

/**
 * Get stream chart data - Topics over time
 */
const getStreamData = async (req, res) => {
  try {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get top topics first
    const topTopics = await DashboardData.aggregate([
      { $match: { topic: { $ne: "" } } },
      { $group: { _id: "$topic", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    const topics = topTopics.map((t) => t._id);

    // Get data by month and topic
    const streamData = await DashboardData.aggregate([
      {
        $match: {
          topic: { $in: topics },
          added: { $ne: "" },
        },
      },
      {
        $addFields: {
          month: {
            $substr: ["$added", 0, { $indexOfBytes: ["$added", ","] }],
          },
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
            topic: "$topic",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // Transform to stream format
    const monthData = {};
    months.forEach((m) => {
      monthData[m] = {};
      topics.forEach((t) => {
        monthData[m][t] = 0;
      });
    });

    streamData.forEach((item) => {
      if (monthData[item._id.month]) {
        monthData[item._id.month][item._id.topic] = item.count;
      }
    });

    const result = months.map((month) => ({
      month,
      ...monthData[month],
    }));

    res.status(200).json({
      success: true,
      message: "Stream data fetched successfully",
      data: {
        keys: topics,
        data: result,
      },
    });
  } catch (error) {
    console.error("Error fetching stream data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching stream data",
      error: error.message,
    });
  }
};

/**
 * Get sankey diagram data - Flow from Region to Sector to PESTLE
 */
const getSankeyData = async (req, res) => {
  try {
    // Get top regions
    const topRegions = await DashboardData.aggregate([
      { $match: { region: { $ne: "" } } },
      { $group: { _id: "$region", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Get top sectors
    const topSectors = await DashboardData.aggregate([
      { $match: { sector: { $ne: "" } } },
      { $group: { _id: "$sector", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const regions = topRegions.map((r) => r._id);
    const sectors = topSectors.map((s) => s._id);

    // Get region-sector links
    const regionSectorLinks = await DashboardData.aggregate([
      {
        $match: {
          region: { $in: regions },
          sector: { $in: sectors },
        },
      },
      {
        $group: {
          _id: {
            region: "$region",
            sector: "$sector",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // Get sector-pestle links
    const sectorPestleLinks = await DashboardData.aggregate([
      {
        $match: {
          sector: { $in: sectors },
          pestle: { $ne: "" },
        },
      },
      {
        $group: {
          _id: {
            sector: "$sector",
            pestle: "$pestle",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const pestles = [...new Set(sectorPestleLinks.map((l) => l._id.pestle))];

    // Build nodes and links
    const nodes = [
      ...regions.map((r) => ({ id: r })),
      ...sectors.map((s) => ({ id: `sector_${s}` })),
      ...pestles.map((p) => ({ id: `pestle_${p}` })),
    ];

    const links = [
      ...regionSectorLinks.map((l) => ({
        source: l._id.region,
        target: `sector_${l._id.sector}`,
        value: l.count,
      })),
      ...sectorPestleLinks.map((l) => ({
        source: `sector_${l._id.sector}`,
        target: `pestle_${l._id.pestle}`,
        value: l.count,
      })),
    ];

    res.status(200).json({
      success: true,
      message: "Sankey data fetched successfully",
      data: { nodes, links },
    });
  } catch (error) {
    console.error("Error fetching sankey data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching sankey data",
      error: error.message,
    });
  }
};

/**
 * Get funnel data - Insights conversion stages
 */
const getFunnelData = async (req, res) => {
  try {
    const totalRecords = await DashboardData.countDocuments();
    const withSector = await DashboardData.countDocuments({
      sector: { $ne: "" },
    });
    const withTopic = await DashboardData.countDocuments({
      topic: { $ne: "" },
    });
    const withRegion = await DashboardData.countDocuments({
      region: { $ne: "" },
    });
    const highIntensity = await DashboardData.countDocuments({
      intensity: { $gte: 5 },
    });
    const highRelevance = await DashboardData.countDocuments({
      relevance: { $gte: 3 },
    });
    const highLikelihood = await DashboardData.countDocuments({
      likelihood: { $gte: 3 },
    });

    const funnelData = [
      { id: "Total Insights", value: totalRecords, label: "Total Insights" },
      {
        id: "With Sector",
        value: withSector,
        label: "Categorized by Sector",
      },
      { id: "With Topic", value: withTopic, label: "Has Topic" },
      {
        id: "With Region",
        value: withRegion,
        label: "Has Regional Data",
      },
      {
        id: "High Intensity",
        value: highIntensity,
        label: "High Intensity (≥5)",
      },
      {
        id: "High Relevance",
        value: highRelevance,
        label: "High Relevance (≥3)",
      },
      {
        id: "High Likelihood",
        value: highLikelihood,
        label: "High Likelihood (≥3)",
      },
    ].sort((a, b) => b.value - a.value);

    res.status(200).json({
      success: true,
      message: "Funnel data fetched successfully",
      data: funnelData,
    });
  } catch (error) {
    console.error("Error fetching funnel data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching funnel data",
      error: error.message,
    });
  }
};

/**
 * Get waffle chart data - Distribution breakdown
 */
const getWaffleData = async (req, res) => {
  try {
    const { type = "sector" } = req.query;

    let field = "$sector";
    if (type === "pestle") field = "$pestle";
    else if (type === "region") field = "$region";

    const distribution = await DashboardData.aggregate([
      { $match: { [type]: { $ne: "" } } },
      { $group: { _id: field, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    const total = distribution.reduce((sum, item) => sum + item.count, 0);

    const waffleData = distribution.map((item, index) => ({
      id: item._id,
      label: item._id,
      value: Math.round((item.count / total) * 100),
    }));

    res.status(200).json({
      success: true,
      message: "Waffle data fetched successfully",
      data: waffleData,
      total,
    });
  } catch (error) {
    console.error("Error fetching waffle data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching waffle data",
      error: error.message,
    });
  }
};

/**
 * Get calendar heatmap data - Daily insights count
 */
const getCalendarData = async (req, res) => {
  try {
    const calendarData = await DashboardData.aggregate([
      {
        $match: {
          published: { $ne: "" },
        },
      },
      {
        $addFields: {
          parsedDate: {
            $dateFromString: {
              dateString: "$published",
              format: "%B, %d %Y %H:%M:%S",
              onError: null,
              onNull: null,
            },
          },
        },
      },
      {
        $match: {
          parsedDate: { $ne: null },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$parsedDate" },
          },
          value: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedData = calendarData.map((item) => ({
      day: item._id,
      value: item.value,
    }));

    // Get date range
    const dates = formattedData.map((d) => d.day).sort();
    const from = dates[0] || "2016-01-01";
    const to = dates[dates.length - 1] || "2017-12-31";

    res.status(200).json({
      success: true,
      message: "Calendar data fetched successfully",
      data: formattedData,
      from,
      to,
    });
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching calendar data",
      error: error.message,
    });
  }
};

/**
 * Get circle packing data - Hierarchical view
 */
const getCirclePackingData = async (req, res) => {
  try {
    const hierarchyData = await DashboardData.aggregate([
      {
        $match: {
          region: { $ne: "" },
          sector: { $ne: "" },
        },
      },
      {
        $group: {
          _id: {
            region: "$region",
            sector: "$sector",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.region",
          sectors: {
            $push: {
              name: "$_id.sector",
              value: "$count",
            },
          },
          total: { $sum: "$count" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 8 },
    ]);

    const circleData = {
      name: "World",
      children: hierarchyData.map((region) => ({
        name: region._id,
        children: region.sectors
          .sort((a, b) => b.value - a.value)
          .slice(0, 6)
          .map((sector) => ({
            name: sector.name,
            value: sector.value,
          })),
      })),
    };

    res.status(200).json({
      success: true,
      message: "Circle packing data fetched successfully",
      data: circleData,
    });
  } catch (error) {
    console.error("Error fetching circle packing data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching circle packing data",
      error: error.message,
    });
  }
};

/**
 * Get bump chart data - Topic rankings over months
 */
const getBumpData = async (req, res) => {
  try {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get top topics
    const topTopics = await DashboardData.aggregate([
      { $match: { topic: { $ne: "" } } },
      { $group: { _id: "$topic", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    const topics = topTopics.map((t) => t._id);

    // Get monthly rankings
    const monthlyData = await DashboardData.aggregate([
      {
        $match: {
          topic: { $in: topics },
          added: { $ne: "" },
        },
      },
      {
        $addFields: {
          month: {
            $substr: ["$added", 0, { $indexOfBytes: ["$added", ","] }],
          },
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
            topic: "$topic",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate rankings per month
    const monthRankings = {};
    months.forEach((m) => {
      monthRankings[m] = topics.map((t) => ({
        topic: t,
        count: 0,
      }));
    });

    monthlyData.forEach((item) => {
      if (monthRankings[item._id.month]) {
        const topicEntry = monthRankings[item._id.month].find(
          (t) => t.topic === item._id.topic
        );
        if (topicEntry) topicEntry.count = item.count;
      }
    });

    // Convert to bump chart format
    const bumpData = topics.map((topic) => ({
      id: topic,
      data: months.map((month) => {
        const rankings = monthRankings[month]
          .sort((a, b) => b.count - a.count)
          .map((t, i) => ({ ...t, rank: i + 1 }));
        const topicRank = rankings.find((t) => t.topic === topic);
        return {
          x: month.substring(0, 3),
          y: topicRank ? topicRank.rank : topics.length,
        };
      }),
    }));

    res.status(200).json({
      success: true,
      message: "Bump data fetched successfully",
      data: bumpData,
    });
  } catch (error) {
    console.error("Error fetching bump data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bump data",
      error: error.message,
    });
  }
};

/**
 * Get treemap data - Sector size visualization
 */
const getTreemapData = async (req, res) => {
  try {
    const sectorData = await DashboardData.aggregate([
      {
        $match: {
          sector: { $ne: "" },
          topic: { $ne: "" },
        },
      },
      {
        $group: {
          _id: {
            sector: "$sector",
            topic: "$topic",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.sector",
          topics: {
            $push: {
              name: "$_id.topic",
              value: "$count",
            },
          },
          total: { $sum: "$count" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 8 },
    ]);

    const treemapData = {
      name: "root",
      children: sectorData.map((sector) => ({
        name: sector._id,
        children: sector.topics
          .sort((a, b) => b.value - a.value)
          .slice(0, 5)
          .map((topic) => ({
            name: topic.name,
            value: topic.value,
          })),
      })),
    };

    res.status(200).json({
      success: true,
      message: "Treemap data fetched successfully",
      data: treemapData,
    });
  } catch (error) {
    console.error("Error fetching treemap data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching treemap data",
      error: error.message,
    });
  }
};

/**
 * Get radar chart data - Multi-dimensional comparison
 */
const getRadarData = async (req, res) => {
  try {
    const { dimension = "sector" } = req.query;

    let field = "$sector";
    if (dimension === "region") field = "$region";
    else if (dimension === "pestle") field = "$pestle";

    const data = await DashboardData.aggregate([
      { $match: { [dimension]: { $ne: "" } } },
      {
        $group: {
          _id: field,
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    // Transform to radar format
    const categories = data.map((d) => d._id);
    const metrics = ["Intensity", "Likelihood", "Relevance"];

    const radarData = metrics.map((metric) => {
      const obj = { metric };
      data.forEach((d) => {
        let value = 0;
        if (metric === "Intensity")
          value = Math.round(d.avgIntensity * 10) / 10;
        else if (metric === "Likelihood")
          value = Math.round(d.avgLikelihood * 10) / 10;
        else if (metric === "Relevance")
          value = Math.round(d.avgRelevance * 10) / 10;
        obj[d._id] = value;
      });
      return obj;
    });

    res.status(200).json({
      success: true,
      message: "Radar data fetched successfully",
      data: {
        keys: categories,
        data: radarData,
      },
    });
  } catch (error) {
    console.error("Error fetching radar data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching radar data",
      error: error.message,
    });
  }
};

module.exports = {
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
};
