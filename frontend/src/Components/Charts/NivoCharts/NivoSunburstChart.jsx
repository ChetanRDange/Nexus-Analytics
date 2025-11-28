import { ResponsiveSunburst } from '@nivo/sunburst';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoSunburstChart = ({
  data,
  colors = chartColors.rainbow,
  margin = { top: 5, right: 5, bottom: 5, left: 5 },
  height = 400,
  cornerRadius = 2,
  borderWidth = 1,
  enableArcLabels = false,
  ...props
}) => {
  const { isDark } = useTheme();
  const theme = nivoTheme(isDark);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%', minWidth: 0 }}>
      <ResponsiveSunburst
        data={data}
        margin={margin}
        id="name"
        value="value"
        cornerRadius={cornerRadius}
        borderWidth={borderWidth}
        borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        colors={colors}
        childColor={{ from: 'color', modifiers: [['brighter', 0.1]] }}
        enableArcLabels={enableArcLabels}
        arcLabelsSkipAngle={15}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        arcLabel={d => d.id?.length > 8 ? `${d.id.substring(0, 8)}..` : d.id}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoSunburstChart;
