import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorRouteProps {
   img: string;
   errorCode: string;
   title: string;
   subtitle: string;
}

const ErrorRoute: React.FC<ErrorRouteProps> = (props) => {
   const navigate = useNavigate();
   return (
      <div className="flex justify-center items-center min-h-screen py-[40px] bg-background">
         <div className="flex flex-col gap-y-10">
            <img src={props.img} alt="401" width={400} className="m-auto" />
            <div className="flex flex-col gap-y-5 text-center">
               <Badge className="border-foreground m-auto" variant="outline">
                  {props.errorCode}
               </Badge>
               <p className="font-bold text-2xl">{props.title}</p>
               <p className="font-medium text-lg max-w-[500px]">
                  {props.subtitle}
               </p>
            </div>
            <Button
               className="w-fit m-auto"
               onClick={() => navigate("/auth/signin")}
            >
               <MoveLeft /> Kembali
            </Button>
         </div>
      </div>
   );
};

export default ErrorRoute;
