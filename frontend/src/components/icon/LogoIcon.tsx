import React from "react";

interface IconProps {
   bgColor: string;
   fgColor: string;
}

const LogoIcon: React.FC<IconProps> = (props) => {
   return (
      <svg
         width="40"
         height="40"
         viewBox="0 0 40 40"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <rect
            width="40"
            height="40"
            rx="20"
            fill="#1E293B"
            className={`fill-current ${props.bgColor}`}
         />
         <path
            d="M20.614 28.5163L20.0001 28.8346L19.3862 28.5163L14.0514 25.7507L11 27.3331L20 31.9995L29 27.3331L25.9486 25.7507L20.614 28.5163Z"
            fill="white"
            className={`fill-current ${props.fgColor}`}
         />
         <path
            d="M20.614 23.8506L20.0001 24.1688L19.3862 23.8506L14.0514 21.085L11 22.6671L20 27.3337L29 22.6671L25.9486 21.085L20.614 23.8506Z"
            fill="white"
            className={`fill-current ${props.fgColor}`}
         />
         <path
            d="M19.9994 8.00024C18.1586 8.00024 16.666 9.49282 16.666 11.3336C16.666 13.1749 19.9994 18.0006 19.9994 18.0006C19.9994 18.0006 23.3328 13.1748 23.3328 11.3336C23.3328 9.49286 21.8402 8.00024 19.9994 8.00024ZM19.9994 12.6668C19.2631 12.6668 18.666 12.07 18.666 11.3334C18.666 10.5971 19.2629 10.0002 19.9994 10.0002C20.736 10.0002 21.3329 10.5971 21.3329 11.3334C21.3329 12.07 20.7358 12.6668 19.9994 12.6668Z"
            fill="white"
            className={`fill-current ${props.fgColor}`}
         />
         <path
            d="M23.0585 14.9197C22.7412 15.5177 22.4016 16.1031 22.0807 16.6287C23.0378 16.9294 23.6664 17.4316 23.6664 18.0003C23.6664 18.9205 22.0249 19.6671 20 19.6671C17.9752 19.6671 16.3336 18.9207 16.3336 18.0003C16.3336 17.4312 16.9622 16.9294 17.9193 16.6287C17.5985 16.1031 17.2589 15.5178 16.9416 14.9197L11 18.0007L20 22.6671L29 18.0007L23.0585 14.9197Z"
            fill="white"
            className={`fill-current ${props.fgColor}`}
         />
      </svg>
   );
};

export default LogoIcon;
