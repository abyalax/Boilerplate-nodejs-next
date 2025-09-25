/** biome-ignore-all lint/suspicious/noExplicitAny: <_ */
'use client';

import { Chart, TooltipItem } from 'chart.js';
import Lottie from 'lottie-react';
import { ComponentType, useEffect, useMemo, useRef } from 'react';
import { NotDataFoundV2 } from '~/assets';
import { FallBack } from '../fragments/fallback';
import { Flex } from '../layouts/flex';

export interface BarChartProps<T extends Record<string, unknown>> {
  data?: Record<string, unknown>[];
  loading: boolean;

  options?: Partial<{
    colors?: {
      base: string;
      hover: string;
      text: string;
    };
    chart?: {
      aspectRatio?: number;
      horizontal?: boolean;
      labelKey?: keyof T;
      valueKey?: keyof T;
      categoryKey?: keyof T;
      title?: string;
    };
    tooltip?: {
      showCategory?: boolean;
      tooltipFormatter?: (value: string, label: string, category?: string) => string;
    };
  }>;

  LoadingComponent?: ComponentType;
  NoDataComponent?: ComponentType;
}

const defaultOptions = {
  highlightThreshold: undefined as number | undefined, // kalau undefined → ga ada highlight
  colors: {
    base: '#cccccc',
    hover: '#928d8dff',
    text: '#202020ff',
  },
  chart: {
    aspectRatio: 3,
    horizontal: true,
    labelKey: 'label',
    valueKey: 'value',
    categoryKey: 'category',
    title: 'Chart Data',
  },
  tooltip: {
    showCategory: true,
    formatter: (value: string, label: string, category?: string) => {
      let result = `${label}: ${value}`;
      if (category) result += ` (${category})`;
      return result;
    },
  },
};

export function BarChart<T extends Record<string, unknown>>({ data, loading, options = defaultOptions, LoadingComponent, NoDataComponent }: BarChartProps<T>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  // Merge options with defaults
  const config = useMemo(
    () => ({
      colors: { ...defaultOptions.colors, ...options.colors },
      chart: { ...defaultOptions.chart, ...options.chart },
      tooltip: { ...defaultOptions.tooltip, ...options.tooltip },
    }),
    [options],
  );

  const chartData = useMemo(() => {
    if (!data) return [];

    return data.map((item) => {
      const label = (item as T)[config.chart.labelKey as keyof T] as string;
      const value = (item as T)[config.chart.valueKey as keyof T] as number;
      const category = (item as T)[config.chart.categoryKey as keyof T] as string;

      return {
        label,
        value,
        category,
        originalItem: item,
        backgroundColor: config.colors.base,
        hoverBackgroundColor: config.colors.hover,
      };
    });
  }, [data, config]);

  const labels = chartData.map((e) => e.label);
  const values = chartData.map((e) => e.value);
  const backgroundColor = chartData.map((e) => e.backgroundColor);
  const hoverBackgroundColor = chartData.map((e) => e.hoverBackgroundColor);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: config.chart.title,
            backgroundColor,
            hoverBackgroundColor,
            data: values,
          },
        ],
      },
      options: {
        indexAxis: config.chart.horizontal ? 'y' : 'x',
        aspectRatio: config.chart.aspectRatio,
        responsive: true,
        interaction: { intersect: false, mode: 'point' },
        scales: {
          y: {
            ticks: {
              color: config.colors.text,
              align: 'center',
              font: { size: 14 },
            },
          },
          x: {
            ticks: { color: config.colors.text },
          },
        },
        plugins: {
          datalabels: { display: false },
          tooltip: {
            enabled: true,
            mode: 'point',
            callbacks: {
              label: (tooltipItems: TooltipItem<'bar'>) => {
                const val = tooltipItems.formattedValue;
                const lbl = tooltipItems.dataset.label || '';
                const category = config.tooltip.showCategory ? chartData[tooltipItems.dataIndex].category : undefined;
                return config.tooltip.formatter(val, lbl, category);
              },
            },
          },
          legend: {
            display: true,
            align: 'center',
            labels: { color: config.colors.text },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [backgroundColor, data, hoverBackgroundColor, labels, values, config, chartData]);

  // Render loading state
  if (loading) {
    return LoadingComponent ? <LoadingComponent /> : <FallBack />;
  }

  // Render no data state
  if (!data || data.length === 0) {
    return NoDataComponent ? (
      <NoDataComponent />
    ) : (
      <Flex style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Lottie autoplay loop animationData={NotDataFoundV2} style={{ height: '300px', width: '300px' }} />
      </Flex>
    );
  }

  return <canvas ref={canvasRef} />;
}
