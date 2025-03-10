import {
   HomeIcon,
   SettingsIcon,
   ToolsIcon,
   UsersIcon,
   WrenchIcon,
} from "@/components/icon";
import WebsiteIcon from "@/components/icon/WebsiteIcon";
import { ComponentIcon } from "lucide-react";

export const paths = [
   {
      key: "dashboard",
      menus: [
         {
            path: "/home",
            menu: "Home",
            icon: HomeIcon,
            submenu: [],
         },
      ],
   },
   {
      key: "Spaces",
      menus: [
         {
            path: "/user",
            menu: "users",
            icon: UsersIcon,
            submenu: [
               {
                  path: "/user/management",
                  name: "Management User",
               },
               {
                  path: "/user/dummy",
                  name: "Dummy",
               },
            ],
         },
         {
            path: "/component",
            menu: "Components",
            icon: ComponentIcon,
            submenu: [
               {
                  path: "/component/table",
                  name: "Table",
               },
               {
                  path: "/component/navigation",
                  name: "Navigation",
               },
               {
                  path: "/component/card",
                  name: "Card",
               },
            ],
         },
         {
            path: "/post",
            menu: "Post",
            icon: HomeIcon,
            submenu: [],
         },

         {
            path: "/website",
            menu: "Website",
            icon: WebsiteIcon,
            submenu: [],
         },
         {
            path: "/tools",
            menu: "Tools",
            icon: ToolsIcon,
            submenu: [],
         },
         {
            path: "/integration",
            menu: "Integration",
            icon: SettingsIcon,
            submenu: [],
         },
         {
            path: "/build",
            menu: "Build",
            icon: WrenchIcon,
            submenu: [],
         },
      ],
   },
];

export default paths;
