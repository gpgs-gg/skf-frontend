import React from "react";
import Select from "react-select";

import { InputStyles, SelectStyles } from "@/constants/Config.js";

const fieldTypeOptions = [
  {
    label: "Input",
    value: "input",
  },
  {
    label: "Select",
    value: "select",
  },
  // {
  //   label: "Textarea",
  //   value: "textarea",
  // },
  // {
  //   label: "Number",
  //   value: "number",
  // },
  // {
  //   label: "Date",
  //   value: "date",
  // },
  // {
  //   label: "Checkbox",
  //   value: "checkbox",
  // },
];

const FieldBuilder = ({ field, index, register, setValue, watch }) => {
  // WATCH CURRENT FIELD TYPE
  const selectedType = watch(`fields.${index}.type`);
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* =====================================================
          LABEL
      ===================================================== */}

      <div className="md:col-span-3">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Label
        </label>

        <input
          {...register(`fields.${index}.label`)}
          placeholder="Enter field label"
          className={InputStyles.base}
        />
      </div>

      {/* =====================================================
          FIELD TYPE
      ===================================================== */}

      <div className="md:col-span-3">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Field Type
        </label>

        <Select
          styles={SelectStyles}
          options={fieldTypeOptions}
          value={fieldTypeOptions.find((item) => item.value === selectedType)}
          onChange={(selected) => {
            setValue(`fields.${index}.type`, selected?.value || "input");

            // CLEAR OPTIONS
            if (selected?.value !== "select") {
              setValue(`fields.${index}.options`, []);
            }
          }}
          menuPortalTarget={document.body}
        />
      </div>

      {/* =====================================================
          OPTIONS
      ===================================================== */}
      <div className="md:col-span-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Options
        </label>

        <input
          type="text"
          placeholder="Red, Blue, Green"
          disabled={selectedType !== "select"}
          defaultValue={field?.options?.map((o) => o.value).join(", ") || ""}
          onBlur={(e) => {
            const options = e.target.value
              .split(",")
              .map((v) => v.trim())
              .filter(Boolean)
              .map((v) => ({
                label: v,
                value: v,
              }));

            setValue(`fields.${index}.options`, options);
          }}
          className={InputStyles.base}
        />
      </div>
      {/* =====================================================
          REQUIRED
      ===================================================== */}

      {/* <div className="md:col-span-2 flex items-center gap-3 pt-9">
        <input
          type="checkbox"
          {...register(`fields.${index}.required`)}
          className="w-4 h-4 accent-black"
        />

        <label className="text-sm font-medium text-gray-700">Required</label>
      </div> */}
    </div>
  );
};

export default FieldBuilder;
