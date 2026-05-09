
import type { Dispatch, SetStateAction } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface User {
    _id: string;
    name: string;
    email: string;
    address: string;
    contactnumber: string;
}

interface UserForm {
    name: string;
    email: string;
    address: string;
    contactnumber: string;
}

interface UserListProps {
    users: User[];
    deleteUser: (id: string) => void;
    setForm: Dispatch<SetStateAction<UserForm>>;
    setEditingId: Dispatch<SetStateAction<string | null>>;
    dashboardView?: boolean;
}

function UserList({
    users,
    deleteUser,
    setForm,
    setEditingId,
    dashboardView = true,
}: UserListProps) {

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Registered Users
                    </h2>
                    <p className="text-slate-500 mt-1">
                        Total Users: {users.length}
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left p-4 text-slate-600 font-semibold">
                                Name
                            </th>

                            <th className="text-left p-4 text-slate-600 font-semibold">
                                Email
                            </th>

                            <th className="text-left p-4 text-slate-600 font-semibold">
                                Address
                            </th>

                            <th className="text-left p-4 text-slate-600 font-semibold">
                                Contact
                            </th>

                            {!dashboardView && (
                                <th className="text-center p-4 text-slate-600 font-semibold">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((u) => (
                            <tr
                                key={u._id}
                                className="border-b border-slate-100 hover:bg-slate-50 transition"
                            >

                                <td className="p-4 font-medium text-slate-800">
                                    {u.name}
                                </td>

                                <td className="p-4 text-slate-600">
                                    {u.email}
                                </td>

                                <td className="p-4 text-slate-600 max-w-xs">
                                    <div className="whitespace-normal break-words">
                                        {u.address}
                                    </div>
                                </td>

                                <td className="p-4 text-slate-600">
                                    {u.contactnumber}
                                </td>

                                {!dashboardView && (
                                    <td className="p-4">

                                        <div className="flex justify-center gap-2">

                                            <button
                                                onClick={() => {
                                                    setForm({
                                                        name: u.name,
                                                        email: u.email,
                                                        address: u.address,
                                                        contactnumber: u.contactnumber,
                                                    });

                                                    setEditingId(u._id);
                                                }}
                                                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                            >
                                                <Pencil size={16} />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteUser(u._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>

                                        </div>

                                    </td>
                                )}

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default UserList;