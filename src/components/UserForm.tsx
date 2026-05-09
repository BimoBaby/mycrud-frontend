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
  dashboardView?: boolean;
}

function UserForm({
  form,
  setForm,
  handleSubmit,
  editingId,
  dashboardView = true,
}: UserFormProps) {

  if (dashboardView) return null;

  return (

    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          {editingId ? "Update User" : "Create New User"}
        </h2>

        <p className="text-slate-500 mt-1">
          Fill in the information below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name
          </label>

          <input
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter full name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>


        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address
          </label>

          <input
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>


        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Address
          </label>

          <input
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </div>


        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Contact Number
          </label>

          <input
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter contact number"
            value={form.contactnumber}
            onChange={(e) =>
              setForm({
                ...form,
                contactnumber: e.target.value,
              })
            }
          />
        </div>


        <div className="md:col-span-2 flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg"
          >
            {editingId ? "Update User" : "Add User"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default UserForm;