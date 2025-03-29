import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import DeleteModal from './DeleteModal'
import EditModal from "./EditModal"

const UserCard = ({ user, onDelete, onEdit }) => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 w-full max-w-2xl mx-auto border border-gray-300">
    
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-24 h-24  rounded-full border-4 border-blue-500"
      />

      <div className="flex flex-col flex-grow text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-gray-800">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-lg text-gray-600">{user.email}</p>
      </div>
   
      <div className="flex gap-4 sm:flex-row flex-col w-full sm:w-auto">

        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center"
          onClick={() => setShowEditModal(true)}
        >
          <FaEdit className="mr-2" /> Edit
        </button>
      
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
          onClick={() => setShowDeleteModal(true)}
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>
      {showDeleteModal && <DeleteModal user={user} setModal={setShowDeleteModal}/>}
      {showEditModal && <EditModal user={user} setModal={setShowEditModal}/>}
    </div>
  );
};

export default UserCard;
