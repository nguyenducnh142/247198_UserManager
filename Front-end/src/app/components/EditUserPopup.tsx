import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface EditUserPopupProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export default function EditUserPopup({
  user,
  onClose,
  onSave,
}: EditUserPopupProps) {
  const [fullname, setFullname] = useState(user.fullname);
  const [role, setRole] = useState(user.role);
  const [project, setProject] = useState(user.project.join(", "));
  const [activeYn, setActiveYn] = useState(user.activeYn);

  const handleSave = async () => {
    const projectArray = project.split(/\s*,\s*/).map((desc) => desc.trim());
    const updatedUser = {
      ...user,
      fullname,
      role,
      project: projectArray,
      activeYn,
    };
    try {
      const response = await fetch(
        `http://localhost:3000/user?username=${user.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (response.ok) {
        onSave(updatedUser);
        toast.success("Successfully updated user!");
      } else {
        console.error("Failed to update user");
        toast.error("Failed to update user!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user!");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
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
            Role
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
            className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
