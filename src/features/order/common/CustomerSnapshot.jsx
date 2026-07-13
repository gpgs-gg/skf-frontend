import React, { useState, useEffect, useMemo, useRef } from "react";
import { FiArrowLeft, FiSearch, FiX } from "react-icons/fi";
import AddOrder from "../OrderForm";
import AddCustomer from "../CustomerForm";
import ProductForm from "../ProductForm";
import RoomForm from "./RoomForm.jsx";
import { toast } from "react-toastify";
import { FiEye } from "react-icons/fi";
import ConfirmModal from "./ConfirmModal";
import { getStatusStyle } from "@/constants/Config";
import Select from "react-select";
import { SelectStylesfilter } from "@/constants/Config";
import SofaDiagramRenderer from "./SofaDiagramRenderer";
import renderCategoryComponent from "./renderCategoryComponent .jsx";
const CustomerSnapshot = ({
  filteredOrders,
  selectedCustomer,
  customerOrders,
  handleBackAction,
  products,
  searchTerm,
  setSearchTerm,
  closeAllPanels,
  setEditingCustomer,
  setShowAddOrderForm,
  setEditingOrder,
  deleteOrder,
  startProductEdit,
  deleteProduct,
  formatDate,
  isEditingActive,
  setSelectedProduct,
  setShowProductModal,
  startRoomEdit, // NEW
  editingCustomer,
  editingOrder,
  editingRoomState,
  setEditingRoomState,
  editingProductState,

  saveRoomEdit,
  cancelRoomEdit,

  saveProductEdit,
  cancelProductEdit,

  handleUpdateProductInline,

  handleUpdateOrder,

  roomName,
  roomType,

  showAddOrderForm,

  customers,
  setProducts,

  handleOrderCreated,

  onUpdateCustomer,

  setSelectedCustomer,
  handleGlobalCancel,
  editingRoomOrderId,
  editingProductOrderId,
  deleteRoom,
  tempRooms,
  onTempRoomAdd,
}) => {
  // ✅ DECLARE HERE
  const hasActiveEditor =
    editingCustomer ||
    editingOrder ||
    editingRoomState ||
    editingProductState ||
    showAddOrderForm;
  const orderFilterOptions = [
    { value: "all", label: "All Orders" },
    { value: "1", label: "Last 1 Year" },
    { value: "2", label: "Last 2 Years" },
    { value: "3", label: "Last 3 Years" },
  ];
  const cleanProductForCompare = (product) => ({
    category: product.category,
    subCategory: product.subCategory || "",
    companyName: product.companyName,
    collectionName: product.collectionName,
    productCode: product.productCode,
    quantity: product.quantity,
    price: product.price,
    deliveryDate: product.deliveryDate,
    orderStatus: product.orderStatus,
    specialNotes: product.specialNotes,
    attachments: product.attachments || [],
    attributes: product.attributes || {},
  });
  if (!selectedCustomer) {
    return (
      <div className="border border-gray-200 rounded-2xl px-6  text-center">
        <p className="text-gray-500">
          No customer selected. Add a customer first.
        </p>
      </div>
    );
  }
  const [previewAttachment, setPreviewAttachment] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    type: null,
    id: null,
  });
  const [hasOrderDraftChanges, setHasOrderDraftChanges] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [orderYearFilter, setOrderYearFilter] = useState("all");
  const filteredOrdersByYear = filteredOrders.filter((order) => {
    if (orderYearFilter === "all") return true;

    const orderDate = new Date(order.orderDate);
    const today = new Date();

    const yearsDiff = (today - orderDate) / (1000 * 60 * 60 * 24 * 365.25);

    return yearsDiff <= Number(orderYearFilter);
  });
  const [showProductCancelConfirm, setShowProductCancelConfirm] =
    useState(false);

  const [originalProduct, setOriginalProduct] = useState(null);

  const handleStartProductEdit = (orderId, roomId, product) => {
    const copy = JSON.parse(JSON.stringify(product));
    setOriginalProduct(copy);

    // Determine if we're in room edit mode
    const source = editingRoomState ? "room" : "order";
    startProductEdit(orderId, roomId, copy, source);
  };
  // const handleStartProductEdit = (orderId, roomId, product) => {
  //   const copy = JSON.parse(JSON.stringify(product));

  //   setOriginalProduct(copy);

  //   startProductEdit(orderId, roomId, copy);
  // };

  const hasProductChanged = () => {
    const original = cleanProductForCompare(originalProduct);
    const editing = cleanProductForCompare(editingProductState);

    return JSON.stringify(original) !== JSON.stringify(editing);
  };
  return (
    <div className="sticky lg:top-0 z-30 ">
      <div className="px-4 sm:px-5  border-b">
        {/* TOP ROW */}
        {/* DESKTOP TITLE */}

        <div className="flex flex-col  lg:flex-row lg:items-center py-1 lg:justify-between gap-1 md:gap-1 lg:gap-4">
          {/* LEFT SIDE */}
          <div className="flex  items-center justify-between md:gap-3">
            {/* <button
              onClick={handleBackAction}
              className="flex items-center text-sm bg-black px-4 py-2 lg:text-lg text-white  rounded-lg cursor-pointer shrink-0"
            >
              <FiArrowLeft />
              Back
            </button> */}
            <button
              onClick={() => {
                if (hasActiveEditor) {
                  setShowBackConfirm(true);
                } else {
                  handleBackAction();
                }
              }}
              className="flex items-center  text-sm md:px-4 md:py-2 lg:text-xl rounded-lg cursor-pointer shrink-0"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            {/* MOBILE TITLE */}
            <h2 className="text-[18px] lg:text-[24px] font-medium lg:hidden text-right">
              Customer & Order Details
            </h2>
          </div>

          {/* DESKTOP TITLE */}
          <div className="hidden lg:flex justify-center   flex-1 ">
            <h2 className={`text-3xl font-medium  `}>
              Customer and Order Details
            </h2>
          </div>

          {/* SEARCH */}
          <div className="relative block w-full lg:w-80 ">
            <input
              type="text"
              placeholder="Search orders, products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl outline-none text-sm sm:text-base"
            />

            {/* SEARCH ICON */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch className="w-4 h-4" />
            </span>

            {/* CLEAR BUTTON */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* all customers details */}
      <div className="bg-gradient-to-r  from-gray-900 to-black border-b border-gray-800 py-1">
        <div className="px-4 lg:px-6 py-0">
          <div
            className="
flex flex-col lg:flex-row
lg:justify-between
lg:items-center
md:gap-3
"
          >
            {/* Left Side */}
            <div className="flex items-center flex-wrap gap-0 md:gap-3 text-white">
              <h3 className="text-lg lg:text-2xl font-semibold">
                {selectedCustomer.name}
              </h3>

              <span className="px-3 py-1 mx-1 md:mx-0 rounded-full text-md bg-gray-700 border border-gray-600 whitespace-nowrap">
                <span className="md:text-lg font-bold">
                  {customerOrders.length}
                </span>{" "}
                Order(s)
              </span>

              <span className="text-lg flex flex-wrap gap-1 md:gap-2">
                <a
                  href={`tel:${selectedCustomer?.mobile}`}
                  className=" font-semibold cursor-pointer"
                >
                  {selectedCustomer?.mobile}
                </a>
                {selectedCustomer?.city && (
                  <>
                    <span>•</span>
                    <span>{selectedCustomer.city}</span>
                  </>
                )}
                {selectedCustomer?.address && (
                  <>
                    <span>•</span>
                    <span>{selectedCustomer.address}</span>
                  </>
                )}
              </span>
            </div>

            {/* Right Side */}
            <div className="flex items-center   gap-1 md:gap-3 flex-wrap">
              {/* fitler section */}
              {!showAddOrderForm && (
                <div className="">
                  <Select
                    value={orderFilterOptions.find(
                      (option) => option.value === orderYearFilter,
                    )}
                    onChange={(selected) =>
                      setOrderYearFilter(selected?.value || "all")
                    }
                    options={orderFilterOptions}
                    styles={SelectStylesfilter}
                    isSearchable={false}
                    className="min-w-[180px]"
                  />
                </div>
              )}
              {!showAddOrderForm && (
                <>
                  <button
                    disabled={hasActiveEditor}
                    className={`
    px-4 py-1 md:py-2 rounded-xl font-semibold transition
    ${
      hasActiveEditor
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-white text-black hover:bg-gray-200 hover:scale-105 cursor-pointer"
    }
  `}
                    onClick={() => {
                      closeAllPanels();
                      setEditingCustomer(selectedCustomer);
                    }}
                  >
                    Edit Customer
                  </button>

                  <button
                    disabled={hasActiveEditor}
                    className={`
    px-4 py-1 md:py-2 rounded-xl font-semibold transition
    ${
      hasActiveEditor
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-white text-black hover:bg-gray-200 hover:scale-105 cursor-pointer"
    }
  `}
                    onClick={() => {
                      closeAllPanels();
                      setShowAddOrderForm(true);
                    }}
                  >
                    Create New Order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* cancel button */}
      {/* GLOBAL CANCEL */}
      {/* {hasActiveEditor && (
        <button
          onClick={handleGlobalCancel}
          className="absolute top-28 right-8 z-50
                 w-10 h-10 flex items-center justify-center
                 rounded-full bg-red-500 text-white
                 hover:bg-red-600 shadow-lg transition-all
    duration-200
    hover:scale-105 cursor-pointer"
        >
          <FiX size={20} />
        </button>
      )} */}
      {/* customer form */}
      {editingCustomer && (
        <div className="bg-white border-b px-4 sm:px-5 py-5">
          <AddCustomer
            customer={editingCustomer}
            showNextButton={false}
            onCancel={() => setEditingCustomer(null)}
            onSave={async (updatedCustomer) => {
              try {
                const finalCustomer = {
                  ...editingCustomer,
                  ...updatedCustomer,
                };

                await onUpdateCustomer(finalCustomer);

                setSelectedCustomer(finalCustomer);

                setEditingCustomer(null);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </div>
      )}
      {/* order form */}
      {showAddOrderForm && (
        <div className=" pt-1 ">
          <AddOrder
            key="create-order"
            products={products}
            setProducts={setProducts}
            selectedCustomerId={selectedCustomer._id}
            customers={customers}
            onSave={handleOrderCreated}
            onCancel={() => setShowAddOrderForm(false)}
            title="Create New Order"
          />
        </div>
      )}
      {/* all orders */}

      <div className="lg:flex-1 lg:overflow-y-auto  min-h-0  lg:h-[550px] px-3 sm:px-5 pb-5   space-y-3 pt-2">
        {filteredOrdersByYear.map((order) => {
          const shouldHideOrder =
            hasActiveEditor &&
            editingOrder?._id !== order._id &&
            editingRoomOrderId !== order._id &&
            editingProductOrderId !== order._id;

          const hideOrderHeader =
            editingOrder?._id === order._id ||
            editingRoomOrderId === order._id ||
            editingProductOrderId === order._id;

          if (shouldHideOrder) {
            return null;
          }
          // SHOW ONLY EDITING ORDER
          if (editingOrder && editingOrder._id !== order._id) {
            return null;
          }

          return (
            <div
              key={order._id}
              className={`p-1 rounded-2xl  ${
                editingProductState ? "" : "border-2 border-gray-300"
              }`}
            >
              {" "}
              {!hideOrderHeader && (
                // for larger screens, show order details in a row with actions on the right
                <div
                  className="
  hidden lg:flex flex-col lg:flex-row
  lg:items-center
  gap-2 lg:gap-12
  w-full
"
                >
                  {/* Order No */}
                  <div className="bg-gradient-to-r tracking-[2px] bg-[#EB0100] text-white lg:text-xl rounded-xl px-4 lg:px-8 py-2 whitespace-nowrap ">
                    <span className=" ">Order No:</span>{" "}
                    <span className=" ">{order.orderNo}</span>
                  </div>

                  {/* Order Date */}
                  <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
                    <span className="text-gray-500 text-md">Order Date:</span>{" "}
                    <span className="font-semibold ">
                      {formatDate(order.orderDate)}
                    </span>
                  </div>

                  {/* Delivery Date */}
                  <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
                    <span className="text-gray-500 text-md">
                      Delivery Date:
                    </span>{" "}
                    <span className="font-semibold">
                      {formatDate(order.deliveryDate)}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
                    <span className="text-gray-500 text-md">Order Status:</span>{" "}
                    <span className="font-semibold">{order.orderStatus}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center  md:gap-2 ml-auto whitespace-nowrap">
                    <button
                      onClick={() => {
                        closeAllPanels();
                        setEditingOrder(order);
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-green-50"
                    >
                      <i
                        className="fas fa-edit  transition-all
    duration-200
    hover:scale-125 text-green-600"
                      ></i>
                    </button>

                    <button
                      onClick={() => {
                        console.log("DELETE CLICKED", order._id, "DESKTOP");
                        deleteOrder(order._id);
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50"
                    >
                      <i
                        className="fas fa-trash-alt  transition-all
    duration-200
    hover:scale-125 text-red-600"
                      ></i>
                    </button>
                  </div>
                </div>
              )}
              {!hideOrderHeader && (
                // for smaller screens, stack order details with actions below
                <div
                  className="
  flex lg:hidden flex-col lg:flex-row
  lg:items-center
  gap-2 lg:gap-12
  w-full
"
                >
                  {/* Order No */}
                  <div className="flex justify-between">
                    <div className="bg-gradient-to-r tracking-[2px]  from-gray-900 to-black border-bs text-white lg:text-xl rounded-xl px-4 lg:px-8 py-2 whitespace-nowrap ">
                      <span className=" ">Order No:</span>{" "}
                      <span className=" ">{order.orderNo}</span>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center  md:gap-2 ml-auto whitespace-nowrap">
                      <button
                        onClick={() => {
                          closeAllPanels();
                          setEditingOrder(order);
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-green-50"
                      >
                        <i
                          className="fas fa-edit  transition-all
    duration-200
    hover:scale-125 text-green-600"
                        ></i>
                      </button>

                      <button
                        onClick={() => {
                          console.log("DELETE CLICKED", order._id, "MOBILE");
                          deleteOrder(order._id);
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50"
                      >
                        <i
                          className="fas fa-trash-alt  transition-all
    duration-200
    hover:scale-125 text-red-600"
                        ></i>
                      </button>
                    </div>
                  </div>

                  {/* Order Date */}
                  <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
                    <span className="text-gray-500 text-md">Order Date:</span>{" "}
                    <span className="font-semibold ">
                      {formatDate(order.orderDate)}
                    </span>
                  </div>

                  {/* Delivery Date */}
                  <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
                    <span className="text-gray-500 text-md">
                      Delivery Date:
                    </span>{" "}
                    <span className="font-semibold">
                      {formatDate(order.deliveryDate)}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
                    <span className="text-gray-500 text-md">Order Status:</span>{" "}
                    <span className="font-semibold">{order.orderStatus}</span>
                  </div>
                </div>
              )}
              <div>
                {/* order form */}
                {editingOrder?._id === order._id && (
                  <div className="mt-1   px-4">
                    <AddOrder
                      key={editingOrder._id}
                      order={{
                        ...editingOrder,
                        customer:
                          editingOrder.customer?._id || editingOrder.customer,
                      }}
                      customers={customers}
                      setProducts={setProducts}
                      products={products}
                      selectedCustomerId={
                        editingOrder?.customer?._id ||
                        editingOrder?.customer ||
                        selectedCustomer?._id
                      }
                      onSave={handleUpdateOrder}
                      onCancel={() => setEditingOrder(null)}
                      title="Update Order"
                      isEditMode={true}
                      editingRoomState={editingRoomState}
                      editingProductState={editingProductState}
                      onDirtyChange={setHasOrderDraftChanges}
                      tempRooms={tempRooms}
                      onTempRoomAdd={onTempRoomAdd}
                      onRoomsChange={(rooms) => {
                        onTempRoomAdd(rooms);
                      }}
                    />
                  </div>
                )}
              </div>
              {/* Products list - now without inline editing */}
              {order.rooms?.map((room, roomIndex) => {
                // Show only the room being edited
                if (editingRoomState && editingRoomState._id !== room._id) {
                  return null;
                }

                return (
                  <div className="">
                    <div
                      key={`${order._id}-${room._id}-${roomIndex}`}
                      className={`   ${
                        editingProductState
                          ? ""
                          : "border rounded-2xl mt-1 p-1 border-gray-200"
                      }`}
                    >
                      {/* ROOM HEADER */}
                      {editingProductState?._id == null && (
                        <div className="flex  justify-between items-center gap-2 ">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <div className="flex items-center gap-2  bg-gradient-to-r lg:text-xl bg-[#467B89] text-white px-4 rounded-xl whitespace-nowrap shadow-sm tracking-[2px] ">
                              {/* <span className="text-lg">🏠</span> */}
                              <span className=" tracking-wide ">
                                {room.roomType || "Room"} -
                              </span>

                              {room.roomName && (
                                <span className=" py-1  ">{room.roomName}</span>
                              )}
                            </div>
                          </div>
                          {/* edit delete room */}
                          {editingOrder?._id === order._id &&
                            editingRoomState?._id !== room._id && (
                              <div className=" flex justify-end   sm:justify-start gap-2 items-center w-full sm:w-auto">
                                {/* edit room */}
                                <button
                                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-green-50"
                                  onClick={() =>
                                    startRoomEdit(order._id, room, roomIndex)
                                  }
                                >
                                  <i
                                    className="fas fa-edit  transition-all
    duration-200
    hover:scale-125 text-green-600"
                                  ></i>
                                </button>
                                <button
                                  className="px-3 py-1 cursor-pointer rounded-lg  text-red-600 text-sm hover:bg-red-50"
                                  onClick={() =>
                                    deleteRoom(order._id, room._id)
                                  }
                                >
                                  <i
                                    className="fas fa-trash-alt  transition-all
    duration-200
    hover:scale-125 text-red-600 hover:text-red-800 cursor-pointer"
                                  ></i>
                                </button>
                              </div>
                            )}
                        </div>
                      )}
                      {/* room form */}
                      {editingRoomState?._id === room._id && (
                        <div className="mb-1 border  rounded-2xl ">
                          <RoomForm
                            room={editingRoomState}
                            onChange={setEditingRoomState}
                            onCancel={cancelRoomEdit}
                            onSave={saveRoomEdit}
                            editingProductState={editingProductState}
                          />
                        </div>
                      )}
                      {/* PRODUCTS INSIDE ROOM */}
                      <div className="">
                        {room.products
                          ?.filter((p) => {
                            if (!editingProductState)
                              return p.isActive !== false;

                            return (
                              p.isActive !== false &&
                              p._id === editingProductState._id
                            );
                          })
                          .map((product, idx) => (
                            <React.Fragment
                              key={product._id || `${room._id}-${idx}`}
                            >
                              {editingProductState?._id === product._id ? (
                                <div className="  border rounded-2xl  px-4">
                                  {/* ROOM INFO */}
                                  {/* <div className="flex items-center gap-2 my-2 flex-wrap">
                                <span className="px-3 py-1 rounded-full bg-black text-white text-sm">
                                  {roomType}
                                </span>

                                {roomName && (
                                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                                    {roomName}
                                  </span>
                                )}
                              </div> */}

                                  {/* PRODUCT FORM */}
                                  <ProductForm
                                    product={editingProductState}
                                    index={0}
                                    onUpdate={handleUpdateProductInline}
                                    hideRemove={true}
                                  />

                                  {/* ACTIONS */}
                                  <div className="flex  justify-center gap-3 my-2">
                                    <button
                                      onClick={() => {
                                        if (hasProductChanged()) {
                                          setShowProductCancelConfirm(true);
                                        } else {
                                          cancelProductEdit();
                                        }
                                      }}
                                      className="px-5 py-2 border rounded-xl hover:bg-gray-100"
                                    >
                                      Cancel
                                    </button>

                                    <button
                                      onClick={saveProductEdit}
                                      className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
                                    >
                                      Save Changes
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="border bg-white  border-gray-200 rounded-2xl px-3  shadow-sm hover:shadow-md transition  mb-1 ">
                                  <div
                                    className=" mb-1
flex flex-col
lg:grid lg:grid-cols-1

lg:gap-0
"
                                  >
                                    <div className="flex justify-between items-center gap-2  ">
                                      <div className="flex items-center gap-2 my-2 bg-gradient-to-r  from-gray-900 to-black  text-white px-4 py-1 rounded-xl whitespace-nowrap shadow-sm tracking-[2px]">
                                        <h3 className="   lg:text-xl  tracking-[2px]">
                                          {product.category
                                            ? product.category
                                                .charAt(0)
                                                .toUpperCase() +
                                              product.category.slice(1)
                                            : "Product"}
                                        </h3>
                                      </div>
                                      {/* for product edit and delete */}
                                      {(editingOrder?._id === order._id ||
                                        editingRoomOrderId === order._id) && (
                                        <div className="flex  gap-2 justify-center items-center ">
                                          <button
                                            onClick={() =>
                                              handleStartProductEdit(
                                                order._id,
                                                room._id,
                                                product,
                                              )
                                            }
                                            className="w-10 h-10 hover:bg-gray-50 flex items-center justify-center"
                                          >
                                            <i
                                              className="fas fa-edit transition-all
    duration-200
    hover:scale-125 text-green-600"
                                            ></i>
                                          </button>

                                          <button
                                            onClick={() =>
                                              deleteProduct(
                                                order._id,
                                                room._id,
                                                product._id,
                                              )
                                            }
                                            className="w-10 h-10 rounded-xl  hover:bg-red-50 flex items-center justify-center"
                                          >
                                            <i
                                              className="fas fa-trash-alt  transition-all
    duration-200
    hover:scale-125 text-red-600"
                                            ></i>
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex  justify-between items-start gap-3 mb-2  ">
                                      <div className="flex-1   ">
                                        {/* ATTRIBUTES */}
                                        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
                                          {/* LEFT - 30% */}
                                          <div className=" lg:w-[30%] lg:border-r lg:pr-6 lg:border-gray-800 space-y-3">
                                            {/* Company / Collection / Status */}
                                            <div className="space-y-3  ">
                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <div className="bg-white px-3 py-2 border border-gray-200   rounded-xl shadow-sm hover:shadow-md transition">
                                                  <p className="text-[14px] text-gray-500 mb-1">
                                                    Company Name
                                                  </p>
                                                  <p className="text-xl font-semibold text-gray-800">
                                                    {product.companyName}
                                                  </p>
                                                </div>

                                                <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
                                                  <p className="text-[14px] text-gray-500  mb-1">
                                                    Collection Name
                                                  </p>
                                                  <p className="text-xl font-semibold text-gray-800">
                                                    {product.collectionName}
                                                  </p>
                                                </div>
                                              </div>
                                              <div
                                                className="px-3 bg-white py-2 border border-gray-200 rounded-xl shadow-sm hover:shadow-md w-full
    min-w-0
    overflow-hidden transition"
                                              >
                                                <p className="text-[14px] text-gray-500  mb-1">
                                                  Serial No.
                                                </p>
                                                <p className="text-xl font-semibold text-gray-800">
                                                  {product.productCode}
                                                </p>
                                              </div>
                                              <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl shadow-sm">
                                                <p className="text-[14px] text-gray-500 mb-2">
                                                  Attachments (
                                                  {product.attachments
                                                    ?.length || 0}
                                                  )
                                                </p>

                                                {product.attachments?.length >
                                                0 ? (
                                                  <div className="flex flex-wrap gap-2">
                                                    {product.attachments.map(
                                                      (file, index) => (
                                                        <button
                                                          key={
                                                            file._id || index
                                                          }
                                                          type="button"
                                                          onClick={() =>
                                                            setPreviewAttachment(
                                                              file,
                                                            )
                                                          }
                                                          className="group"
                                                        >
                                                          <img
                                                            src={file.url}
                                                            alt={
                                                              file.originalName
                                                            }
                                                            className="
              w-12 h-12
              object-cover cursor-pointer
              rounded-lg
              border
              border-gray-200
              shadow-sm
              hover:scale-110
              transition
            "
                                                          />
                                                        </button>
                                                      ),
                                                    )}
                                                  </div>
                                                ) : (
                                                  <p className="text-sm text-gray-400">
                                                    No attachments
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                          </div>

                                          {/* RIGHT - 70% */}
                                          <div className=" w-full lg:w-[70%]">
                                            {renderCategoryComponent(product)}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })}
              {editingOrder?._id === order._id &&
                tempRooms?.map((tempRoom, index) => {
                  // Skip if this temp room already exists in order.rooms (by some matching logic)
                  const exists = order.rooms?.some(
                    (r) => r._id === tempRoom._id || r.id === tempRoom.id,
                  );
                  if (exists) return null;

                  return (
                    <div
                      key={`temp-${tempRoom.id || index}`}
                      className="border rounded-2xl mt-1 p-1 border-amber-200 bg-amber-50"
                    >
                      {/* Room Header */}
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2 bg-[#467B89] text-white px-4 rounded-xl">
                          <span className="tracking-wide">
                            {tempRoom.roomType || "Room"} -
                          </span>
                          {tempRoom.roomName && (
                            <span>{tempRoom.roomName}</span>
                          )}
                        </div>
                        <span className="text-xs text-amber-600 font-medium">
                          Unsaved
                        </span>
                      </div>

                      {/* Products */}
                      {tempRoom.products?.map((product, pIdx) => (
                        <div
                          key={product.id || pIdx}
                          className="border bg-white border-gray-200 rounded-2xl px-3 mt-2"
                        >
                          {/* Same product display as existing products */}
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg">
                              {product.category || "Product"}
                            </h3>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-gray-500">Company</p>
                              <p>{product.companyName}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Collection
                              </p>
                              <p>{product.collectionName}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Serial No.
                              </p>
                              <p>{product.productCode}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      {previewAttachment && (
        <div
          className="fixed inset-0 z-[9999] mt-26 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewAttachment(null)}
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewAttachment(null)}
              className="
          absolute
          -top-12
          right-0
          w-10
          h-10
          rounded-full
          bg-white
          text-black
          flex
          items-center
          justify-center cursor-pointer
          shadow-lg
        "
            >
              <FiX size={22} />
            </button>

            {/* Image */}
            <img
              src={previewAttachment.url}
              alt={previewAttachment.originalName}
              className="
          w-full
          max-h-[65vh]
          object-contain
          rounded-2xl

          p-2
        "
            />

            {/* File Name */}
            {/* <div className="mt-3 text-center text-white text-sm">
              {previewAttachment.originalName}
            </div> */}
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={showBackConfirm}
        title="Leave Customer?"
        message="You have unsaved changes. All changes will be lost."
        onCancel={() => setShowBackConfirm(false)}
        onConfirm={() => {
          setShowBackConfirm(false);

          handleGlobalCancel(); // clear editing states

          handleBackAction(); // go back
        }}
      />
      <ConfirmModal
        isOpen={showProductCancelConfirm}
        title="Discard Changes?"
        message="You have unsaved product changes. Do you want to discard them?"
        onCancel={() => setShowProductCancelConfirm(false)}
        onConfirm={() => {
          setShowProductCancelConfirm(false);
          cancelProductEdit();
        }}
      />
    </div>
  );
};

export default CustomerSnapshot;

// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { FiArrowLeft, FiSearch, FiX } from "react-icons/fi";
// import AddOrder from "../OrderForm";
// import AddCustomer from "../CustomerForm";
// import ProductForm from "../ProductForm";
// import RoomForm from "./RoomForm.jsx";
// import { toast } from "react-toastify";
// import { FiEye } from "react-icons/fi";
// import ConfirmModal from "./ConfirmModal";
// import { getStatusStyle } from "@/constants/Config";
// import Select from "react-select";
// import { SelectStylesfilter } from "@/constants/Config";
// import SofaDiagramRenderer from "./SofaDiagramRenderer";
// const CustomerSnapshot = ({
//   filteredOrders,
//   selectedCustomer,
//   customerOrders,
//   handleBackAction,
//   products,
//   searchTerm,
//   setSearchTerm,
//   closeAllPanels,
//   setEditingCustomer,
//   setShowAddOrderForm,
//   setEditingOrder,
//   deleteOrder,
//   startProductEdit,
//   deleteProduct,
//   formatDate,
//   isEditingActive,
//   setSelectedProduct,
//   setShowProductModal,
//   startRoomEdit, // NEW
//   editingCustomer,
//   editingOrder,
//   editingRoomState,
//   setEditingRoomState,
//   editingProductState,

//   saveRoomEdit,
//   cancelRoomEdit,

//   saveProductEdit,
//   cancelProductEdit,

//   handleUpdateProductInline,

//   handleUpdateOrder,

//   roomName,
//   roomType,

//   showAddOrderForm,

//   customers,
//   setProducts,

//   handleOrderCreated,

//   onUpdateCustomer,

//   setSelectedCustomer,
//   handleGlobalCancel,
//   editingRoomOrderId,
//   editingProductOrderId,
//   deleteRoom,
//   tempRooms,
//   onTempRoomAdd,
// }) => {
//   // ✅ DECLARE HERE
//   const hasActiveEditor =
//     editingCustomer ||
//     editingOrder ||
//     editingRoomState ||
//     editingProductState ||
//     showAddOrderForm;
//   const orderFilterOptions = [
//     { value: "all", label: "All Orders" },
//     { value: "1", label: "Last 1 Year" },
//     { value: "2", label: "Last 2 Years" },
//     { value: "3", label: "Last 3 Years" },
//   ];
//   const cleanProductForCompare = (product) => ({
//     category: product.category,
//     companyName: product.companyName,
//     collectionName: product.collectionName,
//     productCode: product.productCode,
//     quantity: product.quantity,
//     price: product.price,
//     deliveryDate: product.deliveryDate,
//     orderStatus: product.orderStatus,
//     specialNotes: product.specialNotes,
//     attachments: product.attachments || [],
//     attributes: product.attributes || {},
//   });
//   if (!selectedCustomer) {
//     return (
//       <div className="border border-gray-200 rounded-2xl px-6  text-center">
//         <p className="text-gray-500">
//           No customer selected. Add a customer first.
//         </p>
//       </div>
//     );
//   }
//   const [previewAttachment, setPreviewAttachment] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState({
//     open: false,
//     type: null,
//     id: null,
//   });
//   const [hasOrderDraftChanges, setHasOrderDraftChanges] = useState(false);
//   const [showBackConfirm, setShowBackConfirm] = useState(false);
//   const [orderYearFilter, setOrderYearFilter] = useState("all");
//   const filteredOrdersByYear = filteredOrders.filter((order) => {
//     if (orderYearFilter === "all") return true;

//     const orderDate = new Date(order.orderDate);
//     const today = new Date();

//     const yearsDiff = (today - orderDate) / (1000 * 60 * 60 * 24 * 365.25);

//     return yearsDiff <= Number(orderYearFilter);
//   });
//   const [showProductCancelConfirm, setShowProductCancelConfirm] =
//     useState(false);

//   const [originalProduct, setOriginalProduct] = useState(null);

//   const handleStartProductEdit = (orderId, roomId, product) => {
//     const copy = JSON.parse(JSON.stringify(product));
//     setOriginalProduct(copy);

//     // Determine if we're in room edit mode
//     const source = editingRoomState ? "room" : "order";
//     startProductEdit(orderId, roomId, copy, source);
//   };
//   // const handleStartProductEdit = (orderId, roomId, product) => {
//   //   const copy = JSON.parse(JSON.stringify(product));

//   //   setOriginalProduct(copy);

//   //   startProductEdit(orderId, roomId, copy);
//   // };

//   const hasProductChanged = () => {
//     const original = cleanProductForCompare(originalProduct);
//     const editing = cleanProductForCompare(editingProductState);

//     return JSON.stringify(original) !== JSON.stringify(editing);
//   };
//   return (
//     <div className="sticky lg:top-0 z-30 ">
//       <div className="px-4 sm:px-5  border-b">
//         {/* TOP ROW */}
//         {/* DESKTOP TITLE */}

//         <div className="flex flex-col  lg:flex-row lg:items-center py-1 lg:justify-between gap-1 md:gap-1 lg:gap-4">
//           {/* LEFT SIDE */}
//           <div className="flex  items-center justify-between md:gap-3">
//             {/* <button
//               onClick={handleBackAction}
//               className="flex items-center text-sm bg-black px-4 py-2 lg:text-lg text-white  rounded-lg cursor-pointer shrink-0"
//             >
//               <FiArrowLeft />
//               Back
//             </button> */}
//             <button
//               onClick={() => {
//                 if (hasActiveEditor) {
//                   setShowBackConfirm(true);
//                 } else {
//                   handleBackAction();
//                 }
//               }}
//               className="flex items-center  text-sm md:px-4 md:py-2 lg:text-xl rounded-lg cursor-pointer shrink-0"
//             >
//               <FiArrowLeft className="w-6 h-6" />
//             </button>
//             {/* MOBILE TITLE */}
//             <h2 className="text-[18px] lg:text-[24px] font-medium lg:hidden text-right">
//               Customer & Order Details
//             </h2>
//           </div>

//           {/* DESKTOP TITLE */}
//           <div className="hidden lg:flex justify-center   flex-1 ">
//             <h2 className={`text-3xl font-medium  `}>
//               Customer and Order Details
//             </h2>
//           </div>

//           {/* SEARCH */}
//           <div className="relative block w-full lg:w-80 ">
//             <input
//               type="text"
//               placeholder="Search orders, products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl outline-none text-sm sm:text-base"
//             />

//             {/* SEARCH ICON */}
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//               <FiSearch className="w-4 h-4" />
//             </span>

//             {/* CLEAR BUTTON */}
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
//               >
//                 <FiX size={16} />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* all customers details */}
//       <div className="bg-gradient-to-r  from-gray-900 to-black border-b border-gray-800 py-1">
//         <div className="px-4 lg:px-6 py-0">
//           <div
//             className="
// flex flex-col lg:flex-row
// lg:justify-between
// lg:items-center
// md:gap-3
// "
//           >
//             {/* Left Side */}
//             <div className="flex items-center flex-wrap gap-0 md:gap-3 text-white">
//               <h3 className="text-lg lg:text-2xl font-semibold">
//                 {selectedCustomer.name}
//               </h3>

//               <span className="px-3 py-1 mx-1 md:mx-0 rounded-full text-md bg-gray-700 border border-gray-600 whitespace-nowrap">
//                 <span className="md:text-lg font-bold">
//                   {customerOrders.length}
//                 </span>{" "}
//                 Order(s)
//               </span>

//               <span className="text-lg flex flex-wrap gap-1 md:gap-2">
//                 <a
//                   href={`tel:${selectedCustomer?.mobile}`}
//                   className=" font-semibold cursor-pointer"
//                 >
//                   {selectedCustomer?.mobile}
//                 </a>
//                 {selectedCustomer?.city && (
//                   <>
//                     <span>•</span>
//                     <span>{selectedCustomer.city}</span>
//                   </>
//                 )}
//                 {selectedCustomer?.address && (
//                   <>
//                     <span>•</span>
//                     <span>{selectedCustomer.address}</span>
//                   </>
//                 )}
//               </span>
//             </div>

//             {/* Right Side */}
//             <div className="flex items-center   gap-1 md:gap-3 flex-wrap">
//               {/* fitler section */}
//               {!showAddOrderForm && (
//                 <div className="">
//                   <Select
//                     value={orderFilterOptions.find(
//                       (option) => option.value === orderYearFilter,
//                     )}
//                     onChange={(selected) =>
//                       setOrderYearFilter(selected?.value || "all")
//                     }
//                     options={orderFilterOptions}
//                     styles={SelectStylesfilter}
//                     isSearchable={false}
//                     className="min-w-[180px]"
//                   />
//                 </div>
//               )}
//               {!showAddOrderForm && (
//                 <>
//                   <button
//                     disabled={hasActiveEditor}
//                     className={`
//     px-4 py-1 md:py-2 rounded-xl font-semibold transition
//     ${
//       hasActiveEditor
//         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//         : "bg-white text-black hover:bg-gray-200 hover:scale-105 cursor-pointer"
//     }
//   `}
//                     onClick={() => {
//                       closeAllPanels();
//                       setEditingCustomer(selectedCustomer);
//                     }}
//                   >
//                     Edit Customer
//                   </button>

//                   <button
//                     disabled={hasActiveEditor}
//                     className={`
//     px-4 py-1 md:py-2 rounded-xl font-semibold transition
//     ${
//       hasActiveEditor
//         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//         : "bg-white text-black hover:bg-gray-200 hover:scale-105 cursor-pointer"
//     }
//   `}
//                     onClick={() => {
//                       closeAllPanels();
//                       setShowAddOrderForm(true);
//                     }}
//                   >
//                     Create New Order
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* cancel button */}
//       {/* GLOBAL CANCEL */}
//       {/* {hasActiveEditor && (
//         <button
//           onClick={handleGlobalCancel}
//           className="absolute top-28 right-8 z-50
//                  w-10 h-10 flex items-center justify-center
//                  rounded-full bg-red-500 text-white
//                  hover:bg-red-600 shadow-lg transition-all
//     duration-200
//     hover:scale-105 cursor-pointer"
//         >
//           <FiX size={20} />
//         </button>
//       )} */}
//       {/* customer form */}
//       {editingCustomer && (
//         <div className="bg-white border-b px-4 sm:px-5 py-5">
//           <AddCustomer
//             customer={editingCustomer}
//             showNextButton={false}
//             onCancel={() => setEditingCustomer(null)}
//             onSave={async (updatedCustomer) => {
//               try {
//                 const finalCustomer = {
//                   ...editingCustomer,
//                   ...updatedCustomer,
//                 };

//                 await onUpdateCustomer(finalCustomer);

//                 setSelectedCustomer(finalCustomer);

//                 setEditingCustomer(null);
//               } catch (error) {
//                 console.log(error);
//               }
//             }}
//           />
//         </div>
//       )}
//       {/* order form */}
//       {showAddOrderForm && (
//         <div className=" pt-1 ">
//           <AddOrder
//             key="create-order"
//             products={products}
//             setProducts={setProducts}
//             selectedCustomerId={selectedCustomer._id}
//             customers={customers}
//             onSave={handleOrderCreated}
//             onCancel={() => setShowAddOrderForm(false)}
//             title="Create New Order"
//           />
//         </div>
//       )}
//       {/* all orders */}

//       <div className="lg:flex-1 lg:overflow-y-auto  min-h-0  lg:h-[550px] px-3 sm:px-5 pb-5   space-y-3 pt-2">
//         {filteredOrdersByYear.map((order) => {
//           const shouldHideOrder =
//             hasActiveEditor &&
//             editingOrder?._id !== order._id &&
//             editingRoomOrderId !== order._id &&
//             editingProductOrderId !== order._id;

//           const hideOrderHeader =
//             editingOrder?._id === order._id ||
//             editingRoomOrderId === order._id ||
//             editingProductOrderId === order._id;

//           if (shouldHideOrder) {
//             return null;
//           }
//           // SHOW ONLY EDITING ORDER
//           if (editingOrder && editingOrder._id !== order._id) {
//             return null;
//           }

//           return (
//             <div
//               key={order._id}
//               className={`p-1 rounded-2xl  ${
//                 editingProductState ? "" : "border-2 border-gray-300"
//               }`}
//             >
//               {" "}
//               {!hideOrderHeader && (
//                 // for larger screens, show order details in a row with actions on the right
//                 <div
//                   className="
//   hidden lg:flex flex-col lg:flex-row
//   lg:items-center
//   gap-2 lg:gap-12
//   w-full
// "
//                 >
//                   {/* Order No */}
//                   <div className="bg-gradient-to-r tracking-[2px] bg-[#EB0100] text-white lg:text-xl rounded-xl px-4 lg:px-8 py-2 whitespace-nowrap ">
//                     <span className=" ">Order No:</span>{" "}
//                     <span className=" ">{order.orderNo}</span>
//                   </div>

//                   {/* Order Date */}
//                   <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
//                     <span className="text-gray-500 text-md">Order Date:</span>{" "}
//                     <span className="font-semibold ">
//                       {formatDate(order.orderDate)}
//                     </span>
//                   </div>

//                   {/* Delivery Date */}
//                   <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
//                     <span className="text-gray-500 text-md">
//                       Delivery Date:
//                     </span>{" "}
//                     <span className="font-semibold">
//                       {formatDate(order.deliveryDate)}
//                     </span>
//                   </div>

//                   {/* Status */}
//                   <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
//                     <span className="text-gray-500 text-md">Order Status:</span>{" "}
//                     <span className="font-semibold">{order.orderStatus}</span>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center  md:gap-2 ml-auto whitespace-nowrap">
//                     <button
//                       onClick={() => {
//                         closeAllPanels();
//                         setEditingOrder(order);
//                       }}
//                       className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-green-50"
//                     >
//                       <i
//                         className="fas fa-edit  transition-all
//     duration-200
//     hover:scale-125 text-green-600"
//                       ></i>
//                     </button>

//                     <button
//                       onClick={() => {
//                         console.log("DELETE CLICKED", order._id, "DESKTOP");
//                         deleteOrder(order._id);
//                       }}
//                       className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50"
//                     >
//                       <i
//                         className="fas fa-trash-alt  transition-all
//     duration-200
//     hover:scale-125 text-red-600"
//                       ></i>
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {!hideOrderHeader && (
//                 // for smaller screens, stack order details with actions below
//                 <div
//                   className="
//   flex lg:hidden flex-col lg:flex-row
//   lg:items-center
//   gap-2 lg:gap-12
//   w-full
// "
//                 >
//                   {/* Order No */}
//                   <div className="flex justify-between">
//                     <div className="bg-gradient-to-r tracking-[2px]  from-gray-900 to-black border-bs text-white lg:text-xl rounded-xl px-4 lg:px-8 py-2 whitespace-nowrap ">
//                       <span className=" ">Order No:</span>{" "}
//                       <span className=" ">{order.orderNo}</span>
//                     </div>
//                     {/* Actions */}
//                     <div className="flex items-center  md:gap-2 ml-auto whitespace-nowrap">
//                       <button
//                         onClick={() => {
//                           closeAllPanels();
//                           setEditingOrder(order);
//                         }}
//                         className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-green-50"
//                       >
//                         <i
//                           className="fas fa-edit  transition-all
//     duration-200
//     hover:scale-125 text-green-600"
//                         ></i>
//                       </button>

//                       <button
//                         onClick={() => {
//                           console.log("DELETE CLICKED", order._id, "MOBILE");
//                           deleteOrder(order._id);
//                         }}
//                         className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50"
//                       >
//                         <i
//                           className="fas fa-trash-alt  transition-all
//     duration-200
//     hover:scale-125 text-red-600"
//                         ></i>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Order Date */}
//                   <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
//                     <span className="text-gray-500 text-md">Order Date:</span>{" "}
//                     <span className="font-semibold ">
//                       {formatDate(order.orderDate)}
//                     </span>
//                   </div>

//                   {/* Delivery Date */}
//                   <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
//                     <span className="text-gray-500 text-md">
//                       Delivery Date:
//                     </span>{" "}
//                     <span className="font-semibold">
//                       {formatDate(order.deliveryDate)}
//                     </span>
//                   </div>

//                   {/* Status */}
//                   <div className="bg-white rounded-xl px-4 lg:px-8 py-1 md:py-2 border border-gray-200 whitespace-nowrap">
//                     <span className="text-gray-500 text-md">Order Status:</span>{" "}
//                     <span className="font-semibold">{order.orderStatus}</span>
//                   </div>
//                 </div>
//               )}
//               <div>
//                 {/* order form */}
//                 {editingOrder?._id === order._id && (
//                   <div className="mt-1   px-4">
//                     <AddOrder
//                       key={editingOrder._id}
//                       order={{
//                         ...editingOrder,
//                         customer:
//                           editingOrder.customer?._id || editingOrder.customer,
//                       }}
//                       customers={customers}
//                       setProducts={setProducts}
//                       products={products}
//                       selectedCustomerId={
//                         editingOrder?.customer?._id ||
//                         editingOrder?.customer ||
//                         selectedCustomer?._id
//                       }
//                       onSave={handleUpdateOrder}
//                       onCancel={() => setEditingOrder(null)}
//                       title="Update Order"
//                       isEditMode={true}
//                       editingRoomState={editingRoomState}
//                       editingProductState={editingProductState}
//                       onDirtyChange={setHasOrderDraftChanges}
//                       tempRooms={tempRooms}
//                       onTempRoomAdd={onTempRoomAdd}
//                       onRoomsChange={(rooms) => {
//                         onTempRoomAdd(rooms);
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//               {/* Products list - now without inline editing */}
//               {order.rooms?.map((room, roomIndex) => {
//                 // Show only the room being edited
//                 if (editingRoomState && editingRoomState._id !== room._id) {
//                   return null;
//                 }

//                 return (
//                   <div className="">
//                     <div
//                       key={`${order._id}-${room._id}-${roomIndex}`}
//                       className={`   ${
//                         editingProductState
//                           ? ""
//                           : "border rounded-2xl mt-1 p-1 border-gray-200"
//                       }`}
//                     >
//                       {/* ROOM HEADER */}
//                       {editingProductState?._id == null && (
//                         <div className="flex  justify-between items-center gap-2 ">
//                           <div className="flex items-center gap-2 flex-wrap mb-2">
//                             <div className="flex items-center gap-2  bg-gradient-to-r lg:text-xl bg-[#467B89] text-white px-4 rounded-xl whitespace-nowrap shadow-sm tracking-[2px] ">
//                               {/* <span className="text-lg">🏠</span> */}
//                               <span className=" tracking-wide ">
//                                 {room.roomType || "Room"} -
//                               </span>

//                               {room.roomName && (
//                                 <span className=" py-1  ">{room.roomName}</span>
//                               )}
//                             </div>
//                           </div>
//                           {/* edit delete room */}
//                           {editingOrder?._id === order._id &&
//                             editingRoomState?._id !== room._id && (
//                               <div className=" flex justify-end   sm:justify-start gap-2 items-center w-full sm:w-auto">
//                                 {/* edit room */}
//                                 <button
//                                   className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-green-50"
//                                   onClick={() =>
//                                     startRoomEdit(order._id, room, roomIndex)
//                                   }
//                                 >
//                                   <i
//                                     className="fas fa-edit  transition-all
//     duration-200
//     hover:scale-125 text-green-600"
//                                   ></i>
//                                 </button>
//                                 <button
//                                   className="px-3 py-1 cursor-pointer rounded-lg  text-red-600 text-sm hover:bg-red-50"
//                                   onClick={() =>
//                                     deleteRoom(order._id, room._id)
//                                   }
//                                 >
//                                   <i
//                                     className="fas fa-trash-alt  transition-all
//     duration-200
//     hover:scale-125 text-red-600 hover:text-red-800 cursor-pointer"
//                                   ></i>
//                                 </button>
//                               </div>
//                             )}
//                         </div>
//                       )}
//                       {/* room form */}
//                       {editingRoomState?._id === room._id && (
//                         <div className="mb-1 border  rounded-2xl ">
//                           <RoomForm
//                             room={editingRoomState}
//                             onChange={setEditingRoomState}
//                             onCancel={cancelRoomEdit}
//                             onSave={saveRoomEdit}
//                             editingProductState={editingProductState}
//                           />
//                         </div>
//                       )}
//                       {/* PRODUCTS INSIDE ROOM */}
//                       <div className="">
//                         {room.products
//                           ?.filter((p) => {
//                             if (!editingProductState)
//                               return p.isActive !== false;

//                             return (
//                               p.isActive !== false &&
//                               p._id === editingProductState._id
//                             );
//                           })
//                           .map((product, idx) => (
//                             <React.Fragment
//                               key={product._id || `${room._id}-${idx}`}
//                             >
//                               {editingProductState?._id === product._id ? (
//                                 <div className="  border rounded-2xl  px-4">
//                                   {/* ROOM INFO */}
//                                   {/* <div className="flex items-center gap-2 my-2 flex-wrap">
//                                 <span className="px-3 py-1 rounded-full bg-black text-white text-sm">
//                                   {roomType}
//                                 </span>

//                                 {roomName && (
//                                   <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
//                                     {roomName}
//                                   </span>
//                                 )}
//                               </div> */}

//                                   {/* PRODUCT FORM */}
//                                   <ProductForm
//                                     product={editingProductState}
//                                     index={0}
//                                     onUpdate={handleUpdateProductInline}
//                                     hideRemove={true}
//                                   />

//                                   {/* ACTIONS */}
//                                   <div className="flex  justify-center gap-3 my-2">
//                                     <button
//                                       onClick={() => {
//                                         if (hasProductChanged()) {
//                                           setShowProductCancelConfirm(true);
//                                         } else {
//                                           cancelProductEdit();
//                                         }
//                                       }}
//                                       className="px-5 py-2 border rounded-xl hover:bg-gray-100"
//                                     >
//                                       Cancel
//                                     </button>

//                                     <button
//                                       onClick={saveProductEdit}
//                                       className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
//                                     >
//                                       Save Changes
//                                     </button>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <div className="border bg-white  border-gray-200 rounded-2xl px-3  shadow-sm hover:shadow-md transition  mb-1 ">
//                                   <div
//                                     className=" mb-1
// flex flex-col
// lg:grid lg:grid-cols-1

// lg:gap-0
// "
//                                   >
//                                     <div className="flex justify-between items-center gap-2  ">
//                                       <div className="flex items-center gap-2 my-2 bg-gradient-to-r  from-gray-900 to-black  text-white px-4 py-1 rounded-xl whitespace-nowrap shadow-sm tracking-[2px]">
//                                         <h3 className="   lg:text-xl  tracking-[2px]">
//                                           {product.category
//                                             ? product.category
//                                                 .charAt(0)
//                                                 .toUpperCase() +
//                                               product.category.slice(1)
//                                             : "Product"}
//                                         </h3>
//                                       </div>
//                                       {/* for product edit and delete */}
//                                       {(editingOrder?._id === order._id ||
//                                         editingRoomOrderId === order._id) && (
//                                         <div className="flex  gap-2 justify-center items-center ">
//                                           <button
//                                             onClick={() =>
//                                               handleStartProductEdit(
//                                                 order._id,
//                                                 room._id,
//                                                 product,
//                                               )
//                                             }
//                                             className="w-10 h-10 hover:bg-gray-50 flex items-center justify-center"
//                                           >
//                                             <i
//                                               className="fas fa-edit transition-all
//     duration-200
//     hover:scale-125 text-green-600"
//                                             ></i>
//                                           </button>

//                                           <button
//                                             onClick={() =>
//                                               deleteProduct(
//                                                 order._id,
//                                                 room._id,
//                                                 product._id,
//                                               )
//                                             }
//                                             className="w-10 h-10 rounded-xl  hover:bg-red-50 flex items-center justify-center"
//                                           >
//                                             <i
//                                               className="fas fa-trash-alt  transition-all
//     duration-200
//     hover:scale-125 text-red-600"
//                                             ></i>
//                                           </button>
//                                         </div>
//                                       )}
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <div className="flex  justify-between items-start gap-3 mb-2  ">
//                                       <div className="flex-1   ">
//                                         {/* ATTRIBUTES */}
//                                         <div
//                                           className="flex    lg:flex-row lg:gap-16
//                                      flex-col gap-5 "
//                                         >
//                                           {/* LEFT - 30% */}
//                                           <div className=" lg:w-[30%] lg:border-r lg:pr-6 lg:border-gray-800 space-y-3">
//                                             {/* Company / Collection / Status */}
//                                             <div className="space-y-3">
//                                               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                                                 <div className="bg-white px-3 py-2 border border-gray-200  rounded-xl shadow-sm hover:shadow-md transition">
//                                                   <p className="text-[14px] text-gray-500 mb-1">
//                                                     Company Name
//                                                   </p>
//                                                   <p className="text-xl font-semibold text-gray-800">
//                                                     {product.companyName}
//                                                   </p>
//                                                 </div>

//                                                 <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
//                                                   <p className="text-[14px] text-gray-500  mb-1">
//                                                     Collection Name
//                                                   </p>
//                                                   <p className="text-xl font-semibold text-gray-800">
//                                                     {product.collectionName}
//                                                   </p>
//                                                 </div>
//                                               </div>
//                                               <div
//                                                 className="px-3 bg-white py-2 border border-gray-200 rounded-xl shadow-sm hover:shadow-md w-full
//     min-w-0
//     overflow-hidden transition"
//                                               >
//                                                 <p className="text-[14px] text-gray-500  mb-1">
//                                                   Serial No.
//                                                 </p>
//                                                 <p className="text-xl font-semibold text-gray-800">
//                                                   {product.productCode}
//                                                 </p>
//                                               </div>
//                                               <div className="bg-white px-3 py-2 border border-gray-200 rounded-xl shadow-sm">
//                                                 <p className="text-[14px] text-gray-500 mb-2">
//                                                   Attachments (
//                                                   {product.attachments
//                                                     ?.length || 0}
//                                                   )
//                                                 </p>

//                                                 {product.attachments?.length >
//                                                 0 ? (
//                                                   <div className="flex flex-wrap gap-2">
//                                                     {product.attachments.map(
//                                                       (file, index) => (
//                                                         <button
//                                                           key={
//                                                             file._id || index
//                                                           }
//                                                           type="button"
//                                                           onClick={() =>
//                                                             setPreviewAttachment(
//                                                               file,
//                                                             )
//                                                           }
//                                                           className="group"
//                                                         >
//                                                           <img
//                                                             src={file.url}
//                                                             alt={
//                                                               file.originalName
//                                                             }
//                                                             className="
//               w-12 h-12
//               object-cover cursor-pointer
//               rounded-lg
//               border
//               border-gray-200
//               shadow-sm
//               hover:scale-110
//               transition
//             "
//                                                           />
//                                                         </button>
//                                                       ),
//                                                     )}
//                                                   </div>
//                                                 ) : (
//                                                   <p className="text-sm text-gray-400">
//                                                     No attachments
//                                                   </p>
//                                                 )}
//                                               </div>
//                                             </div>
//                                           </div>
//                                           <div>
//                                             {/* RIGHT - 70% */}
//                                             <div className="w-full  lg:w-[70%]">
//                                               {Array.isArray(
//                                                 product.attributes
//                                                   ?.measurements,
//                                               ) &&
//                                                 product.category?.toLowerCase() ===
//                                                   "curtains" && (
//                                                   <div>
//                                                     {/* <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-2">
//                                                 Curtain Measurements
//                                               </h4> */}

//                                                     <div className="grid  lg:grid-cols-3  gap-8">
//                                                       {product.attributes.measurements.map(
//                                                         (m, i) => (
//                                                           <div
//                                                             key={i}
//                                                             className="   px-3  "
//                                                           >
//                                                             {m.windowName && (
//                                                               <div className="flex justify-center mb-2">
//                                                                 <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
//                                                                   {m.windowName}
//                                                                 </span>
//                                                               </div>
//                                                             )}

//                                                             <div className="flex justify-center ">
//                                                               <div className="relative w-[280px] md:w-[360px] h-[150px]">
//                                                                 <div className="absolute top-10 left-16 w-46 border-t-2 border-gray-500"></div>
//                                                                 <div className="absolute top-10 left-16 h-24 border-l-2 border-gray-500"></div>

//                                                                 <div className="absolute top-0 left-29 w-15 md:w-24 border font-bold text-[18px] rounded-md px-2 py-1 text-center bg-white text-sm">
//                                                                   {m.width}
//                                                                 </div>

//                                                                 <div className="absolute top-18 w-15 md:w-24 md:-left-10 border rounded-md px-2 py-1 font-bold text-[18px] text-center bg-white text-sm">
//                                                                   {m.height}
//                                                                 </div>

//                                                                 <div className="absolute top-12 left-18 w-44 h-21 bg-white border rounded-xl p-2 shadow-sm">
//                                                                   {/* <p className="text-[10px] text-gray-500 mb-1">
//                                                             Details
//                                                           </p> */}
//                                                                   <p className="w-full  text-xs resize-none">
//                                                                     {m.details ||
//                                                                       "-"}
//                                                                   </p>
//                                                                 </div>
//                                                               </div>
//                                                             </div>
//                                                           </div>
//                                                         ),
//                                                       )}
//                                                     </div>
//                                                   </div>
//                                                 )}
//                                             </div>
//                                             <div className="w-full lg:w-[70%]">
//                                               {/* Sofa */}
//                                               {product.category?.toLowerCase() ===
//                                                 "sofa" && (
//                                                 <SofaDiagramRenderer
//                                                   product={product}
//                                                 />
//                                               )}
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                             </React.Fragment>
//                           ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//               {editingOrder?._id === order._id &&
//                 tempRooms?.map((tempRoom, index) => {
//                   // Skip if this temp room already exists in order.rooms (by some matching logic)
//                   const exists = order.rooms?.some(
//                     (r) => r._id === tempRoom._id || r.id === tempRoom.id,
//                   );
//                   if (exists) return null;

//                   return (
//                     <div
//                       key={`temp-${tempRoom.id || index}`}
//                       className="border rounded-2xl mt-1 p-1 border-amber-200 bg-amber-50"
//                     >
//                       {/* Room Header */}
//                       <div className="flex justify-between items-center gap-2">
//                         <div className="flex items-center gap-2 bg-[#467B89] text-white px-4 rounded-xl">
//                           <span className="tracking-wide">
//                             {tempRoom.roomType || "Room"} -
//                           </span>
//                           {tempRoom.roomName && (
//                             <span>{tempRoom.roomName}</span>
//                           )}
//                         </div>
//                         <span className="text-xs text-amber-600 font-medium">
//                           Unsaved
//                         </span>
//                       </div>

//                       {/* Products */}
//                       {tempRoom.products?.map((product, pIdx) => (
//                         <div
//                           key={product.id || pIdx}
//                           className="border bg-white border-gray-200 rounded-2xl px-3 mt-2"
//                         >
//                           {/* Same product display as existing products */}
//                           <div className="flex justify-between items-center">
//                             <h3 className="text-lg">
//                               {product.category || "Product"}
//                             </h3>
//                           </div>
//                           <div className="grid grid-cols-2 gap-2">
//                             <div>
//                               <p className="text-xs text-gray-500">Company</p>
//                               <p>{product.companyName}</p>
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500">
//                                 Collection
//                               </p>
//                               <p>{product.collectionName}</p>
//                             </div>
//                             <div>
//                               <p className="text-xs text-gray-500">
//                                 Serial No.
//                               </p>
//                               <p>{product.productCode}</p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   );
//                 })}
//             </div>
//           );
//         })}
//       </div>
//       {previewAttachment && (
//         <div
//           className="fixed inset-0 z-[9999] mt-26 bg-black/80 flex items-center justify-center p-4"
//           onClick={() => setPreviewAttachment(null)}
//         >
//           <div
//             className="relative max-w-6xl w-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setPreviewAttachment(null)}
//               className="
//           absolute
//           -top-12
//           right-0
//           w-10
//           h-10
//           rounded-full
//           bg-white
//           text-black
//           flex
//           items-center
//           justify-center cursor-pointer
//           shadow-lg
//         "
//             >
//               <FiX size={22} />
//             </button>

//             {/* Image */}
//             <img
//               src={previewAttachment.url}
//               alt={previewAttachment.originalName}
//               className="
//           w-full
//           max-h-[65vh]
//           object-contain
//           rounded-2xl

//           p-2
//         "
//             />

//             {/* File Name */}
//             {/* <div className="mt-3 text-center text-white text-sm">
//               {previewAttachment.originalName}
//             </div> */}
//           </div>
//         </div>
//       )}
//       <ConfirmModal
//         isOpen={showBackConfirm}
//         title="Leave Customer?"
//         message="You have unsaved changes. All changes will be lost."
//         onCancel={() => setShowBackConfirm(false)}
//         onConfirm={() => {
//           setShowBackConfirm(false);

//           handleGlobalCancel(); // clear editing states

//           handleBackAction(); // go back
//         }}
//       />
//       <ConfirmModal
//         isOpen={showProductCancelConfirm}
//         title="Discard Changes?"
//         message="You have unsaved product changes. Do you want to discard them?"
//         onCancel={() => setShowProductCancelConfirm(false)}
//         onConfirm={() => {
//           setShowProductCancelConfirm(false);
//           cancelProductEdit();
//         }}
//       />
//     </div>
//   );
// };

// export default CustomerSnapshot;
