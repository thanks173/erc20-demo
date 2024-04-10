import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useState } from "react";
import { login } from "../services/users";
import { toast } from "react-toastify";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login(username, password);
      if (!data?.access_token) {
        return toast.error("Something went wrong");
      }

      setToken(data?.access_token);
      navigate("/", { replace: true });
      setError("");
    } catch (error) {
      const resCode = error?.response?.status;
      if (resCode === 404 || resCode === 401) {
        setError("Wrong username or password");
        return;
      }

      toast.error("Something went wrong");
      console.log("error :>> ", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto mt-10 border rounded-lg p-8 shadow-md space-y-7"
    >
      <h1 className="text-2xl font-bold">Login</h1>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Login now
        </button>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white relative text-center z-10 mx-auto">
            or
          </span>
          <hr className="absolute top-1/2 -translate-y-1/2 left-0 w-full" />
        </div>
        <Link
          to="/signup"
          className="text-blue-700 border block border-blue-700 hover:border-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default Login;
