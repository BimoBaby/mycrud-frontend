interface UserFormData {
  name: string;
  email: string;
  address: string;
  contactnumber: string;
}

interface UserFormProps {
  form: UserFormData;
  setForm: React.Dispatch<React.SetStateAction<UserFormData>>;
  handleSubmit: (e: React.FormEvent) => void;
  editingId: string | null;
}

function UserForm({
  form,
  setForm,
  handleSubmit,
  editingId,
}: UserFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">

      <input
        className="px-4 py-3 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="px-4 py-3 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="px-4 py-3 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Address"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <input
        className="px-4 py-3 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Contact Number"
        value={form.contactnumber}
        onChange={(e) =>
          setForm({
            ...form,
            contactnumber: e.target.value,
          })
        }
      />

      <button
        className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98]"
      >
        {editingId ? "Update User" : "Add User"}
      </button>

    </form>
  );
}

export default UserForm;