import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { formatAddress, printNumber } from "./utils";
import { IconCTA, IconCopy } from "../Icons";
import { toast } from "react-toastify";

const IconArrowDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success("Copy success!");
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  if (!address || !isConnected)
    return (
      <div
        onClick={open}
        className="border-2 rounded-2xl hover:border-black cursor-pointer transition-all p-6 flex items-center space-x-4 max-w-[532px]"
      >
        <img src="/imgs/green-gem.png" alt="" className="h-32" />
        <div>
          <p className="text-2xl font-bold text-black">Connect your Wallet</p>
          <p className="text-lg mt-2">
            Connect an Outlet wallet to interact with your favorite protocol
          </p>
        </div>
        <button className="self-end">
          <IconCTA className="w-10" />
        </button>
      </div>
    );

  return (
    <div>
      {address && (
        <div className="flex flex-wrap gap-8">
          <div className="border-2 rounded-2xl p-4 w-[270px] relative">
            <div className="absolute bottom-0 left-0">
              <img src="/imgs/blue-gem.png" alt="" className="h-40" />
            </div>
            <div className="relative min-h-[190px]">
              <div className="flex-col flex">
                <p className="text-lg">Out Wallet</p>
                <p className="font-extrabold font-inter text-black text-2xl">
                  ${printNumber(balance?.formatted)} {balance?.symbol}
                </p>
              </div>
            </div>
            <IconCTA className="w-10 absolute right-4 bottom-4" />
          </div>
          <div className="border-2 rounded-2xl p-4 flex-1 min-w-[520px] relative">
            <div className="flex gap-6">
              <img src="/imgs/coinbase.png" alt="" className="h-[72px]" />
              <div>
                <p className="text-2xl font-bold text-black">
                  Send {balance?.symbol} to your wallet
                </p>
                <p className="text-lg mt-2">
                  Send from Coinbase or another exchange or ask a friend!
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <p>
                <span className="font-medium text-black">Address:</span>{" "}
                {formatAddress(address)}
              </p>
              <button
                className="bg-black rounded-full p-2"
                onClick={handleCopyAddress}
              >
                <IconCopy />
              </button>
            </div>
            <div className="mt-4">
              <p className="flex">
                <span className="font-medium text-black">Network:</span>
                <button
                  className="ml-1 flex hover:text-blue-700"
                  onClick={() => open({ view: "Networks" })}
                >
                  {chain?.name} <IconArrowDown />
                </button>
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={disconnect}
                className="text-white px-4 py-2 rounded-xl font-medium bg-red-600 hover:bg-red-500"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
