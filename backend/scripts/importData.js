require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const DashboardData = require("../models/DashboardData");

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Database connected successfully");

    // Read JSON file
    const jsonPath = path.join(__dirname, "..", "jsondata.json");
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    console.log(`✓ Loaded ${jsonData.length} records from JSON file`);

    // Clear existing data
    const deleteResult = await DashboardData.deleteMany({});
    console.log(`✓ Cleared ${deleteResult.deletedCount} existing records`);

    // Insert new data
    const insertResult = await DashboardData.insertMany(jsonData);
    console.log(
      `✓ Successfully imported ${insertResult.length} records into database`
    );

    // Display summary statistics
    const stats = await DashboardData.aggregate([
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          uniqueSectors: { $addToSet: "$sector" },
          uniqueTopics: { $addToSet: "$topic" },
          uniqueRegions: { $addToSet: "$region" },
          uniqueCountries: { $addToSet: "$country" },
        },
      },
    ]);

    if (stats.length > 0) {
      const summary = stats[0];
      console.log("\n📊 Data Summary:");
      console.log(`   Total Records: ${summary.totalRecords}`);
      console.log(`   Average Intensity: ${summary.avgIntensity.toFixed(2)}`);
      console.log(`   Average Likelihood: ${summary.avgLikelihood.toFixed(2)}`);
      console.log(`   Average Relevance: ${summary.avgRelevance.toFixed(2)}`);
      console.log(
        `   Unique Sectors: ${summary.uniqueSectors.filter((s) => s).length}`
      );
      console.log(
        `   Unique Topics: ${summary.uniqueTopics.filter((t) => t).length}`
      );
      console.log(
        `   Unique Regions: ${summary.uniqueRegions.filter((r) => r).length}`
      );
      console.log(
        `   Unique Countries: ${
          summary.uniqueCountries.filter((c) => c).length
        }`
      );
    }

    console.log("\n✅ Data import completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

importData();
