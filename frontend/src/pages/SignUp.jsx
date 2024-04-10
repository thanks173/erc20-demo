import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../services/users";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await signup(username, password);
      if (!data) {
        return toast.error("Something went wrong");
      }

      toast.success("Create new account successfully");
      navigate("/login", { replace: true });

      setUsername("");
      setPassword("");

      setError("");
    } catch (error) {
      const resCode = error?.response?.status;
      if (resCode === 409) {
        setError("Username existed");
        return;
      }

      toast.error("Something went wrong");
      console.log("error :>> ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 border rounded-lg p-8 shadow-md space-y-7"
    >
      <h1 className="text-2xl font-bold">Sign Up</h1>

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
          Create new account
        </button>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white relative text-center z-10 mx-auto">
            or
          </span>
          <hr className="absolute top-1/2 -translate-y-1/2 left-0 w-full" />
        </div>
        <Link
          to="/login"
          className="text-blue-700 border block border-blue-700 hover:border-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Login now
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
