# Blackcoffer Data Visualization Dashboard

## 🎯 Project Overview

A comprehensive data visualization dashboard built with MERN stack (MongoDB, Express.js, React, Node.js) for Blackcoffer analytics.

## ✅ Completed Features

### Backend (Node.js + Express + MongoDB)

- **Database**: MongoDB Atlas with 1000 imported records
- **Model**: `DashboardData.js` with 19 fields (intensity, likelihood, relevance, sector, topic, region, etc.)
- **API Endpoints** (12 total):
  1. `GET /api/dashboard/data` - Get filtered dashboard data
  2. `GET /api/dashboard/filters` - Get all filter options
  3. `GET /api/dashboard/statistics` - Get statistics
  4. `GET /api/dashboard/top-countries` - Top 10 countries
  5. `GET /api/dashboard/sector-breakdown` - Sector distribution
  6. `GET /api/dashboard/swot-analysis` - SWOT analysis
  7. `GET /api/dashboard/region-sector-distribution` - Region-sector data
  8. `GET /api/dashboard/monthly-trends` - Monthly trends
  9. `GET /api/dashboard/source-distribution` - Source distribution
  10. `GET /api/dashboard/intensity-analysis` - Intensity analysis by group
  11. `GET /api/dashboard/likelihood-relevance` - Likelihood vs relevance
  12. `GET /api/dashboard/timeline` - Timeline data

### Frontend (React + Vite + Tailwind CSS + Recharts)

- **Dashboard Components** (11 total):
  1. `MetricCard.jsx` - Display KPI metrics
  2. `CountryChart.jsx` - Horizontal bar chart for top countries
  3. `SectorDonut.jsx` - Donut chart for sector distribution
  4. `IntensityBarChart.jsx` - Grouped bar chart with filters
  5. `TimelineTrend.jsx` - Combined bar+line chart
  6. `LikelihoodRelevanceChart.jsx` - Scatter plot
  7. `RegionSectorChart.jsx` - Stacked bar chart
  8. `PestleRadar.jsx` - Radar chart for PESTLE analysis
  9. `SwotPolar.jsx` - Pie chart for SWOT
  10. `SourceTreeMap.jsx` - Treemap visualization
  11. `FilterSidebar.jsx` - Advanced filtering component

## 🚀 How to Run

### Backend

```bash
cd d:\chetan\chetan\Blackcoffer
npm install
npm start
```

Server runs on: http://localhost:5000

### Frontend

```bash
cd d:\chetan\chetan\Blackcoffer\frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## 📊 Dashboard Features

### Visualizations

1. **Metric Cards**: Total records, avg intensity, avg likelihood, avg relevance
2. **Country Analysis**: Horizontal bar chart showing top 10 countries
3. **Sector Distribution**: Donut chart with percentages
4. **Intensity Analysis**: Interactive bar chart (group by topic/sector/region/country)
5. **Timeline Trends**: Dual Y-axis chart (count + metrics)
6. **Likelihood vs Relevance**: Scatter plot with bubble sizes
7. **Region-Sector Distribution**: Stacked bar chart
8. **PESTLE Analysis**: Radar chart
9. **SWOT Analysis**: Pie chart
10. **Source Distribution**: Treemap visualization

### Filtering System

- Sector filter
- Topic filter
- Region filter
- Country filter
- PESTLE filter
- Source filter
- Year range filter (start/end)
- Reset all filters button

## 🔧 Technology Stack

### Backend

- Node.js v18+
- Express.js 4.21.2
- MongoDB (Atlas)
- Mongoose 8.9.0
- CORS enabled

### Frontend

- React 18.3.1
- Vite 5.4.8
- Tailwind CSS 3.4.13
- Recharts (charts library)
- Axios 1.7.8
- Lucide React (icons)

## 📁 Project Structure

```
Blackcoffer/
├── models/
│   └── DashboardData.js
├── controllers/
│   └── dashboard-api-controller.js
├── routes/
│   └── dashboard.js
├── scripts/
│   └── importData.js
├── server.js
├── .env
└── frontend/
    └── src/
        ├── Components/
        │   └── Dashboard/
        │       ├── MetricCard.jsx
        │       ├── CountryChart.jsx
        │       ├── SectorDonut.jsx
        │       ├── IntensityBarChart.jsx
        │       ├── TimelineTrend.jsx
        │       ├── LikelihoodRelevanceChart.jsx
        │       ├── RegionSectorChart.jsx
        │       ├── PestleRadar.jsx
        │       ├── SwotPolar.jsx
        │       ├── SourceTreeMap.jsx
        │       └── FilterSidebar.jsx
        └── pages/
            └── Dashboard.jsx
```

## 🎨 Design Features

- Responsive layout (mobile, tablet, desktop)
- Professional color scheme
- Smooth animations and transitions
- Loading states for all components
- Error handling
- Clean and modern UI

## 📈 Data Insights

- **1000 records** imported from jsondata.json
- Multiple dimensions: sector, topic, region, country, PESTLE, SWOT
- Metrics: intensity, likelihood, relevance
- Time-series data with year and month
- Source tracking

## 🔐 Environment Variables

### Backend (.env)

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://dangechetan3_db_user:...
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
```

## ✨ Key Highlights

- ✅ Clean, maintainable code
- ✅ RESTful API design
- ✅ Optimized MongoDB queries with aggregation
- ✅ Indexed database for performance
- ✅ Component-based frontend architecture
- ✅ Professional dashboard UI
- ✅ Multiple chart types (10+ visualizations)
- ✅ Advanced filtering capabilities
- ✅ Real-time data updates

## 🎯 Next Steps (Optional Enhancements)

- Add authentication/authorization
- Implement data export (CSV/PDF)
- Add more advanced filters
- Create data drill-down functionality
- Add dashboard customization
- Implement real-time updates with WebSockets
- Add data comparison features
- Create custom date range picker
