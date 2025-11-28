import { ResponsivePie } from '@nivo/pie';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoPieChart = ({
  data,
  colors = chartColors.rainbow,
  margin = { top: 15, right: 15, bottom: 15, left: 15 },
  height = 250,
  enableArcLabels = true,
  enableArcLinkLabels = false,
  innerRadius = 0,
  padAngle = 0.7,
  cornerRadius = 3,
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

  // Disable link labels for small datasets or when there are many items
  const shouldShowLinkLabels = enableArcLinkLabels && data.length <= 6;

  return (
    <div style={{ height, width: '100%', minWidth: 0 }}>
      <ResponsivePie
        data={data}
        margin={shouldShowLinkLabels ? { top: 30, right: 80, bottom: 30, left: 80 } : margin}
        innerRadius={innerRadius}
        padAngle={padAngle}
        cornerRadius={cornerRadius}
        activeOuterRadiusOffset={6}
        colors={colors}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        enableArcLinkLabels={shouldShowLinkLabels}
        arcLinkLabelsSkipAngle={15}
        arcLinkLabelsTextColor={isDark ? '#a3adc2' : '#5e5873'}
        arcLinkLabelsThickness={1}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLinkLabel={d => d.id?.length > 8 ? `${d.id.substring(0, 8)}..` : d.id}
        enableArcLabels={enableArcLabels}
        arcLabelsSkipAngle={15}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={showLegend ? [
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 5,
            itemWidth: 60,
            itemHeight: 16,
            itemTextColor: isDark ? '#a3adc2' : '#5e5873',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
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

export default NivoPieChart;
