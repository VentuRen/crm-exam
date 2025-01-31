import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6">
      {/* <Navbar /> */}
      <Navbar />
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-2xl font-bold mb-6">Welcome to CRM</h1>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/clients" className="bg-blue-500 text-white p-4 rounded">Clients</Link>
          <Link to="/projects" className="bg-green-500 text-white p-4 rounded">Projects</Link>
          <Link to="/meetings" className="bg-yellow-500 text-white p-4 rounded">Meetings</Link>
          <Link to="/contacts" className="bg-purple-500 text-white p-4 rounded">Contacts</Link>
        </div>
      </div>
    </div>
  );
};
export default Home;