import React, { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { FiTrash2, FiPlus, FiUpload, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import ProductForm from "./ProductForm";
import FormField from "./common/FormField";
import ConfirmModal from "./common/ConfirmModal";
import ImagePreviewModal from "./common/ImagePreviewModal";
import { emptyProduct, cleanProductData } from "./orderUtils";

import { generateWorklog, generateCreateWorklog } from "../../utils/worklog";
import SofaDiagramRenderer from "./common/SofaDiagramRenderer";
import { useCurrentUser } from "../auth/services";

// ======================================================
// EMPTY ROOM
// ======================================================

const emptyRoom = () => ({
  id: Date.now(),
  roomType: "", // SELECT ROOM
  roomName: "", // CUSTOM ROOM NAME
  attachments: [],
  products: [],
  currentProduct: emptyProduct(),
  editingProductId: null, // NEW
});
const ROOM_OPTIONS = [
  // Living Areas
  "Hall",
  "Master Bedroom",
  "Bedroom",
  "Living Room",
  "Drawing Room",
  "Family Room",
  "Lounge",
  "Sitting Room",
  "Great Room",
  "TV Room",
  "Entertainment Room",

  // Bedrooms

  "Guest Bedroom",
  "Kids Bedroom",
  "Children's Room",
  "Baby Room",
  "Teen Room",
  "Dressing Room",
  "Walk-in Closet",

  // Dining
  "Dining Room",
  "Breakfast Area",

  // Kitchen
  "Kitchen",
  "Modular Kitchen",
  "Pantry",
  "Dry Kitchen",
  "Wet Kitchen",

  // Bathroom
  "Bathroom",
  "Master Bathroom",
  "Guest Bathroom",
  "Powder Room",
  "Washroom",

  // Study / Work
  "Study Room",
  "Home Office",
  "Office Cabin",
  "Workspace",
  "Library",

  // Utility
  "Laundry Room",
  "Utility Room",
  "Storage Room",
  "Store Room",
  "Servant Room",

  // Luxury / Special
  "Home Theatre",
  "Gym Room",
  "Meditation Room",
  "Prayer Room",
  "Pooja Room",
  "Gaming Room",
  "Bar Area",
  "Wine Cellar",

  // Outdoor
  "Balcony",
  "Terrace",
  "Patio",
  "Garden Area",
  "Outdoor Seating",

  // Commercial
  "Reception Area",
  "Conference Room",
  "Meeting Room",
  "Cabin",
  "Waiting Area",
  "Showroom",
  "Retail Space",

  // Misc
  "Lobby",
  "Passage",
  "Corridor",
  "Stair Area",
  "Entry Foyer",
];
// ======================================================
// COMPONENT
// ======================================================

const AddOrder = ({
  order,
  customers = [],
  selectedCustomerId,
  onSave,
  onCancel,
  isModal = false,
  title = "Add Order",
  editingRoomState,
  editingProductState,
  onDirtyChange,
  tempRooms = [],
  onTempRoomAdd,
  onRoomsChange,
}) => {
  // ======================================================
  // FORM
  // ======================================================

  const { handleSubmit, control, getValues, setValue, resetField } = useForm({
    defaultValues: order || {
      orderNo: "",
      orderDate: new Date().toISOString().slice(0, 10),

      deliveryDate: new Date(Date.now() + 7 * 86400000)
        .toISOString()
        .slice(0, 10),

      customerId: order?.customer || selectedCustomerId || "",

      orderStatus: "Open",

      paymentStatus: "Pending",

      // totalAmount: 0,

      receivedAmount: 0,

      dueAmount: 0,

      notes: "",
    },
  });

  useEffect(() => {
    setValue("customerId", selectedCustomerId || order?.customer || "");
  }, [selectedCustomerId, order]);

  // ======================================================
  // STATE
  // ======================================================

  const productFormResetRefs = useRef({});
  // TEMP PRODUCT STATE ROOM-WISE

  const [showCancelModal, setShowCancelModal] = useState(false);

  // Replace the rooms state initialization
  const [rooms, setRooms] = useState(() => {
    if (order?._id && tempRooms.length > 0) {
      return tempRooms;
    }
    return [];
  });
  const [currentRoom, setCurrentRoom] = useState(emptyRoom());
  const canShowSaveProduct =
    currentRoom?.currentProduct?.category &&
    currentRoom?.currentProduct?.category.trim() !== "";
  const initialDataRef = useRef(null);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const { data: currentUser } = useCurrentUser();
  const [isSaving, setIsSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [previewAttachment, setPreviewAttachment] = useState(null);
  const isEditMode = !!order?._id;
  const [roomMode, setRoomMode] = useState(null);
  const [pendingEditProduct, setPendingEditProduct] = useState(null);
  const [showProductSwitchModal, setShowProductSwitchModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [showDeleteRoomModal, setShowDeleteRoomModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  // null | "add" | "edit"
  // ======================================================
  // INITIAL SNAPSHOT
  // ======================================================
  // Add this useEffect in AddOrder
  useEffect(() => {
    if (order?._id && onTempRoomAdd && rooms.length > 0) {
      onTempRoomAdd(rooms);
    }
  }, [rooms, order?._id]);
  useEffect(() => {
    initialDataRef.current = JSON.stringify({
      form: getValues(),
      rooms,
    });
  }, []);

  useEffect(() => {
    const draft = {
      form: getValues(),
      rooms,
    };

    localStorage.setItem("order_draft", JSON.stringify(draft));
  }, [rooms]);
  useEffect(() => {
    if (order?._id && onRoomsChange) {
      onRoomsChange(rooms);
    }
  }, [rooms]);
  useEffect(() => {
    const saved = localStorage.getItem("order_draft");

    if (saved) {
      const parsed = JSON.parse(saved);
      setRooms(parsed.rooms || []);

      Object.keys(parsed.form || {}).forEach((key) => {
        setValue(key, parsed.form[key]);
      });
    }
  }, []);

  const handleDeleteTempRoom = (roomId) => {
    setRoomToDelete(roomId);
    setShowDeleteRoomModal(true);
  };
  const removeRoom = () => {
    setRooms((prev) => prev.filter((room) => room.id !== roomToDelete));

    toast.success("Room deleted");

    setRoomToDelete(null);
    setShowDeleteRoomModal(false);

    // if currently editing this room
    if (editingRoom === roomToDelete) {
      setEditingRoom(null);
      setShowRoomForm(false);
      setCurrentRoom(emptyRoom());

      resetField("roomType");
      resetField("roomName");
    }
  };
  const hasUnsavedProductData = () => {
    const p = currentRoom?.currentProduct || {};

    return !!(
      p.category ||
      p.companyName?.trim() ||
      p.collectionName?.trim() ||
      p.productCode?.trim() ||
      p.specialNotes?.trim() ||
      p.attachments?.length > 0
    );
  };
  const openProductForEdit = (room, product) => {
    console.log("product for editing", product);
    setShowRoomForm(true);

    setCurrentRoom((prev) => ({
      ...prev,
      roomType: room.roomType,
      roomName: room.roomName,
      currentProduct: {
        ...product,
      },
    }));

    setEditingProduct({
      roomId: room.id,
      productId: product.id,
    });
  };
  const handleEditProduct = (room, product) => {
    if (!editingProduct && hasUnsavedProductData()) {
      setPendingEditProduct({ room, product });
      setShowProductSwitchModal(true);
      return;
    }

    openProductForEdit(room, product);
  };
  const handleDeleteTempProduct = () => {
    setShowDeleteProductModal(true);
  };

  // ======================================================
  // UNSAVED CHANGES
  // ======================================================

  const hasUnsavedChanges = () => {
    const currentData = JSON.stringify({
      form: getValues(),
      rooms,
    });

    return currentData !== initialDataRef.current;
  };

  // ======================================================
  // ROOM FUNCTIONS
  // ======================================================

  const updateRoomType = (value) => {
    setCurrentRoom((prev) => ({
      ...prev,
      roomType: value,
    }));
  };
  const updateRoomName = (value) => {
    setCurrentRoom((prev) => ({
      ...prev,
      roomName: value,
    }));
  };

  // ======================================================
  // ROOM ATTACHMENTS
  // ======================================================

  // ======================================================
  // PRODUCT UPDATE
  // ======================================================

  const updateCurrentProduct = useCallback((updatedProduct) => {
    setCurrentRoom((prev) => {
      const oldValue = JSON.stringify(prev.currentProduct);
      const newValue = JSON.stringify(updatedProduct);

      if (oldValue === newValue) {
        return prev;
      }

      return {
        ...prev,
        currentProduct: updatedProduct,
      };
    });
  }, []);

  const handleSaveRoom = () => {
    if (!currentRoom.roomType) {
      toast.warning("Please select room type");
      return;
    }

    if (!currentRoom.roomName.trim()) {
      toast.warning("Please enter room name");
      return;
    }

    setRooms((prev) =>
      prev.map((room) =>
        room.id === editingRoom.roomId
          ? {
              ...room,
              roomType: currentRoom.roomType,
              roomName: currentRoom.roomName,
            }
          : room,
      ),
    );

    toast.success("Room updated");

    setEditingRoom(null);
    setShowRoomForm(false);

    resetField("roomType");
    resetField("roomName");

    setCurrentRoom(emptyRoom());
  };
  // ======================================================
  // ADD PRODUCT TO ROOM
  // ======================================================

  const handleAddProduct = () => {
    if (!currentRoom.roomType) {
      toast.dismiss();
      toast.warning("Please select room type");
      return;
    }

    if (!currentRoom.roomName?.trim()) {
      toast.dismiss();
      toast.warning("Please enter room name");
      return;
    }

    if (!currentRoom.currentProduct?.category) {
      toast.dismiss();
      toast.warning("Please select product category");
      return;
    }
    // Required product fields
    if (!currentRoom.currentProduct?.companyName?.trim()) {
      toast.dismiss();
      toast.warning("Company Name is required");
      return;
    }

    if (!currentRoom.currentProduct?.collectionName?.trim()) {
      toast.dismiss();
      toast.warning("Collection Name is required");
      return;
    }

    if (!currentRoom.currentProduct?.productCode?.trim()) {
      toast.dismiss();
      toast.warning("Serial No. is required");
      return;
    }

    const cleanedProduct = cleanProductData(currentRoom.currentProduct);
    console.log(cleanedProduct);
    if (editingProduct) {
      // UPDATE EXISTING PRODUCT

      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          if (room.id !== editingProduct.roomId) return room;

          return {
            ...room,
            products: room.products.map((p) =>
              p.id === editingProduct.productId
                ? {
                    ...cleanedProduct,
                    id: editingProduct.productId,
                  }
                : p,
            ),
          };
        }),
      );

      setEditingProduct(null);
      toast.dismiss();
      toast.success("Product Added");

      productFormResetRefs.current["currentRoom"]?.();

      setCurrentRoom((prev) => ({
        ...prev,
        currentProduct: {},
      }));
    } else {
      // ADD NEW PRODUCT

      const productToAdd = {
        ...cleanedProduct,
        id: Date.now(),
      };

      setRooms((prevRooms) => {
        const existingRoomIndex = prevRooms.findIndex(
          (r) =>
            r.roomType === currentRoom.roomType &&
            r.roomName === currentRoom.roomName,
        );

        if (existingRoomIndex !== -1) {
          const updatedRooms = [...prevRooms];

          updatedRooms[existingRoomIndex] = {
            ...updatedRooms[existingRoomIndex],
            products: [
              ...updatedRooms[existingRoomIndex].products,
              productToAdd,
            ],
          };

          return updatedRooms;
        }

        return [
          ...prevRooms,
          {
            id: Date.now(),
            roomType: currentRoom.roomType,
            roomName: currentRoom.roomName,
            products: [productToAdd],
          },
        ];
      });
      toast.dismiss();
      toast.success("Product Added");

      productFormResetRefs.current["currentRoom"]?.();

      setCurrentRoom((prev) => ({
        ...prev,
        currentProduct: {},
      }));
    }
  };

  //  temparary product edit
  const openRoomForEdit = (room) => {
    setShowRoomForm(true);

    setCurrentRoom({
      ...room,
      currentProduct: emptyProduct(), // don't load any product
    });

    setEditingRoom({
      roomId: room.id,
    });

    setEditingProduct(null);

    setValue("roomType", room.roomType);
    setValue("roomName", room.roomName);
  };
  const onSubmit = async (data) => {
    try {
      if (!data?.customerId) {
        toast.dismiss();
        toast.error("Please select customer");
        // console.log(12222222, selectedCustomerId);
        // console.log(1111111111111, data);

        return;
      }
      if (!order?._id && rooms.length === 0) {
        toast.dismiss();
        toast.error("Please add at least one room");
        return;
      }
      const selectedCustomer = customers.find((c) => c._id === data.customerId);

      const loggedInUser = {
        name: currentUser?.user?.name || "Unknown User",

        empId: currentUser?.user?.id || "",
      };

      const orderPayloadForLog = {
        ...data,
        rooms,
      };

      let WorkLog = "";

      if (order?._id) {
        WorkLog = generateWorklog(
          order,
          orderPayloadForLog,
          loggedInUser.name,
          loggedInUser.empId,
        );
      } else {
        WorkLog = generateCreateWorklog(
          orderPayloadForLog,
          loggedInUser.name,
          loggedInUser.empId,
        );
      }

      // ======================================================
      // FINAL PAYLOAD
      // ======================================================

      const finalOrder = {
        _id: order?._id,

        customer: selectedCustomer?._id,

        orderDate: data.orderDate,

        deliveryDate: data.deliveryDate,

        orderStatus: data.orderStatus,

        paymentStatus: data.paymentStatus,

        receivedAmount: Number(data.receivedAmount || 0),

        dueAmount: Number(data.dueAmount || 0),

        // totalAmount: Number(data.totalAmount || 0),

        notes: data.notes || "",

        rooms: rooms.map((room) => ({
          roomType: room.roomType,
          roomName: room.roomName,

          products: room.products.map((p) => ({
            ...p,

            quantity: Number(p.quantity || 1),
          })),
        })),

        WorkLog,
      };
      try {
        setIsSaving(true);

        await onSave(finalOrder);

        // toast.success(
        //   order ? "Order updated successfully" : "Order created successfully",
        // );
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message || "Failed to save order");
      } finally {
        setIsSaving(false);
      }

      toast.success(
        order ? "Order updated successfully" : "Order created successfully",
      );
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to save order");
    }
  };

  // ======================================================
  // CONTENT
  // ======================================================

  const content = (
    // <form onSubmit={handleSubmit(handleGlobalSave)}>
    <form onSubmit={handleSubmit(onSubmit)} className="">
      {/* ======================================================
          ORDER DETAILS
      ====================================================== */}
      {!editingRoomState && !editingProductState && (
        <div className="  rounded-xl ">
          {/* <h2 className="text-xl font-semibold mb-1">Order Details</h2> */}

          <div className="flex flex-col lg:flex-row lg:items-end gap-1 md:gap-4">
            {/* Order Fields */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-4">
              {order?._id && (
                <FormField
                  name="orderNo"
                  control={control}
                  label="Order No"
                  readOnly
                />
              )}

              <FormField
                name="orderDate"
                control={control}
                label="Order Date"
                type="date"
              />

              <FormField
                name="deliveryDate"
                control={control}
                label="Delivery Date"
                type="date"
              />

              <FormField
                name="orderStatus"
                control={control}
                label="Order Status"
                type="select"
                options={
                  isEditMode
                    ? [
                        "Open",
                        "Pending",
                        "Processing",
                        "Completed",
                        "Cancelled",
                      ]
                    : ["Open"] // or just omit select entirely
                }
                disabled={!isEditMode} // optional safety
              />
            </div>

            {/* Actions */}
            <div className="flex items-center  gap-3 pb-1">
              <button
                type="button"
                onClick={() => {
                  setCurrentRoom(emptyRoom());
                  setEditingProduct(null);
                  productFormResetRefs.current["currentRoom"]?.();
                  resetField("roomType");
                  resetField("roomName");
                  setShowRoomForm(true);
                  setRoomMode("add");
                }}
                className="
        bg-black
        text-white
        px-4 py-1
        md:py-2.5
        rounded-xl
        flex lg:text-[18px]
        items-center
        gap-2
        hover:scale-105
        transition-all
      "
              >
                {/* <FiPlus /> */}
                Add Room
              </button>

              <button
                type="button"
                onClick={() => {
                  if (hasUnsavedChanges()) {
                    setShowCancelModal(true);
                  } else {
                    onCancel();
                  }
                }}
                className=" bg-white
        border px-2
        md:px-4 py-1
        md:py-2.5
        rounded-xl
        hover:scale-105
        transition-all
      "
              >
                Cancel
              </button>

              {(order?._id || rooms.length > 0) && (
                <button
                  type="submit"
                  disabled={isSaving}
                  className="
      bg-black
      text-white
      md:px-5 px-2 py-1
      md:py-2.5
      rounded-xl
      flex
      items-center
      gap-2
      disabled:opacity-60
    "
                >
                  {isSaving && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}

                  {isSaving
                    ? order
                      ? "Updating Order..."
                      : "Creating Order..."
                    : order
                      ? "update main Order"
                      : "Save main Order"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {showRoomForm && (
        <>
          {!editingProduct && (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="">
                <FormField
                  name="roomType"
                  label=""
                  type="select"
                  placeholder="Enter Room Type"
                  control={control}
                  options={ROOM_OPTIONS.map((r) => ({
                    value: r,
                    label: r,
                  }))}
                  onChange={updateRoomType}
                />
              </div>

              <div className="">
                <FormField
                  name="roomName"
                  label=""
                  type="text"
                  control={control}
                  placeholder="Enter Room Name"
                  onChange={(e) => updateRoomName(e.target.value)}
                />
              </div>
            </div>
          )}
          {editingProduct && (
            <div className="flex items-center gap-2 bg-[#467B89]  text-white px-4 rounded-2xl shadow-sm w-1/4">
              <div className="px-4 py-3 flex gap-4">
                <span className="font-bold text-sm sm:text-base tracking-wide ">
                  {currentRoom.roomType || "Room"} -
                </span>

                {currentRoom.roomName && (
                  <span className="">
                    <span className="">{currentRoom.roomName}</span>
                  </span>
                )}
              </div>
            </div>
          )}
          {!editingRoom && (
            <ProductForm
              product={currentRoom.currentProduct}
              onUpdate={updateCurrentProduct}
              onResetForm={(resetFn) => {
                productFormResetRefs.current["currentRoom"] = resetFn;
              }}
              hideRemove
            />
          )}
          {!editingRoom && canShowSaveProduct && (
            <div className="mb-2 flex items-center justify-center">
              <button
                type="button"
                onClick={handleAddProduct}
                className="
      mt-1
      bg-black
      text-white
      px-5
      py-3
      rounded-xl
      flex
      items-center
      gap-2
      transition-all
      duration-200
      hover:scale-105
      cursor-pointer
    "
              >
                {editingProduct ? "Save Product" : "Save Product"}
              </button>
            </div>
          )}
          {editingRoom && (
            <div className="flex justify-center mt-5">
              <button
                type="button"
                onClick={handleSaveRoom}
                className="bg-black text-white px-5 py-3 rounded-xl hover:scale-105 transition"
              >
                Save Room
              </button>
            </div>
          )}
        </>
      )}
      {/* ======================================================
          ROOMS
      ====================================================== */}

      {rooms.length > 0 && (
        <div className="space-y-2   mt-1">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="border  rounded-xl p-1 bg-white shadow-sm"
            >
              {/* Room Header */}
              <div className="mb-1 flex justify-between items-center  border-b pb-1 pr-2 ">
                <div className="flex items-center gap-2 bg-[#467B89]  text-white px-4 py-2 rounded-2xl shadow-sm w-1/4">
                  {/* <span className="text-lg">🏠</span> */}
                  <span className="font-bold text-sm sm:text-base tracking-wide">
                    {room.roomType || "Room"} -
                  </span>

                  {room.roomName && (
                    <span className=" py-1     ">{room.roomName}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openRoomForEdit(room)}
                    className="w-9 h-9 flex items-center justify-center"
                  >
                    <i className="fas fa-edit text-green-600 hover:scale-125 transition-all" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteTempRoom(room.id)}
                    className="w-9 h-9 flex items-center justify-center"
                  >
                    <FiTrash2 className="text-red-600 hover:scale-125 transition-all" />
                  </button>
                </div>
              </div>

              {/* Products List */}
              <div className="space-y-3  ">
                {/* temparary products added in the room */}
                {room.products.map((product) => (
                  <div
                    key={product.id}
                    className="border   border-gray-200 rounded-2xl p-3 shadow-sm hover:shadow-md transition mb-4 "
                  >
                    {/* HEADER */}
                    <div className="flex justify-between items-center gap-2 mb-3 b">
                      <h3 className="text-lg lg:text-2xl font-bold text-gray-900">
                        {product.category
                          ? product.category.charAt(0).toUpperCase() +
                            product.category.slice(1)
                          : "Product"}
                      </h3>
                      {!editingRoom && (
                        <div className="flex gap-2 items-center">
                          <button
                            type="button"
                            onClick={() => handleEditProduct(room, product)}
                            className="w-10 h-10 flex items-center justify-center"
                          >
                            <i
                              className="fas fa-edit  transition-all
    duration-200
    hover:scale-125 text-green-600"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={handleDeleteTempProduct}
                            // onClick={() =>
                            //   removeProductFromRoom(room.id, product.id)
                            // }
                            className="w-10 h-10 flex items-center justify-center"
                          >
                            <FiTrash2 className="text-red-600 hover:scale-125 transition-all duration-200" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col  lg:flex-row gap-5 lg:gap-16">
                      {/* LEFT */}
                      <div className="w-full lg:w-[30%] space-y-3">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl">
                            <p className="text-[11px] text-gray-500  mb-1">
                              Company Name
                            </p>

                            <p className="text-xl font-semibold text-gray-800">
                              {product.companyName || "-"}
                            </p>
                          </div>

                          <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl">
                            <p className="text-[11px] text-gray-500  mb-1">
                              Collection Name
                            </p>

                            <p className="text-xl font-semibold text-gray-800">
                              {product.collectionName || "-"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl">
                          <p className="text-[11px] text-gray-500  mb-1">
                            Serial Number
                          </p>

                          <p className="text-xl font-semibold text-gray-800">
                            {product.productCode || "-"}
                          </p>
                        </div>

                        {/* Attachments */}
                        <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl">
                          <p className="text-[11px] text-gray-500  mb-2">
                            Attachments ({product.attachments?.length || 0})
                          </p>

                          {product.attachments?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {product.attachments.map((file, index) => (
                                <img
                                  key={index}
                                  src={
                                    file.url ||
                                    file.preview ||
                                    (file instanceof File
                                      ? URL.createObjectURL(file)
                                      : "")
                                  }
                                  alt=""
                                  onClick={() => setPreviewAttachment(file)}
                                  className="
      w-12 h-12
      object-cover
      rounded-lg
      border
      cursor-pointer
      hover:scale-110
      transition
    "
                                />
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400">
                              No attachments
                            </p>
                          )}
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="w-full lg:w-[70%]">
                        {/* Curtain */}
                        {Array.isArray(product?.attributes?.measurements) &&
                          product.category?.toLowerCase() === "curtains" && (
                            <div className="grid lg:grid-cols-3 gap-4">
                              {product.attributes.measurements.map((m, i) => (
                                <div key={i}>
                                  {m.windowName && (
                                    <div className="flex justify-center mb-2">
                                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                                        {m.windowName}
                                      </span>
                                    </div>
                                  )}

                                  <div className="flex justify-center">
                                    <div className="relative w-[360px] h-[150px]">
                                      <div className="absolute top-10 left-16 w-46 border-t-2 border-gray-500"></div>

                                      <div className="absolute top-10 left-16 h-24 border-l-2 border-gray-500"></div>

                                      <div className="absolute top-0 left-29 w-24 border rounded-md px-2 py-1 text-center text-[18px] bg-white font-bold">
                                        {m.width}
                                      </div>

                                      <div className="absolute top-18 -left-10 text-[18px] w-24 border rounded-md px-2 py-1 text-center bg-white font-bold">
                                        {m.height}
                                      </div>

                                      <div className="absolute top-12 left-18 w-44 h-21 bg-white border rounded-xl p-2 ">
                                        <p className="text-md">
                                          {m.details || "-"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        <div className="w-full lg:w-[70%]">
                          {/* Sofa */}
                          {product.category?.toLowerCase() ===
                            "sofa-&seating" && (
                            <SofaDiagramRenderer product={product} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* ======================================================
          ACTIONS
      ====================================================== */}
      {/* Bottom Actions - Edit Mode Only */}
      {isEditMode && showRoomForm && (
        <div className="flex justify-center gap-3 mt-6 border-t pt-4">
          <button
            type="button"
            onClick={() => {
              if (hasUnsavedChanges()) {
                setShowCancelModal(true);
              } else {
                onCancel();
              }
            }}
            className="
        bg-white
        border
        px-4
        py-2.5
        rounded-xl
        hover:scale-105
        transition-all
      "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="
        bg-black
        text-white
        px-5
        py-2.5
        rounded-xl
        flex
        items-center
        gap-2
        disabled:opacity-60
      "
          >
            {isSaving && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {isSaving ? "Updating Order..." : "Save Order"}
          </button>
        </div>
      )}

      {/* ======================================================
          CANCEL MODAL
      ====================================================== */}
      <ImagePreviewModal
        isOpen={!!previewAttachment}
        image={
          previewAttachment?.url ||
          previewAttachment?.preview ||
          (previewAttachment instanceof File
            ? URL.createObjectURL(previewAttachment)
            : "")
        }
        onClose={() => setPreviewAttachment(null)}
      />
      <ConfirmModal
        isOpen={showCancelModal}
        title="Cancel Order"
        message="All unsaved changes will be lost."
        onCancel={() => setShowCancelModal(false)}
        onConfirm={() => {
          setShowCancelModal(false);

          onCancel();
        }}
      />
      <ConfirmModal
        isOpen={showProductSwitchModal}
        title="Discard Product Changes?"
        message="You have unsaved product information. If you continue, the entered data will be lost."
        onCancel={() => {
          setShowProductSwitchModal(false);
          setPendingEditProduct(null);
        }}
        onConfirm={() => {
          setShowProductSwitchModal(false);

          if (pendingEditProduct) {
            openProductForEdit(
              pendingEditProduct.room,
              pendingEditProduct.product,
            );

            setPendingEditProduct(null);
          }
        }}
      />
      <ConfirmModal
        isOpen={showDeleteRoomModal}
        title="Delete Room"
        message="Are you sure you want to delete this room? All products inside this room will also be removed."
        onCancel={() => {
          setShowDeleteRoomModal(false);
          setRoomToDelete(null);
        }}
        onConfirm={removeRoom}
      />
      <ConfirmModal
        isOpen={showDeleteProductModal}
        title="Delete Product"
        message="Are you sure you want to delete this product draft?"
        onCancel={() => setShowDeleteProductModal(false)}
        onConfirm={() => {
          setShowDeleteProductModal(false);

          productFormResetRefs.current["currentRoom"]?.();

          setCurrentRoom((prev) => ({
            ...prev,
            currentProduct: {},
          }));

          setEditingProduct(null);

          toast.success("Product draft deleted");
        }}
      />
      {isSaving && (
        <div className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />

            <div className="text-center">
              <h3 className="font-semibold text-lg">
                {order ? "Updating Order" : "Creating Order"}
              </h3>

              <p className="text-sm text-gray-500">
                Uploading attachments and saving data...
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  );

  // ======================================================
  // MODAL / PAGE
  // ======================================================

  return isModal ? (
    <div className="mt-20 rounded-2xl md:border p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-2xl font-bold">{title}</h3>

        <button
          onClick={() => {
            if (hasUnsavedChanges()) {
              setShowCancelModal(true);
            } else {
              onCancel();
            }
          }}
        >
          <FiX size={22} />
        </button>
      </div>

      {content}
    </div>
  ) : isEditMode ? (
    // UPDATE UI
    <div className=" py-0 rounded-2xl relative">
      {/* <button
        type="button"
        onClick={() => {
          if (hasUnsavedChanges()) {
            setShowCancelModal(true);
          } else {
            onCancel();
          }
        }}
        className="
      absolute
      -top-2
      -right-4
      z-50
      w-10
      h-10
      flex
      items-center
      justify-center
     
     
      transition
    "
      >
        <FiX size={22} />
      </button> */}

      {content}
    </div>
  ) : (
    <div className="  px-6  py-0 rounded-2xl md:border ">
      <div className="flex justify-center items-center  rounded-xl ">
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
      </div>

      {content}
    </div>
  );
};

export default AddOrder;

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { FiTrash2, FiPlus, FiUpload, FiX } from "react-icons/fi";
// import { toast } from "react-toastify";
// import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
// import ProductForm from "./ProductForm";
// import FormField from "./common/FormField";
// import ConfirmModal from "./common/ConfirmModal";
// import ImagePreviewModal from "./common/ImagePreviewModal";
// import { emptyProduct, cleanProductData } from "./orderUtils";

// import { generateWorklog, generateCreateWorklog } from "../../utils/worklog";

// import { useCurrentUser } from "../auth/services";

// // ======================================================
// // EMPTY ROOM
// // ======================================================

// const emptyRoom = () => ({
//   id: Date.now(),
//   roomType: "", // SELECT ROOM
//   roomName: "", // CUSTOM ROOM NAME
//   attachments: [],
//   products: [],
//   currentProduct: emptyProduct(),
//   editingProductId: null, // NEW
// });
// const ROOM_OPTIONS = [
//   // Living Areas
//   "Hall",
//   "Master Bedroom",
//   "Bedroom",
//   "Living Room",
//   "Drawing Room",
//   "Family Room",
//   "Lounge",
//   "Sitting Room",
//   "Great Room",
//   "TV Room",
//   "Entertainment Room",

//   // Bedrooms

//   "Guest Bedroom",
//   "Kids Bedroom",
//   "Children's Room",
//   "Baby Room",
//   "Teen Room",
//   "Dressing Room",
//   "Walk-in Closet",

//   // Dining
//   "Dining Room",
//   "Breakfast Area",

//   // Kitchen
//   "Kitchen",
//   "Modular Kitchen",
//   "Pantry",
//   "Dry Kitchen",
//   "Wet Kitchen",

//   // Bathroom
//   "Bathroom",
//   "Master Bathroom",
//   "Guest Bathroom",
//   "Powder Room",
//   "Washroom",

//   // Study / Work
//   "Study Room",
//   "Home Office",
//   "Office Cabin",
//   "Workspace",
//   "Library",

//   // Utility
//   "Laundry Room",
//   "Utility Room",
//   "Storage Room",
//   "Store Room",
//   "Servant Room",

//   // Luxury / Special
//   "Home Theatre",
//   "Gym Room",
//   "Meditation Room",
//   "Prayer Room",
//   "Pooja Room",
//   "Gaming Room",
//   "Bar Area",
//   "Wine Cellar",

//   // Outdoor
//   "Balcony",
//   "Terrace",
//   "Patio",
//   "Garden Area",
//   "Outdoor Seating",

//   // Commercial
//   "Reception Area",
//   "Conference Room",
//   "Meeting Room",
//   "Cabin",
//   "Waiting Area",
//   "Showroom",
//   "Retail Space",

//   // Misc
//   "Lobby",
//   "Passage",
//   "Corridor",
//   "Stair Area",
//   "Entry Foyer",
// ];
// // ======================================================
// // COMPONENT
// // ======================================================

// const AddOrder = ({
//   order,
//   customers = [],
//   selectedCustomerId,
//   onSave,
//   onCancel,
//   isModal = false,
//   title = "Add Order",
//   editingRoomState,
//   editingProductState,
//   onDirtyChange,
//   tempRooms = [],
//   onTempRoomAdd,
//   onRoomsChange,
// }) => {
//   // ======================================================
//   // FORM
//   // ======================================================

//   const { handleSubmit, control, getValues, setValue, resetField } = useForm({
//     defaultValues: order || {
//       orderNo: "",
//       orderDate: new Date().toISOString().slice(0, 10),

//       deliveryDate: new Date(Date.now() + 7 * 86400000)
//         .toISOString()
//         .slice(0, 10),

//       customerId: order?.customer || selectedCustomerId || "",

//       orderStatus: "Open",

//       paymentStatus: "Pending",

//       // totalAmount: 0,

//       receivedAmount: 0,

//       dueAmount: 0,

//       notes: "",
//     },
//   });

//   useEffect(() => {
//     setValue("customerId", selectedCustomerId || order?.customer || "");
//   }, [selectedCustomerId, order]);

//   // ======================================================
//   // STATE
//   // ======================================================

//   const productFormResetRefs = useRef({});
//   // TEMP PRODUCT STATE ROOM-WISE

//   const [showCancelModal, setShowCancelModal] = useState(false);

//   // Replace the rooms state initialization
//   const [rooms, setRooms] = useState(() => {
//     if (order?._id && tempRooms.length > 0) {
//       return tempRooms;
//     }
//     return [];
//   });
//   const [currentRoom, setCurrentRoom] = useState(emptyRoom());
//   const canShowSaveProduct =
//     currentRoom?.currentProduct?.category &&
//     currentRoom?.currentProduct?.category.trim() !== "";
//   const initialDataRef = useRef(null);
//   const [showRoomForm, setShowRoomForm] = useState(false);
//   const { data: currentUser } = useCurrentUser();
//   const [isSaving, setIsSaving] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [previewAttachment, setPreviewAttachment] = useState(null);
//   const isEditMode = !!order?._id;
//   const [roomMode, setRoomMode] = useState(null);
//   const [pendingEditProduct, setPendingEditProduct] = useState(null);
//   const [showProductSwitchModal, setShowProductSwitchModal] = useState(false);
//   const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
//   // null | "add" | "edit"
//   // ======================================================
//   // INITIAL SNAPSHOT
//   // ======================================================
//   // Add this useEffect in AddOrder
//   useEffect(() => {
//     if (order?._id && onTempRoomAdd && rooms.length > 0) {
//       onTempRoomAdd(rooms);
//     }
//   }, [rooms, order?._id]);
//   useEffect(() => {
//     initialDataRef.current = JSON.stringify({
//       form: getValues(),
//       rooms,
//     });
//   }, []);

//   useEffect(() => {
//     const draft = {
//       form: getValues(),
//       rooms,
//     };

//     localStorage.setItem("order_draft", JSON.stringify(draft));
//   }, [rooms]);
//   useEffect(() => {
//     if (order?._id && onRoomsChange) {
//       onRoomsChange(rooms);
//     }
//   }, [rooms]);
//   useEffect(() => {
//     const saved = localStorage.getItem("order_draft");

//     if (saved) {
//       const parsed = JSON.parse(saved);
//       setRooms(parsed.rooms || []);

//       Object.keys(parsed.form || {}).forEach((key) => {
//         setValue(key, parsed.form[key]);
//       });
//     }
//   }, []);
//   const hasUnsavedProductData = () => {
//     const p = currentRoom?.currentProduct || {};

//     return !!(
//       p.category ||
//       p.companyName?.trim() ||
//       p.collectionName?.trim() ||
//       p.productCode?.trim() ||
//       p.specialNotes?.trim() ||
//       p.attachments?.length > 0
//     );
//   };
//   const openProductForEdit = (room, product) => {
//     setShowRoomForm(true);

//     setCurrentRoom((prev) => ({
//       ...prev,
//       roomType: room.roomType,
//       roomName: room.roomName,
//       currentProduct: {
//         ...product,
//       },
//     }));

//     setEditingProduct({
//       roomId: room.id,
//       productId: product.id,
//     });
//   };
//   const handleEditProduct = (room, product) => {
//     if (!editingProduct && hasUnsavedProductData()) {
//       setPendingEditProduct({ room, product });
//       setShowProductSwitchModal(true);
//       return;
//     }

//     openProductForEdit(room, product);
//   };
//   const handleDeleteTempProduct = () => {
//     setShowDeleteProductModal(true);
//   };
//   // const handleEditProduct = (room, product) => {
//   //   setShowRoomForm(true);

//   //   setCurrentRoom((prev) => ({
//   //     ...prev,
//   //     roomType: room.roomType,
//   //     roomName: room.roomName,
//   //     currentProduct: {
//   //       ...product,
//   //     },
//   //   }));

//   //   setEditingProduct({
//   //     roomId: room.id,
//   //     productId: product.id,
//   //   });
//   // };
//   // ======================================================
//   // UNSAVED CHANGES
//   // ======================================================
//   const removeProductFromRoom = (roomId, productId) => {
//     setRooms(
//       (prev) =>
//         prev
//           .map((room) => ({
//             ...room,
//             products: room.products.filter((p) => p.id !== productId),
//           }))
//           .filter((room) => room.products.length > 0), // optional: remove room if empty
//     );
//     toast.dismiss();
//     toast.success("Product removed");
//   };
//   const hasUnsavedChanges = () => {
//     const currentData = JSON.stringify({
//       form: getValues(),
//       rooms,
//     });

//     return currentData !== initialDataRef.current;
//   };

//   // ======================================================
//   // ROOM FUNCTIONS
//   // ======================================================

//   const addRoom = () => {
//     if (!currentRoom.roomType) {
//       toast.warning("Please select room type");
//       return;
//     }

//     // if (!currentRoom.roomName?.trim()) {
//     //   toast.warning("Please enter room name");
//     //   return;
//     // }

//     if (!currentRoom.products.length) {
//       toast.dismiss();
//       toast.warning("Please add at least one product");
//       return;
//     }

//     setRooms((prev) => [
//       ...prev,
//       {
//         ...currentRoom,
//         id: Date.now(),
//       },
//     ]);

//     // reset room form
//     setCurrentRoom(emptyRoom());
//     setShowRoomForm(false);

//     // Clear React Hook Form fields
//     resetField("roomType");
//     resetField("roomName");
//     toast.dismiss();
//     toast.success("Room Added");
//   };

//   const updateRoomType = (value) => {
//     setCurrentRoom((prev) => ({
//       ...prev,
//       roomType: value,
//     }));
//   };
//   const updateRoomName = (value) => {
//     setCurrentRoom((prev) => ({
//       ...prev,
//       roomName: value,
//     }));
//   };

//   // ======================================================
//   // ROOM ATTACHMENTS
//   // ======================================================

//   // ======================================================
//   // PRODUCT UPDATE
//   // ======================================================

//   const updateCurrentProduct = useCallback((updatedProduct) => {
//     setCurrentRoom((prev) => {
//       const oldValue = JSON.stringify(prev.currentProduct);
//       const newValue = JSON.stringify(updatedProduct);

//       if (oldValue === newValue) {
//         return prev;
//       }

//       return {
//         ...prev,
//         currentProduct: updatedProduct,
//       };
//     });
//   }, []);
//   // ======================================================
//   // ADD PRODUCT TO ROOM
//   // ======================================================

//   const handleAddProduct = () => {
//     if (!currentRoom.roomType) {
//       toast.dismiss();
//       toast.warning("Please select room type");
//       return;
//     }

//     if (!currentRoom.roomName?.trim()) {
//       toast.dismiss();
//       toast.warning("Please enter room name");
//       return;
//     }

//     if (!currentRoom.currentProduct?.category) {
//       toast.dismiss();
//       toast.warning("Please select product category");
//       return;
//     }
//     // Required product fields
//     if (!currentRoom.currentProduct?.companyName?.trim()) {
//       toast.dismiss();
//       toast.warning("Company Name is required");
//       return;
//     }

//     if (!currentRoom.currentProduct?.collectionName?.trim()) {
//       toast.dismiss();
//       toast.warning("Collection Name is required");
//       return;
//     }

//     if (!currentRoom.currentProduct?.productCode?.trim()) {
//       toast.dismiss();
//       toast.warning("Serial No. is required");
//       return;
//     }

//     const cleanedProduct = cleanProductData(currentRoom.currentProduct);

//     if (editingProduct) {
//       // UPDATE EXISTING PRODUCT

//       setRooms((prevRooms) =>
//         prevRooms.map((room) => {
//           if (room.id !== editingProduct.roomId) return room;

//           return {
//             ...room,
//             products: room.products.map((p) =>
//               p.id === editingProduct.productId
//                 ? {
//                     ...cleanedProduct,
//                     id: editingProduct.productId,
//                   }
//                 : p,
//             ),
//           };
//         }),
//       );

//       setEditingProduct(null);
//       toast.dismiss();
//       toast.success("Product Added");

//       productFormResetRefs.current["currentRoom"]?.();

//       setCurrentRoom((prev) => ({
//         ...prev,
//         currentProduct: {},
//       }));
//     } else {
//       // ADD NEW PRODUCT

//       const productToAdd = {
//         ...cleanedProduct,
//         id: Date.now(),
//       };

//       setRooms((prevRooms) => {
//         const existingRoomIndex = prevRooms.findIndex(
//           (r) =>
//             r.roomType === currentRoom.roomType &&
//             r.roomName === currentRoom.roomName,
//         );

//         if (existingRoomIndex !== -1) {
//           const updatedRooms = [...prevRooms];

//           updatedRooms[existingRoomIndex] = {
//             ...updatedRooms[existingRoomIndex],
//             products: [
//               ...updatedRooms[existingRoomIndex].products,
//               productToAdd,
//             ],
//           };

//           return updatedRooms;
//         }

//         return [
//           ...prevRooms,
//           {
//             id: Date.now(),
//             roomType: currentRoom.roomType,
//             roomName: currentRoom.roomName,
//             products: [productToAdd],
//           },
//         ];
//       });
//       toast.dismiss();
//       toast.success("Product Added");

//       productFormResetRefs.current["currentRoom"]?.();

//       setCurrentRoom((prev) => ({
//         ...prev,
//         currentProduct: {},
//       }));
//     }
//   };
//   // ======================================================
//   // REMOVE PRODUCT
//   // ======================================================

//   // ======================================================
//   // SUBMIT
//   // ======================================================

//   const onSubmit = async (data) => {
//     try {
//       if (!data?.customerId) {
//         toast.dismiss();
//         toast.error("Please select customer");
//         // console.log(12222222, selectedCustomerId);
//         // console.log(1111111111111, data);

//         return;
//       }
//       if (!order?._id && rooms.length === 0) {
//         toast.dismiss();
//         toast.error("Please add at least one room");
//         return;
//       }
//       const selectedCustomer = customers.find((c) => c._id === data.customerId);

//       const loggedInUser = {
//         name: currentUser?.user?.name || "Unknown User",

//         empId: currentUser?.user?.id || "",
//       };

//       const orderPayloadForLog = {
//         ...data,
//         rooms,
//       };

//       let WorkLog = "";

//       if (order?._id) {
//         WorkLog = generateWorklog(
//           order,
//           orderPayloadForLog,
//           loggedInUser.name,
//           loggedInUser.empId,
//         );
//       } else {
//         WorkLog = generateCreateWorklog(
//           orderPayloadForLog,
//           loggedInUser.name,
//           loggedInUser.empId,
//         );
//       }

//       // ======================================================
//       // FINAL PAYLOAD
//       // ======================================================

//       const finalOrder = {
//         _id: order?._id,

//         customer: selectedCustomer?._id,

//         orderDate: data.orderDate,

//         deliveryDate: data.deliveryDate,

//         orderStatus: data.orderStatus,

//         paymentStatus: data.paymentStatus,

//         receivedAmount: Number(data.receivedAmount || 0),

//         dueAmount: Number(data.dueAmount || 0),

//         // totalAmount: Number(data.totalAmount || 0),

//         notes: data.notes || "",

//         rooms: rooms.map((room) => ({
//           roomType: room.roomType,
//           roomName: room.roomName,

//           products: room.products.map((p) => ({
//             ...p,

//             quantity: Number(p.quantity || 1),
//           })),
//         })),

//         WorkLog,
//       };
//       try {
//         setIsSaving(true);

//         await onSave(finalOrder);

//         // toast.success(
//         //   order ? "Order updated successfully" : "Order created successfully",
//         // );
//       } catch (error) {
//         toast.dismiss();
//         toast.error(error.response?.data?.message || "Failed to save order");
//       } finally {
//         setIsSaving(false);
//       }

//       toast.success(
//         order ? "Order updated successfully" : "Order created successfully",
//       );
//     } catch (error) {
//       toast.dismiss();
//       toast.error(error.response?.data?.message || "Failed to save order");
//     }
//   };

//   // ======================================================
//   // CONTENT
//   // ======================================================

//   const content = (
//     // <form onSubmit={handleSubmit(handleGlobalSave)}>
//     <form onSubmit={handleSubmit(onSubmit)} className="">
//       {/* ======================================================
//           ORDER DETAILS
//       ====================================================== */}
//       {!editingRoomState && !editingProductState && (
//         <div className="  rounded-xl px-2">
//           {/* <h2 className="text-xl font-semibold mb-1">Order Details</h2> */}

//           <div className="flex flex-col lg:flex-row lg:items-end gap-1 md:gap-4">
//             {/* Order Fields */}
//             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-4">
//               {order?._id && (
//                 <FormField
//                   name="orderNo"
//                   control={control}
//                   label="Order No"
//                   readOnly
//                 />
//               )}

//               <FormField
//                 name="orderDate"
//                 control={control}
//                 label="Order Date"
//                 type="date"
//               />

//               <FormField
//                 name="deliveryDate"
//                 control={control}
//                 label="Delivery Date"
//                 type="date"
//               />

//               <FormField
//                 name="orderStatus"
//                 control={control}
//                 label="Order Status"
//                 type="select"
//                 options={
//                   isEditMode
//                     ? [
//                         "Open",
//                         "Pending",
//                         "Processing",
//                         "Completed",
//                         "Cancelled",
//                       ]
//                     : ["Open"] // or just omit select entirely
//                 }
//                 disabled={!isEditMode} // optional safety
//               />
//             </div>

//             {/* Actions */}
//             <div className="flex items-center  gap-3 pb-1">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setCurrentRoom(emptyRoom());
//                   setEditingProduct(null);
//                   productFormResetRefs.current["currentRoom"]?.();
//                   resetField("roomType");
//                   resetField("roomName");
//                   setShowRoomForm(true);
//                   setRoomMode("add");
//                 }}
//                 className="
//         bg-black
//         text-white
//         px-4 py-1
//         md:py-2.5
//         rounded-xl
//         flex lg:text-[18px]
//         items-center
//         gap-2
//         hover:scale-105
//         transition-all
//       "
//               >
//                 {/* <FiPlus /> */}
//                 Add Room
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   if (hasUnsavedChanges()) {
//                     setShowCancelModal(true);
//                   } else {
//                     onCancel();
//                   }
//                 }}
//                 className=" bg-white
//         border px-2
//         md:px-4 py-1
//         md:py-2.5
//         rounded-xl
//         hover:scale-105
//         transition-all
//       "
//               >
//                 Cancel
//               </button>

//               {(order?._id || rooms.length > 0) && (
//                 <button
//                   type="submit"
//                   disabled={isSaving}
//                   className="
//       bg-black
//       text-white
//       md:px-5 px-2 py-1
//       md:py-2.5
//       rounded-xl
//       flex
//       items-center
//       gap-2
//       disabled:opacity-60
//     "
//                 >
//                   {isSaving && (
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   )}

//                   {isSaving
//                     ? order
//                       ? "Updating Order..."
//                       : "Creating Order..."
//                     : order
//                       ? "update main Order"
//                       : "Save main Order"}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//       {showRoomForm && (
//         <>
//           {!editingProduct && (
//             <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div className="">
//                 <FormField
//                   name="roomType"
//                   label=""
//                   type="select"
//                   placeholder="Enter Room Type"
//                   control={control}
//                   options={ROOM_OPTIONS.map((r) => ({
//                     value: r,
//                     label: r,
//                   }))}
//                   onChange={updateRoomType}
//                 />
//               </div>

//               <div className="">
//                 <FormField
//                   name="roomName"
//                   label=""
//                   type="text"
//                   control={control}
//                   placeholder="Enter Room Name"
//                   onChange={(e) => updateRoomName(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}
//           {editingProduct && (
//             <div className="mb-5 rounded-xl border border-gray-200 bg-white shadow-sm">
//               <div className="px-4 py-3 flex gap-4">
//                 <p className="text-lg font-semibold text-gray-900">
//                   {currentRoom.roomType} -
//                 </p>

//                 {currentRoom.roomName && (
//                   <p className="mt-1 text-sm text-gray-500">
//                     Room Name:{" "}
//                     <span className="font-medium">{currentRoom.roomName}</span>
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//           <ProductForm
//             product={currentRoom.currentProduct}
//             onUpdate={updateCurrentProduct}
//             onResetForm={(resetFn) => {
//               productFormResetRefs.current["currentRoom"] = resetFn;
//             }}
//             hideRemove
//           />
//           {canShowSaveProduct && (
//             <div className="mb-2 flex items-center justify-center">
//               <button
//                 type="button"
//                 onClick={handleAddProduct}
//                 className="
//       mt-0
//       bg-black
//       text-white
//       px-5
//       py-3
//       rounded-xl
//       flex
//       items-center
//       gap-2
//       transition-all
//       duration-200
//       hover:scale-105
//       cursor-pointer
//     "
//               >
//                 {editingProduct ? "Save Product" : "Save Product"}
//               </button>
//             </div>
//           )}
//         </>
//       )}
//       {/* ======================================================
//           ROOMS
//       ====================================================== */}

//       {rooms.length > 0 && (
//         <div className="space-y-2  mt-1">
//           {rooms.map((room) => (
//             <div
//               key={room.id}
//               className="border  rounded-xl p-1 bg-white shadow-sm"
//             >
//               {/* Room Header */}
//               <div className="mb-1 flex justify-between items-center  border-b pb-1 pr-2 ">
//                 <div className="flex items-center gap-2 bg-[#467B89]  text-white px-4 py-2 rounded-2xl shadow-sm w-1/4">
//                   {/* <span className="text-lg">🏠</span> */}
//                   <span className="font-bold text-sm sm:text-base tracking-wide">
//                     {room.roomType || "Room"} -
//                   </span>

//                   {room.roomName && (
//                     <span className=" py-1     ">{room.roomName}</span>
//                   )}
//                 </div>
//                 {/* <button
//                   type="button"
//                   onClick={() => openRoomForEdit(room)}
//                   className="text-green-600 hover:scale-110 transition"
//                 >
//                   <i className="fas fa-edit" />
//                 </button> */}
//               </div>

//               {/* Products List */}
//               <div className="space-y-3  ">
//                 {room.products.map((product) => (
//                   <div
//                     key={product.id}
//                     className="border  border-gray-200 rounded-2xl p-3 shadow-sm hover:shadow-md transition mb-4 "
//                   >
//                     {/* HEADER */}
//                     <div className="flex justify-between items-center gap-2 mb-3 b">
//                       <h3 className="text-lg lg:text-2xl font-bold text-gray-900">
//                         {product.category
//                           ? product.category.charAt(0).toUpperCase() +
//                             product.category.slice(1)
//                           : "Product"}
//                       </h3>

//                       <div className="flex gap-2 items-center">
//                         <button
//                           type="button"
//                           onClick={() => handleEditProduct(room, product)}
//                           className="w-10 h-10 flex items-center justify-center"
//                         >
//                           <i
//                             className="fas fa-edit  transition-all
//     duration-200
//     hover:scale-125 text-green-600"
//                           />
//                         </button>

//                         <button
//                           type="button"
//                           onClick={handleDeleteTempProduct}
//                           // onClick={() =>
//                           //   removeProductFromRoom(room.id, product.id)
//                           // }
//                           className="w-10 h-10 flex items-center justify-center"
//                         >
//                           <FiTrash2 className="text-red-600 hover:scale-125 transition-all duration-200" />
//                         </button>
//                       </div>
//                     </div>

//                     {/* CONTENT */}
//                     <div className="flex flex-col  lg:flex-row gap-5 lg:gap-16">
//                       {/* LEFT */}
//                       <div className="w-full lg:w-[30%] space-y-3">
//                         <div className="grid md:grid-cols-2 gap-2">
//                           <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl">
//                             <p className="text-[11px] text-gray-500  mb-1">
//                               Company Name
//                             </p>

//                             <p className="text-xl font-semibold text-gray-800">
//                               {product.companyName || "-"}
//                             </p>
//                           </div>

//                           <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl">
//                             <p className="text-[11px] text-gray-500  mb-1">
//                               Collection Name
//                             </p>

//                             <p className="text-xl font-semibold text-gray-800">
//                               {product.collectionName || "-"}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl">
//                           <p className="text-[11px] text-gray-500  mb-1">
//                             Serial Number
//                           </p>

//                           <p className="text-xl font-semibold text-gray-800">
//                             {product.productCode || "-"}
//                           </p>
//                         </div>

//                         {/* Attachments */}
//                         <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl">
//                           <p className="text-[11px] text-gray-500  mb-2">
//                             Attachments ({product.attachments?.length || 0})
//                           </p>

//                           {product.attachments?.length > 0 ? (
//                             <div className="flex flex-wrap gap-2">
//                               {product.attachments.map((file, index) => (
//                                 <img
//                                   key={index}
//                                   src={
//                                     file.url ||
//                                     file.preview ||
//                                     (file instanceof File
//                                       ? URL.createObjectURL(file)
//                                       : "")
//                                   }
//                                   alt=""
//                                   onClick={() => setPreviewAttachment(file)}
//                                   className="
//       w-12 h-12
//       object-cover
//       rounded-lg
//       border
//       cursor-pointer
//       hover:scale-110
//       transition
//     "
//                                 />
//                               ))}
//                             </div>
//                           ) : (
//                             <p className="text-sm text-gray-400">
//                               No attachments
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       {/* RIGHT */}
//                       <div className="w-full lg:w-[70%]">
//                         {Array.isArray(product?.attributes?.measurements) &&
//                           product.category?.toLowerCase() === "curtains" && (
//                             <div className="grid lg:grid-cols-3 gap-4">
//                               {product.attributes.measurements.map((m, i) => (
//                                 <div key={i}>
//                                   {m.windowName && (
//                                     <div className="flex justify-center mb-2">
//                                       <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
//                                         {m.windowName}
//                                       </span>
//                                     </div>
//                                   )}

//                                   <div className="flex justify-center">
//                                     <div className="relative w-[360px] h-[150px]">
//                                       <div className="absolute top-10 left-16 w-46 border-t-2 border-gray-500"></div>

//                                       <div className="absolute top-10 left-16 h-24 border-l-2 border-gray-500"></div>

//                                       <div className="absolute top-0 left-29 w-24 border rounded-md px-2 py-1 text-center text-[18px] bg-white font-bold">
//                                         {m.width}
//                                       </div>

//                                       <div className="absolute top-18 -left-10 text-[18px] w-24 border rounded-md px-2 py-1 text-center bg-white font-bold">
//                                         {m.height}
//                                       </div>

//                                       <div className="absolute top-12 left-18 w-44 h-21 bg-white border rounded-xl p-2 ">
//                                         <p className="text-md">
//                                           {m.details || "-"}
//                                         </p>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {/* ======================================================
//           ACTIONS
//       ====================================================== */}
//       {/* Bottom Actions - Edit Mode Only */}
//       {isEditMode && showRoomForm && (
//         <div className="flex justify-center gap-3 mt-6 border-t pt-4">
//           <button
//             type="button"
//             onClick={() => {
//               if (hasUnsavedChanges()) {
//                 setShowCancelModal(true);
//               } else {
//                 onCancel();
//               }
//             }}
//             className="
//         bg-white
//         border
//         px-4
//         py-2.5
//         rounded-xl
//         hover:scale-105
//         transition-all
//       "
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={isSaving}
//             className="
//         bg-black
//         text-white
//         px-5
//         py-2.5
//         rounded-xl
//         flex
//         items-center
//         gap-2
//         disabled:opacity-60
//       "
//           >
//             {isSaving && (
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             )}

//             {isSaving ? "Updating Order..." : "Save Order"}
//           </button>
//         </div>
//       )}

//       {/* ======================================================
//           CANCEL MODAL
//       ====================================================== */}
//       <ImagePreviewModal
//         isOpen={!!previewAttachment}
//         image={
//           previewAttachment?.url ||
//           previewAttachment?.preview ||
//           (previewAttachment instanceof File
//             ? URL.createObjectURL(previewAttachment)
//             : "")
//         }
//         onClose={() => setPreviewAttachment(null)}
//       />
//       <ConfirmModal
//         isOpen={showCancelModal}
//         title="Cancel Order"
//         message="All unsaved changes will be lost."
//         onCancel={() => setShowCancelModal(false)}
//         onConfirm={() => {
//           setShowCancelModal(false);

//           onCancel();
//         }}
//       />
//       <ConfirmModal
//         isOpen={showProductSwitchModal}
//         title="Discard Product Changes?"
//         message="You have unsaved product information. If you continue, the entered data will be lost."
//         onCancel={() => {
//           setShowProductSwitchModal(false);
//           setPendingEditProduct(null);
//         }}
//         onConfirm={() => {
//           setShowProductSwitchModal(false);

//           if (pendingEditProduct) {
//             openProductForEdit(
//               pendingEditProduct.room,
//               pendingEditProduct.product,
//             );

//             setPendingEditProduct(null);
//           }
//         }}
//       />
//       <ConfirmModal
//         isOpen={showDeleteProductModal}
//         title="Delete Product"
//         message="Are you sure you want to delete this product draft?"
//         onCancel={() => setShowDeleteProductModal(false)}
//         onConfirm={() => {
//           setShowDeleteProductModal(false);

//           productFormResetRefs.current["currentRoom"]?.();

//           setCurrentRoom((prev) => ({
//             ...prev,
//             currentProduct: {},
//           }));

//           setEditingProduct(null);

//           toast.success("Product draft deleted");
//         }}
//       />
//       {isSaving && (
//         <div className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
//           <div className="bg-white rounded-2xl px-8 py-6 shadow-xl flex flex-col items-center gap-4">
//             <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />

//             <div className="text-center">
//               <h3 className="font-semibold text-lg">
//                 {order ? "Updating Order" : "Creating Order"}
//               </h3>

//               <p className="text-sm text-gray-500">
//                 Uploading attachments and saving data...
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </form>
//   );

//   // ======================================================
//   // MODAL / PAGE
//   // ======================================================

//   return isModal ? (
//     <div className="mt-20 rounded-2xl md:border p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-1">
//         <h3 className="text-2xl font-bold">{title}</h3>

//         <button
//           onClick={() => {
//             if (hasUnsavedChanges()) {
//               setShowCancelModal(true);
//             } else {
//               onCancel();
//             }
//           }}
//         >
//           <FiX size={22} />
//         </button>
//       </div>

//       {content}
//     </div>
//   ) : isEditMode ? (
//     // UPDATE UI
//     <div className=" py-0 rounded-2xl relative">
//       {/* <button
//         type="button"
//         onClick={() => {
//           if (hasUnsavedChanges()) {
//             setShowCancelModal(true);
//           } else {
//             onCancel();
//           }
//         }}
//         className="
//       absolute
//       -top-2
//       -right-4
//       z-50
//       w-10
//       h-10
//       flex
//       items-center
//       justify-center

//       transition
//     "
//       >
//         <FiX size={22} />
//       </button> */}

//       {content}
//     </div>
//   ) : (
//     <div className="  px-6  py-0 rounded-2xl md:border ">
//       <div className="flex justify-center items-center  rounded-xl ">
//         <h3 className="text-2xl font-bold mb-1">{title}</h3>
//       </div>

//       {content}
//     </div>
//   );
// };

// export default AddOrder;
