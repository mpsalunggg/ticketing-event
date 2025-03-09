import { Button } from "@/components/ui/button";
import { useFrappeAuth } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";

const Test = () => {
   const navigate = useNavigate();

   return (
      <div>
         <Button onClick={() => navigate("test")}>Button</Button>
         <Component />
      </div>
   );
};

const Component = () => {
   const { currentUser, login } = useFrappeAuth();

   console.log("currentUser:", currentUser); // Debugging

   const handleLogin = async () => {
      try {
         await login({ username: "Administrator", password: "root" });
         alert("Login berhasil!");
      } catch (error) {
         console.error("Login gagal:", error);
      }
   };

   return (
      <div>
         {/* Perbaikan: Gunakan type assertion untuk menghindari error */}
         <Button>{currentUser}</Button>
         <Button onClick={handleLogin}>Login</Button>
      </div>
   );
};

export default Test;
