import React, { useEffect, useRef, useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import productsData from "../../products";
import CurtainMeasurementDiagram from "@/components/common/CurtainMeasurementDiagram";
import FIELD_CONFIG from "../../constants/inputFieldConfig";
import { ORDER_FIELDS } from "../../constants/orderInputFields";
import {
  categoryKeyMap,
  getAllFieldNames,
  getCategoryFields,
  emptyProduct,
} from "./orderUtils";
import { FiTrash2 } from "react-icons/fi";
import FormField from "./common/FormField";
import ImagePreviewModal from "./common/ImagePreviewModal";
const ProductForm = ({
  product,
  onUpdate,
  onRemove,
  hideRemove = false,
  onResetForm,
}) => {
  const { setValue, watch, control, reset, getValues } = useForm({
    defaultValues: {
      ...emptyProduct(),

      attributes: {
        measurements: [
          {
            windowName: "",
            width: "",
            height: "",
            unit: "inch",
            details: "",
          },
          {
            windowName: "",
            width: "",
            height: "",
            unit: "inch",
            details: "",
          },
        ],
      },

      orderStatus: "Open",
      measurementUnit: "Inch",
      repairOrNew: "New",
      ...product,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes.measurements",
  });

  const getEmptyFormValues = () => ({
    ...emptyProduct(),

    attributes: {
      measurements: [
        {
          windowName: "",
          width: "",
          height: "",
          unit: "inch",
          details: "",
        },
      ],
    },

    orderStatus: "Open",
    measurementUnit: "Inch",
    repairOrNew: "New",
  });
  const selectedCategory = watch("category");
  const [previewFile, setPreviewFile] = useState(null);
  const liningValue = watch("lining");
  const widthValue = watch("width");
  const heightValue = watch("height");
  const measurementUnit = watch("measurementUnit");
  const fieldsToRender = ORDER_FIELDS[categoryKeyMap[selectedCategory]] || [];

  const isUpdatingFromProp = useRef(false);

  // Add this function to convert form data to your desired format
  const convertToProductFormat = (formData) => {
    const attributes = {
      measurements: Array.isArray(formData.attributes?.measurements)
        ? formData.attributes.measurements
        : [],
    };

    const categoryFields = getCategoryFields(formData.category) || [];

    categoryFields.forEach((field) => {
      if (
        field !== "measurements" &&
        formData[field] !== undefined &&
        formData[field] !== ""
      ) {
        attributes[field] = formData[field];
      }
    });

    return {
      ...(formData._id ? { _id: formData._id } : {}),
      category: formData.category,
      name: formData.name || "",
      price: Number(formData.price) || 0,
      companyName: formData.companyName || "",
      collectionName: formData.collectionName || "",
      attachments: Array.isArray(formData.attachments)
        ? formData.attachments.filter(Boolean)
        : [],
      productCode: formData.productCode || "",
      quantity: formData.quantity === "" ? "" : Number(formData.quantity),
      deliveryDate: formData.deliveryDate || "",
      orderStatus: formData.orderStatus?.trim() || "Open",
      specialNotes: formData.specialNotes || "",
      attributes,
    };
  };

  const previousValueRef = useRef("");
  useEffect(() => {
    if (!onResetForm) return;

    onResetForm(() => {
      reset(getEmptyFormValues());

      previousValueRef.current = "";
    });
  }, [onResetForm, reset]);
  useEffect(() => {
    const subscription = watch((value) => {
      const formattedProduct = convertToProductFormat(value);
      onUpdate(formattedProduct);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const previousProductIdRef = useRef();

  useEffect(() => {
    if (!product || Object.keys(product).length === 0) {
      reset(getEmptyFormValues());
      previousProductIdRef.current = undefined;
      return;
    }

    const productKey =
      product._id ||
      product.id ||
      JSON.stringify({
        category: product.category,
        productCode: product.productCode,
      });

    if (previousProductIdRef.current === productKey) {
      return;
    }

    previousProductIdRef.current = productKey;

    isUpdatingFromProp.current = true;

    const flatProduct = {
      ...emptyProduct(),

      _id: product._id || "",
      category: product.category || "",
      name: product.name || "",
      price: product.price || "",
      companyName: product.companyName || "",
      collectionName: product.collectionName || "",
      attachments: product.attachments || [],
      productCode: product.productCode || "",
      brand: product.brand || "",
      quantity: product.quantity ?? "",
      deliveryDate: product.deliveryDate || "",
      orderStatus: product.orderStatus || "Open",
      specialNotes: product.specialNotes || "",

      ...(product.attributes || {}),

      measurementUnit: product?.attributes?.measurementUnit || "Inch",

      repairOrNew: product?.attributes?.repairOrNew || "New",

      attributes: {
        measurements:
          product?.attributes?.measurements?.length > 0
            ? product.attributes.measurements
            : [
                {
                  windowName: "",
                  width: "",
                  height: "",
                  unit: "inch",
                  details: "",
                },
              ],
      },
    };

    reset(flatProduct);

    requestAnimationFrame(() => {
      isUpdatingFromProp.current = false;
    });
  }, [product, reset]);
  // Handle category change - preserve existing matching fields
  const previousCategory = useRef(selectedCategory);

  useEffect(() => {
    if (
      !isUpdatingFromProp.current &&
      previousCategory.current !== selectedCategory &&
      selectedCategory
    ) {
      previousCategory.current = selectedCategory;

      // Get current form values
      const currentValues = getValues();

      // Get fields that should be cleared (all dynamic fields)
      const allDynamicFields = getAllFieldNames();

      // Clear fields that don't belong to new category
      const newCategoryFields =
        ORDER_FIELDS[categoryKeyMap[selectedCategory]] || [];

      allDynamicFields.forEach((field) => {
        // Only clear if field is not in new category and not a base field
        if (!newCategoryFields.includes(field) && currentValues[field]) {
          setValue(field, "");
        }
      });

      // Reset brand and product
      setValue("brand", "");
      setValue("productId", "");
      // Default measurement unit for curtain
      // but allow user to change it later
    }
  }, [selectedCategory, setValue, getValues]);

  return (
    <div id="product-form" className=" rounded-xl   ">
      <div className="flex justify-between items-center ">
        {/* <h5 className="font-bold text-lg">Product Details</h5> */}
        {!hideRemove && onRemove && (
          <button
            className="px-3  rounded-lg bg-white border border-red-300 text-red-600 text-sm hover:bg-red-50"
            onClick={onRemove}
            type="button"
          >
            <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
          </button>
        )}
      </div>
      <div className=" grid lg:grid-cols-[30%_70%] gap-3 pt-1 w-full">
        {/* left  */}
        <div className="grid grid-cols-1 gap-2  lg:border-r max-h-[420px]  lg:pr-6 border-gray-800 ">
          {/* category */}
          <FormField
            name="category"
            label="Select Product"
            type="select"
            control={control}
            disabled={!!product?._id}
            options={productsData.map((cat) => ({
              value: cat.slug,
              label: cat.title,
            }))}
          />
          <div className="grid grid-cols-2  gap-2">
            <FormField
              name="companyName"
              label="Company Name"
              type="input"
              control={control}
              placeholder="Enter Company  Name"
            />
            <FormField
              name="collectionName"
              label="Collection Name"
              type="input"
              control={control}
              placeholder="Enter Collection Name"
            />
          </div>

          {/* product code */}
          <FormField
            name="productCode"
            label="Serial Number "
            type="input"
            control={control}
            placeholder="Enter Product Serial No."
          />
          {/* product attachments */}
          <FormField
            name="attachments"
            label="Attachments"
            type="file"
            control={control}
            placeholder="Upload attachments"
          />

          {/* <FormField
            name="price"
            label="Price"
            type="number"
            control={control}
            placeholder="Enter price"
          /> */}
        </div>
        {/* right */}
        <div className="w-full ">
          {/* Curtain Measurements */}
          {selectedCategory === "curtains" && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 ">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="
              
             
              
              
              relative
            "
                  >
                    <div className="flex justify-between items-center ">
                      <h3 className="font-bold text-sm pb-1 pl-1">
                        Curtain Measurment - {index + 1}
                      </h3>

                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="
                    text-red-600
                    hover:bg-red-50
                    rounded-xl
                    p-1 lg:pr-10
                    transition
                  "
                        >
                          <FiTrash2 size={18} />
                        </button>
                      )}
                    </div>

                    <CurtainMeasurementDiagram
                      control={control}
                      index={index}
                    />
                  </div>
                ))}
              </div>

              {/* FULL WIDTH BUTTON */}
              <button
                type="button"
                onClick={() =>
                  append({
                    windowName: "",
                    width: "",
                    height: "",
                    unit: "inch",
                    details: "",
                  })
                }
                className=" transition-all
    duration-200
    hover:scale-95 cursor-pointer
          w-full
          border-2 border-dashed border-gray-300
          rounded-2xl
          py-4
          flex items-center justify-center gap-2
          hover:bg-gray-50
          transition
          font-semibold
        "
              >
                + Add Curtain Measurement
              </button>
            </>
          )}

          {/* Dynamic Fields */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {fieldsToRender.map((fieldName) => {
              if (fieldName === "liningType" && liningValue !== "Yes") {
                return null;
              }

              const config = FIELD_CONFIG[fieldName] || {};

              return (
                <FormField
                  key={fieldName}
                  name={fieldName}
                  label={config.label || fieldName}
                  type={config.type || "input"}
                  control={control}
                  options={config.options || []}
                  placeholder={
                    config.placeholder || `Enter ${config.label || fieldName}`
                  }
                  rules={
                    fieldName === "liningType" && liningValue === "Yes"
                      ? { required: "Lining Type is required" }
                      : {}
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
      <ImagePreviewModal
        isOpen={!!previewFile}
        image={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
};

export default ProductForm;

// import React, { useEffect, useRef, useState, useMemo } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import productsData from "../../products";
// import CurtainMeasurementDiagram from "@/components/common/CurtainMeasurementDiagram";
// import FIELD_CONFIG from "../../constants/inputFieldConfig";
// import { ORDER_FIELDS } from "../../constants/orderInputFields";
// import {
//   categoryKeyMap,
//   getAllFieldNames,
//   getCategoryFields,
//   emptyProduct,
// } from "./orderUtils";
// import { FiTrash2 } from "react-icons/fi";
// import FormField from "./common/FormField";
// import ImagePreviewModal from "./common/ImagePreviewModal";
// const ProductForm = ({
//   product,
//   onUpdate,
//   onRemove,
//   hideRemove = false,
//   onResetForm,
// }) => {
//   const { setValue, watch, control, reset, getValues } = useForm({
//     defaultValues: {
//       ...emptyProduct(),

//       attributes: {
//         measurements: [
//           {
//             windowName: "",
//             width: "",
//             height: "",
//             unit: "inch",
//             details: "",
//           },
//           {
//             windowName: "",
//             width: "",
//             height: "",
//             unit: "inch",
//             details: "",
//           },
//         ],
//       },

//       orderStatus: "Open",
//       measurementUnit: "Inch",
//       repairOrNew: "New",
//       ...product,
//     },
//   });
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "attributes.measurements",
//   });

//   const getEmptyFormValues = () => ({
//     ...emptyProduct(),

//     attributes: {
//       measurements: [
//         {
//           windowName: "",
//           width: "",
//           height: "",
//           unit: "inch",
//           details: "",
//         },
//       ],
//     },

//     orderStatus: "Open",
//     measurementUnit: "Inch",
//     repairOrNew: "New",
//   });
//   const selectedCategory = watch("category");
//   const [previewFile, setPreviewFile] = useState(null);
//   const liningValue = watch("lining");
//   const widthValue = watch("width");
//   const heightValue = watch("height");
//   const measurementUnit = watch("measurementUnit");
//   const fieldsToRender = ORDER_FIELDS[categoryKeyMap[selectedCategory]] || [];

//   const isUpdatingFromProp = useRef(false);

//   // Add this function to convert form data to your desired format
//   const convertToProductFormat = (formData) => {
//     const attributes = {
//       measurements: Array.isArray(formData.attributes?.measurements)
//         ? formData.attributes.measurements
//         : [],
//     };

//     const categoryFields = getCategoryFields(formData.category) || [];

//     categoryFields.forEach((field) => {
//       if (
//         field !== "measurements" &&
//         formData[field] !== undefined &&
//         formData[field] !== ""
//       ) {
//         attributes[field] = formData[field];
//       }
//     });

//     return {
//       ...(formData._id ? { _id: formData._id } : {}),
//       category: formData.category,
//       name: formData.name || "",
//       price: Number(formData.price) || 0,
//       companyName: formData.companyName || "",
//       collectionName: formData.collectionName || "",
//       attachments: Array.isArray(formData.attachments)
//         ? formData.attachments.filter(Boolean)
//         : [],
//       productCode: formData.productCode || "",
//       quantity: formData.quantity === "" ? "" : Number(formData.quantity),
//       deliveryDate: formData.deliveryDate || "",
//       orderStatus: formData.orderStatus?.trim() || "Open",
//       specialNotes: formData.specialNotes || "",
//       attributes,
//     };
//   };

//   const previousValueRef = useRef("");
//   useEffect(() => {
//     if (!onResetForm) return;

//     onResetForm(() => {
//       reset(getEmptyFormValues());

//       previousValueRef.current = "";
//     });
//   }, [onResetForm, reset]);
//   useEffect(() => {
//     const subscription = watch((value) => {
//       const formattedProduct = convertToProductFormat(value);
//       onUpdate(formattedProduct);
//     });

//     return () => subscription.unsubscribe();
//   }, [watch]);

//   const hasInitialized = useRef(false);

//   useEffect(() => {
//     // prevent reset on every parent re-render
//     if (hasInitialized.current) return;

//     if (!product) return;

//     isUpdatingFromProp.current = true;

//     const flatProduct = {
//       ...emptyProduct(),

//       _id: product._id || "",
//       category: product.category || "",
//       name: product.name || "",
//       price: product.price || "",
//       companyName: product.companyName || "",
//       collectionName: product.collectionName || "",
//       attachments: product.attachments || [],
//       productCode: product.productCode || "",
//       brand: product.brand || "",
//       quantity: product.quantity ?? "",
//       deliveryDate: product.deliveryDate || "",
//       orderStatus: product.orderStatus || "Open",
//       specialNotes: product.specialNotes || "",

//       ...(product.attributes || {}),

//       measurementUnit: product?.attributes?.measurementUnit || "Inch",
//       repairOrNew: product?.attributes?.repairOrNew || "New",

//       attributes: {
//         measurements:
//           product?.attributes?.measurements?.length > 0
//             ? product.attributes.measurements
//             : [
//                 {
//                   windowName: "",
//                   width: "",
//                   height: "",
//                   unit: "inch",
//                   details: "",
//                 },
//               ],
//       },
//     };

//     reset(flatProduct);

//     hasInitialized.current = true;

//     requestAnimationFrame(() => {
//       isUpdatingFromProp.current = false;
//     });
//   }, []);
//   // Handle category change - preserve existing matching fields
//   const previousCategory = useRef(selectedCategory);

//   useEffect(() => {
//     if (
//       !isUpdatingFromProp.current &&
//       previousCategory.current !== selectedCategory &&
//       selectedCategory
//     ) {
//       previousCategory.current = selectedCategory;

//       // Get current form values
//       const currentValues = getValues();

//       // Get fields that should be cleared (all dynamic fields)
//       const allDynamicFields = getAllFieldNames();

//       // Clear fields that don't belong to new category
//       const newCategoryFields =
//         ORDER_FIELDS[categoryKeyMap[selectedCategory]] || [];

//       allDynamicFields.forEach((field) => {
//         // Only clear if field is not in new category and not a base field
//         if (!newCategoryFields.includes(field) && currentValues[field]) {
//           setValue(field, "");
//         }
//       });

//       // Reset brand and product
//       setValue("brand", "");
//       setValue("productId", "");
//       // Default measurement unit for curtain
//       // but allow user to change it later
//     }
//   }, [selectedCategory, setValue, getValues]);

//   return (
//     <div id="product-form" className=" rounded-xl  ">
//       <div className="flex justify-between items-center ">
//         {/* <h5 className="font-bold text-lg">Product Details</h5> */}
//         {!hideRemove && onRemove && (
//           <button
//             className="px-3  rounded-lg bg-white border border-red-300 text-red-600 text-sm hover:bg-red-50"
//             onClick={onRemove}
//             type="button"
//           >
//             <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
//           </button>
//         )}
//       </div>
//       <div className=" grid lg:grid-cols-[30%_70%] gap-3 py-1 w-full">
//         {/* left  */}
//         <div className="grid grid-cols-1 gap-2  lg:border-r max-h-[420px]  lg:pr-6 border-gray-800 ">
//           {/* category */}
//           <FormField
//             name="category"
//             label="Select Product"
//             type="select"
//             control={control}
//             disabled={!!product?._id}
//             options={productsData.map((cat) => ({
//               value: cat.slug,
//               label: cat.title,
//             }))}
//           />
//           <div className="grid grid-cols-2  gap-2">
//             <FormField
//               name="companyName"
//               label="Company Name"
//               type="input"
//               control={control}
//               placeholder="Enter Company  Name"
//             />
//             <FormField
//               name="collectionName"
//               label="Collection Name"
//               type="input"
//               control={control}
//               placeholder="Enter Collection Name"
//             />
//           </div>

//           {/* product code */}
//           <FormField
//             name="productCode"
//             label="Serial Number "
//             type="input"
//             control={control}
//             placeholder="Enter Product Serial No."
//           />
//           {/* product attachments */}
//           <FormField
//             name="attachments"
//             label="Attachments"
//             type="file"
//             control={control}
//             placeholder="Upload attachments"
//           />

//           {/* <FormField
//             name="price"
//             label="Price"
//             type="number"
//             control={control}
//             placeholder="Enter price"
//           /> */}
//         </div>
//         {/* right */}
//         <div className="w-full">
//           {/* Curtain Measurements */}
//           {selectedCategory === "curtains" && (
//             <>
//               <div className="grid grid-cols-1 lg:grid-cols-3 ">
//                 {fields.map((field, index) => (
//                   <div
//                     key={field.id}
//                     className="

//               relative
//             "
//                   >
//                     <div className="flex justify-between items-center ">
//                       <h3 className="font-bold text-sm pb-1 pl-1">
//                         Curtain Measurment - {index + 1}
//                       </h3>

//                       {fields.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => remove(index)}
//                           className="
//                     text-red-600
//                     hover:bg-red-50
//                     rounded-xl
//                     p-1 lg:pr-10
//                     transition
//                   "
//                         >
//                           <FiTrash2 size={18} />
//                         </button>
//                       )}
//                     </div>

//                     <CurtainMeasurementDiagram
//                       control={control}
//                       index={index}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* FULL WIDTH BUTTON */}
//               <button
//                 type="button"
//                 onClick={() =>
//                   append({
//                     windowName: "",
//                     width: "",
//                     height: "",
//                     unit: "inch",
//                     details: "",
//                   })
//                 }
//                 className=" transition-all
//     duration-200
//     hover:scale-95 cursor-pointer
//           w-full
//           border-2 border-dashed border-gray-300
//           rounded-2xl
//           py-4
//           flex items-center justify-center gap-2
//           hover:bg-gray-50
//           transition
//           font-semibold
//         "
//               >
//                 + Add Curtain Measurement
//               </button>
//             </>
//           )}

//           {/* Dynamic Fields */}
//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
//             {fieldsToRender.map((fieldName) => {
//               if (fieldName === "liningType" && liningValue !== "Yes") {
//                 return null;
//               }

//               const config = FIELD_CONFIG[fieldName] || {};

//               return (
//                 <FormField
//                   key={fieldName}
//                   name={fieldName}
//                   label={config.label || fieldName}
//                   type={config.type || "input"}
//                   control={control}
//                   options={config.options || []}
//                   placeholder={
//                     config.placeholder || `Enter ${config.label || fieldName}`
//                   }
//                   rules={
//                     fieldName === "liningType" && liningValue === "Yes"
//                       ? { required: "Lining Type is required" }
//                       : {}
//                   }
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <ImagePreviewModal
//         isOpen={!!previewFile}
//         image={previewFile}
//         onClose={() => setPreviewFile(null)}
//       />
//     </div>
//   );
// };

// export default ProductForm;
