import React, { useEffect, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
    type PaginationState,
    type RowSelectionState,
    type RowData,
    type ColumnResizeMode,
} from '@tanstack/react-table';

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        align?: 'left' | 'center' | 'right';
    }
}
import { cn } from '@/lib/utils/cn';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { Spinner } from '../spinner/Spinner';

// ─── Pagination Config ───────────────────────────────────────────────────────

/** Configuration for table pagination behavior */
export interface PaginationConfig {
    /** Current page number (1-based), used for controlled server-side mode */
    current?: number;
    /** Number of rows per page (default: 10) */
    pageSize?: number;
    /** Total record count from the server; setting this enables server-side mode */
    total?: number;
    /** Available page size options (default: [5, 10, 20, 50, 100]) */
    pageSizeOptions?: number[];
    /** Custom renderer for the total info display */
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    /** Whether to show the page size selector (default: true) */
    showSizeChanger?: boolean;
    /** Callback fired when page or page size changes; required for server-side mode */
    onChange?: (page: number, pageSize: number) => void;
}

/** Props for the Table component */
export interface TableProps<TData, TValue = unknown> {
    /** Array of row data to display */
    data: TData[];
    /** TanStack column definitions */
    columns: ColumnDef<TData, TValue>[];
    /** Shows a loading overlay with spinner */
    isLoading?: boolean;
    /** Enable column header sorting (default: true) */
    enableSorting?: boolean;
    /** Enable row selection with checkboxes */
    enableRowSelection?: boolean;
    /** Enable expandable rows */
    enableExpanding?: boolean;
    /** Render function for expanded row content */
    renderSubComponent?: (props: { row: TData }) => React.ReactNode;
    /** Determines whether a given row can be expanded */
    getRowCanExpand?: (row: TData) => boolean;
    /** Callback fired when row selection changes */
    onSelectionChange?: (selectedRows: TData[]) => void;
    className?: string;
    /** Enable drag-to-resize columns */
    enableColumnResizing?: boolean;
    /** Column resize strategy: 'onChange' updates live, 'onEnd' updates on release */
    columnResizeMode?: ColumnResizeMode;
    /** Pagination config object, or false to disable pagination entirely */
    pagination?: PaginationConfig | false;
    /** Text shown when data is empty */
    emptyText?: string;
}

export function Table<TData, TValue = unknown>({
    data,
    columns,
    isLoading = false,
    enableSorting = true,
    enableRowSelection = false,
    enableExpanding = false,
    renderSubComponent,
    getRowCanExpand,
    onSelectionChange,
    className,
    enableColumnResizing = false,
    columnResizeMode = 'onChange',
    pagination: paginationProp = {},
    emptyText = 'No data',
}: TableProps<TData>) {
    // Xác định có bật pagination không
    const paginationEnabled = paginationProp !== false;
    const cfg = paginationEnabled ? (paginationProp as PaginationConfig) : {};

    // Server mode khi có cfg.total
    const isServerMode = paginationEnabled && cfg.total !== undefined;
    const pageSizeOptions = cfg.pageSizeOptions ?? [5, 10, 20, 50, 100];

    // Internal pagination state (0-based pageIndex cho tanstack)
    const [page, setPage] = useState(cfg.current ?? 1);       // 1-based
    const [pageSize, setPageSize] = useState(cfg.pageSize ?? 10);

    // Sync controlled current từ ngoài vào (server mode)
    useEffect(() => {
        if (cfg.current !== undefined) setPage(cfg.current);
    }, [cfg.current]);

    // Derived
    const pageIndex = page - 1; // 0-based cho tanstack
    const totalRows = isServerMode ? cfg.total! : data.length;
    const pageCount = isServerMode ? Math.ceil(totalRows / pageSize) : undefined;

    const tanstackPagination: PaginationState = { pageIndex, pageSize };

    const handlePaginationChange = (updater: PaginationState | ((prev: PaginationState) => PaginationState)) => {
        const next = typeof updater === 'function' ? updater(tanstackPagination) : updater;
        const newPage = next.pageIndex + 1;     // convert về 1-based
        const newPageSize = next.pageSize;

        if (!isServerMode) {
            setPage(newPage);
            setPageSize(newPageSize);
        }
        cfg.onChange?.(newPage, newPageSize);
    };

    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const finalColumns = React.useMemo(() => {
        const cols = [...columns];
        if (enableRowSelection) {
            cols.unshift({
                id: 'select',
                size: 10,
                minSize: 5,
                maxSize: 10,
                meta: { align: 'center' },
                header: ({ table }) => (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            size="sm"
                            checked={table.getIsAllRowsSelected()}
                            indeterminate={table.getIsSomeRowsSelected()}
                            onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            size="sm"
                            checked={row.getIsSelected()}
                            disabled={!row.getCanSelect()}
                            onCheckedChange={(checked) => row.toggleSelected(!!checked)}
                        />
                    </div>
                ),
                enableSorting: false,
            });
        }
        if (enableExpanding) {
            cols.unshift({
                id: 'expander',
                header: () => null,
                size: 10,
                minSize: 10,
                maxSize: 10,
                meta: { align: 'center' },
                cell: ({ row }) => row.getCanExpand() ? (
                    <div className="flex items-center justify-center">
                        <span
                            onClick={row.getToggleExpandedHandler()}
                            className="hover:bg-muted text-muted-foreground transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-primary/50 p-1 rounded-md border border-border"
                        >
                            {row.getIsExpanded() ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                        </span>
                    </div>
                ) : null,
                enableSorting: false,
            });
        }
        return cols;
    }, [columns, enableRowSelection, enableExpanding]);

    const table = useReactTable({
        data,
        columns: finalColumns,
        state: { sorting, rowSelection, pagination: tanstackPagination },
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: handlePaginationChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getPaginationRowModel: paginationEnabled ? getPaginationRowModel() : undefined,
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        columnResizeMode,
        enableColumnResizing,
        enableRowSelection,
        manualPagination: isServerMode,
        pageCount: isServerMode ? pageCount : undefined,
        getRowCanExpand: getRowCanExpand ? (row) => getRowCanExpand(row.original) : () => !!renderSubComponent,
    });

    // Input go-to-page
    const [inputValue, setInputValue] = useState<string | number>(page);
    useEffect(() => { setInputValue(page); }, [page]);

    useEffect(() => {
        if (onSelectionChange) {
            const selected = table.getSelectedRowModel().rows.map(row => row.original);
            onSelectionChange(selected);
        }
    }, [rowSelection, onSelectionChange, table]);

    // Computed display values
    const currentPageIndex = table.getState().pagination.pageIndex;
    const currentPageSize = table.getState().pagination.pageSize;
    const from = currentPageIndex * currentPageSize + 1;
    const to = Math.min((currentPageIndex + 1) * currentPageSize, totalRows);
    const totalPageCount = isServerMode ? (pageCount ?? 1) : (table.getPageCount() || 1);

    return (
        <div className={cn("relative w-full rounded-md border border-border bg-background flex flex-col overflow-hidden", className)}>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-background/60 z-10 flex items-center justify-center backdrop-blur-[0.5px]">
                    <Spinner size="lg" variant="primary" />
                </div>
            )}

            <div className="overflow-x-auto w-full">
                <table
                    className="w-full text-sm text-left text-foreground whitespace-nowrap"
                    style={{
                        width: enableColumnResizing ? table.getCenterTotalSize() : undefined,
                        tableLayout: enableColumnResizing ? 'fixed' : 'auto'
                    }}
                >
                    <thead className="text-xs text-muted-foreground bg-muted/50 border-b border-border">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} >
                                {headerGroup.headers.map(header => {
                                    const meta = header.column.columnDef.meta;
                                    const align = meta?.align || 'left';
                                    const canSort = header.column.getCanSort() && enableSorting && header.column.id !== 'select';

                                    return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                style={{
                                                    width: enableColumnResizing ? header.getSize() : header.column.columnDef.size,
                                                    position: 'relative'
                                                }}
                                                aria-sort={
                                                    canSort
                                                        ? header.column.getIsSorted() === 'desc'
                                                            ? 'descending'
                                                            : header.column.getIsSorted() === 'asc'
                                                                ? 'ascending'
                                                                : 'none'
                                                        : undefined
                                                }
                                                className={cn(
                                                header.column.id === 'select' || header.column.id === 'expander' ? "px-1" : "px-2",
                                                "py-3 font-semibold tracking-wide border border-border transition-colors group/header",
                                                canSort ? "cursor-pointer select-none hover:bg-muted" : "",
                                                align === 'center' ? "text-center" : align === 'right' ? "text-right" : "text-left"
                                            )}
                                        >
                                            <div
                                                className={cn("flex flex-col h-full")}
                                                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div className={cn(
                                                        "flex items-center gap-2",
                                                        align === 'center' ? "justify-center" : align === 'right' ? "justify-end" : "justify-between"
                                                    )}>
                                                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                                        {canSort && (
                                                            <span className="shrink-0">
                                                                {{
                                                                    asc: <ChevronUp className="w-4 h-4 text-primary" />,
                                                                    desc: <ChevronDown className="w-4 h-4 text-primary" />,
                                                                }[header.column.getIsSorted() as string] ?? (
                                                                        <div className="flex flex-col opacity-30 -space-y-1 hover:opacity-100 transition-opacity">
                                                                            <ChevronUp className="w-3 h-3" />
                                                                            <ChevronDown className="w-3 h-3" />
                                                                        </div>
                                                                    )}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Resize Handle */}
                                            {enableColumnResizing && header.column.getCanResize() && (
                                                <div
                                                    {...{
                                                        onMouseDown: header.getResizeHandler(),
                                                        onTouchStart: header.getResizeHandler(),
                                                        className: cn(
                                                            "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none hover:bg-primary/50 transition-colors",
                                                            header.column.getIsResizing() ? "bg-primary w-1.5 z-10" : "bg-transparent"
                                                        ),
                                                    }}
                                                />
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="">
                        {!isLoading && data.length === 0 ? (
                            <tr>
                                <td colSpan={finalColumns.length} className=" px-4 py-16 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <span className="text-muted-foreground/50">
                                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                        </span>
                                        <span>{emptyText}</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <React.Fragment key={row.id}>
                                    <tr
                                        className={cn(
                                            "hover:bg-muted/50 transition-colors group",
                                            row.getIsSelected() ? "bg-primary/5 hover:bg-primary/10" : "",
                                            row.getIsExpanded() ? "bg-primary/5" : ""
                                        )}
                                    >
                                        {row.getVisibleCells().map(cell => {
                                            const meta = cell.column.columnDef.meta;
                                            const align = meta?.align || 'left';
                                            return (
                                                <td
                                                    key={cell.id}
                                                    style={{ width: enableColumnResizing ? cell.column.getSize() : cell.column.columnDef.size }}
                                                    className={cn(
                                                        cell.column.id === 'select' || cell.column.id === 'expander' ? "px-1" : "px-2",
                                                        "py-3 border border-border align-middle",
                                                        align === 'center' ? "text-center" : align === 'right' ? "text-right" : "text-left"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "flex items-center",
                                                        align === 'center' ? "justify-center" : align === 'right' ? "justify-end" : "justify-start"
                                                    )}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    {row.getIsExpanded() && renderSubComponent && (
                                        <tr>
                                            <td colSpan={row.getVisibleCells().length} className="p-0 border-b border-border whitespace-normal">
                                                <div className="bg-muted/50 px-4 py-5 shadow-inner w-full border-l-4 border-l-primary/40 wrap-break-word">
                                                    {renderSubComponent({ row: row.original })}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {paginationEnabled && totalPageCount > 0 && (
                <nav role="navigation" aria-label="Table pagination" className="flex flex-col sm:flex-row items-center justify-between px-3 py-2.5 border-t border-border bg-muted/50 gap-2">
                    {/* showTotal info */}
                    <div aria-live="polite" className="text-xs text-muted-foreground shrink-0 order-2 sm:order-1">
                        {cfg.showTotal
                            ? cfg.showTotal(totalRows, [from, to])
                            : <>Show <b>{from}</b>–<b>{to}</b> of <b>{totalRows}</b> results</>
                        }
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2 overflow-x-auto order-1 sm:order-2 w-full sm:w-auto pb-0.5 sm:pb-0">
                        {/* Page size */}
                        {(cfg.showSizeChanger !== false) && (
                            <select
                                value={currentPageSize}
                                onChange={e => table.setPageSize(Number(e.target.value))}
                                className="shrink-0 px-2 py-1 text-xs border border-border rounded-md bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
                            >
                                {pageSizeOptions.map(s => (
                                    <option key={s} value={s}>{s} / page</option>
                                ))}
                            </select>
                        )}

                        {/* Nav buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                            <button
                                className="p-1 rounded border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                                aria-label="First page"
                            >
                                <ChevronsLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                                className="p-1 rounded border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                            </button>

                            <span className="text-xs font-medium px-2.5 py-1 bg-background border border-border rounded shrink-0 min-w-14 text-center text-foreground">
                                {currentPageIndex + 1} / {totalPageCount}
                            </span>

                            <button
                                className="p-1 rounded border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                aria-label="Next page"
                            >
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                                className="p-1 rounded border border-border text-muted-foreground bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.setPageIndex(totalPageCount - 1)}
                                disabled={!table.getCanNextPage()}
                                aria-label="Last page"
                            >
                                <ChevronsRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Go to page */}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-l border-border pl-2 ml-1 shrink-0">
                            <span className="hidden sm:inline">Page</span>
                            <input
                                type="number"
                                min={1}
                                max={totalPageCount}
                                value={inputValue}
                                onChange={e => {
                                    const val = e.target.value;
                                    setInputValue(val);
                                    const p = val ? Number(val) - 1 : 0;
                                    if (val && p >= 0 && p < totalPageCount) {
                                        table.setPageIndex(p);
                                    }
                                }}
                                onBlur={() => setInputValue(currentPageIndex + 1)}
                                className="w-10 px-1 py-1 text-xs border border-border rounded bg-background text-foreground text-center outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
}
