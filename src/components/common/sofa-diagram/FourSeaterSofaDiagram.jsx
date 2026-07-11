import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";
const FourSeaterSofaDiagram = ({ control }) => {
  return (
    <div className="w-full ">
      {/* ================= Front View ================= */}
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="absolute left-[-198px] top-[60%] w-[260px] max-w-md  w-[200px] ">
            <div className="  ">
              <Controller
                name="attributes.measurements.0.notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Enter Notes  "
                    className="
                  w-full bg-white
                  border
                  rounded-md
                  px-2 xs:px-3
                  py-1.5 xs:py-2
                  text-xs xs:text-sm lg:text-[18px]
                  resize-none
                  focus:outline-none
                
                "
                  />
                )}
              />
            </div>
          </div>
          {/* Sofa Image */}
          <img
            src={IMAGES.FoureaterSofa} // Replace with your actual image path
            alt="Four Seater Sofa Diagram"
            className="  w-[300px]  h-[400px] md:w-[450px] md:h-[400px]   "
          />

          {/* Width Input - Overlaid on image */}
          <div className="absolute top-[48%] left-[90px] md:left-[170px] w-[120px]">
            <Controller
              name="attributes.measurements.0.width"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter Width"
                  className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:font-normal placeholder:text-[10px] sm:placeholder:text-[11px] md:placeholder:text-[13px]
                    shadow-sm
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

          {/* Height Input - Overlaid on image */}
          <div className="absolute top-[20%] right-[10px] md:-left-[70px] w-[60px] md:w-[120px]">
            <Controller
              name="attributes.measurements.0.height"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder=" Height"
                  className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:font-normal placeholder:text-[10px] sm:placeholder:text-[11px] md:placeholder:text-[13px]
                    shadow-sm
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
          {/* Depth Input - Overlaid on image */}
          <div className="absolute top-[68%] right-[0px] md:right-[-5px] w-[60px] md:w-[120px]">
            <Controller
              name="attributes.measurements.1.depth"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Depth"
                  className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:font-normal placeholder:text-[10px] sm:placeholder:text-[11px] md:placeholder:text-[13px]
                    shadow-sm
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
        </div>
      </div>
    </div>
  );
};

export default FourSeaterSofaDiagram;

// import React from "react";
// import { Controller } from "react-hook-form";

// const FourSeaterSofaDiagram = ({ control }) => {
//   return (
//     <div>
//       <div className="lg:flex justify-center px-5">
//         {/* ================= Front View ================= */}
//         <div>
//           <div className="flex justify-center">
//             <div className="relative w-[520px] h-[220px]">
//               {/* Width Line */}
//               <div className="absolute top-[185px] left-[40px] w-[416px] border-t border-black">
//                 {/* Left Arrow */}
//                 <div
//                   className="
//                     absolute -left-[1px] -top-[4px]
//                     w-0 h-0
//                     border-r-[6px] border-r-black
//                     border-y-[4px] border-y-transparent
//                   "
//                 />

//                 {/* Right Arrow */}
//                 <div
//                   className="
//                     absolute -right-[1px] -top-[4px]
//                     w-0 h-0
//                     border-l-[6px] border-l-black
//                     border-y-[4px] border-y-transparent
//                   "
//                 />

//                 <div className="absolute -right-1 -top-1 h-3 border-l-2 border-black" />
//               </div>

//               {/* Width Input */}
//               <div className="absolute top-[192px] left-[185px]">
//                 <Controller
//                   name="attributes.measurements.0.width"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="number"
//                       placeholder="Enter Width"
//                       className="
//                         w-28 border rounded-md px-2 py-1
//                         text-center bg-white
//                         font-bold text-[18px]
//                         placeholder:font-normal placeholder:text-[13px]
//                       "
//                       onChange={(e) =>
//                         field.onChange(
//                           e.target.value === "" ? "" : Number(e.target.value),
//                         )
//                       }
//                     />
//                   )}
//                 />
//               </div>

//               {/* Height Line */}
//               <div className="absolute left-[15px] top-[35px] h-[130px] border-l border-black">
//                 {/* Top Arrow */}
//                 <div
//                   className="
//                     absolute -left-[4px] top-0
//                     w-0 h-0
//                     border-b-[6px] border-b-black
//                     border-x-[4px] border-x-transparent
//                   "
//                 />

//                 {/* Bottom Arrow */}
//                 <div
//                   className="
//                     absolute -left-[4px] bottom-0
//                     w-0 h-0
//                     border-t-[6px] border-t-black
//                     border-x-[4px] border-x-transparent
//                   "
//                 />
//               </div>

//               {/* Height Input */}
//               <div className="absolute top-[90px] left-[-100px]">
//                 <Controller
//                   name="attributes.measurements.0.height"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="number"
//                       placeholder="Enter Height"
//                       className="
//                         w-28 border rounded-md px-2 py-1
//                         text-center bg-white
//                         font-bold text-[18px]
//                         placeholder:font-normal placeholder:text-[13px]
//                       "
//                       onChange={(e) =>
//                         field.onChange(
//                           e.target.value === "" ? "" : Number(e.target.value),
//                         )
//                       }
//                     />
//                   )}
//                 />
//               </div>

//               {/* ================= Sofa ================= */}
//               <div className="absolute left-[60px] top-[35px]">
//                 {/* Back Cushions */}
//                 <div className="flex">
//                   <div className="w-24 h-14 border-2 border-gray-700 rounded-t-md"></div>

//                   <div className="w-24 h-14 border-y-2 border-r-2 border-gray-700 rounded-t-md"></div>

//                   <div className="w-24 h-14 border-y-2 border-r-2 border-gray-700 rounded-t-md"></div>

//                   <div className="w-24 h-14 border-y-2 border-r-2 border-gray-700 rounded-t-md"></div>
//                 </div>

//                 {/* Seat */}
//                 <div className="w-[384px] h-6 border-x-2 border-b-2 border-gray-700 rounded-b-sm"></div>

//                 <div className="w-[384px] h-6 border-x-2 border-b-2 border-gray-700 rounded-b-sm"></div>

//                 {/* Armrests */}
//                 <div className="absolute left-[-18px] top-8 w-5 h-18 border-2 border-gray-700 rounded-l-md"></div>

//                 <div className="absolute right-[-18px] top-8 w-5 h-18 border-2 border-gray-700 rounded-r-md"></div>

//                 {/* Legs */}
//                 <div className="absolute left-0 top-[104px] w-2 h-4 bg-gray-700"></div>

//                 <div className="absolute right-0 top-[104px] w-2 h-4 bg-gray-700"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================= Notes ================= */}
//         <div className="flex justify-center mt-8">
//           <div className="w-full max-w-md">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Notes
//             </label>

//             <Controller
//               name="attributes.measurements.0.notes"
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <textarea
//                   {...field}
//                   rows={4}
//                   placeholder="Enter Notes"
//                   className="
//                     w-full bg-white
//                     border
//                     rounded-md
//                     px-3
//                     py-2
//                     text-sm
//                     resize-none
//                     focus:outline-none
//                     focus:ring-2
//                     focus:ring-blue-500
//                     focus:border-blue-500
//                   "
//                 />
//               )}
//             />
//           </div>
//         </div>
//       </div>
//       {/* ================= Top View ================= */}
//       <div className="flex justify-center mt-8">
//         <div className="relative w-[520px] h-[220px]">
//           {/* ================= Sofa ================= */}
//           <div className="absolute top-[40px] left-[70px] w-[416px] h-[130px] border border-2 border-gray-700">
//             {/* Back Cushion Line */}
//             <div className="absolute left-[18px] right-[18px] top-[28px] border-b border-gray-700"></div>

//             {/* Left Arm */}
//             <div className="absolute left-0 top-0 w-[18px] h-full border-r border-gray-700"></div>

//             {/* Right Arm */}
//             <div className="absolute right-0 top-0 w-[18px] h-full border-l border-gray-700"></div>

//             {/* Seat Dividers */}
//             <div className="absolute left-[104px] top-0 h-full border-l border-gray-700"></div>

//             <div className="absolute left-[208px] top-0 h-full border-l border-gray-700"></div>

//             <div className="absolute left-[312px] top-0 h-full border-l border-gray-700"></div>

//             {/* Legs */}
//             <div className="absolute left-[8px] bottom-[-8px] w-[5px] h-[8px] bg-gray-700"></div>

//             <div className="absolute right-[8px] bottom-[-8px] w-[5px] h-[8px] bg-gray-700"></div>
//           </div>

//           {/* ================= Depth Dimension ================= */}
//           <div className="absolute top-[40px] left-[515px] h-[130px] border-l border-black">
//             {/* Top Arrow */}
//             <div
//               className="
//                 absolute -left-[4px] top-0
//                 w-0 h-0
//                 border-b-[6px] border-b-black
//                 border-x-[4px] border-x-transparent
//               "
//             ></div>

//             {/* Bottom Arrow */}
//             <div
//               className="
//                 absolute -left-[4px] bottom-0
//                 w-0 h-0
//                 border-t-[6px] border-t-black
//                 border-x-[4px] border-x-transparent
//               "
//             ></div>

//             {/* Extension Lines */}
//             <div className="absolute -left-[30px] top-0 w-[30px] border-t border-black"></div>

//             <div className="absolute -left-[30px] bottom-0 w-[30px] border-t border-black"></div>

//             {/* Depth Input */}
//             <div className="absolute top-[48px] left-[18px]">
//               <Controller
//                 name="attributes.measurements.1.depth"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     type="number"
//                     placeholder="Enter Depth"
//                     className="
//                       w-28 border rounded-md px-2 py-1
//                       text-center bg-white
//                       font-bold text-[18px]
//                       placeholder:font-normal placeholder:text-[13px]
//                     "
//                     onChange={(e) =>
//                       field.onChange(
//                         e.target.value === "" ? "" : Number(e.target.value),
//                       )
//                     }
//                   />
//                 )}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FourSeaterSofaDiagram;
