import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../auth/services/index";
/* ================= AXIOS CLIENT ================= */

/* ================= FETCH CUSTOMERS ================= */

const fetchCustomers = async () => {
  const response = await apiClient.get("/customers");

  // return only data
  return response.data;
};

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
    cacheTime: 1000 * 60 * 30,
  });
};

/* ================= CREATE CUSTOMER ================= */

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerData) => apiClient.post("/customers", customerData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
};

/* ================= UPDATE CUSTOMER ================= */

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/customers/${id}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
};

/* ================= DELETE CUSTOMER ================= */

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiClient.delete(`/customers/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
};
/* ================= CHECK MOBILE ================= */
// check customer is exist with mobile number
const checkCustomerMobile = async (mobile) => {
  const response = await apiClient.get(`/customers/check-mobile/${mobile}`);

  return response.data;
};

export const useCheckCustomerMobile = () => {
  return useMutation({
    mutationFn: (mobile) => checkCustomerMobile(mobile),
  });
};