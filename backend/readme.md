# Blackcoffer Data Visualization Dashboard - Backend API

A powerful REST API backend for the Blackcoffer Data Visualization Dashboard assignment. Built with Node.js, Express, and MongoDB to deliver analytics and insights from complex datasets.

## 🚀 Features

- **Advanced Filtering**: Multi-parameter filtering across all data dimensions
- **Real-time Analytics**: Aggregated statistics and trend analysis
- **High Performance**: Optimized MongoDB queries with proper indexing
- **RESTful API**: Clean, well-documented endpoints
- **Scalable Architecture**: Production-ready structure
- **Comprehensive Data**: Support for intensity, likelihood, relevance metrics

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## ⚡ Quick Start

### 1. Clone & Install

```bash
cd Blackcoffer
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/blackcoffer_dashboard
CORS_ORIGIN=*
```

### 3. Import Data

```bash
npm run import
```

This will import all data from `jsondata.json` into MongoDB.

### 4. Start Server

**Development Mode:**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

Server will run at: `http://localhost:5000`

## 📡 API Endpoints

### Base URL

```
http://localhost:5000/api/dashboard
```

### **Core Data Endpoints**

#### 1. Get Dashboard Data (with Filters)

```
GET /data
```

**Query Parameters:**

- `end_year`, `start_year`, `topic`, `sector`, `region`, `pestle`, `source`, `swot`, `country`, `city` - Filter by values (comma-separated)
- `minIntensity`, `maxIntensity`, `minLikelihood`, `maxLikelihood`, `minRelevance`, `maxRelevance` - Range filters
- `limit`, `skip`, `sortBy`, `sortOrder` - Pagination & sorting

**Example:**

```
GET /data?sector=Energy,Technology&region=Asia&minIntensity=5&limit=100
```

#### 2. Get Filter Options

```
GET /filters
```

Returns all distinct values for dropdown filters.

#### 3. Get Statistics

```
GET /statistics
```

Returns comprehensive aggregated statistics grouped by sector, region, country, topic, PESTLE, and year.

### **Visualization-Specific Endpoints**

#### 4. Top Countries (Horizontal Bar Chart)

```
GET /top-countries?limit=10
```

**Response:**

```json
[
  {
    "country": "USA",
    "count": 450,
    "percentage": "22.50",
    "avgIntensity": "5.20",
    "avgLikelihood": "3.40"
  }
]
```

#### 5. Sector Breakdown (Donut Chart)

```
GET /sector-breakdown
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "sector": "Energy",
      "count": 350,
      "percentage": "35.00",
      "avgIntensity": "6.10"
    }
  ],
  "total": 1000
}
```

#### 6. Intensity Analysis (Grouped Bar Chart)

```
GET /intensity-analysis?groupBy=topic
```

**Valid groupBy:** sector, region, country, topic, pestle, source

#### 7. Likelihood vs Relevance (Scatter/Bubble Chart)

```
GET /likelihood-relevance
```

Returns correlation data for bubble chart visualization.

#### 8. Timeline Data (Line + Bar Chart)

```
GET /timeline?yearField=end_year
```

Returns year-wise trends with metrics.

#### 9. SWOT Analysis (Polar Chart)

```
GET /swot-analysis
```

**Response:**

```json
{
  "summary": {
    "strength": 120,
    "weakness": 80,
    "opportunity": 150,
    "threat": 90
  },
  "details": [...]
}
```

#### 10. Region-Sector Distribution (Stacked Bar)

```
GET /region-sector
```

Returns cross-sectional data for stacked visualizations.

#### 11. Monthly Trends (Time Series)

```
GET /monthly-trends?year=2025
```

Returns month-by-month trends with all metrics.

#### 12. Source Distribution (Tree Map)

```
GET /source-distribution?limit=20
```

Returns source-wise distribution for tree map visualization.

## 📊 Data Model

```javascript
{
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
  swot: String,
  city: String
}
```

## 🗂️ Project Structure

```
Blackcoffer/
├── models/
│   └── DashboardData.js          # MongoDB schema
├── controllers/
│   └── dashboard-api-controller.js # API logic
├── routes/
│   └── dashboard.js               # API routes
├── scripts/
│   └── importData.js              # Data import utility
├── server.js                      # Main server file
├── package.json
├── .env.example
└── README.md
```

## 🔧 Scripts

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `npm start`      | Start production server                   |
| `npm run dev`    | Start development server with auto-reload |
| `npm run import` | Import data from jsondata.json            |

## 🎯 Key Variables for Visualization

- **Intensity** - Measure of data point strength
- **Likelihood** - Probability score
- **Relevance** - Relevance rating
- **Year** - Temporal dimension
- **Country** - Geographic dimension
- **Topics** - Subject categorization
- **Region** - Regional grouping
- **City** - City-level data
- **Sector** - Industry classification
- **PESTLE** - PESTLE analysis category
- **Source** - Data source
- **SWOT** - SWOT analysis category

## 🚦 API Response Format

**Success Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🔒 CORS Configuration

CORS is enabled for all origins in development. For production, update `CORS_ORIGIN` in `.env`:

```env
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

## 📈 Performance Optimization

- MongoDB indexes on frequently queried fields
- Aggregation pipelines for complex queries
- Efficient pagination with skip/limit
- Response data limiting

## 🐛 Troubleshooting

**Port already in use:**

```bash
# Change PORT in .env file
PORT=5001
```

**MongoDB connection failed:**

```bash
# Check MongoDB is running
mongod --version

# Verify MONGO_URI in .env
```

**Data import issues:**

```bash
# Ensure jsondata.json exists in root directory
# Check MongoDB connection
npm run import
```

## 📝 API Testing

**Using cURL:**

```bash
# Get all data
curl http://localhost:5000/api/dashboard/data

# Get filtered data
curl "http://localhost:5000/api/dashboard/data?sector=Energy&limit=10"

# Get filter options
curl http://localhost:5000/api/dashboard/filters

# Get statistics
curl http://localhost:5000/api/dashboard/statistics
```

**Using Postman:**
Import the base URL and test all endpoints with different query parameters.

## 🌐 Deployment

### Environment Variables

Set these in your hosting platform:

- `MONGO_URI` - Production MongoDB connection string
- `PORT` - Server port
- `NODE_ENV=production`
- `CORS_ORIGIN` - Frontend domain(s)

### Recommended Platforms

- Heroku
- Railway
- Render
- DigitalOcean
- AWS EC2

## 👥 Contributing

This is an assignment project for Blackcoffer.

## 📄 License

MIT

---

**Built with ❤️ for Blackcoffer Data Visualization Dashboard Assignment**

**Tech Stack:** Node.js | Express.js | MongoDB | Mongoose

**Assignment URL:** https://forms.gle/YBV6Xka5WsrPwYsB8
