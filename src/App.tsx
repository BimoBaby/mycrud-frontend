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
  firstname: string,
  middlename: string,
  lastname: string,
  email: string;
  address: string;
  contactnumber: string;
  gender: string;
}

interface UserForm {
  firstname: string,
  middlename: string,
  lastname: string,
  email: string;
  address: string;
  contactnumber: string;
  gender: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<UserForm>({
    firstname: "",
    middlename: "",
    lastname: "", email: "", address: "", contactnumber: "", gender: ""
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const maleUsers = users.filter(
    (user) => user.gender?.toLowerCase() === "male"
  ).length;

  const femaleUsers = users.filter(
    (user) => user.gender?.toLowerCase() === "female"
  ).length;

  const chartData = [
    {
      name: "Male",
      total: maleUsers,
    },
    {
      name: "Female",
      total: femaleUsers,
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
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      address: "",
      contactnumber: "",
      gender: "",
    });

    // REFRESH USERS
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    // await axios.delete(`http://localhost:5000/users/${id}`);

    await axios.delete(`${API}/users/${id}`);
    fetchUsers();
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
        <div className="bg-white p-6 rounded-2xl shadow mt-5 h-[420px]">
          <h2 className="text-xl font-bold mb-4">
            Gender Analytics
          </h2>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" />
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