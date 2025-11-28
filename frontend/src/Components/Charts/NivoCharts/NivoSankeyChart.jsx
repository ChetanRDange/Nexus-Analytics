import { ResponsiveSankey } from '@nivo/sankey';
import { useTheme } from '../../../ThemeContext';
import { nivoTheme, chartColors } from './nivoTheme';

export const NivoSankeyChart = ({
  data,
  colors = chartColors.rainbow,
  margin = { top: 20, right: 100, bottom: 20, left: 20 },
  height = 400,
  align = 'justify',
  nodeOpacity = 1,
  nodeHoverOthersOpacity = 0.35,
  nodeThickness = 14,
  nodeSpacing = 18,
  nodeBorderWidth = 0,
  linkOpacity = 0.5,
  linkHoverOthersOpacity = 0.1,
  linkContract = 3,
  enableLinkGradient = true,
  labelPosition = 'outside',
  labelOrientation = 'horizontal',
  labelPadding = 12,
  ...props
}) => {
  const { isDark } = useTheme();
  const theme = nivoTheme(isDark);

  if (!data || !data.nodes || !data.links) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%', minWidth: 0, overflow: 'hidden' }}>
      <ResponsiveSankey
        data={data}
        margin={margin}
        align={align}
        colors={colors}
        nodeOpacity={nodeOpacity}
        nodeHoverOthersOpacity={nodeHoverOthersOpacity}
        nodeThickness={nodeThickness}
        nodeSpacing={nodeSpacing}
        nodeBorderWidth={nodeBorderWidth}
        nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
        nodeBorderRadius={3}
        linkOpacity={linkOpacity}
        linkHoverOthersOpacity={linkHoverOthersOpacity}
        linkContract={linkContract}
        enableLinkGradient={enableLinkGradient}
        labelPosition={labelPosition}
        labelOrientation={labelOrientation}
        labelPadding={labelPadding}
        label={d => d.id?.length > 10 ? `${d.id.substring(0, 10)}..` : d.id}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
        theme={theme}
        motionConfig="gentle"
        {...props}
      />
    </div>
  );
};

export default NivoSankeyChart;
