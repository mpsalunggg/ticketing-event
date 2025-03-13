import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getPaginationRowModel,
   useReactTable,
} from "@tanstack/react-table";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Fragment, useState } from "react";
import { Search } from "@/components/common/search";
import { DropdownItem } from "@/components/common/dropdown";
import FilteredItem from "@/components/common/table/FilteredItem";
import { Pagination } from "@/components/common/table/Pagination";

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   firstFilter?: string;
   secondFilter?: string;
   dataFirstFilter?: any;
   dataSecondFilter?: any;
   isToolbar?: boolean;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   firstFilter,
   secondFilter,
   dataFirstFilter,
   dataSecondFilter,
   isToolbar,
}: DataTableProps<TData, TValue>) {
   const [q, setQ] = useState("");
   const [selectedStatus, setSelectedStatus] = useState("All Status");
   const [selectedPriority, setSelectedPriority] = useState("All Priority");

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
         pagination: { pageSize: 10 },
      },
   });

   const filteredRows = table.getRowModel().rows.filter((row) => {
      const rowData = row.original as Record<string, any>;

      const matchesSearch = row
         .getVisibleCells()
         .some((cell) =>
            String(cell.getValue()).toLowerCase().includes(q.toLowerCase()),
         );

      const matchesStatus =
         selectedStatus === "All Status" || rowData?.status === selectedStatus;

      const matchesPriority =
         selectedPriority === "All Priority" ||
         rowData?.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
   });

   return (
      <Fragment>
         {isToolbar && (
            <div className="flex flex-col lg:flex-row justify-between gap-y-2">
               <div className="min-w-[280px] lg:order-first order-last">
                  <Search placeholder="Search task" onChange={setQ} />
               </div>
               <div className="flex flex-col lg:flex-row gap-2">
                  <DropdownItem
                     data={[{ status: firstFilter }, ...dataFirstFilter!]}
                     label={firstFilter!}
                     valueKey="status"
                     onChange={(val) => setSelectedStatus(val)}
                  />
                  <DropdownItem
                     data={[{ status: secondFilter }, ...dataSecondFilter!]}
                     label={secondFilter!}
                     valueKey="status"
                     onChange={(val) => setSelectedPriority(val)}
                  />
                  <FilteredItem table={table} />
               </div>
            </div>
         )}

         <div className="rounded-md border mt-4">
            <Table className="bg-background rounded-md">
               <TableHeader className="bg-muted-foreground/10">
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
                  {/* {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => ( */}
                  {filteredRows.length ? (
                     filteredRows.map((row) => (
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
                           No Data Available
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>

         <div className="mt-4">
            <Pagination table={table} />
         </div>
      </Fragment>
   );
}
