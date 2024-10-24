"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PackagePlus } from "lucide-react";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import * as React from "react";

export default function Servers() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 lg:px-0">
      <div className="flex justify-between mb-4 mt-4 items-center">
        <section className="flex flex-col gap-2">
          <h2 className="mt-0 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
            服务器
          </h2>
          <p className="text-sm font-medium">
            你可以在这里查看和管理全部的服务器。
            <a
              href="#"
              className="font-medium text-primary underline underline-offset-4"
            >
              了解更多↗
            </a>
          </p>
        </section>
        <Button className="px-2 py-1 rounded-[8px] h-fit flex items-center gap-1">
          <PackagePlus className="size-4" />
          新增服务器
        </Button>
      </div>
      <DataTableDemo />
    </div>
  );
}

const data: Server[] = [
  {
    id: 2,
    name: "RK3399",
    tag: "Home",
    last_active: 1729758194,
    ipv4: "14.117.215.184",
    ipv6: "",
    valid_ip: "14.117.215.184",
    display_index: 0,
    hide_for_guest: false,
  },
  {
    id: 3,
    name: "KES-NAS",
    tag: "KES",
    last_active: 1729758195,
    ipv4: "5.34.218.218",
    ipv6: "",
    valid_ip: "5.34.218.218",
    display_index: 0,
    hide_for_guest: false,
  },
];

type Server = {
  id: number;
  name: string;
  tag: string;
  last_active: number;
  ipv4: string;
  ipv6: string;
  valid_ip: string;
  display_index: number;
  hide_for_guest: boolean;
};

const columns: ColumnDef<Server>[] = [
  {
    id: "select",
    // header: ({ table }) => (
    //     <Checkbox
    //         checked={
    //             table.getIsAllPageRowsSelected() ||
    //             (table.getIsSomePageRowsSelected() && "indeterminate")
    //         }
    //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //         aria-label="Select all"
    //     />
    // ),
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
  {
    accessorKey: "name",
    header: "服务器",
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: "tag",
    header: ({ column }) => {
      return (
        <Button
          className="p-0 hover:bg-transparent "
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          分组
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className=" font-medium">{row.original.tag}</div>,
  },
  {
    accessorKey: "version",
    header: () => <div>版本号</div>,
    cell: ({ row }) => {
      return <div className=" font-medium">v0.0.1</div>;
    },
  },
  {
    accessorKey: "ip",
    header: () => <div>IP地址</div>,
    cell: ({ row }) => {
      return <div className=" font-medium">{row.original.ipv4}</div>;
    },
  },
  {
    accessorKey: "备注",
    header: () => <div>备注</div>,
    cell: ({ row }) => {
      return <div className=" font-medium">无</div>;
    },
  },
  {
    accessorKey: "上报时间",
    header: () => <div className=" text-center ">最后上报时间</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center font-medium gap-2">
          <div className="font-medium">在线</div>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const server = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(server.id.toString())
              }
            >
              复制ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>查看详情</DropdownMenuItem>
            <DropdownMenuItem>删除</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    <div className="w-full overflow-x-scroll">
      <div className="flex items-center py-4">
        <Input
          placeholder="筛选服务器..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm rounded-[8px]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto rounded-[8px]">
              分组 <ChevronDown className="ml-2 h-4 w-4" />
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
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
                            header.getContext(),
                          )}
                    </TableHead>
                  );
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
                        cell.getContext(),
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
          服务器已选中: {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length}
        </div>
      </div>
    </div>
  );
}
