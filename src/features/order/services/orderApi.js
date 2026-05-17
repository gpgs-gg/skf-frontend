import { API_URL } from "../../../config/api.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../auth/services/index";

//
// ==========================
// API FUNCTIONS
// ==========================
//

// GET ORDERS
export const getOrders = async () => {
  return apiClient.get("/orders");
};

// CREATE ORDER
export const createOrder = async (data) => {
  return apiClient.post("/orders", data);
};

// UPDATE ORDER
export const updateOrder = async (id, data) => {
  return apiClient.put(`/orders/${id}`, data);
};

// DELETE ORDER
export const deleteOrder = async (id) => {
  return apiClient.delete(`/orders/${id}`);
};

//
// ==========================
// PRODUCT APIs
// ==========================
//

// UPDATE PRODUCT
export const updateOrderProduct = async (orderId, productId, data) => {
  return apiClient.put(`/orders/${orderId}/products/${productId}`, data);
};

// DELETE PRODUCT
export const deleteOrderProduct = async (orderId, productId) => {
  return apiClient.delete(`/orders/${orderId}/products/${productId}`);
};

//
// ==========================
// REACT QUERY HOOKS
// ==========================
//

// GET ORDERS
export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await getOrders();
      return response.data.data;
    },
  });
};

// CREATE ORDER
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

// UPDATE ORDER
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateOrder(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

// DELETE ORDER
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

//
// ==========================
// UPDATE PRODUCT
// ==========================
//

export const useUpdateOrderProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, productId, data }) =>
      updateOrderProduct(orderId, productId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

//
// ==========================
// DELETE PRODUCT
// ==========================
//

export const useDeleteOrderProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, productId }) =>
      deleteOrderProduct(orderId, productId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};