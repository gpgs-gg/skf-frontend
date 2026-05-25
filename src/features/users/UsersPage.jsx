import React, { useState } from "react";
import {
  FiTrash2,
  FiPlus,
  FiSearch,
  FiX,
  FiEye,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../order/common/ConfirmModal";
import TableSkeleton from "../order/common/TableSkeleton";
import CellWithTooltip from "../order/common/CellWithTooltip";
import EditUserModal from "./EditUserModal";
// ✅ DIRECT QUERY HOOKS
import { useUsers, useDeleteUser, useUpdateUser } from "./services/index"; // adjust path if needed

const ITEMS_PER_PAGE = 20;

const UsersPage = () => {
  const navigate = useNavigate();
  // =========================
  // DATA (React Query)
  // =========================
  const { data, isLoading } = useUsers();
  const users = data?.data || [];

  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();

  // =========================
  // STATE
  // =========================
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  // Handlel Update User
  const handleUpdateUser = async () => {
    if (!editingUser) return;

    await updateUserMutation.mutateAsync({
      id: editingUser._id,
      data: editForm,
    });

    setEditingUser(null);
  };
  // =========================
  // FILTER + SEARCH
  // =========================
  const filteredUsers = users
    .filter((user) => {
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term);

      const matchesRole = roleFilter ? user.role === roleFilter : true;

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  const uniqueRoles = [...new Set(users.map((u) => u.role))];

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // =========================
  // DELETE
  // =========================
  const confirmDelete = async () => {
    if (!userToDelete) return;

    await deleteUserMutation.mutateAsync(userToDelete._id);

    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="border border-gray-200 shadow-sm overflow-hidden">
      {/* LOADING */}
      {isLoading ? (
        <TableSkeleton rows={6} columns={4} />
      ) : (
        <div className="flex flex-col">
          {/* FILTERS */}
          <div className="sticky top-0 z-50 bg-white shadow-sm md:static">
            <div className="p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {/* LEFT */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  {/* SEARCH */}
                  <div className="relative w-full md:w-[220px]">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>

                  {/* ROLE FILTER */}
                  <div className="relative w-full md:w-[160px]">
                    <div
                      onClick={() => setShowRoleDropdown((p) => !p)}
                      className="pl-3 pr-3 py-2.5 cursor-pointer text-sm border border-gray-300 rounded-xl flex justify-between"
                    >
                      <span>{roleFilter || "All Roles"}</span>
                      <FiChevronDown />
                    </div>

                    {showRoleDropdown && (
                      <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg">
                        <div
                          onClick={() => {
                            setRoleFilter("");
                            setShowRoleDropdown(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          All Roles
                        </div>

                        {uniqueRoles.map((role, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setRoleFilter(role);
                              setShowRoleDropdown(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {role}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CLEAR */}
                  {(searchTerm || roleFilter) && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setRoleFilter("");
                        setCurrentPage(1);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl"
                    >
                      <FiX />
                      Clear
                    </button>
                  )}
                </div>

                {/* CREATE */}
                {/* <button
                  onClick={() => navigate("/register")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl"
                >
                  <FiPlus />
                  Create User
                </button> */}
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="hidden md:block">
            <table className="w-full table-fixed text-lg">
              <thead className="bg-black text-white sticky top-0">
                <tr>
                  <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                    Name
                  </th>
                  <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                    Email
                  </th>
                  <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                    Role
                  </th>
                  <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="text-[16px]">
                {paginatedUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t text-sm border-gray-200 hover:bg-gray-50"
                  >
                    <td className="text-center py-4">{user.name}</td>

                    <td className="text-center py-4">
                      <CellWithTooltip value={user.email} />
                    </td>

                    <td className="text-center py-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {user.role}
                      </span>
                    </td>

                    <td className="text-center">
                      <div className="flex justify-center gap-4">
                        {/* <button>
                          <FiEye size={20} />
                        </button> */}
                        <button
                          className="text-lg"
                          onClick={() => {
                            setEditingUser(user);
                            setEditForm({
                              name: user.name,
                              email: user.email,
                              role: user.role,
                            });
                          }}
                        >
                          <i className="fas fa-edit cursor-pointer"></i>
                        </button>
                        <button
                          className="rounded-md text-xl cursor-pointer hover:bg-gray-50 transition"
                          onClick={() => {
                            setUserToDelete(user);
                            setShowDeleteModal(true);
                          }}
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="md:hidden p-3 space-y-4 bg-gray-50">
            {paginatedUsers.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onEdit={(u) => {
                  setEditingUser(u);
                  setEditForm({
                    name: u.name,
                    email: u.email,
                    role: u.role,
                  });
                }}
                onDelete={(u) => {
                  setUserToDelete(u);
                  setShowDeleteModal(true);
                }}
              />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-6 py-4 border-t">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* DELETE MODAL */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.name}?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
      <EditUserModal
        editingUser={editingUser}
        editForm={editForm}
        setEditForm={setEditForm}
        setEditingUser={setEditingUser}
        handleUpdateUser={handleUpdateUser}
      />
    </div>
  );
};

export default UsersPage;

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-800 truncate">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>

        <span className="shrink-0 px-3 py-1 text-xs rounded-full bg-gray-100 border">
          {user.role}
        </span>
      </div>

      {/* Actions (same icons style as table) */}
      <div className="flex justify-end gap-4 pt-3 border-t">
        {/* EDIT */}
        <button
          onClick={() => onEdit(user)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <i className="fas fa-edit text-gray-700 text-[16px]" />
        </button>

        {/* DELETE */}
        <button
          onClick={() => onDelete(user)}
          className="p-2 rounded-lg hover:bg-red-50 transition"
        >
          <FiTrash2 className="text-red-600" size={18} />
        </button>
      </div>
    </div>
  );
};
