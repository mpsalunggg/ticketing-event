import { Checkbox } from "@/components/ui/checkbox";
import { EventActivityValidationType } from "@/schemas/eventActivity";
import { ColumnDef } from "@tanstack/react-table";

export const ColumnsHome: ColumnDef<EventActivityValidationType>[] = [
   {
      id: "select",
      header: ({ table }) => (
         <Checkbox
            checked={
               table.getIsAllPageRowsSelected() ||
               (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
               table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="border-primary"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="border-primary"
         />
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
         <div className="capitalize w-max">{row.getValue("date")}</div>
      ),
   },
   {
      accessorKey: "venue",
      header: "Venue",
      cell: ({ row }) => (
         <div className="capitalize w-[560px] overflow-hidden text-ellipsis whitespace-nowrap">
            {row.getValue("venue")}
         </div>
      ),
   },
   {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
         <div className="capitalize w-max">{row.getValue("price")}</div>
      ),
   },
   {
      accessorKey: "total_ticket",
      header: "Total Ticket",
      cell: ({ row }) => (
         <div className="capitalize w-max">{row.getValue("total_ticket")}</div>
      ),
   },
];
