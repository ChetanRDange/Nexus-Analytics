import { ResponsiveTreeMap } from '@nivo/treemap';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoTreemapChart = ({
  data,
  identity = 'name',
  value = 'value',
  colors = chartColors.rainbow,
  margin = { top: 5, right: 5, bottom: 5, left: 5 },
  height = 400,
  leavesOnly = false,
  innerPadding = 2,
  outerPadding = 2,
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
    <div style={{ height, width: '100%', minWidth: 0, overflow: 'hidden' }}>
      <ResponsiveTreeMap
        data={data}
        identity={identity}
        value={value}
        margin={margin}
        leavesOnly={leavesOnly}
        innerPadding={innerPadding}
        outerPadding={outerPadding}
        borderWidth={borderWidth}
        borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        colors={colors}
        nodeOpacity={1}
        labelSkipSize={20}
        label={d => d.id?.length > 12 ? `${d.id.substring(0, 12)}..` : d.id}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        parentLabelPosition="left"
        parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoTreemapChart;
