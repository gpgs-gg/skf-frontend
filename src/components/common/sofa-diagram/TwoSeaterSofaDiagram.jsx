import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const TwoSeaterSofaDiagram = ({ control }) => {
  return (
    <div className="w-full">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="absolute left-[-198px] top-[60%] w-[260px] max-w-md  w-[200px] ">
            <div className="">
              <Controller
                name="attributes.measurements.0.notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={6}
                    placeholder="Enter Notes"
                    className="
                      w-full
                      bg-white
                      border
                      rounded-md
                      px-2 xs:px-3
                      py-1.5 xs:py-2
                      text-xs xs:text-sm
                      resize-none
                      focus:outline-none
                  
                    "
                  />
                )}
              />
            </div>
          </div>

          {/* ================= Sofa Image ================= */}
          <img
            src={IMAGES.TwoSeaterSofaDiagram}
            alt="Two Seater Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[60%] left-[90px] md:left-[165px] w-[120px]">
            <Controller
              name="attributes.measurements.0.width"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter Width"
                  className="
                    w-full
                    border
                    rounded-md
                    px-2
                    py-1
                    text-center
                    bg-white/90
                    backdrop-blur-sm
                    shadow-sm
                    font-bold
                    text-[14px]
                    sm:text-[16px]
                    md:text-[18px]
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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

          {/* ================= Height ================= */}
          <div className="absolute top-[34%] right-[10px] md:-left-[64px] w-[60px] md:w-[120px]">
            <Controller
              name="attributes.measurements.0.height"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Height"
                  className="
                    w-full
                    border
                    rounded-md
                    px-2
                    py-1
                    text-center
                    bg-white/90
                    backdrop-blur-sm
                    shadow-sm
                    font-bold
                    text-[14px]
                    sm:text-[16px]
                    md:text-[18px]
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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

          {/* ================= Depth ================= */}
          <div className="absolute top-[74%] right-[0px] md:right-[16px] w-[60px] md:w-[120px]">
            <Controller
              name="attributes.measurements.1.depth"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Depth"
                  className="
                    w-full
                    border
                    rounded-md
                    px-2
                    py-1
                    text-center
                    bg-white/90
                    backdrop-blur-sm
                    shadow-sm
                    font-bold
                    text-[14px]
                    sm:text-[16px]
                    md:text-[18px]
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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

export default TwoSeaterSofaDiagram;

// import React from "react";
// import { Controller } from "react-hook-form";

// const TwoSeaterSofaDiagram = ({ control }) => {
//   return (
//     <div>
//       <div className="lg:flex justify-center gap-2">
//         {/* ================= Front View ================= */}
//         <div className="origin-top scale-75 sm:scale-90 md:scale-95 lg:scale-100">
//           <div className="flex justify-center">
//             <div className="relative w-[380px] h-[220px]">
//               {/* Width Line */}
//               <div className="absolute top-[185px] left-[40px] w-[190px] border-t border-black">
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
//               <div className="absolute top-[192px] left-[90px]">
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
//               <div className="absolute left-[15px] top-[35px] h-[120px] border-l border-black">
//                 <div
//                   className="
//                     absolute -left-[4px] top-0
//                     w-0 h-0
//                     border-b-[6px] border-b-black
//                     border-x-[4px] border-x-transparent
//                   "
//                 />

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

//               {/* Sofa */}
//               <div className="absolute left-[55px] top-[35px]">
//                 {/* Back Cushions */}
//                 <div className="flex">
//                   <div className="w-20 h-14 border-2 border-gray-700 rounded-t-md"></div>

//                   <div className="w-20 h-14 border-y-2 border-r-2 border-gray-700 rounded-t-md"></div>
//                 </div>

//                 {/* Seat */}
//                 <div className="w-[160px] h-6 border-x-2 border-b-2 border-gray-700 rounded-b-sm"></div>

//                 <div className="w-[160px] h-6 border-x-2 border-b-2 border-gray-700 rounded-b-sm"></div>

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
//                   className="bg-white
//                     w-full
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
//       <div className="flex justify-center mt-8 lg:mr-66">
//         <div className="relative w-[360px] h-[220px]">
//           {/* ================= Sofa ================= */}
//           <div className="absolute top-[40px] left-[70px] w-[200px] h-[130px] border border-2 border-gray-700">
//             {/* Back Cushion Line */}
//             <div className="absolute left-[18px] right-[18px] top-[28px] border-b border-gray-700"></div>

//             {/* Left Arm */}
//             <div className="absolute left-0 top-0 w-[18px] h-full border-r border-gray-700"></div>

//             {/* Right Arm */}
//             <div className="absolute right-0 top-0 w-[18px] h-full border-l border-gray-700"></div>

//             {/* Seat Divider */}
//             <div className="absolute left-[100px] top-0 h-full border-l border-gray-700"></div>

//             {/* Legs */}
//             <div className="absolute left-[8px] bottom-[-8px] w-[5px] h-[8px] bg-gray-700"></div>

//             <div className="absolute right-[8px] bottom-[-8px] w-[5px] h-[8px] bg-gray-700"></div>
//           </div>

//           {/* ================= Depth Dimension ================= */}
//           <div className="absolute top-[40px] left-[300px] h-[130px] border-l border-black">
//             {/* Top Arrow */}
//             <div
//               className="
//                 absolute -left-[4px] top-0
//                 w-0 h-0
//                 border-b-[6px] border-b-black
//                 border-x-[4px] border-x-transparent
//               "
//             />

//             {/* Bottom Arrow */}
//             <div
//               className="
//                 absolute -left-[4px] bottom-0
//                 w-0 h-0
//                 border-t-[6px] border-t-black
//                 border-x-[4px] border-x-transparent
//               "
//             />

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

// export default TwoSeaterSofaDiagram;
