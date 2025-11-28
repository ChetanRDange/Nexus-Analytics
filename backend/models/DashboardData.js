const mongoose = require("mongoose");

const dashboardDataSchema = new mongoose.Schema(
  {
    end_year: { type: String, default: "" },
    intensity: { type: Number, default: 0 },
    sector: { type: String, default: "", index: true },
    topic: { type: String, default: "", index: true },
    insight: { type: String, default: "" },
    url: { type: String, default: "" },
    region: { type: String, default: "", index: true },
    start_year: { type: String, default: "" },
    impact: { type: String, default: "" },
    added: { type: String, default: "" },
    published: { type: String, default: "" },
    country: { type: String, default: "", index: true },
    relevance: { type: Number, default: 0 },
    pestle: { type: String, default: "", index: true },
    source: { type: String, default: "", index: true },
    title: { type: String, default: "" },
    likelihood: { type: Number, default: 0 },
    swot: { type: String, default: "", index: true },
    city: { type: String, default: "", index: true },
  },
  { timestamps: true }
);

dashboardDataSchema.index({ sector: 1, region: 1, country: 1 });
dashboardDataSchema.index({ topic: 1, intensity: -1 });
dashboardDataSchema.index({ end_year: 1, start_year: 1 });

module.exports = mongoose.model("DashboardData", dashboardDataSchema);
