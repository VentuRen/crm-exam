import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex justify-center items-center h-screen">
        {loading && <Spinner />}
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-4">Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 mb-2 w-full" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-4 w-full" required />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
          <p className="mt-4 text-center">
            Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;