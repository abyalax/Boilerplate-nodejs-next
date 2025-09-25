'use client';

import { Chart } from 'chart.js';
import Lottie from 'lottie-react';
import { useTheme } from 'next-themes';
import { FC, useEffect, useMemo, useRef } from 'react';
import { NotDataFoundV2 } from '~/assets';
import { FallBack } from '~/components/fragments/fallback';
import { Flex } from '~/components/layouts/flex';
import { data } from './config';

const loading = false;

export const ClusteredBarChart: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const { theme } = useTheme();

  const isLightMode = theme === 'light';
  const total_with_discount = useMemo(() => data?.map((item) => parseFloat(item.with_discount)) ?? [], []);
  const total_without_discount = useMemo(() => data?.map((item) => parseFloat(item.without_discount)) ?? [], []);
  const names = useMemo(() => data?.map((item) => item.name) ?? [], []);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (data === undefined) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [
          {
            label: 'Total Sold With Discount',
            backgroundColor: '#30b4e1',
            hoverBackgroundColor: '#138cb4ff',
            data: total_with_discount,
          },
          {
            label: 'Total Sold Without Discount',
            backgroundColor: '#f39c12',
            hoverBackgroundColor: '#d68910',
            data: total_without_discount,
          },
        ],
      },
      options: {
        aspectRatio: 6 / 2,
        responsive: true,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          datalabels: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            callbacks: {
              label: (tooltipItems) => {
                return `${tooltipItems.dataset.label} : ${tooltipItems.formattedValue} items`;
              },
            },
          },
          legend: {
            display: true,
            align: 'center',
          },
        },
        scales: {
          y: {
            ticks: {
              color: isLightMode ? '#202020ff' : '#d4d0d0ff',
              align: 'center',
              font: {
                size: 14,
              },
            },
          },
          x: {
            ticks: {
              color: isLightMode ? '#202020ff' : '#d4d0d0ff',
              align: 'center',
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [isLightMode, names, total_with_discount, total_without_discount]);

  if (loading) return <FallBack />;

  if (!data || data.length === 0) {
    return (
      <Flex>
        <Lottie autoplay loop animationData={NotDataFoundV2} style={{ height: '300px', width: '300px' }} />
      </Flex>
    );
  }

  return <canvas ref={canvasRef} />;
};
