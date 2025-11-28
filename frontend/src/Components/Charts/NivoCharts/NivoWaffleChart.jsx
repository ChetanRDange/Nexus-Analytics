import { ResponsiveWaffle } from '@nivo/waffle';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoWaffleChart = ({
  data,
  total = 100,
  colors = chartColors.rainbow,
  margin = { top: 10, right: 10, bottom: 10, left: 10 },
  height = 400,
  rows = 10,
  columns = 10,
  fillDirection = 'top',
  padding = 1,
  borderWidth = 0,
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
      <ResponsiveWaffle
        data={data}
        total={total}
        margin={margin}
        rows={rows}
        columns={columns}
        fillDirection={fillDirection}
        padding={padding}
        colors={colors}
        borderWidth={borderWidth}
        borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        motionStagger={2}
        legends={[]}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoWaffleChart;
