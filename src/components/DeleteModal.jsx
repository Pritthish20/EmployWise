import React, { useState } from "react";
import { deleteUser } from "../services/User";
import { toast } from "react-toastify";

const DeleteModal = ({ user, setModal }) => {
  if (!user) return null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);

    const res = await deleteUser(id);
    if (!res) {
      setError("Failed to delete user");
      toast.error("Error deleting user");
      setLoading(false);
      return;
    }

    toast.success("User deleted successfully");
    setLoading(false);
    setModal(false); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-red-600">Confirm Deletion</h2>
   
        <div className="mt-4">
          <p className="text-lg font-medium">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
    
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
 
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            onClick={() => setModal(false)}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              loading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={() => handleDelete(user.id)}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
