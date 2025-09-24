import { rankItem } from '@tanstack/match-sorter-utils';
import type { FilterFn } from '@tanstack/react-table';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createFuzzyFilter = <T>(): FilterFn<T> => {
  return (row, columnId, value, addMeta) => {
    if (!value || value === '') return true;
    const itemValue = row.getValue(columnId);
    if (itemValue === null || itemValue === undefined) return false;
    const itemRank = rankItem(String(itemValue), String(value));
    addMeta({ itemRank });
    return itemRank.passed;
  };
};

export const reorder = (list: string[], startIndex: number, endIndex: number): string[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export type ExtractString<T> = T extends object ? { [K in keyof T]: ExtractString<T[K]> }[keyof T] : T;

export function matchPermission(userPermissions: string[], required: string): boolean {
  return userPermissions.some((p) => {
    if (p === required) return true; // exact match
    if (p.endsWith('*')) {
      const prefix = p.replace('*', ''); // wildcard
      return required.startsWith(prefix);
    }
    return false;
  });
}

export const convertCamelToTitleCase = (text: string | undefined) => {
  if (!text) return '';
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const formatCurrency = (value: string) => {
  if (!value) return '';
  // Langsung format string sebagai integer
  const intValue = parseInt(value, 10);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(intValue);
};
