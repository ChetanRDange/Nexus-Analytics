import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoCirclePackingChart = ({
  data,
  colors = chartColors.rainbow,
  margin = { top: 10, right: 10, bottom: 10, left: 10 },
  height = 400,
  padding = 3,
  leavesOnly = false,
  enableLabels = true,
  labelsSkipRadius = 16,
  borderWidth = 1,
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
      <ResponsiveCirclePacking
        data={data}
        margin={margin}
        id="name"
        value="value"
        colors={colors}
        childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
        padding={padding}
        leavesOnly={leavesOnly}
        enableLabels={enableLabels}
        labelsSkipRadius={labelsSkipRadius}
        label={d => d.id?.length > 10 ? `${d.id.substring(0, 10)}..` : d.id}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        borderWidth={borderWidth}
        borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoCirclePackingChart;
