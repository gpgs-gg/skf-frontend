import {
  SelectStyles,
  InputStyles,
  TextareaStyles,
} from "../../../constants/Config";
import { FiUpload, FiX } from "react-icons/fi";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
const toISODate = (date) => {
  if (!date) return "";
  if (typeof date === "string") return date;
  return date.toISOString().split("T")[0];
};

const fromISODate = (value) => {
  if (!value || value === "NA" || value === "") return null;
  // If it's already a Date object, return it
  if (value instanceof Date) return value;

  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};

const FormField = ({
  name,
  control,
  label,
  type = "input",
  options = [],
  placeholder = "",
  error,
  onChange: customOnChange,
  readOnly = false,
  disabled = false,
  rules = {},
}) => {
  if (!control) {
    console.error("FormField missing control:", name);
    return null;
  }
  return (
    <div className="flex flex-col gap-0 pb-2  w-full">
      <label className="text-sm text-gray-700 font-medium ">{label}</label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const hasError = error || fieldState?.error;
          const inputClass = `${InputStyles.base} ${hasError ? InputStyles.error : ""} ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""} font-semibold`;
          const textareaClass = `${TextareaStyles.base} ${hasError ? TextareaStyles.error : ""}`;

          // file
          if (type === "file") {
            return (
              <div className="space-y-3">
                {/* Upload Button */}
                <label
                  htmlFor={name}
                  className="
          inline-flex items-center gap-2
          px-4 py-2
          border border-dashed border-gray-300
          rounded-xl
          bg-gray-50 hover:bg-gray-100
          cursor-pointer transition
          text-sm font-medium text-gray-700
        "
                >
                  <FiUpload className="text-blue-500" />
                  Upload Attachments
                </label>

                <input
                  id={name}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  disabled={disabled}
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files || []);

                    const existingFiles = Array.isArray(field.value)
                      ? field.value
                      : [];

                    const updatedFiles = [...existingFiles, ...newFiles];

                    if (updatedFiles.length > 5) {
                      toast.dismiss();
                      toast.warning("Only 5 attachments are allowed");
                      return;
                    }

                    field.onChange(updatedFiles);

                    if (customOnChange) {
                      customOnChange(updatedFiles);
                    }
                  }}
                />

                {/* Preview */}
                {Array.isArray(field.value) && field.value.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {field.value.map((file, index) => {
                      const fileUrl =
                        file instanceof File
                          ? URL.createObjectURL(file)
                          : file?.url || file;

                      const isImage =
                        file?.type?.startsWith("image") ||
                        /\.(jpg|jpeg|png|webp)$/i.test(fileUrl);

                      return (
                        <div
                          key={index}
                          className="
    relative
    isolate
    w-14 h-14
    rounded-xl
    overflow-hidden
    border border-gray-200
  "
                        >
                          {isImage ? (
                            <img
                              src={fileUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-[10px] font-medium">
                              FILE
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...field.value];
                              updated.splice(index, 1);
                              field.onChange(updated);
                            }}
                            className="
      absolute
      top-0
      right-0
      w-5
      h-5
      rounded-full
      bg-red-500
      text-white
      text-xs
      font-bold
      flex
      items-center
      justify-center
      shadow-lg
      z-[9999]
      leading-none
    "
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* <p className="text-xs text-gray-500">Maximum 5 attachments</p> */}
              </div>
            );
          }
          // date picker
          if (type === "date") {
            return (
              <DatePicker
                selected={fromISODate(field.value)}
                onChange={(d) => field.onChange(toISODate(d))}
                dateFormat="d MMM yyyy"
                isClearable
                wrapperClassName="w-full"
                placeholderText={placeholder || "Select date"}
                className={inputClass}
                readOnly={readOnly}
                disabled={readOnly}
              />
            );
          }

          // select dropdown
          if (type === "select") {
            // Handle both array of strings and array of objects
            const selectOptions = options.map((opt) =>
              typeof opt === "object" && opt.value
                ? opt
                : { value: opt, label: opt },
            );

            return (
              <Select
                {...field}
                options={selectOptions}
                placeholder={placeholder || "Select..."}
                isClearable
                isDisabled={readOnly}
                styles={SelectStyles}
                className="react-select-container"
                classNamePrefix="react-select"
                onChange={(selected) => {
                  const value = selected?.value || "";
                  field.onChange(value);
                  if (customOnChange) customOnChange(value);
                }}
                value={
                  field.value && field.value !== ""
                    ? selectOptions.find((opt) => opt.value === field.value) ||
                      null
                    : null
                }
              />
            );
          }

          // textarea
          if (type === "textarea") {
            return (
              <textarea
                {...field}
                rows={3}
                placeholder={placeholder}
                className={textareaClass}
                readOnly={readOnly}
                value={field.value || ""}
              />
            );
          }

          // number input
          if (type === "number") {
            return (
              <input
                {...field}
                type="number"
                placeholder={placeholder}
                className={inputClass}
                readOnly={readOnly}
                value={field.value || ""}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? "" : Number(e.target.value);
                  field.onChange(value);
                  if (customOnChange) customOnChange(e);
                }}
              />
            );
          }
          // =========================
          // FILE INPUT ADD HERE
          // =========================
          if (type === "file") {
            return (
              <input
                type="file"
                multiple
                accept="image/*"
                className={inputClass}
                readOnly={readOnly}
                disabled={disabled}
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files || []);

                  // Existing uploaded files
                  const existingFiles = Array.isArray(field.value)
                    ? field.value
                    : [];

                  // Merge old + new
                  const updatedFiles = [...existingFiles, ...newFiles];

                  // Limit to 5 images
                  if (updatedFiles.length > 5) {
                    toast.dismiss();
                    toast.warning("Only 5 attachments are allowed");
                    return;
                  }

                  field.onChange(updatedFiles);

                  if (customOnChange) {
                    customOnChange(updatedFiles);
                  }
                }}
              />
            );
          }
          // default text input
          return (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={inputClass}
              readOnly={readOnly}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e);
                if (customOnChange) customOnChange(e);
              }}
            />
          );
        }}
      />
    </div>
  );
};

export default FormField;

// import {
//   SelectStyles,
//   InputStyles,
//   TextareaStyles,
// } from "../../constants/Config";
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useForm, Controller } from "react-hook-form";
// const toISODate = (date) => (date ? date.toISOString().split("T")[0] : "");
// const fromISODate = (value) => {
//   if (!value || value === "NA") return null;
//   const date = new Date(value);
//   return isNaN(date.getTime()) ? null : date;
// };
// const FormField = ({
//   name,
//   control,
//   label,
//   type = "input",
//   options = [],
//   placeholder = "",
//   error,
//   onChange: customOnChange,
//   ...rest
// }) => {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-sm font-medium text-gray-600">{label}</label>

//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState }) => {
//           const hasError = error || fieldState?.error;
//           const inputClass = `${InputStyles.base} ${hasError ? InputStyles.error : ""}`;
//           const textareaClass = `${TextareaStyles.base} ${hasError ? TextareaStyles.error : ""}`;
//           // date
//           if (type === "date") {
//             return (
//               <DatePicker
//                 selected={fromISODate(field.value)}
//                 onChange={(d) => field.onChange(toISODate(d))}
//                 dateFormat="d MMM yyyy"
//                 isClearable
//                 wrapperClassName="w-full"
//                 placeholderText={"Select date"}
//                 className={inputClass}
//               />
//             );
//           }
//           // select
//           // In FormField.jsx, update the select onChange handler:
//           if (type === "select") {
//             return (
//               <Select
//                 {...field}
//                 options={options.map((opt) =>
//                   typeof opt === "object" ? opt : { value: opt, label: opt },
//                 )}
//                 placeholder={`Select`}
//                 isClearable
//                 styles={SelectStyles}
//                 className="react-select-container"
//                 classNamePrefix="react-select"
//                 onChange={(selected) => {
//                   const value = selected?.value || "";
//                   field.onChange(value);
//                   if (customOnChange) customOnChange(value);
//                 }}
//                 value={
//                   field.value
//                     ? options.find(
//                         (opt) =>
//                           (typeof opt === "object" ? opt.value : opt) ===
//                           field.value,
//                       ) || null
//                     : null
//                 }
//               />
//             );
//           }
//           // if (type === "select") {
//           //   return (
//           //     <Select
//           //       {...field}
//           //       options={options.map((opt) =>
//           //         typeof opt === "object" ? opt : { value: opt, label: opt },
//           //       )}
//           //       // placeholder={`Select ${label}`}
//           //       placeholder={`Select`}
//           //       isClearable
//           //       styles={SelectStyles}
//           //       className="react-select-container"
//           //       classNamePrefix="react-select"
//           //       onChange={(selected) => field.onChange(selected?.value || "")}
//           //       value={
//           //         options.find(
//           //           (opt) =>
//           //             (typeof opt === "object" ? opt.value : opt) ===
//           //             field.value,
//           //         ) || null
//           //       }
//           //     />
//           //   );
//           // }

//           // text area
//           if (type === "textarea") {
//             return (
//               <textarea
//                 {...field}
//                 rows={2}
//                 placeholder={placeholder}
//                 className={textareaClass}
//               />
//             );
//           }
//           // input
//           return (
//             <input
//               {...field}
//               type={type}
//               placeholder={placeholder}
//               className={inputClass}
//             />
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default FormField;
