import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
      {/* Left: Login */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-10">
        <div className="mb-6 text-lg font-semibold">
          Flashcode - Built for better
          <hr className="bg-white h-px mx-auto border-0 my-4" />
        </div>

        <div className="flex-1 flex justify-center items-center">
          {children}
        </div>
      </div>

      {/* Right: Slogan + design */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative bg-black overflow-hidden">
        {/* === Decorative circles === */}
        <div className="absolute w-[500px] h-[500px] bg-orange-500 opacity-10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="absolute w-[300px] h-[300px] bg-orange-400 opacity-20 rounded-full blur-2xl bottom-10 right-10 z-0" />

        {/* === Optional glowing lines === */}
        <div className="absolute w-96 h-1 bg-orange-600 opacity-10 rotate-45 top-10 left-[-100px] blur-md" />
        <div className="absolute w-96 h-1 bg-orange-600 opacity-10 rotate-45 bottom-10 left-[-80px] blur-md" />

        {/* === Slogan Text === */}
        <div className="relative rotate-90 origin-center z-10 text-center">
          <h1
            className="text-orange-500 font-extrabold text-[120px] leading-tight  select-none  tracking-wider
"
          >
            MAKE IT
          </h1>
          <h1 className="text-orange-500 font-extrabold text-[120px] leading-tight tracking-tight select-none mt-4">
            COUNT
          </h1>
        </div>
      </div>
    </div>
  );
}
