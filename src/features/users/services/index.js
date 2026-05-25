import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../auth/services/index";
import toast from "react-hot-toast";
/* ================= FETCH USERS ================= */

const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    cacheTime: 1000 * 60 * 30,
  });
};

/* ================= CREATE USER ================= */

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => apiClient.post("/users", userData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

/* ================= UPDATE USER ================= */

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/users/${id}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update user");
    },
  });
};
/* ================= DELETE USER (SOFT DELETE) ================= */

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiClient.delete(`/users/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("User deleted successfully");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    },
  });
};

/* ================= CHECK USER BY EMAIL ================= */

const checkUserEmail = async (email) => {
  const response = await apiClient.get(`/users/check/${email}`);
  return response.data;
};

export const useCheckUserEmail = () => {
  return useMutation({
    mutationFn: (email) => checkUserEmail(email),
  });
};
