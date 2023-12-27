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
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { type DefaultInputProps, FYPInput } from "./input/fyp-input"
import { type UseTRPCMutationResult } from "@trpc/react-query/shared"
import { type ExecutedQuery } from "@planetscale/database"
import { toast } from "sonner"
import { UndoHistory } from "~/utils/undo-history"

type Single<T> = T extends Array<infer U> ? U : never;

type TableDataProps = { id: string, [key: string]: string | number | null }[];;

type Mutations = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createMutation?: UseTRPCMutationResult<ExecutedQuery, any, any, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateMutation?: UseTRPCMutationResult<ExecutedQuery, any, { id: string, [key: string]: unknown }, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteMutation?: UseTRPCMutationResult<ExecutedQuery, any, string, unknown>;
}

type DataProps<T> = {
  data: T[];
  createSchema: T extends Record<infer U, unknown> ? Omit<Record<U, DefaultInputProps>, "id"> : never;
}

export type CRUDTableProps<T, K> = {
  searchField?: K;
  exclude?: K[];
} & Mutations & DataProps<T>;

function getKeys<K>(keys: string[], exclude?: K[]): string[] {
  const newExclude = [...(exclude ?? []), "id"];
  return keys.filter(k => !newExclude.includes(k as K));
};

export function CRUDTable<T extends Single<TableDataProps>, K extends keyof T>({ data: initialData, exclude, searchField, createSchema: schema, createMutation, updateMutation, deleteMutation }: CRUDTableProps<T, K>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState(initialData)

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
      cell: ({ row: { index } }) => {
        const id = data[index]?.id?.toString() ?? ""
        return (
          <div className="text-right">
            {updateMutation && <EditButton onSuccess={(d) => {
              setData(prev => prev.map(p => p.id === d.id ? { ...p, ...d } : p));
            }} id={id} index={index} data={data} createSchema={schema} mutation={updateMutation} />}
            {deleteMutation && <DeleteButton mutation={deleteMutation} id={id} />}
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
          {createMutation && <CreateButton data={data} mutation={createMutation} createSchema={schema} onSuccess={setData} deleteMutation={deleteMutation}/>}
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

function CreateButton<T extends Single<TableDataProps>>({
  mutation, createSchema: schema, data, onSuccess,
}: { mutation: NonNullable<Mutations["createMutation"]>, deleteMutation: Mutations["deleteMutation"], onSuccess: (data: T[]) => void } & DataProps<T>) {
  const createSchema = React.useMemo(() => Object.entries(schema), [schema]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false)

  const { register, handleSubmit } = useForm();

  const history = React.useMemo(() => UndoHistory.create(data), [data])

  return <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger>
      <Button variant="default">Add New Item</Button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>
          Add Item
        </SheetTitle>
      </SheetHeader>
      <form onSubmit={handleSubmit(async e => {
        try {
          setLoading(true)
          await mutation.mutateAsync(e)
          onSuccess([e as T, ...data]);
          toast.success("Success", {
            description: "Updated",
            action: {
              label: "Undo",
              onClick: () => {
                const old = history.undo()!;
                // deleteMutation.mutateAsync(id).then(() => {
                //   onSuccess(old);
                // }).catch(() => {
                //   //
                // });
              },
            },
          });
          setOpen(false);
        } catch (_) {
          toast.error("Something went wrong", { description: "Failed to add item" });
        } finally {
          setLoading(false)
        }
      })}>
        <div className="grid gap-4 py-4">
          {createSchema.map((s, i) => <FYPInput key={i} {...s[1]} {...register(s[0])} />)}
        </div>
        <SheetFooter>
          <Button isLoading={loading} type="submit">Add Item</Button>
        </SheetFooter>
      </form>
    </SheetContent>
  </Sheet>
}

function DeleteButton({ id, mutation }: { id: string, mutation: NonNullable<Mutations["deleteMutation"]> }) {
  return <Dialog>
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
          <Button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => mutation.mutate(id)}>
            Confirm Delete
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

function EditButton<T extends Single<TableDataProps>>({
  index, id, data, mutation, createSchema, onSuccess,
}: { index: number, id: string, onSuccess: (data: T) => void, mutation: NonNullable<Mutations["updateMutation"]> } & DataProps<T>) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false)

  // for partial updates
  const updateSchema = React.useMemo(() => Object.entries(createSchema).map(s => ({
    ...s,
    required: false,
  })), [createSchema]);

  const history = React.useMemo(() => {
    return UndoHistory.create({ ...data[index], id });
  }, [data, index]);

  return <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger>
      <Button size="icon" variant="outline">
        <PencilIcon className="h-4 w-4" />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit Item</SheetTitle>
      </SheetHeader>
      <form onSubmit={handleSubmit(async (e) => {
        setLoading(true);
        try {
          await mutation.mutateAsync({ ...e, id });
          setOpen(false);

          history.setData({ ...e, id });

          toast.success("Success", {
            description: "Updated",
            action: {
              label: "Undo",
              onClick: () => {
                const old = history.undo() as T;
                mutation.mutateAsync(old).then(() => {
                  onSuccess(old);
                }).catch(() => {
                  //
                });
              },
            },
          });
          onSuccess({ ...e, id } as T);
        } catch (_) {
          toast.error("Something went wrong", { description: "Failed to update" });
        } finally {
          setLoading(false);
        }
      })}>
        <div className="grid gap-4 py-4">
          {updateSchema.map((s, i) => <FYPInput key={i} {...s[1]} {...register(s[0])} defaultValue={data[index]?.[s[0]] ?? ""} />)}
        </div>
        <SheetFooter>
          <Button isLoading={loading} type="submit">Save changes</Button>
        </SheetFooter>
      </form>
    </SheetContent>
  </Sheet>
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
