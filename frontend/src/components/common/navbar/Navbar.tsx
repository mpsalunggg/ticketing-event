import { BellIcon, LogoIcon, ProfileIcon } from "@/components/icon";
import { SelectLanguage } from "@/components/common/language";
import { Theme } from "@/components/common/theme";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/common/search";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface NavbarProps {
   type?: "auth" | "main";
}

const Navbar: React.FC<NavbarProps> = (props) => {
   const { type = "main" } = props;

   return (
      <div className="bg-background px-4 md:px-[100px] h-[70px] border-b fixed w-full flex justify-between items-center z-10">
         <div>
            <LogoIcon bgColor="text-primary" fgColor="text-background" />
         </div>

         {type === "auth" && (
            <div className="flex items-center gap-x-6">
               <div className="flex items-center gap-x-2">
                  <Theme />
                  <SelectLanguage />
               </div>
            </div>
         )}

         {type === "main" && (
            <div className="flex items-center gap-x-2 ml-2 md:ml-0 md:gap-x-6">
               <div className="w-full lg:min-w-[384px]">
                  <Search placeholder="Search or type a command..." />
               </div>
               <div>
                  <BellIcon color="text-foreground" />
               </div>
               <div className="border-l border-[#B1B8C8] h-[26px]"></div>
               <DropdownMenu>
                  <DropdownMenuTrigger className="flex gap-x-1 items-center font-semibold text-sm cursor-pointer">
                     Help <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     {/* <DropdownMenuItem>
                        <div className="w-full h-4">
                           <Theme />
                        </div>
                     </DropdownMenuItem> */}
                     <DropdownMenuItem>Billing</DropdownMenuItem>
                     <DropdownMenuItem>Team</DropdownMenuItem>
                     <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>

               {/* <Theme /> */}

               <DropdownMenu>
                  <DropdownMenuTrigger>
                     <Button variant="ghost" className="bg-muted rounded-full">
                        <ProfileIcon color="bg-foreground" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         )}
      </div>
   );
};

export default Navbar;
