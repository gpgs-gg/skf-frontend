import React from "react";
import { Controller } from "react-hook-form";

const CurtainMeasurementDiagram = ({ control, index }) => {
  if (!control) return null;
  return (
    <div className="flex justify-center items-center   rounded-xl ">
      <div className="relative w-[360px] h-[150px] rounded-lg">
        {/* WIDTH LINE */}
        <div className="absolute top-10 left-28 w-46 border-t-2 border-gray-500"></div>

        {/* HEIGHT LINE */}
        <div className="absolute top-10 left-28 h-24 border-l-2 border-gray-500"></div>

        {/* WINDOW NAME */}
        {/* <div className="absolute top-0 left-24">
          <Controller
            name={`measurements.${index}.windowName`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Window Name"
                className="w-40 border rounded-md px-2 py-2 text-center text-sm"
              />
            )}
          />
        </div> */}

        {/* WIDTH */}
        <div className="absolute top-0 left-38">
          <Controller
            name={`attributes.measurements.${index}.width`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Width"
                className="
    w-24 border rounded-md px-2 py-1 text-center bg-white
    font-bold text-[18px]
    placeholder:font-normal placeholder:text-[13px]
  "
              />
            )}
          />
        </div>

        {/* HEIGHT */}
        <div className="absolute top-17 left-0">
          <Controller
            name={`attributes.measurements.${index}.height`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Height"
                className="
    w-26 border rounded-md px-2 py-1 text-center bg-white
    font-bold text-[18px]
    placeholder:font-normal placeholder:text-[13px]
  "
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
              />
            )}
          />
        </div>

        {/* DETAILS */}
        <div className="absolute top-12 left-30 w-45">
          <Controller
            name={`attributes.measurements.${index}.details`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                placeholder="Enter Notes"
                className="w-full bg-white border rounded-md text-md px-2 py-2 placeholder:font-normal placeholder:text-[13px] resize-none"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CurtainMeasurementDiagram;

// import React from "react";
// import { Controller } from "react-hook-form";

// const CurtainMeasurementDiagram = ({ control, index }) => {
//   if (!control) return null;
//   return (
//     <div className="flex justify-center items-center  rounded-xl p-4">
//       <div className="relative w-[360px] h-[170px] rounded-lg">
//         {/* WIDTH LINE */}
//         <div className="absolute top-14 left-28 w-28 border-t-2 border-gray-500"></div>

//         {/* HEIGHT LINE */}
//         <div className="absolute top-14 left-28 h-24 border-l-2 border-gray-500"></div>

//         {/* WINDOW NAME */}
//         {/* <div className="absolute top-0 left-24">
//           <Controller
//             name={`measurements.${index}.windowName`}
//             control={control}
//             render={({ field }) => (
//               <input
//                 {...field}
//                 placeholder="Window Name"
//                 className="w-40 border rounded-md px-2 py-2 text-center text-sm"
//               />
//             )}
//           />
//         </div> */}

//         {/* WIDTH */}
//         <div className="absolute top-3 left-32">
//           <Controller
//             name={`measurements.${index}.width`}
//             control={control}
//             render={({ field }) => (
//               <input
//                 {...field}
//                 type="number"
//                 placeholder="Width"
//                 className="w-24 border rounded-md px-2 py-2 text-center bg-white text-sm"
//                 onChange={(e) =>
//                   field.onChange(
//                     e.target.value === "" ? "" : Number(e.target.value),
//                   )
//                 }
//               />
//             )}
//           />
//         </div>

//         {/* HEIGHT */}
//         <div className="absolute top-21 left-2">
//           <Controller
//             name={`measurements.${index}.height`}
//             control={control}
//             render={({ field }) => (
//               <input
//                 {...field}
//                 type="number"
//                 placeholder="Height"
//                 className="w-24 border rounded-md px-2 py-2 text-center bg-white text-sm"
//                 onChange={(e) =>
//                   field.onChange(
//                     e.target.value === "" ? "" : Number(e.target.value),
//                   )
//                 }
//               />
//             )}
//           />
//         </div>

//         {/* DETAILS */}
//         <div className="absolute top-16 left-30 w-26">
//           <Controller
//             name={`measurements.${index}.details`}
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <textarea
//                 {...field}
//                 rows={4}
//                 placeholder="Details"
//                 className="w-full border rounded-md px-2 py-2 text-xs resize-none"
//               />
//             )}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurtainMeasurementDiagram;
