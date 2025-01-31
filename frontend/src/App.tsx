import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full h-screen flex flex-col">
        
        <div className="flex-grow">
          <Suspense fallback={<Spinner />}>
            <Router />
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
