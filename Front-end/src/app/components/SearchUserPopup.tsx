import React, { useState } from "react";

interface SearchProps {
  onSearch: (searchParams: {
    username: string;
    fullname: string;
    role: string;
    project: string;
  }) => void;
  onClose: () => void;
}

export default function SearchUserPopup({ onSearch, onClose }: SearchProps) {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [project, setProject] = useState("");

  const handleSearch = () => {
    onSearch({ username, fullname, role, project });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fullname</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Developer">Developer</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Project</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
