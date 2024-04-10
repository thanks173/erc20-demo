import { useEffect, useState } from "react";
import ConnectButton from "../components/web3/ConnectButton";
import { useLogout } from "./Logout";
import { useAuth } from "../providers/AuthProvider";
import { fetchProfile } from "../services/users";
import Transfer from "../components/Transfer";
import { toast } from "react-toastify";
import Demo from "../components/Demo";

const Home = () => {
  const [user, setUser] = useState();
  const { handleLogout } = useLogout();
  const { token } = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await fetchProfile(token);

        setUser({ username: data?.username, id: data?.userId });
      } catch (error) {
        if (error?.response?.status === 401) {
          return handleLogout();
        }

        toast.error("Something went wrong");
        console.log(error);
      }
    };

    if (token) getProfile();
  }, [handleLogout, token]);

  return (
    <section className="max-w-screen-lg mx-auto px-6 py-10 text-[#828282]">
      <div className="flex justify-between items-center">
        <p className="text-xl text-black font-medium">
          Hello, <span className="font-semibold">{user?.username}</span>
        </p>
        <button
          onClick={handleLogout}
          className="text-blue-700 font-medium hover:text-blue-800"
        >
          Logout
        </button>
      </div>
      <h1 className="font-extrabold text-6xl text-black mt-10">Wallet Components</h1>
      <div className="mt-10">
        <ConnectButton />
      </div>


      <Transfer />
      <Demo/>
    </section>
  );
};

export default Home;
