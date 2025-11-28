import { ResponsiveFunnel } from '@nivo/funnel';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoFunnelChart = ({
  data,
  colors = chartColors.rainbow,
  margin = { top: 15, right: 15, bottom: 15, left: 15 },
  height = 400,
  direction = 'vertical',
  interpolation = 'smooth',
  shapeBlending = 0.66,
  spacing = 0,
  valueFormat = '>-.0f',
  borderWidth = 0,
  enableLabel = true,
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
      <ResponsiveFunnel
        data={data}
        margin={margin}
        direction={direction}
        interpolation={interpolation}
        shapeBlending={shapeBlending}
        valueFormat={valueFormat}
        colors={colors}
        spacing={spacing}
        borderWidth={borderWidth}
        borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        labelColor={{ from: 'color', modifiers: [['darker', 3]] }}
        beforeSeparatorLength={60}
        beforeSeparatorOffset={15}
        afterSeparatorLength={60}
        afterSeparatorOffset={15}
        currentPartSizeExtension={8}
        currentBorderWidth={30}
        enableLabel={enableLabel && data.length <= 8}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoFunnelChart;
