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
  setForm: React.Dispatch<React.SetStateAction<UserForm>>;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
}

function UserList({
  users,
  deleteUser,
  setForm,
  setEditingId,
}: UserListProps) {
  return (
    <ul className="space-y-3">
      {users.map((u) => (
        <li
          key={u._id}
          className="flex justify-between items-center bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition"
        >
          <div>
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm text-gray-300">{u.email}</p>
            <p className="text-sm text-gray-300">{u.address}</p>
            <p className="text-sm text-gray-300">
              {u.contactnumber}
            </p>
          </div>

          <div className="flex gap-2">

            <button
              onClick={() => {

                // PUT USER INFO INTO FORM
                setForm({
                  name: u.name,
                  email: u.email,
                  address: u.address,
                  contactnumber: u.contactnumber,
                });

                // SAVE CURRENT USER ID
                setEditingId(u._id);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Edit
            </button>

            <button
              onClick={() => deleteUser(u._id)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Delete
            </button>

          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserList;