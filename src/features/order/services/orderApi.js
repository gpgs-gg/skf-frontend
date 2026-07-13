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
  const formData = new FormData();

  const cleanData = {
    customer: data.customer,
    orderDate: data.orderDate,
    deliveryDate: data.deliveryDate,
    orderStatus: data.orderStatus,
    paymentStatus: data.paymentStatus,
    receivedAmount: data.receivedAmount || 0,
    rooms: data.rooms.map((room) => ({
      roomName: room.roomName,
      roomType: room.roomType,
      products: room.products.map((product) => ({
        ...product,
        price: Number(product.price || 0),
        quantity: Number(product.quantity || 1),
        attachments: [],
      })),
    })),
  };

  formData.append("order", JSON.stringify(cleanData));

  data.rooms.forEach((room, roomIndex) => {
    room.products.forEach((product, productIndex) => {
      (product.attachments || []).forEach((file) => {
        if (file instanceof File) {
          formData.append(`attachments_${roomIndex}_${productIndex}`, file);
        }
      });
    });
  });

  return apiClient.post("/orders", formData);
};
// UPDATE ORDER
export const updateOrder = async (id, data) => {
  const formData = new FormData();

  const cleanData = {
    ...data,
    rooms: data.rooms?.map((room) => ({
      ...room,
      products: room.products?.map((p) => ({
        ...p,
        attachments: (p.attachments || []).filter((a) => !(a instanceof File)),
      })),
    })),
  };

  formData.append("order", JSON.stringify(cleanData));

  // attachments (if any future support)
  data.rooms?.forEach((room, roomIndex) => {
    room.products?.forEach((product, productIndex) => {
      (product.attachments || []).forEach((file) => {
        if (file instanceof File) {
          formData.append(`attachments_${roomIndex}_${productIndex}`, file);
        }
      });
    });
  });

  return apiClient.put(`/orders/${id}`, formData);
};

// UPDATE ROOM
export const updateOrderRoom = async (orderId, roomId, data) => {
  const formData = new FormData();

  const cleanRoom = {
    ...data,

    products: data.products?.map((product) => ({
      ...product,

      attachments: (product.attachments || []).filter(
        (a) => !(a instanceof File),
      ),
    })),
  };

  formData.append("room", JSON.stringify(cleanRoom));

  data.products?.forEach((product, productIndex) => {
    (product.attachments || []).forEach((file) => {
      if (file instanceof File) {
        formData.append(`attachments_product_${productIndex}`, file);
      }
    });
  });

  return apiClient.put(`/orders/${orderId}/rooms/${roomId}`, formData);
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
export const updateOrderProduct = (orderId, roomId, productId, data) => {
  const formData = new FormData();

  // keep only metadata (no files)
  const cleanProduct = {
    ...data,
    attachments: (data.attachments || []).filter((a) => !(a instanceof File)),
  };

  formData.append("product", JSON.stringify(cleanProduct));

  // send ONLY new files
  (data.attachments || []).forEach((file) => {
    if (file instanceof File) {
      formData.append("attachments", file);
    }
  });

  return apiClient.put(
    `/orders/${orderId}/rooms/${roomId}/products/${productId}`,
    formData,
  );
};
// DELETE PRODUCT
export const deleteOrderProduct = async (orderId, roomId, productId) => {
  return apiClient.delete(
    `/orders/${orderId}/rooms/${roomId}/products/${productId}`,
  );
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
    mutationFn: ({ orderId, roomId, productId, data }) => {
      // console.log("=== MUTATION DATA ===");
      // console.log(data);
      // console.log("attachments:", data?.attachments);

      data?.attachments?.forEach((file, index) => {
        // console.log(
        //   `Attachment ${index}:`,
        //   file,
        //   file instanceof File,
        //   file?.name,
        // );
      });

      return updateOrderProduct(orderId, roomId, productId, data);
    },

    onSuccess: (response, variables) => {
      const updatedProduct = response.data.data;

      queryClient.setQueryData(["orders"], (oldOrders) => {
        if (!oldOrders) return oldOrders;

        return oldOrders.map((order) => {
          if (order._id !== variables.orderId) return order;

          return {
            ...order,
            rooms: order.rooms.map((room) => {
              if (room._id !== variables.roomId) return room;

              return {
                ...room,
                products: room.products.map((product) =>
                  product._id === variables.productId
                    ? {
                        ...product,
                        ...updatedProduct,
                      }
                    : product,
                ),
              };
            }),
          };
        });
      });

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
    mutationFn: ({ orderId, roomId, productId }) =>
      deleteOrderProduct(orderId, roomId, productId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

export const useUpdateOrderRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, roomId, data }) =>
      updateOrderRoom(orderId, roomId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
// DELETE ROOM
export const deleteOrderRoom = async (orderId, roomId) => {
  return apiClient.delete(`/orders/${orderId}/rooms/${roomId}`);
};
// DELETE ROOM
export const useDeleteOrderRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, roomId }) => deleteOrderRoom(orderId, roomId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
export const addOrderProduct = (orderId, roomId, data) => {
  const formData = new FormData();

  formData.append(
    "product",
    JSON.stringify({
      ...data,
      attachments: [],
    }),
  );

  (data.attachments || []).forEach((file) => {
    if (file instanceof File) {
      formData.append("attachments", file);
    }
  });

  return apiClient.post(
    `/orders/${orderId}/rooms/${roomId}/products`,
    formData,
  );
};
export const useAddOrderProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, roomId, data }) =>
      addOrderProduct(orderId, roomId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

// import { API_URL } from "../../../config/api.js";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import apiClient from "../../auth/services/index";

// //
// // ==========================
// // API FUNCTIONS
// // ==========================
// //

// // GET ORDERS
// export const getOrders = async () => {
//   return apiClient.get("/orders");
// };

// // CREATE ORDER
// export const createOrder = async (data) => {
//   return apiClient.post("/orders", data);
// };

// // UPDATE ORDER
// export const updateOrder = async (id, data) => {
//   return apiClient.put(`/orders/${id}`, data);
// };

// // DELETE ORDER
// export const deleteOrder = async (id) => {
//   return apiClient.delete(`/orders/${id}`);
// };

// //
// // ==========================
// // PRODUCT APIs
// // ==========================
// //

// // UPDATE PRODUCT
// export const updateOrderProduct = (orderId, roomId, productId, data) => {
//   const formData = new FormData();

//   // Add all non-file product data
//   formData.append(
//     "product",
//     JSON.stringify({
//       ...data,
//       attachments: [],
//     }),
//   );

//   // Add files
//   (data.attachments || []).forEach((file) => {
//     if (file instanceof File) {
//       formData.append("attachments", file);
//     }
//   });

//   return apiClient.put(
//     `/orders/${orderId}/rooms/${roomId}/products/${productId}`,
//     formData,
//   );
// };
// // export const updateOrderProduct = async (orderId, roomId, productId, data) => {
// //   console.log("FINAL PAYLOAD SENT TO BACKEND");
// //   console.log(data);

// //   return apiClient.put(
// //     `/orders/${orderId}/rooms/${roomId}/products/${productId}`,
// //     data,
// //   );
// // };

// // DELETE PRODUCT
// export const deleteOrderProduct = async (orderId, roomId, productId) => {
//   return apiClient.delete(
//     `/orders/${orderId}/rooms/${roomId}/products/${productId}`,
//   );
// };

// // // UPDATE PRODUCT
// // export const updateOrderProduct = async (orderId, productId, data) => {
// //   return apiClient.put(`/orders/${orderId}/products/${productId}`, data);
// // };

// // // DELETE PRODUCT
// // export const deleteOrderProduct = async (orderId, productId) => {
// //   return apiClient.delete(`/orders/${orderId}/products/${productId}`);
// // };

// //
// // ==========================
// // REACT QUERY HOOKS
// // ==========================
// //

// // GET ORDERS
// export const useOrders = () => {
//   return useQuery({
//     queryKey: ["orders"],
//     queryFn: async () => {
//       const response = await getOrders();
//       return response.data.data;
//     },
//   });
// };

// // CREATE ORDER
// export const useCreateOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createOrder,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };

// // UPDATE ORDER
// export const useUpdateOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }) => updateOrder(id, data),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };

// // DELETE ORDER
// export const useDeleteOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteOrder,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };

// //
// // ==========================
// // UPDATE PRODUCT
// // ==========================
// //

// export const useUpdateOrderProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ orderId, roomId, productId, data }) => {
//       console.log("=== MUTATION DATA ===");
//       console.log(data);
//       console.log("attachments:", data?.attachments);

//       data?.attachments?.forEach((file, index) => {
//         console.log(
//           `Attachment ${index}:`,
//           file,
//           file instanceof File,
//           file?.name,
//         );
//       });

//       return updateOrderProduct(orderId, roomId, productId, data);
//     },

//     onSuccess: (response, variables) => {
//       const updatedProduct = response.data.data;

//       queryClient.setQueryData(["orders"], (oldOrders) => {
//         if (!oldOrders) return oldOrders;

//         return oldOrders.map((order) => {
//           if (order._id !== variables.orderId) return order;

//           return {
//             ...order,
//             rooms: order.rooms.map((room) => {
//               if (room._id !== variables.roomId) return room;

//               return {
//                 ...room,
//                 products: room.products.map((product) =>
//                   product._id === variables.productId
//                     ? {
//                         ...product,
//                         ...updatedProduct,
//                       }
//                     : product,
//                 ),
//               };
//             }),
//           };
//         });
//       });

//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };

// //
// // ==========================
// // DELETE PRODUCT
// // ==========================
// //

// export const useDeleteOrderProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ orderId, roomId, productId }) =>
//       deleteOrderProduct(orderId, roomId, productId),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };

// // UPDATE ROOM
// export const updateOrderRoom = async (orderId, roomId, data) => {
//   return apiClient.put(`/orders/${orderId}/rooms/${roomId}`, data);
// };

// export const useUpdateOrderRoom = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ orderId, roomId, data }) =>
//       updateOrderRoom(orderId, roomId, data),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };
// // DELETE ROOM
// export const deleteOrderRoom = async (orderId, roomId) => {
//   return apiClient.delete(`/orders/${orderId}/rooms/${roomId}`);
// };
// // DELETE ROOM
// export const useDeleteOrderRoom = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ orderId, roomId }) => deleteOrderRoom(orderId, roomId),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };
// export const addOrderProduct = (orderId, roomId, data) => {
//   const formData = new FormData();

//   formData.append(
//     "product",
//     JSON.stringify({
//       ...data,
//       attachments: [],
//     }),
//   );

//   (data.attachments || []).forEach((file) => {
//     if (file instanceof File) {
//       formData.append("attachments", file);
//     }
//   });

//   return apiClient.post(
//     `/orders/${orderId}/rooms/${roomId}/products`,
//     formData,
//   );
// };
// export const useAddOrderProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ orderId, roomId, data }) =>
//       addOrderProduct(orderId, roomId, data),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };
