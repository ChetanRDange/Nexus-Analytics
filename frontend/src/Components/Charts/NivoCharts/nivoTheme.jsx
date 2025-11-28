// Nivo Theme Configuration for Dark/Light Mode
export const nivoDarkTheme = {
  background: 'transparent',
  fontFamily: 'inherit',
  fontSize: 11,
  textColor: '#a3adc2',
  axis: {
    domain: {
      line: {
        stroke: 'transparent',
        strokeWidth: 0,
      },
    },
    legend: {
      text: {
        fontSize: 10,
        fill: '#a3adc2',
        fontWeight: 500,
      },
    },
    ticks: {
      line: {
        stroke: 'transparent',
        strokeWidth: 0,
      },
      text: {
        fontSize: 9,
        fill: '#8b92a5',
      },
    },
  },
  grid: {
    line: {
      stroke: 'transparent',
      strokeWidth: 0,
    },
  },
  legends: {
    title: {
      text: {
        fontSize: 12,
        fill: '#a3adc2',
      },
    },
    text: {
      fontSize: 11,
      fill: '#a3adc2',
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: '#a3adc2',
      },
    },
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: '#a3adc2',
      outlineWidth: 2,
      outlineColor: '#2f3349',
      outlineOpacity: 1,
    },
    link: {
      stroke: '#7367f0',
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: '#2f3349',
      outlineOpacity: 1,
    },
    outline: {
      stroke: '#7367f0',
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: '#2f3349',
      outlineOpacity: 1,
    },
    symbol: {
      fill: '#7367f0',
      outlineWidth: 2,
      outlineColor: '#2f3349',
      outlineOpacity: 1,
    },
  },
  tooltip: {
    container: {
      background: '#2f3349',
      color: '#d0d4dc',
      fontSize: 12,
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      padding: '12px 16px',
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
};

export const nivoLightTheme = {
  background: 'transparent',
  fontFamily: 'inherit',
  fontSize: 11,
  textColor: '#5e5873',
  axis: {
    domain: {
      line: {
        stroke: 'transparent',
        strokeWidth: 0,
      },
    },
    legend: {
      text: {
        fontSize: 10,
        fill: '#5e5873',
        fontWeight: 500,
      },
    },
    ticks: {
      line: {
        stroke: 'transparent',
        strokeWidth: 0,
      },
      text: {
        fontSize: 9,
        fill: '#6e6b7b',
      },
    },
  },
  grid: {
    line: {
      stroke: 'transparent',
      strokeWidth: 0,
    },
  },
  legends: {
    title: {
      text: {
        fontSize: 12,
        fill: '#5e5873',
      },
    },
    text: {
      fontSize: 11,
      fill: '#5e5873',
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: '#5e5873',
      },
    },
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: '#5e5873',
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    link: {
      stroke: '#7367f0',
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    outline: {
      stroke: '#7367f0',
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    symbol: {
      fill: '#7367f0',
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
  },
  tooltip: {
    container: {
      background: '#ffffff',
      color: '#5e5873',
      fontSize: 12,
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      padding: '12px 16px',
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
};

// Function to get theme based on dark mode
export const nivoTheme = (isDark) => (isDark ? nivoDarkTheme : nivoLightTheme);

// Color schemes for charts
export const chartColors = {
  primary: ['#7367f0', '#28c76f', '#ea5455', '#ff9f43', '#00cfe8', '#a855f7', '#22c55e', '#f97316'],
  nivo: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5'],
  category10: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
  spectral: ['#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd'],
  rainbow: ['#7367f0', '#00cfe8', '#28c76f', '#ffc107', '#ff9f43', '#ea5455', '#a855f7', '#ec4899'],
  gradient: {
    purple: ['#7367f0', '#a855f7', '#c084fc', '#e879f9'],
    green: ['#28c76f', '#22c55e', '#4ade80', '#86efac'],
    blue: ['#00cfe8', '#06b6d4', '#22d3ee', '#67e8f9'],
    orange: ['#ff9f43', '#f97316', '#fb923c', '#fdba74'],
    red: ['#ea5455', '#ef4444', '#f87171', '#fca5a5'],
  }
};
