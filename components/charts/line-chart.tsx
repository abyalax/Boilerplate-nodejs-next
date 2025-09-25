'use client';

import { Chart, TooltipItem } from 'chart.js';
import Lottie from 'lottie-react';
import type { ComponentType } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { NotDataFoundV2 } from '~/assets';
import { FallBack } from '../fragments/fallback';
import { Flex } from '../layouts/flex';

export interface LineChartProps<T extends Record<string, unknown>> {
  data?: T[];
  loading: boolean;

  options?: Partial<{
    datasets: {
      label: string;
      dataKey: string;
      borderColor: string;
      backgroundColor?: string;
      tension?: number;
      borderDash?: number[];
      pointRadius?: number;
      fill?: boolean;
    }[];

    colors?: {
      base: string;
      hover: string;
      text: string;
    };

    chart?: {
      aspectRatio?: number;
      responsive?: boolean;
      showLegend?: boolean;
      labelKey?: keyof T;
      title?: string;
    };

    tooltip?: {
      enable?: boolean;
      showCategory?: boolean;
      tooltipFormatter?: (value: string, label: string, category?: string) => string;
      interactionMode?: 'index' | 'point' | 'nearest';
    };
  }>;

  LoadingComponent?: ComponentType;
  NoDataComponent?: ComponentType;
}

/**
 * Default chart configuration
 */
const DEFAULT_CONFIG: LineChartProps<Record<string, unknown>>['options'] = {
  chart: {
    aspectRatio: 6 / 2,
    responsive: true,
    showLegend: true,
    labelKey: 'label',
    title: 'Chart Data',
  },
  tooltip: {
    enable: true,
    showCategory: true,
    tooltipFormatter: (value: string, label: string) => `${label}: Rp ${value}`,
    interactionMode: 'index',
  },
};

export function LineChart<T extends Record<string, unknown>>({ data, loading, options }: LineChartProps<T>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const mergedOptions = useMemo(() => {
    return {
      chart: { ...DEFAULT_CONFIG?.chart, ...options?.chart },
      tooltip: { ...DEFAULT_CONFIG?.tooltip, ...options?.tooltip },
      datasets: options?.datasets ?? [],
    };
  }, [options]);

  const labels = useMemo(() => {
    const key = mergedOptions.chart.labelKey as keyof T;
    return data?.map((item) => String(item[key])) ?? [];
  }, [data, mergedOptions.chart.labelKey]);

  const processedDatasets = useMemo(
    () =>
      (mergedOptions.datasets ?? []).map((dataset) => {
        const values =
          data?.map((item) => {
            const value = item[dataset.dataKey as keyof T];
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
    [data, mergedOptions.datasets],
  );

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: processedDatasets,
      },
      options: {
        aspectRatio: mergedOptions.chart.aspectRatio,
        responsive: mergedOptions.chart.responsive,
        interaction: {
          intersect: false,
          mode: mergedOptions.tooltip.interactionMode,
        },
        plugins: {
          datalabels: {
            display: false,
          },
          tooltip: {
            enabled: mergedOptions.tooltip.enable,
            mode: mergedOptions.tooltip.interactionMode,
            callbacks: {
              label: (tooltipItems: TooltipItem<'line'>) =>
                mergedOptions.tooltip.tooltipFormatter?.(tooltipItems.formattedValue, tooltipItems.dataset.label || '') ?? tooltipItems.formattedValue,
            },
          },
          legend: {
            display: mergedOptions.chart.showLegend,
            align: 'center',
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data, labels, processedDatasets, mergedOptions]);

  if (loading) return <FallBack />;

  if (!data || data.length === 0) {
    return (
      <Flex style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Lottie autoplay loop animationData={NotDataFoundV2} style={{ height: '300px', width: '300px' }} />
      </Flex>
    );
  }

  return <canvas ref={canvasRef} />;
}
