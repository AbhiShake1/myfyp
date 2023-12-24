"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import {
  CaretSortIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { type DefaultInputProps, FYPInput } from "./input/fyp-input"
import { type UseTRPCMutationResult } from "@trpc/react-query/shared"

type Single<T> = T extends Array<infer U> ? U : never;

type TableDataProps = Record<string, string | number | null>[];

export type CRUDTableProps<T, K> = {
  data: T[];
  createSchema: T extends Record<infer U, unknown> ? Record<U, DefaultInputProps> : never;
  searchField?: K;
  exclude?: K[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createMutation?: UseTRPCMutationResult<any, any, any, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateMutation?: UseTRPCMutationResult<any, any, any, unknown>;
};

function getKeys<K>(keys: string[], exclude?: K[]): string[] {
  if (!exclude) {
    return keys;
  }
  return keys.filter(k => !exclude.includes(k as K));
};

export function CRUDTable<T extends Single<TableDataProps>, K extends keyof T>({ data, exclude, searchField, createSchema: schema, createMutation, updateMutation }: CRUDTableProps<T, K>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const createSchema = React.useMemo(() => Object.entries(schema), [schema]);

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit
  } = useForm();

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit
  } = useForm();

  // for partial updates
  const updateSchema = React.useMemo(() => createSchema.map(s => ({
    ...s,
    required: false,
  })), []);

  const columns: ColumnDef<Single<typeof data>>[] = React.useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...getKeys(Object.keys(schema), exclude).map<ColumnDef<Single<typeof data>>>((cell) => ({
      accessorKey: cell,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {cell.toUpperCase()}
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue(cell)}</div>,
    })),
    {
      id: "actions",
      enableHiding: false,
      cell: () => {
        return (
          <div className="text-right">
            {updateMutation &&
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Item</SheetTitle>
                  </SheetHeader>
                  <form onSubmit={handleUpdateSubmit(e => updateMutation(e))}>
                    <div className="grid gap-4 py-4">
                      {updateSchema.map((s, i) => <FYPInput key={i} {...s[1]} {...registerUpdate(s[0])} />)}
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                      </SheetClose>
                    </SheetFooter>
                  </form>
                </SheetContent>
              </Sheet>
            }
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-2 text-red-500" size="icon" variant="outline">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Item</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>Are you sure you want to delete this item?</p>
                </div>
                <DialogFooter className="flex justify-end gap-4">
                  <div>
                    <Button className="bg-gray-200 text-black px-4 py-2 rounded" type="button">
                      Reconsider
                    </Button>
                  </div>
                  <div>
                    <Button className="bg-red-600 text-white px-4 py-2 rounded" type="submit">
                      Confirm Delete
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )
      },
    },
  ], [data])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex flex-row space-x-2">
          {searchField &&
            <Input
              placeholder={`Search ${searchField.toString()}...`}
              value={(table.getColumn(searchField.toString())?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(searchField.toString())?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          }
          {createMutation && <Sheet>
            <SheetTrigger>
              <Button variant="default">Add New Item</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  Add Item
                </SheetTitle>
              </SheetHeader>
              <form onSubmit={handleCreateSubmit(e => createMutation.mutate(e))}>
                <div className="grid gap-4 py-4">
                  {createSchema.map((s, i) => <FYPInput key={i} {...s[1]} {...registerCreate(s[0])} />)}
                </div>
                <SheetFooter>
                  <Button type="submit">Add Item</Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ArrowLeftIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function ArrowRightIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function PencilIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

function TrashIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
