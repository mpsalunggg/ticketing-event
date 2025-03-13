import React from "react";

const ErrorIcon: React.FC = (props) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width="69"
      height="68"
      fill="none"
      viewBox="0 0 69 68"
   >
      <rect width="60" height="60" x="4.5" y="4" fill="#FAD1D1" rx="30"></rect>
      <rect
         width="60"
         height="60"
         x="4.5"
         y="4"
         stroke="#FDF1F1"
         strokeWidth="8"
         rx="30"
      ></rect>
      <g clipPath="url(#clip0_6322_26001)">
         <path
            fill="#D62C2C"
            d="M34.5 47.333c-7.365 0-13.334-5.97-13.334-13.333s5.97-13.333 13.333-13.333S47.833 26.636 47.833 34s-5.97 13.333-13.334 13.333m0-2.666a10.667 10.667 0 1 0 0-21.334 10.667 10.667 0 0 0 0 21.334m-1.334-17.334h2.667V30h-2.667zm0 5.334h2.667v8h-2.667z"
         ></path>
      </g>
      <defs>
         <clipPath id="clip0_6322_26001">
            <path fill="#fff" d="M18.5 18h32v32h-32z"></path>
         </clipPath>
      </defs>
   </svg>
);

export default ErrorIcon;
