import React, { useEffect, useState } from "react";
import Select from "react-select";
import ProductForm from "../ProductForm";
import { FiPlus, FiTrash2, FiHome, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { SelectStyles, InputStyles } from "@/constants/Config";

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

const RoomForm = ({ room, onChange, onCancel, onSave }) => {
  const [formData, setFormData] = useState(room);
  const [currentProduct, setCurrentProduct] = useState(emptyProduct());
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    setFormData(room);
  }, [room]);

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
    <div className="bg-[#f8f9fc] min-h-full rounded-3xl overflow-hidden">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white border-b px-4 sm:px-6 py-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg">
              <FiHome size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">Edit Room</h2>

              <p className="text-sm text-gray-500 mt-1">
                Update room details and manage products
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="
                px-5 py-2.5 rounded-xl border border-black
                hover:bg-gray-100 transition font-medium
              "
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="
                px-5 py-2.5 rounded-xl bg-black text-white
                hover:bg-gray-800 transition
                flex items-center gap-2 font-medium
              "
            >
              <FiSave />
              Save Room
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* ROOM DETAILS CARD */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          {/* CARD HEADER */}
          <div className="px-5 py-4 border-b bg-black">
            <h3 className="text-lg font-semibold text-white">
              Room Information
            </h3>
          </div>

          {/* CARD BODY */}
          <div className="p-5 grid  grid-cols-1 md:grid-cols-2 gap-5">
            {/* ROOM TYPE */}
            <div>
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
            <div className="">
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
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="space-y-5">
          {showProductForm && (
            <ProductForm
              product={currentProduct}
              onUpdate={setCurrentProduct}
            />
          )}
          {newProducts.length > 0 && (
            <div className="space-y-2 mt-4">
              {newProducts.map((product, index) => (
                <div
                  key={product.id || index}
                  className="border rounded-xl p-3 flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold">{product.category}</div>

                    <div className="text-sm text-gray-500">
                      {product.companyName}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setNewProducts((prev) =>
                        prev.filter((_, i) => i !== index),
                      );
                    }}
                  >
                    <FiTrash2 className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ADD PRODUCT BUTTON */}
        <button
          type="button"
          onClick={() => {
            if (!showProductForm) {
              setShowProductForm(true);
              return;
            }

            addProduct();
          }}
          className="
    inline-flex items-center gap-2 cursor-pointer
    px-4 py-2
    rounded-xl
    bg-black text-white
    hover:bg-gray-800
    transition
  "
        >
          <FiPlus size={16} />

          <span className="text-sm font-medium">
            {showProductForm ? "Save Product" : "Add Product"}
          </span>
        </button>
      </div>
    </div>
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
