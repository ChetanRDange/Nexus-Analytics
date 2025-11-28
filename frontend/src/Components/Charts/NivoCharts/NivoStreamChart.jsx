import { ResponsiveStream } from '@nivo/stream';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoStreamChart = ({
  data,
  keys,
  colors = chartColors.rainbow,
  margin = { top: 20, right: 20, bottom: 40, left: 50 },
  height = 400,
  offsetType = 'silhouette',
  order = 'none',
  curve = 'basis',
  fillOpacity = 0.85,
  borderWidth = 0,
  enableGridX = false,
  enableGridY = false,
  showLegend = false,
  ...props
}) => {
  const { isDark } = useTheme();
  const theme = nivoTheme(isDark);

  if (!data || data.length === 0 || !keys || keys.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%', minWidth: 0, overflow: 'hidden' }}>
      <ResponsiveStream
        data={data}
        keys={keys}
        margin={margin}
        offsetType={offsetType}
        order={order}
        curve={curve}
        colors={colors}
        fillOpacity={fillOpacity}
        borderWidth={borderWidth}
        borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        enableGridX={enableGridX}
        enableGridY={enableGridY}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: data.length > 8 ? -45 : 0,
          legend: '',
          legendOffset: 32,
          format: v => typeof v === 'string' && v.length > 6 ? `${v.substring(0, 6)}..` : v,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: -40,
          format: v => typeof v === 'number' ? (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v) : v,
        }}
        legends={showLegend ? [
          {
            anchor: 'bottom',
            direction: 'row',
            translateX: 0,
            translateY: 50,
            itemsSpacing: 5,
            itemWidth: 50,
            itemHeight: 16,
            itemTextColor: isDark ? '#a3adc2' : '#5e5873',
            itemDirection: 'left-to-right',
            symbolSize: 10,
            symbolShape: 'circle',
          },
        ] : []}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoStreamChart;
