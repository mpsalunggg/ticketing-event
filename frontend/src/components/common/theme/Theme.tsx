import { useTheme } from "@/components/provider";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunMediumIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

const Theme = () => {
   const { setTheme } = useTheme();
   const themes = localStorage.getItem("vite-ui-theme");
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      const handleKeyDown = (event: {
         metaKey: any;
         ctrlKey: any;
         key: string;
      }) => {
         if ((event.metaKey || event.ctrlKey) && event.key === "g") {
            setIsOpen(true);
         }
      };

      // Menambahkan event listener ketika komponen dipasang
      window.addEventListener("keydown", handleKeyDown);

      // Membersihkan event listener ketika komponen dibongkar
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, []);

   return (
      <Fragment>
         <Button
            variant="ghost"
            size="icon"
            className="h-10 w-max px-3"
            onClick={() => {
               themes === "light" ? setTheme("dark") : setTheme("light");
               setIsOpen(false);
            }}
         >
            {themes === "light" ? (
               <MoonIcon
                  style={{
                     height: "22px",
                     width: "22px",
                  }}
               />
            ) : (
               <SunMediumIcon
                  style={{
                     height: "22px",
                     width: "22px",
                  }}
               />
            )}
         </Button>
      </Fragment>
   );
};

export default Theme;
