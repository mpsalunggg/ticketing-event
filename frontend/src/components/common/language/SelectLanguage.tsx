import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import IdImg from "@/assets/image/id.png";
import EnImg from "@/assets/image/en.png";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const SelectLanguage = () => {
   const {
      i18n: { changeLanguage, language },
   } = useTranslation();

   console.log("language", language);

   return (
      <Fragment>
         <DropdownMenu>
            <DropdownMenuTrigger asChild className="min-w-[80px]">
               <Button variant="outline">
                  <img
                     src={language === "id" ? IdImg : EnImg}
                     alt=""
                     className="w-6 h-6"
                  />
                  <ChevronDown size={16} />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[80px]">
               <DropdownMenuItem onClick={() => changeLanguage("en")}>
                  <img src={EnImg} alt="" className="size-6" />
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => changeLanguage("id")}>
                  <img src={IdImg} alt="" className="size-6" />
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </Fragment>
   );
};

export default SelectLanguage;
