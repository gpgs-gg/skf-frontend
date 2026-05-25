import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../auth/services/index";

/* =========================================================
   FETCH CATEGORIES
========================================================= */

const fetchCategories = async () => {
  const response = await apiClient.get("/categories");

  // return only backend data
  return response.data.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,

    // cache for 30 min
    cacheTime: 1000 * 60 * 30,
  });
};

/* =========================================================
   CREATE CATEGORY
========================================================= */

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData) => apiClient.post("/categories", categoryData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

/* =========================================================
   UPDATE CATEGORY
========================================================= */

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/categories/${id}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

/* =========================================================
   DELETE CATEGORY
========================================================= */

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiClient.delete(`/categories/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

/* =========================================================
   GET SINGLE CATEGORY
========================================================= */

const fetchSingleCategory = async (id) => {
  const response = await apiClient.get(`/categories/${id}`);

  return response.data.data;
};

export const useCategory = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchSingleCategory(id),

    enabled: !!id,
  });
};
