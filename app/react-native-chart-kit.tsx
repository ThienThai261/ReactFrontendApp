declare module 'react-native-chart-kit' {
    import {ViewStyle} from 'react-native';

    export interface ChartConfig {
        backgroundColor?: string;
        backgroundGradientFrom?: string;
        backgroundGradientTo?: string;
        color?: (opacity: number) => string;
        strokeWidth?: number;
        decimalPlaces?: number;
        labelColor?: (opacity: number) => string;
        style?: ViewStyle;
        propsForLabels?: object;
        propsForBackgroundLines?: object;
        fillShadowGradient?: string;
        fillShadowGradientOpacity?: number;
    }

    export interface Dataset {
        data: number[];
        color?: string | ((opacity: number) => string);
        strokeWidth?: number;
    }

    export interface ChartData {
        labels: string[];
        datasets: Dataset[];
    }

    export interface AbstractChartProps {
        width: number;
        height: number;
        data: ChartData;
        chartConfig: ChartConfig;
        style?: ViewStyle;
        bezier?: boolean;
        withInnerLines?: boolean;
        withOuterLines?: boolean;
        withHorizontalLines?: boolean;
        withVerticalLines?: boolean;
        yAxisLabel?: string;
        yAxisSuffix?: string;
        xAxisLabel?: string;
        verticalLabelRotation?: number;
        horizontalLabelRotation?: number;
    }

    export interface LineChartProps extends AbstractChartProps {
        getDotColor?: (dataPoint: number, index: number) => string;
        hidePointsAtIndex?: number[];
        formatYLabel?: (value: string) => string;
        formatXLabel?: (value: string) => string;
    }

    export interface BarChartProps extends AbstractChartProps {
        showBarTops?: boolean;
        showValuesOnTopOfBars?: boolean;
        withCustomBarColorFromData?: boolean;
    }

    export class LineChart extends React.Component<LineChartProps> {
    }

    export class BarChart extends React.Component<BarChartProps> {
    }
}