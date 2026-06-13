import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import ProductForm from "../ProductForm";
import { FiPlus, FiTrash2, FiHome, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { SelectStyles, InputStyles } from "@/constants/Config";
import { IoClose } from "react-icons/io5";
import ConfirmModal from "./ConfirmModal";
const ROOM_TYPES = [
  // Living Areas
  "Hall",

  "Master Bedroom",
  "Bedroom",
  "Living Room",
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

const roomOptions = ROOM_TYPES.map((room) => ({
  value: room,
  label: room,
}));

const emptyProduct = () => {
  return {
    category: "",
    collectionName: "",
    companyName: "",
    name: "",
    price: 0,
    productCode: "",
    attachments: [],
    brand: "",
    quantity: 1,
    deliveryDate: "",
    orderStatus: "Open",
    specialNotes: "",
    attributes: {
      measurements: [],
    },
  };
};

const RoomForm = ({
  room,
  onChange,
  onCancel,
  onSave,
  editingProductState,
}) => {
  const [formData, setFormData] = useState(room);
  const [currentProduct, setCurrentProduct] = useState(emptyProduct());
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProducts, setNewProducts] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    setFormData(room);
  }, [room]);
  const initialRoomRef = useRef(room);

  useEffect(() => {
    initialRoomRef.current = room;
  }, []);
  const hasUnsavedChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialRoomRef.current);
  };
  const handleChange = (field, value) => {
    const updated = {
      ...formData,
      [field]: value,
    };

    setFormData(updated);
    onChange?.(updated);
  };

  const addProduct = () => {
    if (!currentProduct?.category) {
      toast.dismiss();
      toast.warning("Select product category");
      return;
    }

    setNewProducts((prev) => [
      ...prev,
      {
        ...currentProduct,
        id: Date.now(),
      },
    ]);

    setCurrentProduct(emptyProduct());
    setShowProductForm(false);
    toast.dismiss();
    toast.success("Product Added");
  };

  // SAVE ROOM
  const handleSave = () => {
    const updatedRoom = {
      ...formData,
      products: [...(room.products || []), ...newProducts].map((p) => ({
        ...p,
        attachments: p.attachments || [],
      })),
    };

    onSave(updatedRoom);
  };

  return (
    <>
      {/* HEADER */}
      {!editingProductState && (
        <div className=" min-h-full rounded-3xl overflow-hidden">
          <div className="sticky top-0 z-20  px-4 sm:px-6 py-2 ">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between md:gap-4 gap-2">
              {/* LEFT */}
              <div className="flex md:hidden justify-end  gap-x-3">
                <button
                  onClick={handleSave}
                  className="
                px-3 md:py-2.5 py-1 rounded-xl bg-black text-white
                hover:bg-gray-800 transition
                flex items-center gap-2 font-medium
              "
                >
                  <FiSave />
                </button>
                <button
                  onClick={onCancel}
                  className="
                px-3 md:py-2.5 py-1 rounded-xl border border-black
                hover:bg-gray-100 transition font-medium
              "
                >
                  <IoClose size={18} />
                </button>
              </div>
              <div className="md:flex items-center md:gap-4 ">
                {/* ROOM TYPE */}
                <div className="min-w-[200px]">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Room Type
                  </label>

                  <Select
                    options={roomOptions}
                    value={
                      roomOptions.find(
                        (option) => option.value === formData?.roomType,
                      ) || null
                    }
                    onChange={(selected) =>
                      handleChange("roomType", selected?.value || "")
                    }
                    placeholder="Select Room Type"
                    styles={SelectStyles}
                    menuPortalTarget={document.body}
                  />
                </div>

                {/* ROOM NAME */}
                <div className="mt-1 md:mt-0">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">
                    Room Name
                  </label>

                  <input
                    className={InputStyles.base}
                    value={formData?.roomName || ""}
                    onChange={(e) => handleChange("roomName", e.target.value)}
                    placeholder="Enter room name"
                  />
                </div>
                {!showProductForm && (
                  <div className="pt-2 md:pt-6">
                    <button
                      type="button"
                      onClick={() => setShowProductForm(true)}
                      className="
        inline-flex items-center gap-2 cursor-pointer
        px-4 md:py-3 py-2
        rounded-xl
        bg-black text-white
      "
                    >
                      <span className="text-sm font-medium">Add Product</span>
                    </button>
                  </div>
                )}
              </div>

              {/* RIGHT */}
              <div className="hidden md:flex   gap-3">
                <button
                  onClick={() => {
                    if (hasUnsavedChanges() || newProducts.length > 0) {
                      setShowCancelModal(true);
                    } else {
                      onCancel();
                    }
                  }}
                  className="
                px-5 md:py-2.5 py-1 rounded-xl border  border-black
                hover:bg-gray-100 transition font-medium
              "
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="
                px-5 md:py-2.5 py-1 rounded-xl bg-black text-white
                hover:bg-gray-800 transition
                flex items-center gap-2 font-medium
              "
                >
                  <FiSave />
                  update room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BODY */}
      <div className=" px-2  ">
        {/* PRODUCTS */}
        <div className="space-y-5">
          {showProductForm && (
            <div className="space-y-4">
              <ProductForm
                product={currentProduct}
                onUpdate={setCurrentProduct}
              />

              <div className="flex justify-end  gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowProductForm(false);
                    setCurrentProduct(emptyProduct());
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={addProduct}
                  className="
          px-4 py-2
          bg-black text-white
          rounded-lg
          
        "
                >
                  Save Product
                </button>
              </div>
            </div>
          )}
          {newProducts.length > 0 && (
            <div className="space-y-3 my-2 bg-amber-50 p-2 rounded-2xl">
              {newProducts.map((product, index) => (
                <div
                  key={product.id || index}
                  className="border border-gray-200 rounded-2xl p-3 shadow-sm bg-white"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <div className="bg-gradient-to-r from-gray-900 to-black text-white px-4 py-1 rounded-xl shadow-sm">
                      <h3 className="font-semibold lg:text-lg tracking-wide">
                        {product.category
                          ? product.category.charAt(0).toUpperCase() +
                            product.category.slice(1)
                          : "Product"}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setNewProducts((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      <FiTrash2 className="text-red-600 hover:scale-125 transition-all duration-200" />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col lg:flex-row gap-5 lg:gap-16">
                    {/* LEFT 30% */}
                    <div className="w-full lg:w-[30%] space-y-3">
                      <div className="grid md:grid-cols-2 gap-2">
                        <div className="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl">
                          <p className="text-[11px] text-gray-500 mb-1">
                            Company Name
                          </p>
                          <p className="text-lg font-semibold text-gray-800">
                            {product.companyName || "-"}
                          </p>
                        </div>

                        <div className="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl">
                          <p className="text-[11px] text-gray-500 mb-1">
                            Collection Name
                          </p>
                          <p className="text-lg font-semibold text-gray-800">
                            {product.collectionName || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl">
                        <p className="text-[11px] text-gray-500 mb-1">
                          Serial Number
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          {product.productCode || "-"}
                        </p>
                      </div>

                      {/* Attachments */}
                      <div className="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl">
                        <p className="text-[11px] text-gray-500 mb-2">
                          Attachments ({product.attachments?.length || 0})
                        </p>

                        {product.attachments?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {product.attachments.map((file, fileIndex) => (
                              <img
                                key={fileIndex}
                                src={
                                  file.url ||
                                  file.preview ||
                                  (file instanceof File
                                    ? URL.createObjectURL(file)
                                    : "")
                                }
                                alt=""
                                className="w-12 h-12 object-cover rounded-lg border"
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

                    {/* RIGHT 70% */}
                    <div className="w-full lg:w-[70%]">
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

                                    <div className="absolute top-0 left-29 w-24 border rounded-md px-2 py-1 text-center bg-white font-bold">
                                      {m.width}
                                    </div>

                                    <div className="absolute top-18 -left-10 w-24 border rounded-md px-2 py-1 text-center bg-white font-bold">
                                      {m.height}
                                    </div>

                                    <div className="absolute top-12 left-18 w-44 h-21 bg-white border rounded-xl p-2 shadow-sm">
                                      <p className="text-xs">
                                        {m.details || "-"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={showCancelModal}
        title="Cancel Room Edit"
        message="All unsaved room changes will be lost."
        onCancel={() => setShowCancelModal(false)}
        onConfirm={() => {
          setShowCancelModal(false);
          onCancel();
        }}
      />
    </>
  );
};

export default RoomForm;

// import React, { useState, useEffect } from "react";
// import ProductForm from "../ProductForm";
// const emptyProduct = () => {
//   return {
//     category: "",
//     collectionName: "",
//     companyName: "",
//     name: "",
//     price: 0,
//     productCode: "",
//     brand: "",
//     quantity: 1,
//     deliveryDate: "",
//     orderStatus: "Open",
//     specialNotes: "",
//     attributes: {
//       measurements: [],
//     },
//   };
// };

// const RoomForm = ({ room, onChange, onCancel, onSave }) => {
//   const [formData, setFormData] = useState(room);

//   // ONLY NEW PRODUCTS
//   const [newProducts, setNewProducts] = useState([]);

//   useEffect(() => {
//     setFormData(room);
//   }, [room]);

//   const handleChange = (field, value) => {
//     const updated = {
//       ...formData,
//       [field]: value,
//     };

//     setFormData(updated);
//     onChange?.(updated);
//   };

//   // ADD PRODUCT
//   const addProduct = () => {
//     setNewProducts((prev) => [...prev, emptyProduct()]);
//   };

//   // UPDATE PRODUCT
//   const updateProduct = (index, updatedProduct) => {
//     const updatedProducts = [...newProducts];

//     updatedProducts[index] = updatedProduct;

//     setNewProducts(updatedProducts);
//   };

//   // REMOVE PRODUCT
//   const removeProduct = (index) => {
//     setNewProducts((prev) => prev.filter((_, i) => i !== index));
//   };

//   // SAVE ROOM
//   const handleSave = () => {
//     const updatedRoom = {
//       ...formData,

//       // merge old + new
//       products: [...newProducts],
//     };
//     console.log(111111, updatedRoom);

//     onSave(updatedRoom);
//   };

//   return (
//     <div className="p-4 bg-white rounded-xl">
//       <h3 className="text-xl font-bold mb-3">Edit Room</h3>

//       {/* ROOM TYPE */}
//       <input
//         className="border p-2 w-full mb-2 rounded"
//         value={formData?.roomType || ""}
//         onChange={(e) => handleChange("roomType", e.target.value)}
//         placeholder="Room Type"
//       />

//       {/* ROOM NAME */}
//       <input
//         className="border p-2 w-full mb-4 rounded"
//         value={formData?.roomName || ""}
//         onChange={(e) => handleChange("roomName", e.target.value)}
//         placeholder="Room Name"
//       />

//       {/* ADD PRODUCTS */}
//       <div className="space-y-4">
//         {newProducts.map((product, index) => (
//           <div key={product._id || index} className="border rounded-xl p-3">
//             <ProductForm
//               product={product}
//               index={index}
//               onUpdate={(updatedProduct) =>
//                 updateProduct(index, updatedProduct)
//               }
//             />

//             <div className="flex justify-end mt-2">
//               <button
//                 onClick={() => removeProduct(index)}
//                 className="text-red-500 text-sm"
//               >
//                 Remove Product
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ADD PRODUCT BUTTON */}
//       <button
//         onClick={addProduct}
//         className="mt-4 px-4 py-2 bg-gray-100 rounded-lg"
//       >
//         + Add Product
//       </button>

//       {/* ACTIONS */}
//       <div className="flex gap-2 justify-end mt-6">
//         <button
//           onClick={onCancel}
//           className="px-4 py-2 border rounded hover:bg-gray-100"
//         >
//           Cancel
//         </button>

//         <button
//           onClick={handleSave}
//           className="px-4 py-2 bg-black text-white rounded"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RoomForm;
