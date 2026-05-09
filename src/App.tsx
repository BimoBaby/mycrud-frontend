import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./components/Layout";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

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



  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // IF EDITING
    if (editingId) {

      await axios.put(
        `http://localhost:5000/users/${editingId}`,
        form
      );

      setEditingId(null);

    } else {

      // ADD NEW USER
      await axios.post(
        "http://localhost:5000/users",
        form
      );
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
    await axios.delete(`http://localhost:5000/users/${id}`);
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