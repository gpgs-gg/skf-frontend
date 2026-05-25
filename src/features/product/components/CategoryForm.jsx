import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useCreateCategory, useUpdateCategory } from "../services/categoryApi";
import FieldBuilder from "./FieldBuilder";

const emptyField = {
  name: "",
  label: "",
  type: "input",
  options: [],
};

const CategoryForm = ({ editing, onSuccess }) => {
  /* =========================================================
     REACT QUERY MUTATIONS
  ========================================================= */

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  /* =========================================================
     REACT HOOK FORM
  ========================================================= */

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      fields: [{ ...emptyField }],
    },
  });

  /* =========================================================
     FIELD ARRAY
  ========================================================= */

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "fields",
  });

  /* =========================================================
     LOAD EDIT DATA
  ========================================================= */

  useEffect(() => {
    if (editing) {
      reset({
        title: editing.title || "",
        fields:
          editing.fields?.length > 0 ? editing.fields : [{ ...emptyField }],
      });
    } else {
      handleReset();
    }
  }, [editing, reset]);

  /* =========================================================
     RESET FORM
  ========================================================= */

  const handleReset = () => {
    reset({
      title: "",
      fields: [{ ...emptyField }],
    });
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onSubmit = async (data) => {
    try {
      const cleanedFields = data.fields
        .filter((field) => field.label?.trim() !== "")
        .map((field, index) => ({
          ...field,

          name:
            field.name?.trim() ||
            field.label.toLowerCase().trim().replace(/\s+/g, "_"),

          order: index + 1,

          options:
            field.type === "select" ||
            field.type === "radio" ||
            field.type === "checkbox"
              ? field.options || []
              : [],
        }));

      const payload = {
        title: data.title.trim(),

        slug: data.title.toLowerCase().trim().replace(/\s+/g, "-"),

        fields: cleanedFields,
      };

      console.log("FINAL PAYLOAD:", payload);

      /* ================= UPDATE ================= */

      if (editing) {
        await updateCategoryMutation.mutateAsync({
          id: editing._id,
          data: payload,
        });
      } else {
        /* ================= CREATE ================= */
        await createCategoryMutation.mutateAsync(payload);
      }

      handleReset();

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {editing ? "Update Category" : "Create Category"}
        </h2>
      </div>

      {/* =========================================================
          FORM
      ========================================================= */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ================= CATEGORY TITLE ================= */}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category Title
          </label>

          <input
            {...register("title", {
              required: "Category title is required",
            })}
            placeholder="Enter category title"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* ================= FIELD BUILDER ================= */}

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-5"
            >
              {/* TOP */}

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-start gap-3">
                  <div className="font-extrabold w-12 h-12 lg:mt-4 bg-black rounded-full text-white text-base sm:text-xl flex items-center justify-center">
                    {index + 1}
                  </div>

                  <FieldBuilder
                    field={watch(`fields.${index}`)}
                    index={index}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (fields.length === 1) {
                      replace([{ ...emptyField }]);
                    } else {
                      remove(index);
                    }
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================
            ACTION BUTTONS
        ========================================================= */}

        <div className="flex flex-wrap gap-3 mt-8">
          {/* ADD FIELD */}

          <button
            type="button"
            onClick={() => append({ ...emptyField })}
            className="px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-black transition font-medium"
          >
            + Add Field
          </button>

          {/* RESET */}

          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium"
          >
            Reset
          </button>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={
              isSubmitting ||
              createCategoryMutation.isPending ||
              updateCategoryMutation.isPending
            }
            className="px-6 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition font-semibold disabled:opacity-50"
          >
            {createCategoryMutation.isPending ||
            updateCategoryMutation.isPending
              ? editing
                ? "Updating..."
                : "Creating..."
              : editing
                ? "Update Category"
                : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
