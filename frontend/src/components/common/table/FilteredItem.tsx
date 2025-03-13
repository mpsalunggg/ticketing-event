import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilterIcon } from "lucide-react";
import React, { Fragment } from "react";

interface FilteredItemProps {
   table: any;
}

const FilteredItem: React.FC<FilteredItemProps> = (props) => {
   return (
      <Fragment>
         <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full">
               <Button variant="outline" className="ml-auto">
                  <ListFilterIcon />
                  Filter
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               {props.table
                  .getAllColumns()
                  .filter((column: any) => column.getCanHide())
                  .map((column: any) => {
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
      </Fragment>
   );
};

export default FilteredItem;
