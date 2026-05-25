import React from "react";
import Select from "react-select";
import { SelectStyles } from "@/constants/Config";
// ⬆️ adjust path based on your project

const roleOptions = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
  //   { value: "manager", label: "Manager" },
];

const EditUserModal = ({
  editingUser,
  editForm,
  setEditForm,
  setEditingUser,
  handleUpdateUser,
}) => {
  if (!editingUser) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-3 sm:p-4">
      {/* MODAL BOX */}
      <div
        className="relative
  w-[95%] sm:w-[600px] lg:w-[700px]
  max-h-[85vh]
  overflow-y-auto
  bg-white
  rounded-2xl sm:rounded-3xl
  shadow-xl
  px-4 sm:px-8 lg:px-10
  py-5 sm:py-8"
      >
        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto px-5 sm:px-8 py-6 sm:py-8">
          {/* HEADER */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-3xl font-bold text-gray-800">
              Edit User
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Update user details and role
            </p>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            {/* ROLE */}
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Role
              </label>

              <Select
                options={roleOptions}
                value={roleOptions.find((r) => r.value === editForm.role)}
                onChange={(selected) =>
                  setEditForm({ ...editForm, role: selected.value })
                }
                styles={SelectStyles}
                menuPortalTarget={document.body}
              />
            </div>
          </div>
        </div>

        {/* FOOTER (STICKY BUTTONS) */}
        <div className="border-t bg-white px-5 sm:px-8 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={() => setEditingUser(null)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdateUser}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-black text-white hover:bg-gray-900"
          >
            Update User
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
