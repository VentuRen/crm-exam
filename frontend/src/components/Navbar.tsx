import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between w-full fixed top-0 left-0 shadow-md z-50">
      <div className="text-white font-bold">CRM System</div>
      <div className="flex gap-4">
        {token && (
          <>
            <Link to="/" className="text-white">Home</Link>
            <Link to="/clients" className="text-white">Clients</Link>
            <Link to="/projects" className="text-white">Projects</Link>
            <Link to="/meetings" className="text-white">Meetings</Link>
            <Link to="/contacts" className="text-white">Contacts</Link>
            <button onClick={handleLogout} className="text-white">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;