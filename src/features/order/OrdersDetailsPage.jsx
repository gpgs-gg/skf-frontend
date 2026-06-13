/**
 * =========================================================
 * OrderDetailsPage.jsx
 * =========================================================
 * Handles complete customer order management workflow:
 *
 * Features:
 * - View customer order history
 * - Search/filter customer orders
 * - Edit customer details
 * - Create new orders
 * - Edit existing orders
 * - Edit individual products inside orders
 * - Delete orders/products with confirmation
 * - Product detail modal
 * - Responsive split-screen layout
 *
 * Architecture:
 * - Left Panel  → Customer + Orders Snapshot
 * - Right Panel → Dynamic Edit/Create Forms
 *
 * Optimizations:
 * - useMemo for filtered order calculations
 * - Debounced search input
 * - Centralized panel state management

 * =========================================================
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import { FiArrowLeft, FiSearch, FiX } from "react-icons/fi";

import ConfirmModal from "./common/ConfirmModal";
import { toast } from "react-toastify";
import { FiEye } from "react-icons/fi";
import FIELD_CONFIG from "../../constants/inputFieldConfig";
import ProductDetailsModal from "./common/ProductDetailsModal";
import CustomerSnapshot from "./common/CustomerSnapshot";

const OrderDetailsPage = ({
  customer,
  onDeleteRoom,
  orders,
  onBack,
  onDeleteOrder,
  onDeleteProduct,
  onAddNewOrder,
  customers,
  onUpdateCustomer,
  onUpdateOrder,
  onUpdateProduct,
  onUpdateRoom,
  OnAddProduct,
}) => {
  // Controls different editing panels/forms
  const [showAddOrderForm, setShowAddOrderForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  // Add this with other state declarations (around line 30)
  const [tempRooms, setTempRooms] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(customer);

  // Stores currently editing product + parent order id
  const [editingProductState, setEditingProductState] = useState(null); // Track product being edited
  const [editingProductOrderId, setEditingProductOrderId] = useState(null); // Track which order contains the product

  // Delete confirmation states
  const [hasOrderDraftChanges, setHasOrderDraftChanges] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productOrderId, setProductOrderId] = useState(null);
  const [showProductDeleteModal, setShowProductDeleteModal] = useState(false);

  // Search state with debounce optimization
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  // console.log(11111111, products.length);
  const [showBackConfirmModal, setShowBackConfirmModal] = useState(false);

  // state for rooms
  const [editingRoomState, setEditingRoomState] = useState(null);
  const [editingRoomOrderId, setEditingRoomOrderId] = useState(null);
  const [editingRoomIndex, setEditingRoomIndex] = useState(null);

  // for product room id
  const [editingProductRoomId, setEditingProductRoomId] = useState(null);
  const [showRoomDeleteModal, setShowRoomDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [roomOrderId, setRoomOrderId] = useState(null);
  const [showGlobalCancelModal, setShowGlobalCancelModal] = useState(false);
  // Add this ref alongside addOrderRef (around line where addOrderRef is defined)
  const addOrderRoomsRef = useRef([]);
  // Add this with other state declarations (around line 20-30)
  const [productEditSource, setProductEditSource] = useState(null); // 'order' or 'room'
  const [savedRoomContext, setSavedRoomContext] = useState(null); // Store room context when editing product from room
  const deleteRoom = (orderId, roomId) => {
    setRoomOrderId(orderId);
    setRoomToDelete(roomId);
    setShowRoomDeleteModal(true);
  };
  const hasUnsavedChanges = () => {
    return (
      editingCustomer ||
      editingOrder ||
      editingRoomState ||
      editingProductState ||
      showAddOrderForm ||
      products?.length > 0
    );
  };

  // Add this function in OrderDetailsPage component
  const handleTempRoomAdd = (newRooms) => {
    setTempRooms(newRooms);
  };
  const confirmDeleteRoom = () => {
    if (onDeleteRoom && roomOrderId && roomToDelete) {
      onDeleteRoom(roomOrderId, roomToDelete);
    }

    setShowRoomDeleteModal(false);
    setRoomToDelete(null);
    setRoomOrderId(null);

    if (editingRoomState?._id === roomToDelete) {
      setEditingRoomState(null);
      setEditingRoomOrderId(null);
      setEditingRoomIndex(null);
    }
  };
  /**
   * Closes all active editing panels/forms
   * Used before opening another panel to avoid UI conflicts
   */
  //console.log(222222, editingProductRoomId);
  const closeAllPanels = () => {
    setEditingCustomer(null);
    setEditingOrder(null);
    setEditingProductState(null);
    setEditingProductOrderId(null);
    setShowAddOrderForm(false);
    setEditingRoomState(null);
    setEditingRoomOrderId(null);
    setEditingRoomIndex(null);
    setEditingProductRoomId(null);
  };
  const hasUnsavedProducts = () => {
    return (products?.length || 0) > 0;
  };
  const handleBackAction = () => {
    if (hasUnsavedProducts()) {
      setShowBackConfirmModal(true);
      return;
    }

    onBack();
  };

  const confirmBack = () => {
    setShowBackConfirmModal(false);
    onBack();
  };

  const cancelBack = () => {
    setShowBackConfirmModal(false);
  };

  // room edit start
  const startRoomEdit = (orderId, room, index) => {
    // console.log("ROOM EDIT CLICKED", { orderId, room, index });

    closeAllPanels();
    // 👇 force close Add Room form
    if (addOrderRef?.current) {
      addOrderRef.current.closeRoomForm?.();
    }
    setEditingRoomState(room);
    setEditingRoomOrderId(orderId);
    setEditingRoomIndex(index);
  };

  // update room inside order
  const saveRoomEdit = async (updatedRoom) => {
    try {
      await onUpdateRoom(editingRoomOrderId, updatedRoom._id, {
        roomType: updatedRoom.roomType,
        roomName: updatedRoom.roomName,
        products: updatedRoom.products || [],
      });
      toast.dismiss();
      toast.success("Room updated successfully");

      // ✅ CRITICAL: Update the editingOrder state to reflect room changes
      if (editingOrder && editingOrder._id === editingRoomOrderId) {
        const updatedRooms = editingOrder.rooms.map((room) =>
          room._id === updatedRoom._id ? updatedRoom : room,
        );

        setEditingOrder({
          ...editingOrder,
          rooms: updatedRooms,
        });
      }

      // Clear ONLY room editing states, NOT order editing state
      setEditingRoomState(null);
      setEditingRoomOrderId(null);
      setEditingRoomIndex(null);

      // ✅ Do NOT close the order edit mode
      // The order header should remain hidden and order form should stay open
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to update room");
    }
  };
  // const saveRoomEdit = async (updatedRoom) => {
  //   try {
  //     await onUpdateRoom(editingRoomOrderId, updatedRoom._id, {
  //       roomType: updatedRoom.roomType,
  //       roomName: updatedRoom.roomName,
  //       products: updatedRoom.products || [],
  //     });
  //     toast.dismiss();
  //     toast.success("Room updated successfully");

  //     setEditingRoomState(null);
  //     setEditingRoomOrderId(null);
  //     setEditingRoomIndex(null);
  //   } catch (error) {
  //     console.log(error);
  //     toast.dismiss();
  //     toast.error("Failed to update room");
  //   }
  // };
  const cancelRoomEdit = () => {
    setEditingRoomState(null);
    setEditingRoomOrderId(null);
    setEditingRoomIndex(null);
  };
  /**
   * Handles newly created order
   * Adds metadata and updates parent state
   */
  const handleOrderCreated = (newOrder) => {
    setShowAddOrderForm(false);
    setProducts([]);
    const completeOrder = {
      ...newOrder,
      orderNo: newOrder.orderNo || `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer: selectedCustomer._id,
    };

    if (onAddNewOrder) {
      onAddNewOrder(completeOrder);
    }
  };
  const handleGlobalCancel = () => {
    closeAllPanels();

    setEditingCustomer(null);
    setEditingOrder(null);
    setEditingProductState(null);
    setEditingRoomState(null);

    setShowAddOrderForm(false);

    toast.dismiss();
  };
  const handleGlobalCancelClick = () => {
    if (hasUnsavedChanges()) {
      setShowGlobalCancelModal(true);
      return;
    }

    handleGlobalCancel();
  };
  const addOrderRef = useRef(null);
  const deleteOrder = (orderId) => {
    if (onDeleteOrder) {
      onDeleteOrder(orderId);
    }
  };

  const [productRoomId, setProductRoomId] = useState(null);

  const deleteProduct = (orderId, roomId, productId) => {
    setProductOrderId(orderId);
    setProductRoomId(roomId);
    setProductToDelete(productId);
    setShowProductDeleteModal(true);
  };
  /**
   * Deletes selected product from order
   * Also clears editing state if same product is being edited
   */
  const confirmDeleteProduct = () => {
    if (onDeleteProduct && productOrderId && productToDelete) {
      onDeleteProduct(productOrderId, productRoomId, productToDelete);
    }

    // Reset states
    setShowProductDeleteModal(false);
    setProductToDelete(null);
    setProductOrderId(null);

    // If editing same product → reset
    if (editingProductState?.id === productToDelete) {
      setEditingProductState(null);
      setEditingProductOrderId(null);
    }
  };
  /**
   * Updates existing order
   * Merges old + new products before saving
   */
  const handleUpdateOrder = async (updatedOrder) => {
    if (onUpdateOrder) {
      const originalOrder = orders.find((o) => o._id === updatedOrder._id);

      const finalOrder = {
        ...updatedOrder,
        products: [
          ...(originalOrder?.products || []),
          ...(updatedOrder.products || []),
        ],
      };

      await onUpdateOrder(finalOrder);
    }

    // ✅ CLOSE FORM ONLY AFTER SAVE
    setEditingOrder(null);
    setProducts([]);
  };
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowProductModal(false);
        setSelectedProduct(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  /**
   * Opens product edit form
   * Closes other panels before opening
   */
  const startProductEdit = (orderId, roomId, product, source = "order") => {
    if (!roomId) {
      console.error("❌ Missing roomId:", roomId);
      toast.dismiss();
      toast.error("Room ID missing. Cannot edit product.");
      return;
    }

    // If we're coming from room edit, save the room context BEFORE closing
    if (source === "room" && editingRoomState) {
      setSavedRoomContext({
        roomState: editingRoomState,
        roomOrderId: editingRoomOrderId,
        roomIndex: editingRoomIndex,
      });
    }

    // Close all panels (this will clear editingRoomState)
    closeAllPanels();

    // 👇 force close Add Room form
    if (addOrderRef?.current) {
      addOrderRef.current.closeRoomForm?.();
    }

    setEditingProductState(product);
    setEditingProductOrderId(orderId);
    setEditingProductRoomId(roomId);
    setProductEditSource(source); // Track the source
  };
  // const startProductEdit = (orderId, roomId, product) => {
  //   if (!roomId) {
  //     console.error("❌ Missing roomId:", roomId);
  //     toast.dismiss();
  //     toast.error("Room ID missing. Cannot edit product.");
  //     return;
  //   }
  //   closeAllPanels();
  //   // 👇 force close Add Room form
  //   if (addOrderRef?.current) {
  //     addOrderRef.current.closeRoomForm?.();
  //   }
  //   setEditingProductState(product);
  //   setEditingProductOrderId(orderId);
  //   setEditingProductRoomId(roomId);
  // };

  const handleUpdateProductInline = (updatedProduct) => {
    // console.log("✅ Updated Product From Form:", updatedProduct);

    setEditingProductState(updatedProduct);
  };
  /**
   * Saves inline product changes
   * Calls parent update handler
   */
  const saveProductEdit = () => {
    if (
      onUpdateProduct &&
      editingProductOrderId &&
      editingProductRoomId &&
      editingProductState
    ) {
      // Call the parent's update function
      onUpdateProduct(
        editingProductOrderId,
        editingProductRoomId,
        editingProductState._id,
        editingProductState,
      );
      toast.dismiss();
      toast.success("Product details updated successfully!");

      // Store source before clearing
      const source = productEditSource;
      const savedContext = savedRoomContext;

      // Close only the product edit panel
      setEditingProductState(null);
      setEditingProductOrderId(null);
      setEditingProductRoomId(null);

      // If product was edited from room edit, restore room edit mode
      if (source === "room" && savedContext) {
        // Fetch the latest order data to get updated room with new product
        const updatedOrder = orders.find(
          (o) => o._id === savedContext.roomOrderId,
        );
        if (updatedOrder) {
          const updatedRoom = updatedOrder.rooms?.find(
            (r) => r._id === savedContext.roomState._id,
          );
          if (updatedRoom) {
            // Restore room edit mode with updated room data
            setEditingRoomState(updatedRoom);
            setEditingRoomOrderId(savedContext.roomOrderId);
            setEditingRoomIndex(savedContext.roomIndex);
          }
        }
      }

      // Clear tracking states
      setProductEditSource(null);
      setSavedRoomContext(null);
    } else {
      console.error("Cannot update product:", {
        hasOnUpdateProduct: !!onUpdateProduct,
        hasOrderId: !!editingProductOrderId,
        hasProduct: !!editingProductState,
      });
      toast.dismiss();
      toast.error("Failed to update product");
    }
  };
  const cancelProductEdit = () => {
    if (hasUnsavedProducts()) {
      setShowBackConfirmModal(true);
      return;
    }

    setEditingProductState(null);
    setEditingProductOrderId(null);
    setEditingProductRoomId(null);

    // Restore room edit if we came from there and cancelled
    if (productEditSource === "room" && savedRoomContext) {
      setEditingRoomState(savedRoomContext.roomState);
      setEditingRoomOrderId(savedRoomContext.roomOrderId);
      setEditingRoomIndex(savedRoomContext.roomIndex);
    }

    setProductEditSource(null);
    setSavedRoomContext(null);
  };
  // const saveProductEdit = () => {
  //   if (
  //     onUpdateProduct &&
  //     editingProductOrderId &&
  //     editingProductRoomId &&
  //     editingProductState
  //   ) {
  //     // Call the parent's update function
  //     onUpdateProduct(
  //       editingProductOrderId,
  //       editingProductRoomId,
  //       editingProductState._id,
  //       editingProductState,
  //     );
  //     toast.dismiss();
  //     toast.success("Product details updated successfully!");
  //   } else {
  //     console.error("Cannot update product:", {
  //       hasOnUpdateProduct: !!onUpdateProduct,
  //       hasOrderId: !!editingProductOrderId,
  //       hasProduct: !!editingProductState,
  //     });
  //     toast.dismiss();
  //     toast.error("Failed to update product");
  //   }

  //   // Close the edit panel
  //   setEditingProductState(null);
  //   setEditingProductOrderId(null);
  // };

  // const cancelProductEdit = () => {
  //   if (hasUnsavedProducts()) {
  //     setShowBackConfirmModal(true);
  //     return;
  //   }

  //   setEditingProductState(null);
  //   setEditingProductOrderId(null);
  // };
  /**
   * Debounces search input
   * Prevents expensive filtering on every keystroke
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);
  // Helper to check if any editing is active
  const isEditingActive = () => {
    return (
      editingCustomer ||
      editingOrder ||
      editingProductState ||
      showAddOrderForm ||
      editingRoomState
    );
  };
  /**
   * Memoized customer orders
   * Prevents unnecessary recalculations
   */
  const customerOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.customer?._id === selectedCustomer._id ||
        o.customer === selectedCustomer._id,
    );
  }, [orders, selectedCustomer._id]);
  /**
   * Filters orders/products based on search term
   * Supports searching:
   * - Order number
   * - Order status
   * - Product attributes
   */
  const filteredOrders = useMemo(() => {
    if (!debouncedSearch.trim()) return customerOrders;

    const term = debouncedSearch.toLowerCase();

    return customerOrders.filter((order) => {
      // Match order-level fields
      const orderMatch =
        order.orderNo?.toLowerCase().includes(term) ||
        order.orderStatus?.toLowerCase().includes(term);
      // Match product-level searchable fields
      const productMatch = order.rooms?.some((room) =>
        room.products?.some((p) =>
          [p.category, room.roomName, p.fabricName, p.fabricType, p.curtainRod]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(term),
        ),
      );

      return orderMatch || productMatch;
    });
  }, [debouncedSearch, customerOrders]);

  // format date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // get editing product room name
  const getEditingRoomInfo = () => {
    const order = orders.find((o) => o._id === editingProductOrderId);
    if (!order) return { roomName: "", roomType: "" };

    const room = order.rooms?.find((r) => r._id === editingProductRoomId);

    return {
      roomName: room?.roomName || "",
      roomType: room?.roomType || "",
    };
  };
  const { roomName, roomType } = getEditingRoomInfo();
  /**
   * =========================================================
   * MAIN LAYOUT
   * =========================================================
   * Left  → Customer snapshot + orders
   * Right → Dynamic editing forms
   * =========================================================
   */
  return (
    <div className="overflow-hidden">
      <div className="w-full  bg-gray-50">
        <CustomerSnapshot
          filteredOrders={filteredOrders}
          selectedCustomer={selectedCustomer}
          customerOrders={customerOrders}
          handleBackAction={handleBackAction}
          onBack={onBack}
          products={products}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          closeAllPanels={closeAllPanels}
          setEditingCustomer={setEditingCustomer}
          setShowAddOrderForm={setShowAddOrderForm}
          setEditingOrder={setEditingOrder}
          deleteOrder={deleteOrder}
          startProductEdit={startProductEdit}
          deleteProduct={deleteProduct}
          formatDate={formatDate}
          setSelectedProduct={setSelectedProduct}
          setShowProductModal={setShowProductModal}
          startRoomEdit={startRoomEdit}
          // NEW
          editingCustomer={editingCustomer}
          editingOrder={editingOrder}
          editingRoomState={editingRoomState}
          editingProductState={editingProductState}
          saveRoomEdit={saveRoomEdit}
          cancelRoomEdit={cancelRoomEdit}
          saveProductEdit={saveProductEdit}
          cancelProductEdit={cancelProductEdit}
          handleUpdateProductInline={handleUpdateProductInline}
          handleUpdateOrder={handleUpdateOrder}
          roomName={roomName}
          roomType={roomType}
          setEditingCustomer={setEditingCustomer}
          showAddOrderForm={showAddOrderForm}
          customers={customers}
          setProducts={setProducts}
          handleOrderCreated={handleOrderCreated}
          onUpdateCustomer={onUpdateCustomer}
          setSelectedCustomer={setSelectedCustomer}
          setEditingRoomState={setEditingRoomState}
          handleGlobalCancel={handleGlobalCancelClick}
          editingRoomOrderId={editingRoomOrderId}
          editingProductOrderId={editingProductOrderId}
          deleteRoom={deleteRoom}
          tempRooms={tempRooms}
          onTempRoomAdd={handleTempRoomAdd}
        />
      </div>
      {/* Product full details modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setSelectedProduct(null);
        }}
        formatDate={formatDate}
      />
      {/* global cancel confirmation modal */}
      <ConfirmModal
        isOpen={showGlobalCancelModal}
        title="Discard Changes"
        message="You have unsaved changes. Are you sure you want to cancel and discard them?"
        onConfirm={() => {
          setShowGlobalCancelModal(false);
          handleGlobalCancel();
        }}
        onCancel={() => setShowGlobalCancelModal(false)}
      />
      {/* Room delete confirmation modal */}
      <ConfirmModal
        isOpen={showRoomDeleteModal}
        title="Delete Room"
        message="Are you sure you want to delete this room? All products inside this room will also be removed."
        onConfirm={confirmDeleteRoom}
        onCancel={() => {
          setShowRoomDeleteModal(false);
          setRoomToDelete(null);
          setRoomOrderId(null);
        }}
      />

      {/* Product delete confirmation modal */}
      <ConfirmModal
        isOpen={showProductDeleteModal}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={confirmDeleteProduct}
        onCancel={() => {
          setShowProductDeleteModal(false);
          setProductToDelete(null);
          setProductOrderId(null);
        }}
      />

      <ConfirmModal
        isOpen={showBackConfirmModal}
        title="Unsaved Products"
        message="You have products in this order. If you go back now, changes may be lost. Do you want to continue?"
        onConfirm={confirmBack}
        onCancel={cancelBack}
      />
    </div>
  );
};

export default OrderDetailsPage;

// /**
//  * =========================================================
//  * OrderDetailsPage.jsx
//  * =========================================================
//  * Handles complete customer order management workflow:
//  *
//  * Features:
//  * - View customer order history
//  * - Search/filter customer orders
//  * - Edit customer details
//  * - Create new orders
//  * - Edit existing orders
//  * - Edit individual products inside orders
//  * - Delete orders/products with confirmation
//  * - Product detail modal
//  * - Responsive split-screen layout
//  *
//  * Architecture:
//  * - Left Panel  → Customer + Orders Snapshot
//  * - Right Panel → Dynamic Edit/Create Forms
//  *
//  * Optimizations:
//  * - useMemo for filtered order calculations
//  * - Debounced search input
//  * - Centralized panel state management

//  * =========================================================
//  */

// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { FiArrowLeft, FiSearch, FiX } from "react-icons/fi";

// import ConfirmModal from "./common/ConfirmModal";
// import { toast } from "react-toastify";
// import { FiEye } from "react-icons/fi";
// import FIELD_CONFIG from "../../constants/inputFieldConfig";
// import ProductDetailsModal from "./common/ProductDetailsModal";
// import CustomerSnapshot from "./common/CustomerSnapshot";

// const OrderDetailsPage = ({
//   customer,
//   onDeleteRoom,
//   orders,
//   onBack,
//   onDeleteOrder,
//   onDeleteProduct,
//   onAddNewOrder,
//   customers,
//   onUpdateCustomer,
//   onUpdateOrder,
//   onUpdateProduct,
//   onUpdateRoom,
//   OnAddProduct,
// }) => {
//   // Controls different editing panels/forms
//   const [showAddOrderForm, setShowAddOrderForm] = useState(false);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [editingOrder, setEditingOrder] = useState(null);

//   const [selectedCustomer, setSelectedCustomer] = useState(customer);

//   // Stores currently editing product + parent order id
//   const [editingProductState, setEditingProductState] = useState(null); // Track product being edited
//   const [editingProductOrderId, setEditingProductOrderId] = useState(null); // Track which order contains the product

//   // Delete confirmation states
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [orderToDelete, setOrderToDelete] = useState(null);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [productOrderId, setProductOrderId] = useState(null);
//   const [showProductDeleteModal, setShowProductDeleteModal] = useState(false);

//   // Search state with debounce optimization
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   const [showProductModal, setShowProductModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const [products, setProducts] = useState([]);
//   // console.log(11111111, products.length);
//   const [showBackConfirmModal, setShowBackConfirmModal] = useState(false);

//   // state for rooms
//   const [editingRoomState, setEditingRoomState] = useState(null);
//   const [editingRoomOrderId, setEditingRoomOrderId] = useState(null);
//   const [editingRoomIndex, setEditingRoomIndex] = useState(null);

//   // for product room id
//   const [editingProductRoomId, setEditingProductRoomId] = useState(null);
//   const [showRoomDeleteModal, setShowRoomDeleteModal] = useState(false);
//   const [roomToDelete, setRoomToDelete] = useState(null);
//   const [roomOrderId, setRoomOrderId] = useState(null);
//   const [showGlobalCancelModal, setShowGlobalCancelModal] = useState(false);
//   const deleteRoom = (orderId, roomId) => {
//     setRoomOrderId(orderId);
//     setRoomToDelete(roomId);
//     setShowRoomDeleteModal(true);
//   };
//   const hasUnsavedChanges = () => {
//     return (
//       editingCustomer ||
//       editingOrder ||
//       editingRoomState ||
//       editingProductState ||
//       showAddOrderForm ||
//       products?.length > 0
//     );
//   };
//   const confirmDeleteRoom = () => {
//     if (onDeleteRoom && roomOrderId && roomToDelete) {
//       onDeleteRoom(roomOrderId, roomToDelete);
//     }

//     setShowRoomDeleteModal(false);
//     setRoomToDelete(null);
//     setRoomOrderId(null);

//     if (editingRoomState?._id === roomToDelete) {
//       setEditingRoomState(null);
//       setEditingRoomOrderId(null);
//       setEditingRoomIndex(null);
//     }
//   };
//   /**
//    * Closes all active editing panels/forms
//    * Used before opening another panel to avoid UI conflicts
//    */
//   //console.log(222222, editingProductRoomId);
//   const closeAllPanels = () => {
//     setEditingCustomer(null);
//     setEditingOrder(null);
//     setEditingProductState(null);
//     setEditingProductOrderId(null);
//     setShowAddOrderForm(false);
//     setEditingRoomState(null);
//     setEditingRoomOrderId(null);
//     setEditingRoomIndex(null);
//     setEditingProductRoomId(null);
//   };
//   const hasUnsavedProducts = () => {
//     return (products?.length || 0) > 0;
//   };
//   const handleBackAction = () => {
//     if (hasUnsavedProducts()) {
//       setShowBackConfirmModal(true);
//       return;
//     }

//     onBack();
//   };

//   const confirmBack = () => {
//     setShowBackConfirmModal(false);
//     onBack();
//   };

//   const cancelBack = () => {
//     setShowBackConfirmModal(false);
//   };

//   // room edit start
//   const startRoomEdit = (orderId, room, index) => {
//     console.log("ROOM EDIT CLICKED", { orderId, room, index });

//     closeAllPanels();

//     setEditingRoomState(room);
//     setEditingRoomOrderId(orderId);
//     setEditingRoomIndex(index);
//   };

//   // update room inside order
//   const saveRoomEdit = async (updatedRoom) => {
//     try {
//       await onUpdateRoom(editingRoomOrderId, updatedRoom._id, {
//         roomType: updatedRoom.roomType,
//         roomName: updatedRoom.roomName,
//         products: updatedRoom.products || [],
//       });
//       toast.dismiss();
//       toast.success("Room updated successfully");

//       setEditingRoomState(null);
//       setEditingRoomOrderId(null);
//       setEditingRoomIndex(null);
//     } catch (error) {
//       console.log(error);
//       toast.dismiss();
//       toast.error("Failed to update room");
//     }
//   };
//   const cancelRoomEdit = () => {
//     setEditingRoomState(null);
//     setEditingRoomOrderId(null);
//     setEditingRoomIndex(null);
//   };
//   /**
//    * Handles newly created order
//    * Adds metadata and updates parent state
//    */
//   const handleOrderCreated = (newOrder) => {
//     setShowAddOrderForm(false);
//     setProducts([]);
//     const completeOrder = {
//       ...newOrder,
//       orderNo: newOrder.orderNo || `ORD-${Date.now()}`,
//       createdAt: new Date().toISOString(),
//       customer: selectedCustomer._id,
//     };

//     if (onAddNewOrder) {
//       onAddNewOrder(completeOrder);
//     }
//   };
//   const handleGlobalCancel = () => {
//     closeAllPanels();

//     setEditingCustomer(null);
//     setEditingOrder(null);
//     setEditingProductState(null);
//     setEditingRoomState(null);

//     setShowAddOrderForm(false);

//     toast.dismiss();
//   };
//   const handleGlobalCancelClick = () => {
//     if (hasUnsavedChanges()) {
//       setShowGlobalCancelModal(true);
//       return;
//     }

//     handleGlobalCancel();
//   };
//   const addOrderRef = useRef(null);
//   /**
//    * Opens delete confirmation modal for selected order
//    */
//   const deleteOrder = (orderId) => {
//     setOrderToDelete(orderId);
//     setShowDeleteModal(true);
//   };
//   /**
//    * Confirms order deletion and resets modal state
//    */
//   const confirmDeleteOrder = () => {
//     if (onDeleteOrder && orderToDelete) {
//       onDeleteOrder(orderToDelete);
//     }
//     setShowDeleteModal(false);
//     setOrderToDelete(null);
//     setEditingOrder(null);
//   };
//   /**
//    * Opens delete confirmation modal for product
//    */

//   const [productRoomId, setProductRoomId] = useState(null);

//   const deleteProduct = (orderId, roomId, productId) => {
//     setProductOrderId(orderId);
//     setProductRoomId(roomId);
//     setProductToDelete(productId);
//     setShowProductDeleteModal(true);
//   };
//   /**
//    * Deletes selected product from order
//    * Also clears editing state if same product is being edited
//    */
//   const confirmDeleteProduct = () => {
//     if (onDeleteProduct && productOrderId && productToDelete) {
//       onDeleteProduct(productOrderId, productRoomId, productToDelete);
//     }

//     // Reset states
//     setShowProductDeleteModal(false);
//     setProductToDelete(null);
//     setProductOrderId(null);

//     // If editing same product → reset
//     if (editingProductState?.id === productToDelete) {
//       setEditingProductState(null);
//       setEditingProductOrderId(null);
//     }
//   };
//   /**
//    * Updates existing order
//    * Merges old + new products before saving
//    */
//   const handleUpdateOrder = async (updatedOrder) => {
//     if (onUpdateOrder) {
//       const originalOrder = orders.find((o) => o._id === updatedOrder._id);

//       const finalOrder = {
//         ...updatedOrder,
//         products: [
//           ...(originalOrder?.products || []),
//           ...(updatedOrder.products || []),
//         ],
//       };

//       await onUpdateOrder(finalOrder);
//     }

//     // ✅ CLOSE FORM ONLY AFTER SAVE
//     setEditingOrder(null);
//     setProducts([]);
//   };
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") {
//         setShowProductModal(false);
//         setSelectedProduct(null);
//       }
//     };

//     window.addEventListener("keydown", handleEsc);

//     return () => window.removeEventListener("keydown", handleEsc);
//   }, []);
//   /**
//    * Opens product edit form
//    * Closes other panels before opening
//    */
//   const startProductEdit = (orderId, roomId, product) => {
//     if (!roomId) {
//       console.error("❌ Missing roomId:", roomId);
//       toast.dismiss();
//       toast.error("Room ID missing. Cannot edit product.");
//       return;
//     }
//     closeAllPanels();
//     console.log("11111ROOM ID RECEIVED:", roomId);
//     setEditingProductState(product);
//     setEditingProductOrderId(orderId);
//     setEditingProductRoomId(roomId);
//   };

//   const handleUpdateProductInline = (updatedProduct) => {
//     console.log("✅ Updated Product From Form:", updatedProduct);

//     setEditingProductState(updatedProduct);
//   };
//   /**
//    * Saves inline product changes
//    * Calls parent update handler
//    */
//   const saveProductEdit = () => {
//     console.log("editingProductRoomId:", editingProductRoomId);
//     console.log("editingProductOrderId:", editingProductOrderId);
//     console.log("editingProductState:", editingProductState);
//     console.log("onUpdateProduct exists:", !!onUpdateProduct);
//     if (
//       onUpdateProduct &&
//       editingProductOrderId &&
//       editingProductRoomId &&
//       editingProductState
//     ) {
//       // Call the parent's update function
//       onUpdateProduct(
//         editingProductOrderId,
//         editingProductRoomId,
//         editingProductState._id,
//         editingProductState,
//       );
//       toast.dismiss();
//       toast.success("Product details updated successfully!");
//     } else {
//       console.error("Cannot update product:", {
//         hasOnUpdateProduct: !!onUpdateProduct,
//         hasOrderId: !!editingProductOrderId,
//         hasProduct: !!editingProductState,
//       });
//       toast.dismiss();
//       toast.error("Failed to update product");
//     }

//     // Close the edit panel
//     setEditingProductState(null);
//     setEditingProductOrderId(null);
//   };

//   const cancelProductEdit = () => {
//     if (hasUnsavedProducts()) {
//       setShowBackConfirmModal(true);
//       return;
//     }

//     setEditingProductState(null);
//     setEditingProductOrderId(null);
//   };
//   /**
//    * Debounces search input
//    * Prevents expensive filtering on every keystroke
//    */
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//     }, 300); // 300ms delay

//     return () => clearTimeout(timer);
//   }, [searchTerm]);
//   // Helper to check if any editing is active
//   const isEditingActive = () => {
//     return (
//       editingCustomer ||
//       editingOrder ||
//       editingProductState ||
//       showAddOrderForm ||
//       editingRoomState
//     );
//   };
//   /**
//    * Memoized customer orders
//    * Prevents unnecessary recalculations
//    */
//   const customerOrders = useMemo(() => {
//     return orders.filter(
//       (o) =>
//         o.customer?._id === selectedCustomer._id ||
//         o.customer === selectedCustomer._id,
//     );
//   }, [orders, selectedCustomer._id]);
//   /**
//    * Filters orders/products based on search term
//    * Supports searching:
//    * - Order number
//    * - Order status
//    * - Product attributes
//    */
//   const filteredOrders = useMemo(() => {
//     if (!debouncedSearch.trim()) return customerOrders;

//     const term = debouncedSearch.toLowerCase();

//     return customerOrders.filter((order) => {
//       // Match order-level fields
//       const orderMatch =
//         order.orderNo?.toLowerCase().includes(term) ||
//         order.orderStatus?.toLowerCase().includes(term);
//       // Match product-level searchable fields
//       const productMatch = order.rooms?.some((room) =>
//         room.products?.some((p) =>
//           [p.category, room.roomName, p.fabricName, p.fabricType, p.curtainRod]
//             .filter(Boolean)
//             .join(" ")
//             .toLowerCase()
//             .includes(term),
//         ),
//       );

//       return orderMatch || productMatch;
//     });
//   }, [debouncedSearch, customerOrders]);

//   // format date
//   const formatDate = (date) => {
//     if (!date) return "";
//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // get editing product room name
//   const getEditingRoomInfo = () => {
//     const order = orders.find((o) => o._id === editingProductOrderId);
//     if (!order) return { roomName: "", roomType: "" };

//     const room = order.rooms?.find((r) => r._id === editingProductRoomId);

//     return {
//       roomName: room?.roomName || "",
//       roomType: room?.roomType || "",
//     };
//   };
//   const { roomName, roomType } = getEditingRoomInfo();
//   /**
//    * =========================================================
//    * MAIN LAYOUT
//    * =========================================================
//    * Left  → Customer snapshot + orders
//    * Right → Dynamic editing forms
//    * =========================================================
//    */
//   return (
//     <div className="overflow-hidden">
//       <div className="w-full min-h-screen bg-gray-50">
//         <CustomerSnapshot
//           filteredOrders={filteredOrders}
//           selectedCustomer={selectedCustomer}
//           customerOrders={customerOrders}
//           handleBackAction={handleBackAction}
//           onBack={onBack}
//           products={products}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           closeAllPanels={closeAllPanels}
//           setEditingCustomer={setEditingCustomer}
//           setShowAddOrderForm={setShowAddOrderForm}
//           setEditingOrder={setEditingOrder}
//           deleteOrder={deleteOrder}
//           startProductEdit={startProductEdit}
//           deleteProduct={deleteProduct}
//           formatDate={formatDate}
//           setSelectedProduct={setSelectedProduct}
//           setShowProductModal={setShowProductModal}
//           startRoomEdit={startRoomEdit}
//           // NEW
//           editingCustomer={editingCustomer}
//           editingOrder={editingOrder}
//           editingRoomState={editingRoomState}
//           editingProductState={editingProductState}
//           saveRoomEdit={saveRoomEdit}
//           cancelRoomEdit={cancelRoomEdit}
//           saveProductEdit={saveProductEdit}
//           cancelProductEdit={cancelProductEdit}
//           handleUpdateProductInline={handleUpdateProductInline}
//           handleUpdateOrder={handleUpdateOrder}
//           roomName={roomName}
//           roomType={roomType}
//           setEditingCustomer={setEditingCustomer}
//           showAddOrderForm={showAddOrderForm}
//           customers={customers}
//           setProducts={setProducts}
//           handleOrderCreated={handleOrderCreated}
//           onUpdateCustomer={onUpdateCustomer}
//           setSelectedCustomer={setSelectedCustomer}
//           setEditingRoomState={setEditingRoomState}
//           handleGlobalCancel={handleGlobalCancelClick}
//           editingRoomOrderId={editingRoomOrderId}
//           editingProductOrderId={editingProductOrderId}
//           deleteRoom={deleteRoom}
//         />
//       </div>
//       {/* Product full details modal */}
//       <ProductDetailsModal
//         product={selectedProduct}
//         isOpen={showProductModal}
//         onClose={() => {
//           setShowProductModal(false);
//           setSelectedProduct(null);
//         }}
//         formatDate={formatDate}
//       />
//       {/* global cancel confirmation modal */}
//       <ConfirmModal
//         isOpen={showGlobalCancelModal}
//         title="Discard Changes"
//         message="You have unsaved changes. Are you sure you want to cancel and discard them?"
//         onConfirm={() => {
//           setShowGlobalCancelModal(false);
//           handleGlobalCancel();
//         }}
//         onCancel={() => setShowGlobalCancelModal(false)}
//       />
//       {/* Room delete confirmation modal */}
//       <ConfirmModal
//         isOpen={showRoomDeleteModal}
//         title="Delete Room"
//         message="Are you sure you want to delete this room? All products inside this room will also be removed."
//         onConfirm={confirmDeleteRoom}
//         onCancel={() => {
//           setShowRoomDeleteModal(false);
//           setRoomToDelete(null);
//           setRoomOrderId(null);
//         }}
//       />
//       {/* Order delete confirmation modal */}
//       <ConfirmModal
//         isOpen={showDeleteModal}
//         title="Delete Order"
//         message="Are you sure you want to delete this order? This action cannot be undone."
//         onConfirm={confirmDeleteOrder}
//         onCancel={() => {
//           setShowDeleteModal(false);
//           setOrderToDelete(null);
//         }}
//       />
//       {/* Product delete confirmation modal */}
//       <ConfirmModal
//         isOpen={showProductDeleteModal}
//         title="Delete Product"
//         message="Are you sure you want to delete this product? This action cannot be undone."
//         onConfirm={confirmDeleteProduct}
//         onCancel={() => {
//           setShowProductDeleteModal(false);
//           setProductToDelete(null);
//           setProductOrderId(null);
//         }}
//       />

//       <ConfirmModal
//         isOpen={showBackConfirmModal}
//         title="Unsaved Products"
//         message="You have products in this order. If you go back now, changes may be lost. Do you want to continue?"
//         onConfirm={confirmBack}
//         onCancel={cancelBack}
//       />
//     </div>
//   );
// };

// export default OrderDetailsPage;
