import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoAreaChart = ({
  data,
  colors = chartColors.gradient.purple,
  enablePoints = false,
  enableGridX = false,
  enableGridY = false,
  margin = { top: 15, right: 15, bottom: 40, left: 45 },
  axisBottomLabel = '',
  axisLeftLabel = '',
  height = 250,
  curve = 'monotoneX',
  stacked = true,
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

  // Get max data points for rotation decision
  const maxPoints = Math.max(...data.map(d => d.data?.length || 0));

  return (
    <div style={{ height, width: '100%', minWidth: 0 }}>
      <ResponsiveLine
        data={data}
        margin={margin}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: stacked,
          reverse: false,
        }}
        curve={curve}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: maxPoints > 6 ? -45 : 0,
          legend: axisBottomLabel,
          legendOffset: 36,
          legendPosition: 'middle',
          format: v => typeof v === 'string' && v.length > 8 ? `${v.substring(0, 8)}..` : v,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisLeftLabel,
          legendOffset: -45,
          legendPosition: 'middle',
          format: v => typeof v === 'number' ? (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v) : v,
        }}
        enableGridX={enableGridX}
        enableGridY={enableGridY}
        colors={colors}
        lineWidth={1.5}
        enablePoints={enablePoints}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableArea={true}
        areaOpacity={0.3}
        areaBlendMode="normal"
        useMesh={true}
        legends={showLegend ? [
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 5,
            itemDirection: 'left-to-right',
            itemWidth: 60,
            itemHeight: 18,
            itemOpacity: 0.75,
            symbolSize: 10,
            symbolShape: 'circle',
          },
        ] : []}
        theme={theme}
        motionConfig="gentle"
        defs={[
          {
            id: 'gradientA',
            type: 'linearGradient',
            colors: [
              { offset: 0, color: '#7367f0', opacity: 0.6 },
              { offset: 100, color: '#7367f0', opacity: 0 },
            ],
          },
        ]}
        fill={[{ match: '*', id: 'gradientA' }]}
        {...props}
      />
    </div>
  );
};

export default NivoAreaChart;
