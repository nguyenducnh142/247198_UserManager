import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface CreateUserPopupProps {
  onClose: () => void;
  onSave: () => void;
}

export default function CreateUserPopup({
  onClose,
  onSave,
}: CreateUserPopupProps) {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [project, setProject] = useState("");
  const [activeYn, setActiveYn] = useState(false);

  const handleSave = async () => {
    const projectArray = project.split(/\s*,\s*/).map((desc) => desc.trim());
    const newUser = {
      username,
      fullname,
      role,
      project: projectArray,
      activeYn,
    };
    if (!username || !fullname || !role || !project)
      return alert("Please fill all fields");
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        onSave();
        onClose();
        toast.success("Successfully created user!");
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-4 rounded shadow-md">
        <form>
          <h2 className="text-xl font-semibold mb-4">Create User</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm required"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Fullname
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Project
            </label>
            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Active
            </label>
            <input
              type="checkbox"
              checked={activeYn}
              onChange={(e) => setActiveYn(e.target.checked)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
