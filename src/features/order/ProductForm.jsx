import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import FIELD_CONFIG from "../../constants/inputFieldConfig";
import { ORDER_FIELDS } from "../../constants/orderInputFields";
import { useCategories } from "@/features/product/services/categoryApi";
import { categoryKeyMap, getCategoryFields, emptyProduct } from "./orderUtils";
import FormField from "./common/FormField";
const categoryTitles = [
  "Curtains",
  "Sofa & Seating",
  "Mattress",
  "Bed Linen",
  "Bath Linen",
  "Flooring",
  "Wallpapers",
  "Rugs",
  "Blinds",
  "Glass Films",
  "Pillows",
  "Home Essentials",
];
const ProductForm = ({ product, onUpdate, onRemove, hideRemove = false }) => {
  const { setValue, watch, control, reset, getValues } = useForm({
    defaultValues: {
      ...emptyProduct(),
      orderStatus: "Open",
      measurementUnit: "Inch",
      repairOrNew: "New",
      ...product,
    },
  });
  const { data: categories = [], isLoading } = useCategories();
  const selectedCategory = watch("category");
  const selectedBrand = watch("brand");
  const liningValue = watch("lining");

  const selectedCategoryData = categories.find(
    (cat) => cat.title === selectedCategory,
  );

  const dynamicFields = selectedCategoryData?.fields || [];
  const isUpdatingFromProp = useRef(false);

  // Add this function to convert form data to your desired format
  const convertToProductFormat = (formData) => {
    // console.log("🔄 Converting form data:", formData);

    const categoryFields = getCategoryFields(formData.category);
    // console.log(
    //   "📋 Category fields for",
    //   formData.category,
    //   ":",
    //   categoryFields,
    // );

    // Extract attributes
    const attributes = {};
    categoryFields.forEach((field) => {
      if (formData[field] !== undefined && formData[field] !== "") {
        attributes[field] = formData[field];
        // console.log(`✅ Added to attributes: ${field} = ${formData[field]}`);
      }
    });

    const result = {
      _id: formData._id,
      category: formData.category,
      name: formData.name || ` `,
      price: Number(formData.price) || 0,
      productCode: formData.productCode || "",
      brand: formData.brand || "",
      quantity: formData.quantity === "" ? "" : Number(formData.quantity),
      deliveryDate: formData.deliveryDate || "",
      orderStatus: formData.orderStatus?.trim() || "Open",
      specialNotes: formData.specialNotes || "",
      attributes: attributes,
    };

    // console.log("📦 Final product:", result);
    return result;
  };

  // Then in your useEffect that watches form values
  useEffect(() => {
    const subscription = watch((value) => {
      if (!isUpdatingFromProp.current && onUpdate) {
        const formattedProduct = convertToProductFormat(value);
        onUpdate(formattedProduct);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  // Update form when product prop changes (for editing)
  useEffect(() => {
    if (!product) return;

    isUpdatingFromProp.current = true;

    const flatProduct = {
      ...emptyProduct(),

      _id: product._id || "",
      category: product.category || "",
      name: product.name || "",
      price: product.price || "",
      productCode: product.productCode || "",
      brand: product.brand || "",
      quantity: product.quantity ?? "",
      deliveryDate: product.deliveryDate || "",
      orderStatus: product.orderStatus || "Open",
      specialNotes: product.specialNotes || "",

      measurementUnit: product?.attributes?.measurementUnit || "Inch",
      repairOrNew: product?.attributes?.repairOrNew || "New",

      ...(product.attributes || {}),
    };

    // console.log("RESET FORM:", flatProduct);

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

      const allDynamicFields = categories.flatMap(
        (cat) => cat.fields?.map((field) => field.name) || [],
      );

      const newCategoryFields =
        selectedCategoryData?.fields?.map((field) => field.name) || [];

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
    <div
      id="product-form"
      className="border border-gray-200 rounded-xl p-4 mt-4"
    >
      <div className="flex justify-between items-center mb-3">
        <h5 className="font-bold text-lg">Product Details</h5>
        {!hideRemove && onRemove && (
          <button
            className="px-3 py-1 rounded-lg bg-white border border-red-300 text-red-600 text-sm hover:bg-red-50"
            onClick={onRemove}
            type="button"
          >
            <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* category */}
        <FormField
          name="category"
          label="Product Name"
          type="select"
          control={control}
          disabled={!!product?._id}
          options={categories.map((cat) => ({
            value: cat.title,
            label: cat.title,
          }))}
          // options={categoryTitles.map((title) => ({
          //   value: title,
          //   label: title,
          // }))}
          // options={productsData.map((cat) => ({
          //   value: cat.slug,
          //   label: cat.title,
          // }))}
        />

        {/* product code */}
        <FormField
          name="productCode"
          label="Product Code"
          type="input"
          control={control}
          placeholder="Enter Product Code"
        />
        {/* Add these fields at the beginning of the grid */}
        {/* <FormField
          name="name"
          label="Product Name"
          type="input"
          control={control}
          placeholder="Enter product name"
        /> */}

        <FormField
          name="price"
          label="Price"
          type="number"
          control={control}
          placeholder="Enter price"
        />

        {/* Rest of your existing fields... */}
        {/* product selection field */}
        {/* {selectedBrand && products.length > 0 && (
          <FormField
            name="productId"
            label="Product"
            type="select"
            control={control}
            options={products.map((p) => ({
              value: p.id,
              label: p.name,
            }))}
          />
        )} */}
        <FormField
          name="quantity"
          label="Quantity"
          type="number"
          control={control}
          placeholder="Enter quantity"
        />

        <FormField
          name="deliveryDate"
          label="Delivery Date"
          type="date"
          control={control}
        />

        <FormField
          name="orderStatus"
          label="Order Status"
          type="select" // 👈 change from input to select
          control={control}
          options={[
            { value: "Open", label: "Open" },
            { value: "Pending", label: "Pending" },
            { value: "Processing", label: "Processing" },
            { value: "Shipped", label: "Shipped" },
            { value: "Delivered", label: "Delivered" },
            { value: "Cancelled", label: "Cancelled" },
          ]}
        />

        {/* dynamic fields from ORDER_FIELDS */}
        {dynamicFields.map((field) => {
          // CONDITIONAL FIELD EXAMPLE
          if (field.name === "liningType" && liningValue !== "Yes") {
            return null;
          }

          return (
            <FormField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type || "input"}
              control={control}
              options={field.options || []}
              placeholder={`Enter ${field.label}`}
              rules={
                field.required
                  ? {
                      required: `${field.label} is required`,
                    }
                  : {}
              }
            />
          );
        })}
        {/* {fieldsToRender.map((fieldName) => {
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
        })} */}
        <FormField
          name="specialNotes"
          label="Special Notes"
          type="textarea"
          control={control}
          placeholder="Enter notes"
          className="md:rows-span-2"
        />
      </div>
    </div>
  );
};

export default ProductForm;

// import React, { useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import productsData from "../../products";
// import FIELD_CONFIG from "../../constants/inputFieldConfig";
// import { ORDER_FIELDS } from "../../constants/orderInputFields";
// import {
//   categoryKeyMap,
//   getAllFieldNames,
//   getCategoryFields,
//   emptyProduct,
// } from "./orderUtils";
// import FormField from "./common/FormField";

// const ProductForm = ({ product, onUpdate, onRemove, hideRemove = false }) => {
//   const { setValue, watch, control, reset, getValues } = useForm({
//     defaultValues: {
//       ...emptyProduct(),
//       orderStatus: "Open",
//       measurementUnit: "Inch",
//       repairOrNew: "New",
//       ...product,
//     },
//   });

//   const selectedCategory = watch("category");
//   const selectedBrand = watch("brand");
//   const liningValue = watch("lining");
//   const fieldsToRender = ORDER_FIELDS[categoryKeyMap[selectedCategory]] || [];

//   // const categoryData = productsData.find(
//   //   (cat) => cat.slug === selectedCategory,
//   // );

//   // const brands = categoryData?.brands || [];
//   //const brandData = brands.find((b) => b.name === selectedBrand);
//   // const products = brandData?.products || [];

//   const isUpdatingFromProp = useRef(false);
//   const previousProductRef = useRef(product);

//   // Add this function to convert form data to your desired format
//   const convertToProductFormat = (formData) => {
//     // console.log("🔄 Converting form data:", formData);

//     const categoryFields = getCategoryFields(formData.category);
//     // console.log(
//     //   "📋 Category fields for",
//     //   formData.category,
//     //   ":",
//     //   categoryFields,
//     // );

//     // Extract attributes
//     const attributes = {};
//     categoryFields.forEach((field) => {
//       if (formData[field] !== undefined && formData[field] !== "") {
//         attributes[field] = formData[field];
//         // console.log(`✅ Added to attributes: ${field} = ${formData[field]}`);
//       }
//     });

//     const result = {
//       _id: formData._id,
//       category: formData.category,
//       name: formData.name || ` `,
//       price: Number(formData.price) || 0,
//       productCode: formData.productCode || "",
//       brand: formData.brand || "",
//       quantity: formData.quantity === "" ? "" : Number(formData.quantity),
//       deliveryDate: formData.deliveryDate || "",
//       orderStatus: formData.orderStatus?.trim() || "Open",
//       specialNotes: formData.specialNotes || "",
//       attributes: attributes,
//     };

//     // console.log("📦 Final product:", result);
//     return result;
//   };

//   // Then in your useEffect that watches form values
//   useEffect(() => {
//     const subscription = watch((value) => {
//       if (!isUpdatingFromProp.current && onUpdate) {
//         const formattedProduct = convertToProductFormat(value);
//         onUpdate(formattedProduct);
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, onUpdate]);

//   // Update form when product prop changes (for editing)
//   useEffect(() => {
//     if (!product) return;

//     isUpdatingFromProp.current = true;

//     const flatProduct = {
//       ...emptyProduct(),

//       _id: product._id || "",
//       category: product.category || "",
//       name: product.name || "",
//       price: product.price || "",
//       productCode: product.productCode || "",
//       brand: product.brand || "",
//       quantity: product.quantity ?? "",
//       deliveryDate: product.deliveryDate || "",
//       orderStatus: product.orderStatus || "Open",
//       specialNotes: product.specialNotes || "",

//       measurementUnit: product?.attributes?.measurementUnit || "Inch",
//       repairOrNew: product?.attributes?.repairOrNew || "New",

//       ...(product.attributes || {}),
//     };

//     // console.log("RESET FORM:", flatProduct);

//     reset(flatProduct);

//     requestAnimationFrame(() => {
//       isUpdatingFromProp.current = false;
//     });
//   }, [product, reset]);
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
//     <div
//       id="product-form"
//       className="border border-gray-200 rounded-xl p-4 mt-4"
//     >
//       <div className="flex justify-between items-center mb-3">
//         <h5 className="font-bold text-lg">Product Details</h5>
//         {!hideRemove && onRemove && (
//           <button
//             className="px-3 py-1 rounded-lg bg-white border border-red-300 text-red-600 text-sm hover:bg-red-50"
//             onClick={onRemove}
//             type="button"
//           >
//             <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
//           </button>
//         )}
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//         {/* category */}
//         <FormField
//           name="category"
//           label="Product Name"
//           type="select"
//           control={control}
//           disabled={!!product?._id}
//           options={productsData.map((cat) => ({
//             value: cat.slug,
//             label: cat.title,
//           }))}
//         />

//         {/* product code */}
//         <FormField
//           name="productCode"
//           label="Product Code"
//           type="input"
//           control={control}
//           placeholder="Enter Product Code"
//         />
//         {/* Add these fields at the beginning of the grid */}
//         {/* <FormField
//           name="name"
//           label="Product Name"
//           type="input"
//           control={control}
//           placeholder="Enter product name"
//         /> */}

//         <FormField
//           name="price"
//           label="Price"
//           type="number"
//           control={control}
//           placeholder="Enter price"
//         />

//         {/* Rest of your existing fields... */}
//         {/* product selection field */}
//         {/* {selectedBrand && products.length > 0 && (
//           <FormField
//             name="productId"
//             label="Product"
//             type="select"
//             control={control}
//             options={products.map((p) => ({
//               value: p.id,
//               label: p.name,
//             }))}
//           />
//         )} */}
//         <FormField
//           name="quantity"
//           label="Quantity"
//           type="number"
//           control={control}
//           placeholder="Enter quantity"
//         />

//         <FormField
//           name="deliveryDate"
//           label="Delivery Date"
//           type="date"
//           control={control}
//         />

//         <FormField
//           name="orderStatus"
//           label="Order Status"
//           type="select" // 👈 change from input to select
//           control={control}
//           options={[
//             { value: "Open", label: "Open" },
//             { value: "Pending", label: "Pending" },
//             { value: "Processing", label: "Processing" },
//             { value: "Shipped", label: "Shipped" },
//             { value: "Delivered", label: "Delivered" },
//             { value: "Cancelled", label: "Cancelled" },
//           ]}
//         />

//         {/* dynamic fields from ORDER_FIELDS */}
//         {fieldsToRender.map((fieldName) => {
//           if (fieldName === "liningType" && liningValue !== "Yes") {
//             return null;
//           }

//           const config = FIELD_CONFIG[fieldName] || {};
//           return (
//             <FormField
//               key={fieldName}
//               name={fieldName}
//               label={config.label || fieldName}
//               type={config.type || "input"}
//               control={control}
//               options={config.options || []}
//               placeholder={
//                 config.placeholder || `Enter ${config.label || fieldName}`
//               }
//               rules={
//                 fieldName === "liningType" && liningValue === "Yes"
//                   ? { required: "Lining Type is required" }
//                   : {}
//               }
//             />
//           );
//         })}
//         <FormField
//           name="specialNotes"
//           label="Special Notes"
//           type="textarea"
//           control={control}
//           placeholder="Enter notes"
//           className="md:rows-span-2"
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductForm;
