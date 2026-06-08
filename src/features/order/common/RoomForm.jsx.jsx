import React, { useEffect, useState } from "react";
import Select from "react-select";
import ProductForm from "../ProductForm";
import { FiPlus, FiTrash2, FiHome, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { SelectStyles, InputStyles } from "@/constants/Config";
import { IoClose } from "react-icons/io5";
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
    <div className=" min-h-full rounded-3xl overflow-hidden">
      {/* HEADER */}
      <div className="sticky top-0 z-20   px-4 sm:px-6 py-2 ">
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
            <div className="">
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
              onClick={onCancel}
              className="
                px-5 md:py-2.5 py-1 rounded-xl border border-black
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
              Save Order
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className=" px-2">
        {/* PRODUCTS */}
        <div className="space-y-5">
          {showProductForm && (
            <div className="space-y-4">
              <ProductForm
                product={currentProduct}
                onUpdate={setCurrentProduct}
              />

              <div className="flex justify-end gap-3">
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
            <div className="space-y-2 my-1">
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
