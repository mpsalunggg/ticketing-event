import React from "react";

interface IconProps {
   color?: string;
}

const WebsiteIcon: React.FC<IconProps> = (props) => {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 20 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M16.6668 5.83331H9.16683M11.6668 14.1666H4.16683M11.6668 14.1666C11.6668 15.5474 12.7861 16.6666 14.1668 16.6666C15.5475 16.6666 16.6668 15.5474 16.6668 14.1666C16.6668 12.7859 15.5475 11.6666 14.1668 11.6666C12.7861 11.6666 11.6668 12.7859 11.6668 14.1666ZM8.3335 5.83331C8.3335 7.21402 7.21421 8.33331 5.8335 8.33331C4.45278 8.33331 3.3335 7.21402 3.3335 5.83331C3.3335 4.4526 4.45278 3.33331 5.8335 3.33331C7.21421 3.33331 8.3335 4.4526 8.3335 5.83331Z"
            stroke="#161616"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`stroke-current ${props.color}`}
         />
      </svg>
   );
};

export default WebsiteIcon;
