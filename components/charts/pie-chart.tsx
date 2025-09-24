'use client';

import { Chart, ChartTypeRegistry } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ReactNode, useEffect, useMemo, useRef } from 'react';

Chart.register(ChartDataLabels);

/** Dataset config for pie/doughnut */
export interface PieDatasetConfig {
  label: string;
  backgroundColor: string[];
  hoverBackgroundColor?: string[];
  borderWidth?: number;
}

/** Config for pie chart behavior/appearance */
export interface PieChartConfig {
  responsive?: boolean;
  datalabels?: {
    color?: string;
    fontSize?: number;
    formatter?: (value: number, label: string) => string;
  };
  tooltipFormatter?: (ctx: { value: number; label: string; rawData: Record<string, unknown> }) => string[];
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
}

/** Props for reusable PieChart */
export interface PieChartProps<T extends Record<string, string>> {
  data?: T[];
  loading: boolean;
  labelKey: keyof T;
  valueKey: keyof T;
  dataset: PieDatasetConfig;
  config?: PieChartConfig;

  /** Optional custom fallback UI */
  loadingFallback?: ReactNode;
  emptyState?: ReactNode;
}

const DEFAULT_CONFIG: Required<PieChartConfig> = {
  responsive: true,
  datalabels: {
    color: 'white',
    fontSize: 14,
    formatter: (value, label) => `${label} (${value})`,
  },
  tooltipFormatter: ({ value, label }) => [`${label}: ${value}`],
  legendPosition: 'top',
};

export function PieChart<T extends Record<string, string>>({
  data,
  loading,
  labelKey,
  valueKey,
  dataset,
  config = {},
  loadingFallback,
  emptyState,
}: PieChartProps<T>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<keyof ChartTypeRegistry> | null>(null);

  const chartOptions = useMemo(() => {
    // Merge user config with defaults
    const chartConfig = { ...DEFAULT_CONFIG, ...config };
    return chartConfig;
  }, [config]);

  const labels = useMemo(() => data?.map((item) => String(item[labelKey])) ?? [], [data, labelKey]);
  const values = useMemo(() => data?.map((item) => Number(item[valueKey]) || 0) ?? [], [data, valueKey]);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: dataset.label,
            data: values,
            borderWidth: dataset.borderWidth ?? 1,
            backgroundColor: dataset.backgroundColor,
            hoverBackgroundColor: dataset.hoverBackgroundColor,
          },
        ],
      },
      options: {
        responsive: chartOptions.responsive,
        plugins: {
          datalabels: {
            color: chartOptions.datalabels.color,
            font: { size: chartOptions.datalabels.fontSize },
            formatter: (value: number, context) => {
              const label = context.chart.data.labels?.[context.dataIndex] as string;
              return chartOptions.datalabels.formatter?.(value, label);
            },
          },
          legend: {
            position: chartOptions.legendPosition,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const idx = tooltipItem.dataIndex;
                const rawData = data[idx];
                return chartOptions.tooltipFormatter({
                  value: values[idx],
                  label: labels[idx],
                  rawData,
                });
              },
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [labels, values, dataset, data, chartOptions]);

  if (loading) return <>{loadingFallback ?? <div>Loading chart…</div>}</>;

  if (!data || data.length === 0) return <>{emptyState ?? <div style={{ textAlign: 'center' }}>No data available</div>}</>;

  return <canvas ref={canvasRef} />;
}
