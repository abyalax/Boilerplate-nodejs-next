'use client';

import { CartesianScaleTypeRegistry, Chart, ChartOptions, ScaleOptionsByType, ScriptableContext } from 'chart.js';
import Lottie from 'lottie-react';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { DeepPartial } from 'react-hook-form';
import { NotDataFoundV2 } from '~/assets';
import { FallBack } from '../fragments/fallback';
import { Flex } from '../layouts/flex';

/** Data point for BubbleChart */
export interface BubbleChartDataPoint {
  x: number;
  y: number;
  r: number;
  label: string;
  category?: string;
  [key: string]: unknown;
}

/** Dataset config for BubbleChart */
export interface BubbleDatasetConfig {
  label: string;
  backgroundColor?: (ctx: ScriptableContext<'bubble'>) => string;
  borderColor?: string;
  borderWidth?: number;
}

/** Config for BubbleChart */
export interface BubbleChartConfig {
  responsive?: boolean;
  aspectRatio?: number;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  scales?: DeepPartial<{
    [key: string]: ScaleOptionsByType<keyof CartesianScaleTypeRegistry>;
  }>;
}

/** Props BubbleChart reusable */
export interface BubbleChartProps<T extends Record<string, unknown>> {
  data?: T[];
  isLoading: boolean;
  transformData: (data: T[]) => BubbleChartDataPoint[];
  datasetConfig: BubbleDatasetConfig;
  chartConfig?: BubbleChartConfig;
  emptyState?: ReactNode;
  loadingFallback?: ReactNode;
}

const DEFAULT_CONFIG: Required<BubbleChartConfig> = {
  responsive: true,
  aspectRatio: 2,
  legendPosition: 'top',
  scales: {},
};

export function BubbleChart<T extends Record<string, unknown>>({
  data,
  isLoading,
  transformData,
  datasetConfig,
  chartConfig = {},
  emptyState,
  loadingFallback,
}: BubbleChartProps<T>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<'bubble', BubbleChartDataPoint[], unknown> | null>(null);

  const mergedConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...chartConfig }), [chartConfig]);

  const bubbles = useMemo(() => (data ? transformData(data) : []), [data, transformData]);

  useEffect(() => {
    if (!canvasRef.current || bubbles.length === 0) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart<'bubble', BubbleChartDataPoint[], unknown>(canvasRef.current, {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: datasetConfig.label,
            data: bubbles,
            backgroundColor: datasetConfig.backgroundColor,
            borderColor: datasetConfig.borderColor ?? '#fff',
            borderWidth: datasetConfig.borderWidth ?? 1,
          },
        ],
      },
      options: {
        responsive: mergedConfig.responsive,
        aspectRatio: mergedConfig.aspectRatio,
        plugins: {
          legend: { display: true, position: mergedConfig.legendPosition },
          tooltip: {
            callbacks: {
              label: (context) => {
                const point = context.raw as BubbleChartDataPoint;
                return [`${point.label}`, `x: ${point.x}`, `y: ${point.y}`];
              },
            },
          },
        },
        scales: mergedConfig.scales as ChartOptions<'line'>['scales'],
      },
    });

    return () => chartRef.current?.destroy();
  }, [bubbles, datasetConfig, mergedConfig]);

  if (isLoading) return <>{loadingFallback ?? <FallBack />}</>;

  // No data state
  if (!data || data.length === 0) {
    return (
      emptyState ?? (
        <Flex style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Lottie autoplay loop animationData={NotDataFoundV2} style={{ height: '300px', width: '300px' }} />
        </Flex>
      )
    );
  }

  return <canvas ref={canvasRef} />;
}
