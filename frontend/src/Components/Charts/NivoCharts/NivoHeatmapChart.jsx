import { ResponsiveHeatMap } from '@nivo/heatmap';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme } from './nivoTheme';

export const NivoHeatmapChart = ({
  data,
  margin = { top: 50, right: 20, bottom: 50, left: 70 },
  height = 400,
  colors = {
    type: 'diverging',
    scheme: 'purple_orange',
    divergeAt: 0.5,
    minValue: 0,
    maxValue: 10,
  },
  forceSquare = false,
  sizeVariation = 0,
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
    <div style={{ height, width: '100%', minWidth: 0, overflow: 'hidden' }}>
      <ResponsiveHeatMap
        data={data}
        margin={margin}
        valueFormat=">-.0f"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: '',
          legendOffset: 36,
          format: v => typeof v === 'string' && v.length > 6 ? `${v.substring(0, 6)}..` : v,
        }}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -60,
          format: v => typeof v === 'string' && v.length > 8 ? `${v.substring(0, 8)}..` : v,
        }}
        colors={colors}
        emptyColor="#555555"
        borderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
        forceSquare={forceSquare}
        sizeVariation={sizeVariation}
        legends={[
          {
            anchor: 'bottom',
            translateX: 0,
            translateY: 36,
            length: 160,
            thickness: 8,
            direction: 'row',
            tickPosition: 'after',
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: '>-.0f',
            title: 'Value →',
            titleAlign: 'start',
            titleOffset: 4,
          },
        ]}
        annotations={[]}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoHeatmapChart;
