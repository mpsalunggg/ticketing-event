import React from "react";

interface IconProps {
   width?: number;
   height?: number;
}

const GoogleIcon: React.FC<IconProps> = (props) => {
   return (
      <svg
         width={props.width}
         height={props.height}
         viewBox="0 0 17 16"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <g clipPath="url(#clip0_6323_2440)">
            <path
               d="M16.5002 8.19137C16.5002 7.65224 16.4468 7.09571 16.3579 6.57397H8.66016V9.65224H13.069C12.8913 10.6435 12.3046 11.5131 11.4335 12.0696L14.0646 14.0696C15.6113 12.6609 16.5002 10.6088 16.5002 8.19137Z"
               fill="#4280EF"
            />
            <path
               d="M8.65998 15.9826C10.8644 15.9826 12.7133 15.2696 14.0644 14.0522L11.4333 12.0696C10.7044 12.5565 9.76221 12.8348 8.65998 12.8348C6.52665 12.8348 4.73109 11.4261 4.07332 9.54785L1.37109 11.5826C2.75776 14.2783 5.56665 15.9826 8.65998 15.9826Z"
               fill="#34A353"
            />
            <path
               d="M4.07377 9.53052C3.73599 8.53922 3.73599 7.46096 4.07377 6.46965L1.37155 4.41748C0.215994 6.67835 0.215994 9.33922 1.37155 11.5827L4.07377 9.53052Z"
               fill="#F6B704"
            />
            <path
               d="M8.65998 3.18261C9.81554 3.16522 10.9533 3.6 11.7889 4.38261L14.1178 2.08696C12.6422 0.730437 10.6866 2.07126e-06 8.65998 0.0173934C5.56665 0.0173934 2.75776 1.72174 1.37109 4.4174L4.07332 6.46957C4.73109 4.57392 6.52665 3.18261 8.65998 3.18261Z"
               fill="#E54335"
            />
         </g>
         <defs>
            <clipPath id="clip0_6323_2440">
               <rect
                  width={props.width}
                  height={props.height}
                  fill="white"
                  transform="translate(0.5)"
               />
            </clipPath>
         </defs>
      </svg>
   );
};

// GoogleIcon.defaultProps = {
//    width: 16,
//    height: 16
// }

export default GoogleIcon;
