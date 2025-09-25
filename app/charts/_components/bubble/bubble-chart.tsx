'use client';

import { ScriptableContext } from 'chart.js';
import { useCallback, useMemo } from 'react';
import { BubbleChart, BubbleChartDataPoint } from '~/components/charts/bubble-chart';
import { H2 } from '~/components/ui/typography';
import { bubleChartConfig, Data, data } from './config';

export const ExampleBubbleChart = () => {
  const palette = ['#18551aff', '#2196f3', '#ff9800', '#3027b0ff', '#f44336', '#00bcd4', '#acfa52ff', '#ffeb3b', '#795548', '#607d8b'];
  const categories = Array.from(new Set(data?.map((d) => d.category)));

  const djb2Hash = useCallback((str: string) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) hash = (hash << 5) + hash + str.charCodeAt(i);
    return Math.abs(hash);
  }, []);

  const categoryColors = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((category) => {
      map[category] = palette[djb2Hash(category) % palette.length];
    });
    return map;
  }, [categories, djb2Hash]);

  const transformData = useCallback((data: Data[]) => {
    const revenues = data.map((d) => Number(d.revenue));
    const minRev = Math.min(...revenues);
    const maxRev = Math.max(...revenues);

    return data.map((d) => {
      const revenue = Number(d.revenue);
      const margin = Number(d.margin_percentage) * 100;
      const r = 5 + 25 * ((revenue - minRev) / (maxRev - minRev || 1));
      return {
        x: d.quantity,
        y: margin,
        r,
        label: d.name,
        category: d.category,
        revenue,
      };
    });
  }, []);

  const datasetConfig = {
    label: 'Product Profitable',
    backgroundColor: (ctx: ScriptableContext<'bubble'>) => {
      const point = ctx.raw as BubbleChartDataPoint;
      return categoryColors[point.category ?? ''] ?? '#9e9e9e';
    },
    borderColor: '#fff',
    borderWidth: 1,
  };

  return (
    <div>
      <H2>Bubble Chart</H2>
      <div className="h-[600px] w-full flex justify-center items-center">
        <BubbleChart transformData={transformData} data={data} isLoading={false} datasetConfig={datasetConfig} chartConfig={bubleChartConfig} />
      </div>
    </div>
  );
};
