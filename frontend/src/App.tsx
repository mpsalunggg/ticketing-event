import Test from "@/pages/example/Test";
import Test2 from "@/pages/example/Test2";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/test" element={<Test2 />} />
         </Routes>
      </Router>
   );
}

export default App;
