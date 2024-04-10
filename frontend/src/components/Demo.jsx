import { IconCTA } from "./Icons";

const Demo = () => {
  return (
    <div className="mt-10 flex gap-8">
      <div className="gap-8 flex flex-col">
        <div className="border-2 rounded-2xl p-4 w-[360px] relative overflow-hidden">
          <div className="absolute bottom-0 left-0">
            <img src="/imgs/ticket.png" alt="" className="h-32" />
          </div>
          <div className="relative min-h-[190px]">
            <div className="flex-col flex">
              <p className="text-lg">Refer a friend</p>
              <p className="font-extrabold font-inter text-black text-2xl">
                Get $10
              </p>
            </div>
          </div>
          <IconCTA className="w-10 absolute right-4 bottom-4" />
        </div>
        <div className="border-2 rounded-2xl py-6 px-8 w-[360px]">
          <div className="flex-col flex justify-center items-center text-center mt-6 space-y-6">
            <ul className="flex gap-6 items-center">
              <li className="w-8 h-8 rounded-full bg-[#88F32F]" />
              <li className="w-8 h-8 rounded-full bg-[#111111]" />
              <li className="w-8 h-8 rounded-full bg-[#9672FF]" />
            </ul>
            <p className="font-extrabold text-black text-2xl">
              Get the Outlet Card
            </p>
            <p className="text-lg">
              You can now spend your outlet interest account funds via your
              debit card
            </p>
          </div>
          <button className="bg-black font-medium text-white hover:bg-black/80 transition-all p-3 w-full rounded-lg mt-6">
            Continue
          </button>
        </div>
      </div>

      <div className="border-2 rounded-2xl p-10 bg-black flex-1 min-w-[300px] text-center relative">
        <img src="/imgs/id-card.png" alt="" className="w-full px-9" />
        <div className="px-10">
            <div className="bg-[#94ED49] inline-block mt-6 text-black font-bold text-lg rounded-full py-1 px-4">
              Front
            </div>
            <p className="font-extrabold text-white text-2xl mt-6">
              Upload the Front of your State ID Card
            </p>
        </div>
      </div>
    </div>
  );
};

export default Demo;
