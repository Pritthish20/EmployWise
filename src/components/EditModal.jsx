import React, { useState, useEffect } from "react";
import { updateUser } from "../services/User";
import { toast } from "react-toastify";

const EditModal = ({ user, setModal }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [isChanged, setIsChanged] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      });
      setIsChanged(false); 
      setError(null);
    }
  }, [user]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setIsChanged(
        updatedData.first_name !== user.first_name ||
        updatedData.last_name !== user.last_name ||
        updatedData.email !== user.email
      );
      return updatedData;
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!isChanged) {
      return toast.info("Change any existing data to save");
    }

    setLoading(true);
    setError(null);

    const res = await updateUser(user.id, formData);
    if (!res) {
      setError("Failed to update user.");
      toast.error("Failed to update user. Please try again later.");
      setLoading(false);
      return;
    }

    toast.success("User updated successfully!");
    setLoading(false);
    setModal(false);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-blue-600 text-center">Edit User</h2>
        
        <form className="mt-4 space-y-4" onSubmit={handleEdit}>
          <div>
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              onClick={() => setModal(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white ${
                isChanged && !loading
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isChanged || loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
