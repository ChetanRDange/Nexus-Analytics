import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoHorizontalBarChart = ({
  data,
  keys,
  indexBy = 'id',
  colors = chartColors.primary,
  enableLabel = true,
  enableGridX = false,
  enableGridY = false,
  margin = { top: 10, right: 15, bottom: 30, left: 90 },
  axisBottomLabel = '',
  axisLeftLabel = '',
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

  return (
    <div style={{ height, width: '100%', minWidth: 0 }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        layout="horizontal"
        margin={margin}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={colors}
        borderRadius={3}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        enableGridX={enableGridX}
        enableGridY={enableGridY}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisBottomLabel,
          legendPosition: 'middle',
          legendOffset: 32,
          format: v => typeof v === 'number' ? (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v) : v,
        }}
        axisLeft={{
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisLeftLabel,
          legendPosition: 'middle',
          legendOffset: -80,
          format: v => typeof v === 'string' && v.length > 12 ? `${v.substring(0, 12)}..` : v,
        }}
        enableLabel={enableLabel && data.length <= 10}
        labelSkipWidth={16}
        labelSkipHeight={16}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoHorizontalBarChart;
