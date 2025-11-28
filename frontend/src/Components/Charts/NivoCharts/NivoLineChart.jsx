import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoLineChart = ({
  data,
  colors = chartColors.primary,
  enableArea = false,
  enablePoints = true,
  enableGridX = false,
  enableGridY = false,
  margin = { top: 10, right: 15, bottom: 40, left: 40 },
  axisBottomLabel = '',
  axisLeftLabel = '',
  height = 250,
  curve = 'monotoneX',
  showLegend = false,
  lineWidth = 2,
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

  // Get max data points for rotation decision
  const maxPoints = Math.max(...data.map(d => d.data?.length || 0));

  return (
    <div style={{ height, width: '100%', minWidth: 0, overflow: 'hidden' }}>
      <ResponsiveLine
        data={data}
        margin={margin}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        curve={curve}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: maxPoints > 5 ? -45 : 0,
          legend: axisBottomLabel,
          legendOffset: 30,
          legendPosition: 'middle',
          truncateTickAt: 6,
          format: v => typeof v === 'string' && v.length > 5 ? `${v.substring(0, 5)}..` : v,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisLeftLabel,
          legendOffset: -35,
          legendPosition: 'middle',
          tickValues: 5,
          format: v => typeof v === 'number' ? (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v) : v,
        }}
        enableGridX={enableGridX}
        enableGridY={enableGridY}
        colors={colors}
        lineWidth={lineWidth}
        enablePoints={enablePoints && maxPoints <= 12}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={1.5}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={enableArea}
        areaOpacity={0.1}
        useMesh={true}
        legends={showLegend ? [
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 45,
            itemsSpacing: 5,
            itemDirection: 'left-to-right',
            itemWidth: 50,
            itemHeight: 16,
            itemOpacity: 0.75,
            symbolSize: 8,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
          },
        ] : []}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoLineChart;
