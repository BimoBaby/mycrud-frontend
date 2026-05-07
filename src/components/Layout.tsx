import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">

        <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">
          ✨ User Management
        </h1>

        {children}

      </div>
    </div>
  );
}

export default Layout;