import React, { useState } from "react";

import { useCategories, useDeleteCategory } from "./services/categoryApi";

import CategoryForm from "./components/CategoryForm";

const CategoryManager = () => {
  const [editing, setEditing] = useState(null);

  // ===============================
  // FETCH CATEGORIES
  // ===============================
  const { data: categories = [], isLoading, error } = useCategories();

  // ===============================
  // DELETE CATEGORY
  // ===============================
  const deleteCategoryMutation = useDeleteCategory();

  const handleDelete = async (id) => {
    try {
      await deleteCategoryMutation.mutateAsync(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* FORM */}
        <CategoryForm
          editing={editing}
          onSuccess={() => {
            setEditing(null);
          }}
        />

        {/* CATEGORY LIST */}
        <div className="mt-8 space-y-4">
          {/* LOADING */}
          {isLoading && (
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center text-gray-500">
              Loading categories...
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-500">
              Failed to load categories
            </div>
          )}

          {/* EMPTY */}
          {!isLoading && categories.length === 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center text-gray-400">
              No categories found
            </div>
          )}

          {/* CATEGORY ITEMS */}
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* LEFT */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {cat.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {cat.fields?.length || 0} Fields
                  </p>

                  {/* FIELD TAGS */}
                  {cat.fields?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {cat.fields.map((field, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                        >
                          {field.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditing(cat)}
                    className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cat._id)}
                    disabled={deleteCategoryMutation.isPending}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
                  >
                    {deleteCategoryMutation.isPending
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
