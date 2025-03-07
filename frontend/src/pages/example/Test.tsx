import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Test = () => {
     const navigate = useNavigate();
     return (
          <div>
               <Button onClick={() => navigate("/test")}>Button</Button>
          </div>
     );
};

export default Test;
