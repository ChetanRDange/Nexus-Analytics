import { ResponsiveRadar } from '@nivo/radar';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoRadarChart = ({
  data,
  keys,
  indexBy = 'metric',
  colors = chartColors.rainbow,
  margin = { top: 40, right: 60, bottom: 40, left: 60 },
  height = 300,
  fillOpacity = 0.25,
  borderWidth = 1.5,
  dotSize = 5,
  gridLevels = 3,
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
      <ResponsiveRadar
        data={data}
        keys={keys}
        indexBy={indexBy}
        valueFormat=">-.0f"
        margin={margin}
        borderColor={{ from: 'color' }}
        gridLabelOffset={16}
        gridShape="circular"
        gridLevels={gridLevels}
        dotSize={dotSize}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        colors={colors}
        fillOpacity={fillOpacity}
        blendMode="normal"
        borderWidth={borderWidth}
        motionConfig="gentle"
        legends={keys && keys.length > 1 ? [
          {
            anchor: 'top-right',
            direction: 'column',
            translateX: 0,
            translateY: -30,
            itemWidth: 60,
            itemHeight: 16,
            itemTextColor: isDark ? '#a3adc2' : '#5e5873',
            symbolSize: 10,
            symbolShape: 'circle',
          },
        ] : []}
        theme={theme}
        {...props}
      />
    </div>
  );
};

export default NivoRadarChart;
