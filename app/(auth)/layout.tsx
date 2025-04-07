import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
