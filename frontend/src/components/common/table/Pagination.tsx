import { Button } from "@/components/ui/button";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   ChevronLeft,
   ChevronRight,
   ChevronsLeft,
   ChevronsRight,
} from "lucide-react";
import React, { Fragment } from "react";

interface PaginationProps {
   table: any;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
   return (
      <Fragment>
         <div className="flex flex-col lg:flex-row lg:gap-x-10 gap-y-4 items-center">
            <div className="flex justify-between items-center w-full">
               <div className="flex-1 text-sm text-muted-foreground">
                  {props.table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {props.table.getFilteredRowModel().rows.length} row(s)
                  selected.
               </div>

               <div className="flex flex-row items-center gap-x-3">
                  <span className="text-sm text-foreground">
                     Rows per page{" "}
                  </span>
                  <Select
                     onValueChange={(value) =>
                        props.table.setPageSize(Number(value))
                     }
                     value={props.table
                        .getState()
                        .pagination.pageSize.toString()}
                  >
                     <SelectTrigger className="w-[70px]">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectItem value="10">10</SelectItem>
                           <SelectItem value="20">20</SelectItem>
                           <SelectItem value="30">30</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="flex gap-y-4 flex-row lg:gap-x-10 items-center w-full lg:w-fit justify-between lg:justify-end">
               <div className="text-sm text-foreground w-max">
                  Page {props.table.getState().pagination.pageIndex + 1} of
                  {props.table.getPageCount()}
               </div>
               <div className="flex gap-x-1.5">
                  <Button
                     className="h-10 w-10"
                     variant="outline"
                     size="sm"
                     onClick={() => props.table.setPageIndex(0)}
                     disabled={!props.table.getCanPreviousPage()}
                  >
                     <ChevronsLeft style={{ width: "18px", height: "18px" }} />
                  </Button>
                  <Button
                     className="h-10 w-10"
                     variant="outline"
                     size="sm"
                     onClick={() => props.table.previousPage()}
                     disabled={!props.table.getCanPreviousPage()}
                  >
                     <ChevronLeft style={{ width: "18px", height: "18px" }} />
                  </Button>
                  <Button
                     className="h-10 w-10"
                     variant="outline"
                     size="sm"
                     onClick={() => props.table.nextPage()}
                     disabled={!props.table.getCanNextPage()}
                  >
                     <ChevronRight style={{ width: "18px", height: "18px" }} />
                  </Button>
                  <Button
                     className="h-10 w-10"
                     variant="outline"
                     size="sm"
                     onClick={() =>
                        props.table.setPageIndex(props.table.getPageCount() - 1)
                     }
                     disabled={!props.table.getCanNextPage()}
                  >
                     <ChevronsRight style={{ width: "18px", height: "18px" }} />
                  </Button>
               </div>
            </div>
         </div>
      </Fragment>
   );
};
