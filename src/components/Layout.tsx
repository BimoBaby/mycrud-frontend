import type { ReactNode, Dispatch, SetStateAction } from "react";
import { Users, LayoutDashboard, Settings } from "lucide-react";

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
    return (
        <div className="min-h-screen bg-slate-100 flex">
            <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 shadow-2xl">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold tracking-wide">
                        Admin Panel
                    </h1>

                    <p className="text-slate-400 text-sm mt-1">
                        User Management System
                    </p>
                </div>

                <nav className="flex flex-col gap-3">

                    <button
                        onClick={() => setActivePage("dashboard")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activePage === "dashboard"
                                ? "bg-blue-600"
                                : "hover:bg-slate-800"
                            }`}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>

                    <button
                        onClick={() => setActivePage("users")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activePage === "users"
                                ? "bg-blue-600"
                                : "hover:bg-slate-800"
                            }`}
                    >
                        <Users size={18} />
                        Users
                    </button>

                    <button className="flex items-center gap-3 hover:bg-slate-800 px-4 py-3 rounded-xl transition">
                        <Settings size={18} />
                        Settings
                    </button>

                </nav>

                <div className="mt-auto pt-10 text-sm text-slate-500">
                    React + TypeScript + Tailwind
                </div>

            </aside>

            <main className="flex-1 p-8 overflow-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">
                            User Dashboard
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Manage and monitor registered users.
                        </p>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                        A
                    </div>

                </div>

                {children}
            </main>

        </div>
    );
}

export default Layout;