import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const UserTable = () => {
  const [username, setUsername] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(userData);
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (editingUserId) {
      // Handle edit mode
      await updateDoc(doc(db, "users", editingUserId), {
        username,
        addedDate: startDate,
        status,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId
            ? { id: user.id, username, addedDate: startDate, status }
            : user
        )
      );

      // Reset editing state
      setEditingUserId(null);
    } else {
      // Handle add mode
      const user = {
        username: username,
        addedDate: startDate,
        status: status, // Ensure that status is captured correctly here
      };

      const docRef = await addDoc(collection(db, "users"), user);
      console.log(docRef.id);

      // Use the updated state to reset form fields
      setUsers((prevUsers) => [...prevUsers, { id: docRef.id, ...user }]);

      // Reset form fields
      setUsername("");
      setStartDate(new Date());
      setStatus(""); // Reset status to an empty string or default value
    }
  };

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEditUser = (user) => {
    // Set the form fields with the selected user's data
    setUsername(user.username);
    setStartDate(
      user.addedDate instanceof Date
        ? user.addedDate
        : new Date(user.addedDate.seconds * 1000) // Convert from Firestore Timestamp
    );
    setStatus(user.status);

    // Set the editing state with the user's ID
    setEditingUserId(user.id);
  };

  const handleCancelEdit = () => {
    // Reset form fields and editing state
    setUsername("");
    setStartDate(new Date());
    setStatus("");
    setEditingUserId(null);
  };

  const handleFilterByStatus = (selectedStatus) => {
    setFilterStatus(selectedStatus);
  };

  const filteredUsers = users.filter((user) => {
    const nameMatch =
      user.username.toLowerCase().includes(filterName.toLowerCase()) ||
      filterName === "";

    const statusMatch = filterStatus === "all" || user.status === filterStatus;

    return nameMatch && statusMatch;
  });

  const handleFilterByName = (name) => {
    setFilterName(name);
  };
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Added Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">
              <input
                className="border border-gray-300 p-2 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </td>
            <td className="py-2 px-4 border-b">
              <input
                type="date"
                className="border border-gray-300 p-2 w-full"
                value={startDate.toISOString().split("T")[0]} // Format as YYYY-MM-DD
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
            </td>

            <td className="py-2 px-4 border-b">
              <select
                className="border border-gray-300 p-2 w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Choose an option</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </td>
            <td className="py-2 px-4 border-b">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleAddUser}
              >
                {editingUserId ? "Update" : "Add"} Button
              </button>
              {editingUserId && (
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <div className="py-4 flex justify-center items-center">
                <input
                  className="border border-gray-300 p-2 mr-2"
                  placeholder="Filter by Name"
                  value={filterName}
                  onChange={(e) => handleFilterByName(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleFilterByStatus("active")}
                >
                  Active Users
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleFilterByStatus("inactive")}
                >
                  Inactive Users
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => handleFilterByStatus("all")}
                >
                  Show All Users
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">
                {user.addedDate instanceof Date
                  ? user.addedDate.toLocaleDateString()
                  : user.addedDate
                  ? new Date(user.addedDate.seconds * 1000).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="py-2 px-4 border-b">{user.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default UserTable;
