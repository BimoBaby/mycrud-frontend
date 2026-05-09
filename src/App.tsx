import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./components/Layout";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<UserForm>({ name: "", email: "", address: "", contactnumber: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fullNames = users.map(
    (user) => user.name.trim().toLowerCase()
  );

  const duplicateNames = fullNames.filter(
    (name, index) => fullNames.indexOf(name) !== index
  );

  const uniqueDuplicateNames = [...new Set(duplicateNames)];

  const chartData = [
    {
      name: "Registered Users",
      total: users.length,
    },
    {
      name: "Duplicate Names",
      total: uniqueDuplicateNames.length,
    },
  ];

  const API = import.meta.env.VITE_API_URL;

 const fetchUsers = async () => {
  const res = await axios.get(`${API}/users`);
  setUsers(res.data);
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // IF EDITING
    if (editingId) {

      // await axios.put(
      //   `http://localhost:5000/users/${editingId}`,
      //   form
      // );

      await axios.put(`${API}/users/${editingId}`, form);

      setEditingId(null);

    } else {

      // ADD NEW USER
      // await axios.post(
      //   "http://localhost:5000/users",
      //   form
      // );
      await axios.post(`${API}/users`, form);
    }

    // CLEAR FORM
    setForm({
      name: "",
      email: "",
      address: "",
      contactnumber: "",
    });

    // REFRESH USERS
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    // await axios.delete(`http://localhost:5000/users/${id}`);
    // fetchUsers();
    
    await axios.delete(`${API}/users/${id}`);
  };

  const [activePage, setActivePage] = useState("dashboard");

  return (
    <Layout
      activePage={activePage}
      setActivePage={setActivePage}
    >

      <UserForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editingId={editingId}
        dashboardView={activePage === "dashboard"}
      />

      {activePage === "dashboard" && (
        <div
          className="bg-white p-5 rounded-xl mt-5"
          style={{ width: "100%", height: 300 }}
        >
          <h2 className="text-xl font-bold mb-4">
            User Analytics
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <UserList
        users={users}
        deleteUser={deleteUser}
        setForm={setForm}
        setEditingId={setEditingId}
        dashboardView={activePage === "dashboard"}
      />

    </Layout>
  );
}

export default App;