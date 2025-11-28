import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoGroupedBarChart = ({
  data,
  keys,
  indexBy = 'id',
  colors = chartColors.primary,
  enableLabel = false,
  enableGridX = false,
  enableGridY = false,
  margin = { top: 15, right: 15, bottom: 45, left: 45 },
  axisBottomLabel = '',
  axisLeftLabel = '',
  height = 250,
  showLegend = false,
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
        groupMode="grouped"
        margin={margin}
        padding={0.3}
        innerPadding={2}
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
          tickRotation: data.length > 5 ? -45 : 0,
          legend: axisBottomLabel,
          legendPosition: 'middle',
          legendOffset: 36,
          format: v => typeof v === 'string' && v.length > 8 ? `${v.substring(0, 8)}..` : v,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisLeftLabel,
          legendPosition: 'middle',
          legendOffset: -45,
          format: v => typeof v === 'number' ? (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v) : v,
        }}
        enableLabel={enableLabel && data.length <= 8}
        labelSkipWidth={16}
        labelSkipHeight={16}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={showLegend ? [
          {
            dataFrom: 'keys',
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 5,
            itemWidth: 60,
            itemHeight: 16,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 10,
            symbolShape: 'circle',
          }
        ] : []}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoGroupedBarChart;
