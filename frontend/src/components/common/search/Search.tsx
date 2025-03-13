import { SearchIcon } from "@/components/icon";
import { Input } from "@/components/ui/input";
import { Fragment } from "react";

interface SearchProps {
   placeholder: string;
   onChange?: (value: string) => void;
}

const Search: React.FC<SearchProps> = (props) => {
   return (
      <Fragment>
         <div className="relative w-full">
            <Input
               placeholder={props.placeholder}
               className="pl-9"
               onChange={(e) => props.onChange!(e.target.value)}
            />
            <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
               <SearchIcon color="text-primary-icon/50" />
            </div>
         </div>
      </Fragment>
   );
};

export default Search;
