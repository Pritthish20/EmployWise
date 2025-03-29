import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/User";
import UserCard from "../../components/UserCard";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 

  const fetchUsers = async (pageNum) => {
    setLoading(true);
    setError(null);

    const res = await getAllUsers(pageNum);
    if (!res) {
      setError("Failed to fetch users.");
      setLoading(false);
      return;
    }

    setUsers(res.data);
    setFilteredUsers(res.data); 
    setTotalPages(res.total_pages);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);
 
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredUsers(users); 
    } else {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(query) ||
          user.last_name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  };

  const handlePageInput = (e) => {
    setInputPage(e.target.value);
  };
 
  const goToPage = () => {
    const pageNumber = parseInt(inputPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    } else {
      alert("Invalid page number.");
    }
    setInputPage("");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
        User List
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500 text-lg">Loading users...</p>
      )}

      {/* Error State */}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {/* User List */}
      {!loading && !error && filteredUsers.length > 0 ? (
        <div className="flex flex-col gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-gray-500">No matching users found.</p>
        )
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-6">
        {/* Previous Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex items-center"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <FaArrowLeft className="mr-2" /> Prev
        </button>

        {/* Page Input Box */}
        <div className="flex items-center">
          <span className="text-lg font-semibold text-gray-700 mr-2">Page</span>
          <input
            type="number"
            value={inputPage}
            onChange={handlePageInput}
            className="w-16 text-center border border-gray-400 rounded-lg px-2 py-1"
            placeholder={page}
          />
          <button
            onClick={goToPage}
            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go
          </button>
        </div>

        {/* Show Total Pages */}
        <span className="text-lg font-semibold text-gray-700">
          of {totalPages}
        </span>

        {/* Next Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex items-center"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
