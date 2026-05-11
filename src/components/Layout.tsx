// import type {ReactNode} from "react";
// import { Users, LayoutDashboard, Settings } from "lucide-react";

// interface LayoutProps {
//     children: ReactNode;
//     activePage: string;
//     setActivePage: React.Dispatch<React.SetStateAction<string>>;
// }

// function Layout({
//     children,
//     activePage,
//     setActivePage,
// }: LayoutProps) {
//     return (
//         <div className="min-h-screen bg-slate-100 flex">
//             <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 shadow-2xl">
//                 <div className="mb-10">
//                     <h1 className="text-2xl font-bold tracking-wide">
//                         Admin Panel
//                     </h1>

//                     <p className="text-slate-400 text-sm mt-1">
//                         User Management System
//                     </p>
//                 </div>

//                 <nav className="flex flex-col gap-3">

//                     <button
//                         onClick={() => setActivePage("dashboard")}
//                         className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activePage === "dashboard"
//                                 ? "bg-blue-600"
//                                 : "hover:bg-slate-800"
//                             }`}
//                     >
//                         <LayoutDashboard size={18} />
//                         Dashboard
//                     </button>

//                     <button
//                         onClick={() => setActivePage("users")}
//                         className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activePage === "users"
//                                 ? "bg-blue-600"
//                                 : "hover:bg-slate-800"
//                             }`}
//                     >
//                         <Users size={18} />
//                         Users
//                     </button>

//                     <button className="flex items-center gap-3 hover:bg-slate-800 px-4 py-3 rounded-xl transition">
//                         <Settings size={18} />
//                         Settings
//                     </button>

//                 </nav>

//                 <div className="mt-auto pt-10 text-sm text-slate-500">
//                     React + TypeScript + Tailwind
//                 </div>

//             </aside>

//             <main className="flex-1 p-8 overflow-auto">
//                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex justify-between items-center">
//                     <div>
//                         <h2 className="text-3xl font-bold text-slate-800">
//                             User Dashboard
//                         </h2>

//                         <p className="text-slate-500 mt-1">
//                             Manage and monitor registered users.
//                         </p>
//                     </div>

//                     <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
//                         A
//                     </div>

//                 </div>

//                 {children}
//             </main>

//         </div>
//     );
// }

// export default Layout;

import { useState, type ReactNode } from "react";
import {
  Users,
  LayoutDashboard,
  Settings,
  Menu,
  X,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

function Layout({
  children,
  activePage,
  setActivePage,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-72
          bg-slate-900 text-white
          flex flex-col p-6 shadow-2xl
          transform transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* TOP */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              Admin Panel
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              User Management System
            </p>
          </div>

          {/* CLOSE BUTTON MOBILE */}
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-3">
          <button
            onClick={() => {
              setActivePage("dashboard");
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
              ${
                activePage === "dashboard"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }
            `}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => {
              setActivePage("users");
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
              ${
                activePage === "users"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }
            `}
          >
            <Users size={18} />
            Users
          </button>

          <button className="flex items-center gap-3 hover:bg-slate-800 px-4 py-3 rounded-xl transition">
            <Settings size={18} />
            Settings
          </button>
        </nav>

        {/* FOOTER */}
        <div className="mt-auto pt-10 text-sm text-slate-500">
          React + TypeScript + Tailwind
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-0 w-full overflow-x-hidden">
        {/* TOP HEADER */}
        <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* MOBILE MENU BUTTON */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">
                  User Dashboard
                </h2>

                <p className="text-slate-500 text-sm sm:text-base mt-1 hidden sm:block">
                  Manage and monitor registered users.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
              A
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;