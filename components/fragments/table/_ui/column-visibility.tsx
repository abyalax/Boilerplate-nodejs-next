'use client';

import { Table } from '@tanstack/react-table';
import { FaEye } from 'react-icons/fa';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { convertCamelToTitleCase } from '~/lib/utils';

type ColumnSelector<T> = {
  table: Table<T>;
  columnIds: (string | undefined)[];
};

export const ColumnVisibilitySelector = <T,>({ table, columnIds }: ColumnSelector<T>) => {
  const columnVisibilityCheckboxState = Object.entries(table.getState().columnVisibility)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const handleOnChange = (e: boolean, id: string | undefined) => {
    const selectedOptions = e ? [...columnVisibilityCheckboxState, id] : columnVisibilityCheckboxState.filter((key) => key !== id);
    table.setColumnVisibility(
      columnIds.reduce((acc: { [id: string]: boolean }, val) => {
        acc[val ?? ''] = selectedOptions.includes(val);
        return acc;
      }, {}),
    );
  };
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <FaEye size={20} />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Select Columns</TooltipContent>
      </Tooltip>

      <PopoverContent className="w-56 p-3 space-y-2" align="end" sideOffset={4}>
        <p className="text-sm font-medium">Visible Columns</p>
        <div className="space-y-2">
          {columnIds.map((id, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-sm px-2 py-1 hover:bg-accent cursor-pointer"
              onClick={() => handleOnChange(!columnVisibilityCheckboxState.includes(id ?? ''), id)}
            >
              <Checkbox id={id} checked={columnVisibilityCheckboxState.includes(id ?? '')} />
              <Label htmlFor={id} className="cursor-pointer">
                {convertCamelToTitleCase(id ?? '')}
              </Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
