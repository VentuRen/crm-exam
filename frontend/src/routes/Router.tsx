import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
    import Clients from "../pages/Clients";
import Projects from "../pages/Projects";
import Meetings from "../pages/Meetings";
import Contacts from "../pages/Contacts";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <div className="w-full h-full flex flex-col">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients /> } />
            <Route path="/projects" element={<Projects />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/contacts" element={<Contacts />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </div>
  );
};

export default Router;
