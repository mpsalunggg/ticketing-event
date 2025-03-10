import React from "react";

interface IconProps {
   color?: string;
}

const MenuIcon: React.FC<IconProps> = (props) => {
   return (
      <svg
         width="18"
         height="14"
         viewBox="0 0 18 14"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M1 7H17M1 1H17M1 13H17"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`stroke-current ${props.color}`}
         />
      </svg>
   );
};

export default MenuIcon;
