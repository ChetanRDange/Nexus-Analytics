import { ResponsiveBump } from '@nivo/bump';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoBumpChart = ({
  data,
  colors = chartColors.rainbow,
  margin = { top: 30, right: 80, bottom: 30, left: 50 },
  height = 400,
  lineWidth = 1.5,
  activeLineWidth = 4,
  pointSize = 6,
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

  // Get max data points
  const maxPoints = Math.max(...data.map(d => d.data?.length || 0));

  return (
    <div style={{ height, width: '100%', minWidth: 0 }}>
      <ResponsiveBump
        data={data}
        margin={margin}
        colors={colors}
        lineWidth={lineWidth}
        activeLineWidth={activeLineWidth}
        inactiveLineWidth={1}
        inactiveOpacity={0.15}
        pointSize={pointSize}
        activePointSize={12}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        activePointBorderWidth={2}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: maxPoints > 8 ? -45 : 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -28,
          format: v => typeof v === 'string' && v.length > 6 ? `${v.substring(0, 6)}..` : v,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: maxPoints > 8 ? -45 : 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 28,
          format: v => typeof v === 'string' && v.length > 6 ? `${v.substring(0, 6)}..` : v,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -36,
        }}
        axisRight={null}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoBumpChart;
