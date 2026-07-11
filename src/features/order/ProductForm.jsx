import React, { useEffect, useRef, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useForm, useFieldArray } from "react-hook-form";
import { IMAGES } from "@/constants/images";
import productsData from "../../products";
import SofaSelectionModal from "./common/SofaSelectionModal";
import CurtainMeasurementDiagram from "@/components/common/CurtainMeasurementDiagram";
import SofaMeasurementDiagram from "@/components/common/SofaMeasurementDiagram";
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
import ThreeSeaterSofaDiagram from "../../components/common/sofa-diagram/ThreeSeaterSofaDiagram";
import OneSeaterSofaDiagram from "../../components/common/sofa-diagram/OneSeaterSofaDiagram";
import TwoSeaterSofaDiagram from "../../components/common/sofa-diagram/TwoSeaterSofaDiagram";
import LShapeSofaDiagram from "../../components/common/sofa-diagram/LeftLShapeSofaDiagram";
// import ReclinerDiagram from "../../components/common/sofa-diagram/ReclinerDiagram";
import ChaiseLoungeDiagram from "../../components/common/sofa-diagram/ChaiseLoungeDiagram";
import UShapeSofaDiagram from "../../components/common/sofa-diagram/UShapeSofaDiagram";

import OttomanDiagram from "../../components/common/sofa-diagram/OttomanDiagram";
import RotatingChairDiagram from "../../components/common/sofa-diagram/RotatingChairDiagram";
import StorageSofaDiagram from "../../components/common/sofa-diagram/StorageSofaDiagram";
import FourSeaterSofaDiagram from "../../components/common/sofa-diagram/FourSeaterSofaDiagram";
import RightLShapeSofaDiagram from "../../components/common/sofa-diagram/RightLShapeSofaDiagram ";
import ModularSectionalSofaDiagram from "../../components/common/sofa-diagram/SectionalModularSofaDiagram";
import CornerSofaDiagram from "../../components/common/sofa-diagram/CornerSofaDiagram";
import SofaCumBedPullOutDiagram from "../../components/common/sofa-diagram/SofaCumBedPullOutDiagram";
import SofaCumBedHydraulicDiagram from "../../components/common/sofa-diagram/SofaCumBedHydraulicDiagram";

import ReclinerSofa1SeaterDiagram from "../../components/common/sofa-diagram/ReclinerSofa1SeaterDiagram";
import ReclinerSofaDiagram3Seater from "../../components/common/sofa-diagram/ReclinerSofaDiagram3Seater";
import ChaiseLoungeSofaDiagram from "../../components/common/sofa-diagram/ChaiseLoungeSofaDiagram";
import DiwanSofaDiagram from "../../components/common/sofa-diagram/DiwanSofaDiagram";
import OttomanSofaDiagram from "../../components/common/sofa-diagram/OttomanDiagram";
import BenchSofaDiagram from "../../components/common/sofa-diagram/BenchDiagram";
import RotatingChairs360Diagram from "../../components/common/sofa-diagram/RotatingChairs360Diagram";

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
      subCategory: "",

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
  const [isSofaModalOpen, setIsSofaModalOpen] = useState(false);
  const getEmptyFormValues = () => ({
    ...emptyProduct(),
    subCategory: "",
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
  const selectedSofaType = watch("subCategory");

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
      subCategory: formData.subCategory || "",
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
    //console.log("Product:", product);
    //console.log("Product subCategory:", product.subCategory);
    const flatProduct = {
      ...emptyProduct(),

      _id: product._id || "",
      category: product.category || "",
      subCategory: product.subCategory || "",
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
    console.log("subCategory:", getValues("subCategory"));
    console.log("measurements:", getValues("attributes.measurements"));
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

  const sofaOptions = [
    {
      value: "4-seater-sofas",
      label: "4 Seater Sofas",
      image: IMAGES.FoureaterSofa,
    },
    {
      value: "3-seater-sofas",
      label: "3 Seater Sofas",
      image: IMAGES.ThreeSeaterSofaDiagram,
    },
    {
      value: "2-seater-sofas",
      label: "2 Seater Sofas",
      image: IMAGES.TwoSeaterSofaDiagram,
    },
    {
      value: "1-seater-sofas",
      label: "1 Seater Sofas",
      image: IMAGES.OneSeaterSofaDiagram,
    },

    {
      value: "left-l-shape-sofas",
      label: "Left L-Shape Sofas",
      image: IMAGES.LShapeSofaDiagram,
    },
    {
      value: "right-l-shape-sofas",
      label: "Right L-Shape Sofas",
      image: IMAGES.LShapeSofaDiagram,
    },
    {
      value: "u-shape-sofas",
      label: "U-Shape Sofas",
      image: IMAGES.UShapeSofaDiagram,
    },
    {
      value: "sectional-sofas",
      label: "Sectional Sofas (Modular)",
      image: IMAGES.SectionalModularSofaDiagram,
    },
    {
      value: "corner-sofas",
      label: "Corner Sofas",
      image: IMAGES.CornerSofaDiagram,
    },

    {
      value: "sofa-cum-bed-pull-out",
      label: "Sofa Cum Bed (Pull Out)",
      image: IMAGES.SofaCumBedPullOutDiagram,
    },
    {
      value: "sofa-cum-bed-fold-out",
      label: "Sofa Cum Bed (Fold Out)",
      image: IMAGES.SofaCumBedPullOutDiagram,
    },
    {
      value: "storage-sofas",
      label: "Sofa Cum Bed (Hydraulic Storage)",
      image: IMAGES.SofaCumBedHydraulic,
    },

    {
      value: "recliner-single",
      label: "Recliner Sofa (1 Seater)",
      image: IMAGES.ReclinerSofa1Seater,
    },
    {
      value: "recliner-sofas",
      label: "Recliner Sofa (3 Seater)",
      image: IMAGES.ReclinerSofaDiagram3Seater,
    },

    {
      value: "chaise-lounge",
      label: "Chaise Lounge",
      image: IMAGES.ChaiseLoungeSofaDiagram,
    },
    {
      value: "divan-daybed",
      label: "Divan / Daybed",
      image: IMAGES.DiwanSofaDiagram,
    },
    {
      value: "ottoman",
      label: "Ottoman / Pouffe",
      image: IMAGES.OttomanDiagram,
    },
    {
      value: "bench-stool",
      label: "Bench / Stool",
      image: IMAGES.BenchDiagram,
    },

    {
      value: "360-rotating-chairs",
      label: "360° Rotating Chairs",
      image: IMAGES.RotatingChairs360Diagram,
    },
  ];

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
        <div className="grid grid-cols-1 gap-2  lg:border-r max-h-[370px]  lg:pr-6 border-gray-800 ">
          {/* category */}
          <FormField
            name="category"
            label="Select Product"
            type="select"
            control={control}
            placeholder="Select Product"
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
        <div className="w-full min-h-[350px]">
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
          {selectedCategory === "sofa-&seating" && (
            <>
              <div className="flex gap-2 items-end max-w-[300px]">
                <div className="flex-1">
                  <FormField
                    name="subCategory"
                    label="Select Type of Sofa"
                    type="select"
                    control={control}
                    placeholder="Select Sofa Type"
                    options={sofaOptions}
                    disabled={!!product?._id}
                  />
                </div>

                {!product?._id && (
                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={() => setIsSofaModalOpen(true)}
                      className="flex items-center gap-2 h-10 rounded-lg bg-black px-4 text-white"
                    >
                      <FiImage size={18} />
                      Choose Image
                    </button>
                  </div>
                )}
              </div>

              {selectedSofaType === "3-seater-sofas" && (
                <ThreeSeaterSofaDiagram control={control} />
              )}
              {selectedSofaType === "4-seater-sofas" && (
                <FourSeaterSofaDiagram control={control} />
              )}

              {selectedSofaType === "2-seater-sofas" && (
                <TwoSeaterSofaDiagram control={control} />
              )}

              {selectedSofaType === "1-seater-sofas" && (
                <OneSeaterSofaDiagram control={control} />
              )}

              {selectedSofaType === "left-l-shape-sofas" && (
                <LShapeSofaDiagram control={control} />
              )}
              {selectedSofaType === "right-l-shape-sofas" && (
                <RightLShapeSofaDiagram control={control} />
              )}

              {selectedSofaType === "u-shape-sofas" && (
                <UShapeSofaDiagram control={control} />
              )}
              {selectedSofaType === "sectional-sofas" && (
                <ModularSectionalSofaDiagram control={control} />
              )}
              {selectedSofaType === "corner-sofas" && (
                <CornerSofaDiagram control={control} />
              )}
              {selectedSofaType === "sofa-cum-bed-pull-out" && (
                <SofaCumBedPullOutDiagram control={control} />
              )}
              {selectedSofaType === "sofa-cum-bed-fold-out" && (
                <SofaCumBedPullOutDiagram control={control} />
              )}
              {selectedSofaType === "storage-sofas" && (
                <SofaCumBedHydraulicDiagram control={control} />
              )}
              {selectedSofaType === "recliner-single" && (
                <ReclinerSofa1SeaterDiagram control={control} />
              )}
              {selectedSofaType === "recliner-sofas" && (
                <ReclinerSofaDiagram3Seater control={control} />
              )}
              {selectedSofaType === "chaise-lounge" && (
                <ChaiseLoungeSofaDiagram control={control} />
              )}
              {selectedSofaType === "divan-daybed" && (
                <DiwanSofaDiagram control={control} />
              )}
              {selectedSofaType === "ottoman" && (
                <OttomanSofaDiagram control={control} />
              )}
              {selectedSofaType === "bench-stool" && (
                <BenchSofaDiagram control={control} />
              )}
              {selectedSofaType === "360-rotating-chairs" && (
                <RotatingChairs360Diagram control={control} />
              )}
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
      <SofaSelectionModal
        open={isSofaModalOpen}
        onOpenChange={setIsSofaModalOpen}
        sofaOptions={sofaOptions}
        onSelect={(value) => {
          setValue("subCategory", value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        }}
      />
    </div>
  );
};

export default ProductForm;

// import React, { useEffect, useRef, useState, useMemo } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { IMAGES } from "@/constants/images";
// import productsData from "../../products";
// import CurtainMeasurementDiagram from "@/components/common/CurtainMeasurementDiagram";
// import SofaMeasurementDiagram from "@/components/common/SofaMeasurementDiagram";
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
// import ThreeSeaterSofaDiagram from "../../components/common/sofa-diagram/ThreeSeaterSofaDiagram";
// import OneSeaterSofaDiagram from "../../components/common/sofa-diagram/OneSeaterSofaDiagram";
// import TwoSeaterSofaDiagram from "../../components/common/sofa-diagram/TwoSeaterSofaDiagram";
// import LShapeSofaDiagram from "../../components/common/sofa-diagram/LeftLShapeSofaDiagram";
// import ReclinerDiagram from "../../components/common/sofa-diagram/ReclinerDiagram";
// import ChaiseLoungeDiagram from "../../components/common/sofa-diagram/ChaiseLoungeDiagram";
// import UShapeSofaDiagram from "../../components/common/sofa-diagram/UShapeSofaDiagram";

// import OttomanDiagram from "../../components/common/sofa-diagram/OttomanDiagram";
// import RotatingChairDiagram from "../../components/common/sofa-diagram/RotatingChairDiagram";
// import StorageSofaDiagram from "../../components/common/sofa-diagram/StorageSofaDiagram";
// import FourSeaterSofaDiagram from "../../components/common/sofa-diagram/FourSeaterSofaDiagram";
// import RightLShapeSofaDiagram from "../../components/common/sofa-diagram/RightLShapeSofaDiagram ";
// import ModularSectionalSofaDiagram from "../../components/common/sofa-diagram/SectionalModularSofaDiagram";
// import CornerSofaDiagram from "../../components/common/sofa-diagram/CornerSofaDiagram";
// import SofaCumBedPullOutDiagram from "../../components/common/sofa-diagram/SofaCumBedPullOutDiagram";
// import SofaCumBedHydraulicDiagram from "../../components/common/sofa-diagram/SofaCumBedHydraulicDiagram";

// import ReclinerSofa1SeaterDiagram from "../../components/common/sofa-diagram/ReclinerSofa1SeaterDiagram";
// import ReclinerSofaDiagram3Seater from "../../components/common/sofa-diagram/ReclinerSofaDiagram3Seater";
// import ChaiseLoungeSofaDiagram from "../../components/common/sofa-diagram/ChaiseLoungeSofaDiagram";
// import DiwanSofaDiagram from "../../components/common/sofa-diagram/DiwanSofaDiagram";
// import OttomanSofaDiagram from "../../components/common/sofa-diagram/OttomanDiagram";
// import BenchSofaDiagram from "../../components/common/sofa-diagram/BenchDiagram";
// import RotatingChairs360Diagram from "../../components/common/sofa-diagram/RotatingChairs360Diagram";

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
//       subCategory: "",

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
//     subCategory: "",
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
//   const selectedSofaType = watch("subCategory");

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
//       subCategory: formData.subCategory || "",
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

//   const previousProductIdRef = useRef();

//   useEffect(() => {
//     if (!product || Object.keys(product).length === 0) {
//       reset(getEmptyFormValues());
//       previousProductIdRef.current = undefined;
//       return;
//     }

//     const productKey =
//       product._id ||
//       product.id ||
//       JSON.stringify({
//         category: product.category,
//         productCode: product.productCode,
//       });

//     if (previousProductIdRef.current === productKey) {
//       return;
//     }

//     previousProductIdRef.current = productKey;

//     isUpdatingFromProp.current = true;
//     console.log("Product:", product);
//     console.log("Product subCategory:", product.subCategory);
//     const flatProduct = {
//       subCategory: product.subCategory || "",

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

//   const sofaOptions = [
//     {
//       value: "4-seater-sofas",
//       label: "4 Seater Sofas",
//       image: IMAGES.FourSeaterDiagram,
//     },
//     {
//       value: "3-seater-sofas",
//       label: "3 Seater Sofas",
//       image: IMAGES.ThreeSeaterDiagram,
//     },
//     {
//       value: "2-seater-sofas",
//       label: "2 Seater Sofas",
//       image: IMAGES.TwoSeaterDiagram,
//     },
//     {
//       value: "1-seater-sofas",
//       label: "1 Seater Sofas",
//       image: IMAGES.OneSeaterDiagram,
//     },

//     {
//       value: "left-l-shape-sofas",
//       label: "Left L-Shape Sofas",
//       image: IMAGES.LeftLShapeDiagram,
//     },
//     {
//       value: "right-l-shape-sofas",
//       label: "Right L-Shape Sofas",
//       image: IMAGES.RightLShapeDiagram,
//     },
//     {
//       value: "u-shape-sofas",
//       label: "U-Shape Sofas",
//       image: IMAGES.UShapeDiagram,
//     },
//     {
//       value: "sectional-sofas",
//       label: "Sectional Sofas (Modular)",
//       image: IMAGES.SectionalDiagram,
//     },
//     {
//       value: "corner-sofas",
//       label: "Corner Sofas",
//       image: IMAGES.CornerSofaDiagram,
//     },

//     {
//       value: "sofa-cum-bed-pull-out",
//       label: "Sofa Cum Bed (Pull Out)",
//       image: IMAGES.PullOutSofaBedDiagram,
//     },
//     {
//       value: "sofa-cum-bed-fold-out",
//       label: "Sofa Cum Bed (Fold Out)",
//       image: IMAGES.FoldOutSofaBedDiagram,
//     },
//     {
//       value: "storage-sofas",
//       label: "Sofa Cum Bed (Hydraulic Storage)",
//       image: IMAGES.StorageSofaDiagram,
//     },

//     {
//       value: "recliner-single",
//       label: "Recliner Sofa (1 Seater)",
//       image: IMAGES.SingleReclinerDiagram,
//     },
//     {
//       value: "recliner-sofas",
//       label: "Recliner Sofa (3 Seater)",
//       image: IMAGES.ReclinerSofaDiagram,
//     },

//     {
//       value: "chaise-lounge",
//       label: "Chaise Lounge",
//       image: IMAGES.ChaiseLoungeDiagram,
//     },
//     {
//       value: "divan-daybed",
//       label: "Divan / Daybed",
//       image: IMAGES.DivanDiagram,
//     },
//     {
//       value: "ottoman",
//       label: "Ottoman / Pouffe",
//       image: IMAGES.OttomanDiagram,
//     },
//     {
//       value: "bench-stool",
//       label: "Bench / Stool",
//       image: IMAGES.BenchDiagram,
//     },

//     {
//       value: "360-rotating-chairs",
//       label: "360° Rotating Chairs",
//       image: IMAGES.RotatingChairDiagram,
//     },
//   ];
//   return (
//     <div id="product-form" className=" rounded-xl   ">
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
//       <div className=" grid lg:grid-cols-[30%_70%] gap-3 pt-1 w-full">
//         {/* left  */}
//         <div className="grid grid-cols-1 gap-2  lg:border-r max-h-[350px]  lg:pr-6 border-gray-800 ">
//           {/* category */}
//           <FormField
//             name="category"
//             label="Select Product"
//             type="select"
//             control={control}
//             placeholder="Select Product"
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
//         <div className="w-full ">
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
//           {selectedCategory === "sofa-&seating" && (
//             <>
//               {!product?._id && (
//                 <div className="max-w-[360px]">
//                   <FormField
//                     name="subCategory"
//                     label="Select Type of Sofa"
//                     type="select"
//                     control={control}
//                     placeholder="Select Sofa Type"
//                     options={sofaOptions}
//                   />
//                 </div>
//               )}

//               {selectedSofaType === "3-seater-sofas" && (
//                 <ThreeSeaterSofaDiagram control={control} />
//               )}
//               {selectedSofaType === "4-seater-sofas" && (
//                 <FourSeaterSofaDiagram control={control} />
//               )}

//               {selectedSofaType === "2-seater-sofas" && (
//                 <TwoSeaterSofaDiagram control={control} />
//               )}

//               {selectedSofaType === "1-seater-sofas" && (
//                 <OneSeaterSofaDiagram control={control} />
//               )}

//               {selectedSofaType === "left-l-shape-sofas" && (
//                 <LShapeSofaDiagram control={control} />
//               )}
//               {selectedSofaType === "right-l-shape-sofas" && (
//                 <RightLShapeSofaDiagram control={control} />
//               )}

//               {selectedSofaType === "u-shape-sofas" && (
//                 <UShapeSofaDiagram control={control} />
//               )}
//               {selectedSofaType === "sectional-sofas" && (
//                 <ModularSectionalSofaDiagram control={control} />
//               )}
//               {selectedSofaType === "corner-sofas" && (
//                 <CornerSofaDiagram control={control} />
//               )}
//               {selectedSofaType === "sofa-cum-bed-pull-out" && (
//                 <SofaCumBedPullOutDiagram control={control} />
//               )}
//               {selectedSofaType === "sofa-cum-bed-fold-out" && (
//                 <SofaCumBedPullOutDiagram control={control} />
//               )}
//               {selectedSofaType === "storage-sofas" && (
//                 <SofaCumBedHydraulicDiagram control={control} />
//               )}
//               {selectedSofaType === "recliner-single" && (
//                 <ReclinerSofa1SeaterDiagram control={control} />
//               )}
//               {selectedSofaType === "recliner-sofas" && (
//                 <ReclinerSofaDiagram3Seater control={control} />
//               )}
//               {selectedSofaType === "chaise-lounge" && (
//                 <ChaiseLoungeSofaDiagram control={control} />
//               )}
//               {selectedSofaType === "divan-daybed" && (
//                 <DiwanSofaDiagram control={control} />
//               )}
//               {selectedSofaType === "ottoman" && (
//                 <OttomanSofaDiagram control={control} />
//               )}
//               {selectedSofaType === "bench-stool" && (
//                 <BenchSofaDiagram control={control} />
//               )}
//               {selectedSofaType === "360-rotating-chairs" && (
//                 <RotatingChairs360Diagram control={control} />
//               )}

//               {/* {selectedSofaType === "chaise-lounge" && (
//                 <ChaiseLoungeDiagram control={control} />
//               )}

//               {selectedSofaType === "recliner-sofas" && (
//                 <ReclinerDiagram control={control} />
//               )}

//               {selectedSofaType === "storage-sofas" && (
//                 <StorageSofaDiagram control={control} />
//               )}

//               {selectedSofaType === "360-rotating-chairs" && (
//                 <RotatingChairDiagram control={control} />
//               )}

//               {selectedSofaType === "ottoman" && (
//                 <OttomanDiagram control={control} />
//               )} */}
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
