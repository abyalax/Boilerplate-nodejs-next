/** biome-ignore-all lint/suspicious/noExplicitAny: < */
'use client';

import type { ColumnDef, PaginationState, Row, SortingState, Updater } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import { MetaResponse, metaRequestSchema } from '~/common/types/meta';
import { useDebouncedCallback } from '~/components/hooks/use-debounce-callback';
import { useNavigate } from '~/components/hooks/use-navigate';
import { useSearch } from '~/components/hooks/use-search';
import { Flex } from '~/components/layouts/flex';
import { Input } from '~/components/ui/input';
import { Pill } from '~/components/ui/pill';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { TableBody, TableCell, Table as TableComponent, TableFooter, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { TablePagination } from '~/components/ui/table-pagination';
import { createFuzzyFilter } from '~/lib/utils';
import { ColumnVisibilitySelector } from './_ui/column-visibility';

export type EngineSide = 'client_side' | 'server_side';

type EnableFeature<T> = {
  search?: { fieldSearchable: keyof T; debounceSearch?: number };
  virtualizer?: { virtualizeAt: number };
  columnVisibilitySelector?: {
    initialColumnVisibility: Record<string, boolean>;
  };
  engineSide?: EngineSide;
  pagination?: {
    perPageOptions?: number[];
    initialState?: PaginationState;
  };
  menufilter?: ReactNode;
};

export type TableProps<T> = {
  enableFeature: EnableFeature<T>;
  columns: ColumnDef<T, any>[];
  columnIds: (string | undefined)[];
  data?: { data: T[]; meta: MetaResponse };
  onClickRow: (data: Row<T>, e?: MouseEvent) => void;
};

const defaultFeature: EnableFeature<any> = {
  virtualizer: { virtualizeAt: 1000 },
  engineSide: 'client_side',
  pagination: {
    perPageOptions: [5, 10, 20, 30, 40, 50, 100],
  },
};

export const Table = <T,>({ enableFeature = defaultFeature, onClickRow, ...props }: TableProps<T>) => {
  const [engine] = useState<EngineSide>(enableFeature.engineSide ?? 'client_side');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string | undefined>(undefined);
  const [sorting, setSorting] = useState<SortingState>([]);

  const fuzzyFilter = createFuzzyFilter<T>();
  const parentRef = useRef<HTMLDivElement>(null);
  const search = useSearch(metaRequestSchema);

  const navigate = useNavigate();

  const isClientControl = engine === 'client_side';
  const isServerControl = engine === 'server_side';

  const pageIndex = isServerControl ? Number(search.page ?? 1) - 1 : pagination.pageIndex;
  const pageSize = isServerControl ? Number(search.per_page ?? 10) : pagination.pageSize;
  const debounceSearch = enableFeature.search?.debounceSearch ?? 800;
  const filterFns = { fuzzy: fuzzyFilter };

  const serverSearch = useDebouncedCallback((value: string) => {
    navigate({
      replace: true,
      search: (prev) => ({
        ...prev,
        search: value,
        page: 1,
      }),
      viewTransition: true,
    });
    setGlobalFilter(value);
  }, debounceSearch);

  const clientSearch = useDebouncedCallback((value: string) => {
    setGlobalFilter(value);
  }, debounceSearch);

  const onPaginationChange = (updater: Updater<PaginationState>) => {
    const next = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
    navigate({
      replace: true,
      search: (prev) => ({
        ...prev,
        page: next.pageIndex + 1,
        per_page: next.pageSize,
      }),
      viewTransition: true,
    });
  };

  const onSortingChange = (updater: Updater<SortingState>) => {
    const next = typeof updater === 'function' ? updater(sorting) : updater;
    setSorting(updater);
    navigate({
      search: (prev) => ({
        ...prev,
        sort_by: next[0]?.id,
        sort_order: next[0]?.desc ? 'DESC' : 'ASC',
      }),
      replace: true,
      viewTransition: true,
    });
  };

  const table = useReactTable<T>({
    /**Common */
    data: props.data?.data || [],
    columns: props.columns,
    debugTable: true,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableMultiSort: true,
    getCoreRowModel: getCoreRowModel(),

    /**Client Side */
    getSortedRowModel: isClientControl ? getSortedRowModel() : undefined,
    getFilteredRowModel: isClientControl ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enableFeature.pagination ? (isClientControl ? getPaginationRowModel() : undefined) : undefined,

    filterFns: isClientControl ? filterFns : undefined,
    globalFilterFn: isClientControl ? fuzzyFilter : undefined,

    /**Server Side or Client Side */
    onGlobalFilterChange: isServerControl ? serverSearch : clientSearch,
    onSortingChange: isServerControl ? onSortingChange : setSorting,

    /**Server Side */
    manualPagination: isServerControl,
    manualSorting: isServerControl,
    manualFiltering: isServerControl,
    pageCount: isServerControl ? props.data?.meta.total_pages : undefined,
    onPaginationChange: enableFeature.pagination ? (isServerControl ? onPaginationChange : setPagination) : undefined,

    /**State */
    initialState: {
      columnVisibility: enableFeature.columnVisibilitySelector?.initialColumnVisibility,
      columnOrder: props.columnIds as string[],
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    state: {
      sorting,
      pagination: enableFeature.pagination
        ? {
            pageIndex,
            pageSize,
          }
        : undefined,
      globalFilter: isClientControl ? globalFilter : search.search,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  });

  useEffect(() => {
    table.setGlobalFilter(globalFilter);
  }, [globalFilter, table]);

  useEffect(() => {
    if (search.search !== undefined && isClientControl) setGlobalFilter(search.search ?? undefined);
  }, [isClientControl, search]);

  return (
    <div className="p-10 rounded-sm my-10 bg-sidebar">
      <div className="flex items-center justify-between">
        {enableFeature.menufilter}
        {enableFeature.search && (
          <Flex gap={'md'} align={'center'} justify={'center'} style={{ width: 300 }}>
            <Input placeholder="Search..." value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </Flex>
        )}
        <Pill onRemove={() => table.resetRowSelection()} selectedCount={selectedRows.length} />
        {enableFeature.columnVisibilitySelector?.initialColumnVisibility && <ColumnVisibilitySelector table={table} columnIds={props.columnIds} />}
      </div>
      <TableComponent>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.index} colSpan={header.colSpan}>
                  <div onClick={header.column.getToggleSortingHandler()}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: <FaArrowUp style={{ margin: '0 5px' }} />,
                      desc: <FaArrowDown style={{ margin: '0 5px' }} />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > (enableFeature.virtualizer?.virtualizeAt as number)
            ? virtualizer.getVirtualItems().map((virtualRow, index) => {
                const rows = table.getRowModel().rows;
                const row = rows[virtualRow.index];
                return (
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    className="bg-red-500"
                    onClick={(e) => onClickRow(row, e)}
                    key={virtualRow.key}
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                );
              })
            : table.getRowModel().rows.map((row: Row<any>) => (
                <TableRow onClick={(e) => onClickRow(row, e)} style={{ cursor: 'pointer' }} key={row.id}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={index}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
        <TableFooter className="bg-transparent">
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableHead key={header.index}>{flexRender(header.column.columnDef.footer, header.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </TableComponent>
      {enableFeature.pagination && (
        <Flex direction="column" gap={20}>
          <Flex>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm w-24">Total Page</p>
                  <p className="text-sm">: {table.getPageCount()}</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm w-24">Current Page</p>
                  <p className="text-sm">: {table.getState().pagination.pageIndex + 1}</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm w-24">Page Size</p>
                  <Select
                    value={search.per_page.toString()}
                    onValueChange={(value) =>
                      navigate({
                        search(_prev) {
                          return {
                            ..._prev,
                            per_page: value,
                          };
                        },
                      })
                    }
                  >
                    <SelectTrigger className="w-[70px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {enableFeature.pagination?.perPageOptions?.map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Flex>
          <Flex justify={'center'} align={'center'}>
            <TablePagination
              totalPages={table.getPageCount()}
              currentPage={table.getState().pagination.pageIndex + 1}
              onPageChange={(page) => table.setPageIndex(page - 1)}
              onNextPage={table.nextPage}
              onPreviousPage={table.previousPage}
            />
          </Flex>
        </Flex>
      )}
    </div>
  );
};
