import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface DropdownItemProps {
   label: string;
   data: Record<string, any>[];
   valueKey: string;
   onChange: (value: string) => void;
}

const DropdownItem: React.FC<DropdownItemProps> = (props) => {
   const [selectedLabel, setSelectedLabel] = useState(props.label);

   const handleSelect = (value: string) => {
      setSelectedLabel(value);
      props.onChange(value);
   };

   return (
      <div className="w-full">
         <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full">
               <Button variant="outline">
                  {selectedLabel}
                  <ChevronDown />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-w-full">
               {props.data.map((item, i) => (
                  <DropdownMenuItem
                     key={i}
                     onClick={() => handleSelect(item[props.valueKey])}
                  >
                     {item[props.valueKey]}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};

export default DropdownItem;
