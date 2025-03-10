import React from "react";

interface IconProps {
   color?: string;
}

const TodoIcon: React.FC<IconProps> = (props) => {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 20 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.99967 2.49998C5.85754 2.49998 2.49967 5.85784 2.49967 9.99998C2.49967 14.1421 5.85754 17.5 9.99967 17.5C14.1418 17.5 17.4997 14.1421 17.4997 9.99998C17.4997 5.85784 14.1418 2.49998 9.99967 2.49998ZM0.833008 9.99998C0.833008 4.93737 4.93706 0.833313 9.99967 0.833313C15.0623 0.833313 19.1663 4.93737 19.1663 9.99998C19.1663 15.0626 15.0623 19.1666 9.99967 19.1666C4.93706 19.1666 0.833008 15.0626 0.833008 9.99998Z"
            fill="#64748B"
         />
      </svg>
   );
};

export default TodoIcon;
