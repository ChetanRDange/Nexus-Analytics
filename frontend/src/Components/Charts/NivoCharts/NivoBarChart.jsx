import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoBarChart = ({
  data,
  keys,
  indexBy = 'id',
  layout = 'vertical',
  groupMode = 'stacked',
  colors = chartColors.primary,
  enableLabel = true,
  enableGridY = false,
  enableGridX = false,
  margin = { top: 10, right: 10, bottom: 40, left: 40 },
  axisBottomLabel = '',
  axisLeftLabel = '',
  borderRadius = 4,
  padding = 0.3,
  height = 250,
  ...props
}) => {
  const { isDark } = useTheme();
  const theme = nivoTheme(isDark);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data available
      </div>
    );
  }

  // Calculate dynamic margin based on data
  const dynamicMargin = {
    ...margin,
    bottom: data.length > 5 ? 50 : 40,
    left: Math.max(40, axisLeftLabel ? 50 : 40),
  };

  return (
    <div style={{ height, width: '100%', minWidth: 0, overflow: 'hidden' }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        layout={layout}
        groupMode={groupMode}
        margin={dynamicMargin}
        padding={padding}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={colors}
        borderRadius={borderRadius}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: data.length > 6 ? -45 : 0,
          legend: axisBottomLabel,
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 8,
          format: v => typeof v === 'string' && v.length > 6 ? `${v.substring(0, 6)}..` : v,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisLeftLabel,
          legendPosition: 'middle',
          legendOffset: -35,
          tickValues: 5,
          format: v => typeof v === 'number' ? (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v) : v,
        }}
        enableLabel={enableLabel && data.length <= 8}
        labelSkipWidth={20}
        labelSkipHeight={20}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        enableGridY={enableGridY}
        enableGridX={enableGridX}
        theme={theme}
        role="application"
        ariaLabel="Bar chart"
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoBarChart;
