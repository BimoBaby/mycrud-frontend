import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface User {
    _id: string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    address: string;
    contactnumber: string;
    gender: string;
}

interface UserForm {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    address: string;
    contactnumber: string;
    gender: string;
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

    const [showDialog, setShowDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setSelectedUserId(id);
        setShowDialog(true);
    };

    const confirmDelete = () => {
        if (selectedUserId) {
            deleteUser(selectedUserId);
        }

        setShowDialog(false);
        setSelectedUserId(null);
    };

    const cancelDelete = () => {
        setShowDialog(false);
        setSelectedUserId(null);
    };

    return (
        <>
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
                                    Gender
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
                                        {u.firstname} {u.middlename} {u.lastname}
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
                                        {u.gender}
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
                                                            firstname: u.firstname,
                                                            middlename: u.middlename,
                                                            lastname: u.lastname,
                                                            email: u.email,
                                                            address: u.address,
                                                            contactnumber: u.contactnumber,
                                                            gender: u.gender,
                                                        });

                                                        setEditingId(u._id);
                                                    }}
                                                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                                >
                                                    <Pencil size={16} />
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(u._id)
                                                    }
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

            {/* Delete Confirmation Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-slate-800 mb-3">
                            Confirm Delete
                        </h2>

                        <p className="text-slate-600 mb-6">
                            Are you sure you want to delete this user?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserList;