import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id?: string;
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({ name: "", email: "" });

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/users", form);
    setForm({ name: "", email: "" });
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-6">
  <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">

    <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">
      ✨ User Management
    </h1>

    {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      <input
        className="px-4 py-3 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="px-4 py-3 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <button
        className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98]"
      >
        Add User
      </button>
    </form>

    {/* List */}
    <ul className="space-y-3">
      {users.map((u) => (
        <li
          key={u._id}
          className="flex justify-between items-center bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition"
        >
          <div>
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm text-gray-300">{u.email}</p>
          </div>

          <button
            onClick={() => deleteUser(u._id)}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition hover:scale-105 active:scale-95"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
}

export default App;