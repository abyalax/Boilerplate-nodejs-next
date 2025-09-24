'use client';

import { Chart, TooltipItem } from 'chart.js';
import Lottie from 'lottie-react';
import { useEffect, useMemo, useRef } from 'react';
import { NotDataFoundV2 } from '~/assets';
import { FallBack } from '../fragments/fallback';
import { Flex } from '../layouts/flex';

/**
 * Configuration for a single dataset in the line chart
 */
export interface ChartDatasetConfig {
  /** Dataset label shown in legend and tooltips */
  label: string;
  /** Data key to extract from source data */
  dataKey: string;
  /** Line color (hex, rgb, or named color) */
  borderColor: string;
  /** Background color (usually transparent for line charts) */
  backgroundColor?: string;
  /** Line tension (0-1, higher = more curved) */
  tension?: number;
  /** Dash pattern for dashed lines [dash_length, gap_length] */
  borderDash?: number[];
  /** Point radius */
  pointRadius?: number;
  /** Whether to fill area under line */
  fill?: boolean;
}

/**
 * Configuration for chart appearance and behavior
 */
export interface LineChartConfig {
  /** Chart aspect ratio (width/height) */
  aspectRatio?: number;
  /** Whether chart is responsive */
  responsive?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Enable tooltips */
  enableTooltips?: boolean;
  /** Custom tooltip formatter function */
  tooltipFormatter?: (value: string, label: string) => string;
  /** Chart interaction mode */
  interactionMode?: 'index' | 'point' | 'nearest';
}

/**
 * Props for the generic line chart component
 * @template T - Type of data objects in the array
 */
export interface LineChartProps<T extends Record<string, unknown>> {
  /** Array of data objects */
  data?: T[];
  /** Loading state */
  loading: boolean;
  /** Key to extract x-axis labels from data objects */
  labelKey: keyof T;
  /** Configuration for each dataset line */
  datasets: ChartDatasetConfig[];
  /** Chart configuration options */
  config?: LineChartConfig;
}

/**
 * Default chart configuration
 */
const DEFAULT_CONFIG: Required<LineChartConfig> = {
  aspectRatio: 6 / 2,
  responsive: true,
  showLegend: true,
  enableTooltips: true,
  tooltipFormatter: (value: string, label: string) => `${label}: Rp ${value}`,
  interactionMode: 'index',
};

export function LineChart<T extends Record<string, unknown>>({ data, loading, labelKey, datasets, config = {} }: LineChartProps<T>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const chartOptions = useMemo(() => {
    // Merge user config with defaults
    const chartConfig = { ...DEFAULT_CONFIG, ...config };
    return {
      aspectRatio: chartConfig.aspectRatio,
      responsive: chartConfig.responsive,
      interaction: { intersect: false, mode: chartConfig.interactionMode },
      plugins: {
        tooltip: {
          enabled: chartConfig.enableTooltips,
          mode: chartConfig.interactionMode,
          callbacks: {
            label: (tooltipItems: TooltipItem<'line'>) => chartConfig.tooltipFormatter(tooltipItems.formattedValue, tooltipItems.dataset.label || ''),
          },
        },
        legend: { display: chartConfig.showLegend, align: 'center' },
      },
    };
  }, [config]);

  // Extract labels from data
  const labels = useMemo(() => data?.map((item) => String(item[labelKey])) ?? [], [data, labelKey]);

  // Process datasets data
  const processedDatasets = useMemo(
    () =>
      datasets.map((dataset) => {
        const values =
          data?.map((item) => {
            const value = item[dataset.dataKey];
            return typeof value === 'string' ? parseFloat(value) : Number(value);
          }) ?? [];

        return {
          label: dataset.label,
          fill: dataset.fill ?? true,
          tension: dataset.tension ?? 0.4,
          borderCapStyle: 'round' as const,
          pointRadius: dataset.pointRadius ?? 0.2,
          backgroundColor: dataset.backgroundColor ?? 'transparent',
          borderColor: dataset.borderColor,
          borderDash: dataset.borderDash,
          data: values,
        };
      }),
    [data, datasets],
  );

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    // Destroy existing chart
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: processedDatasets,
      },
      options: {
        aspectRatio: chartOptions.aspectRatio,
        responsive: chartOptions.responsive,
        interaction: {
          intersect: chartOptions.interaction.intersect,
          mode: chartOptions.interaction.mode,
        },
        plugins: {
          tooltip: {
            enabled: chartOptions.plugins.tooltip.enabled,
            mode: chartOptions.interaction.mode,
            callbacks: chartOptions.plugins.tooltip.callbacks,
          },
          legend: {
            display: chartOptions.plugins.legend.display,
            align: 'center',
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data, labels, processedDatasets, chartOptions]);

  // Loading state
  if (loading) return <FallBack />;

  // No data state
  if (!data || data.length === 0) {
    return (
      <Flex style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Lottie autoplay loop animationData={NotDataFoundV2} style={{ height: '300px', width: '300px' }} />
      </Flex>
    );
  }

  return <canvas ref={canvasRef} />;
}
