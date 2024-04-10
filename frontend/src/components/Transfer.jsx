import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { parseEther } from "viem";
import {
  useAccount,
  useBalance,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { abi } from "../abis/HLTHY.json";
import { IconLoading } from "./Icons";
import { printNumber } from "./web3/utils";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const CONTRACT_NETWORK = +import.meta.env.VITE_CONTRACT_NETWORK;

const Transfer = () => {
  const { address, isConnected, chainId } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const { switchChain } = useSwitchChain();
  const {
    data: hash,
    error,
    isPending,
    writeContractAsync,
  } = useWriteContract();
  const {
    isLoading: isConfirming,
    error: errorConfirm,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: balance, refetch } = useBalance({
    address,
    token: CONTRACT_ADDRESS,
  });

  useEffect(() => {
    if (!isSuccess) return;

    refetch();
    toast.success("Transfer completed successfully");
  }, [isSuccess, refetch]);

  const handleTransfer = async () => {
    if (!recipientAddress || +amount < 0) return;

    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        functionName: "transferWithDividend",
        args: [recipientAddress, parseEther(amount)],
        abi,
      });
    } catch (error) {
      console.log("error :>> ", error);
      toast.error("Something went wrong");
    }
  };

  if (!address || !isConnected) return null;

  return (
    <div className="mt-10 border p-6 rounded-xl shadow-lg">
      <h6 className="text-2xl font-bold mb-5 text-black">Smart Contract</h6>
      <p>Contract Address: {CONTRACT_ADDRESS}</p>
      <p>Supported Network: Binance Smart Chain Testnet</p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Send token to address
          </label>
          <input
            onChange={(e) => setRecipientAddress(e.target.value)}
            value={recipientAddress}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            placeholder="Enter wallet address (0x)"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Value
          </label>
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            placeholder="Enter amount"
          />
        </div>
      </div>
      <p className="text-sm mt-2 text-right mb-5">
        Your balance:{" "}
        <span className="text-black font-medium">
          {printNumber(balance?.formatted)} {balance?.symbol}
        </span>
      </p>

      {chainId !== CONTRACT_NETWORK ? (
        <button
          className="border px-6 w-full py-2 bg-black hover:bg-black/80 text-white rounded-lg"
          onClick={() => switchChain({ chainId: CONTRACT_NETWORK })}
        >
          Switch Network
        </button>
      ) : (
        <button
          className="border flex justify-center items-center gap-2 px-6 w-full py-2 bg-black hover:bg-black/80 text-white rounded-lg"
          onClick={handleTransfer}
        >
          {(isPending || isConfirming) && <IconLoading />} Send now
        </button>
      )}

      {error && <div>Error: {error.shortMessage || error.message}</div>}

      {errorConfirm && (
        <div>
          Error Confirm: {errorConfirm.shortMessage || errorConfirm.message}
        </div>
      )}
    </div>
  );
};

export default Transfer;
