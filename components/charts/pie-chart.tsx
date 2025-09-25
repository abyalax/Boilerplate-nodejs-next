'use client';

import { Chart, ChartTypeRegistry } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Lottie from 'lottie-react';
import { ComponentType, useEffect, useMemo, useRef } from 'react';
import { NotDataFoundV2 } from '~/assets';
import { FallBack } from '../fragments/fallback';
import { Flex } from '../layouts/flex';

Chart.register(ChartDataLabels);

export interface PieChartProps<T extends Record<string, string>> {
  data?: T[];
  loading: boolean;
  labelKey: keyof T;
  valueKey: keyof T;
  dataset: {
    label: string;
    backgroundColor: string[];
    hoverBackgroundColor?: string[];
    borderWidth?: number;
  };
  config?: Partial<{
    responsive: boolean;
    datalabels: {
      color: string;
      fontSize: number;
      formatter: (value: number, label: string) => string;
    };
    tooltipFormatter: (ctx: { value: number; label: string; rawData: T }) => string[];
    legendPosition: 'top' | 'bottom' | 'left' | 'right';
  }>;

  LoadingComponent?: ComponentType;
  NoDataComponent?: ComponentType;
}

const DEFAULT_CONFIG: Required<PieChartProps<Record<string, string>>['config']> = {
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
  LoadingComponent,
  NoDataComponent,
}: PieChartProps<T>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<keyof ChartTypeRegistry> | null>(null);

  const chartOptions = useMemo(() => {
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
            color: chartOptions.datalabels?.color,
            font: { size: chartOptions.datalabels?.fontSize },
            formatter: (value: number, context) => {
              const label = context.chart.data.labels?.[context.dataIndex] as string;
              return chartOptions.datalabels?.formatter?.(value, label);
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
                return chartOptions.tooltipFormatter?.({
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

  if (loading) return <>{LoadingComponent ?? <FallBack />}</>;

  if (!data || data.length === 0)
    return (
      <>
        {NoDataComponent ?? (
          <Flex style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Lottie autoplay loop animationData={NotDataFoundV2} style={{ height: '300px', width: '300px' }} />
          </Flex>
        )}
      </>
    );

  return <canvas ref={canvasRef} />;
}
