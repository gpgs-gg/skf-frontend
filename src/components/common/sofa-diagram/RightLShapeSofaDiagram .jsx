import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const RightLShapeSofaDiagram = ({ control }) => {
  return (
    <div className="w-full">
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
          {/* ================= Sofa Image ================= */}
          <img
            src={IMAGES.LShapeSofaDiagram}
            alt="Right L Shape Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[13%] left-[90px] md:left-[165px] w-[120px]">
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
          <div className="absolute top-[48%] right-[10px] md:right-[-12px]  w-[60px] md:w-[120px]">
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
          <div className="absolute top-[82%] right-[120px] md:right-[132px] w-[60px] md:w-[120px]">
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

export default RightLShapeSofaDiagram;

// import React from "react";
// import { Controller } from "react-hook-form";

// const RightLShapeSofaDiagram = ({ control }) => {
//   return (
//     <div>
//       <div className="lg:flex justify-center">
//         {/* ================= Diagram ================= */}
//         <div className="origin-top scale-75 sm:scale-90 md:scale-95 lg:scale-100">
//           <div className="flex justify-center">
//             <div className="relative w-[520px] h-[310px]">
//               {/* =========================================================
//                               MAIN LENGTH (A)
//               ========================================================== */}

//               <div className="absolute top-[18px] left-[105px] w-[310px] border-t border-black">
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
//               </div>

//               {/* Width Input */}

//               <div className="absolute top-[-22px] left-[205px]">
//                 <Controller
//                   name="attributes.measurements.0.width"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="number"
//                       placeholder="Enter Width"
//                       className="
//                         w-32
//                         border
//                         rounded-md
//                         px-2
//                         py-1
//                         text-center
//                         bg-white
//                         font-bold
//                         text-[18px]
//                         placeholder:text-[13px]
//                         placeholder:font-normal
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

//               {/* =========================================================
//                             RETURN LENGTH (B)
//               ========================================================== */}

//               {/* Height Dimension moved to RIGHT */}

//               <div className="absolute left-[435px] top-[42px] h-[146px] border-l border-black">
//                 {/* Top Arrow */}
//                 <div
//                   className="
//                     absolute
//                     -left-[4px]
//                     top-0
//                     w-0
//                     h-0
//                     border-b-[6px]
//                     border-b-black
//                     border-x-[4px]
//                     border-x-transparent
//                   "
//                 />

//                 {/* Bottom Arrow */}

//                 <div
//                   className="
//                     absolute
//                     -left-[4px]
//                     bottom-0
//                     w-0
//                     h-0
//                     border-t-[6px]
//                     border-t-black
//                     border-x-[4px]
//                     border-x-transparent
//                   "
//                 />
//               </div>

//               {/* Height Input */}

//               <div className="absolute left-[450px] top-[98px]">
//                 <Controller
//                   name="attributes.measurements.0.height"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="number"
//                       placeholder="Enter Height"
//                       className="
//                         w-28
//                         border
//                         rounded-md
//                         px-2
//                         py-1
//                         text-center
//                         bg-white
//                         font-bold
//                         text-[18px]
//                         placeholder:text-[13px]
//                         placeholder:font-normal
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

//               {/* =========================================================
//                                 RIGHT L SHAPE SOFA
//               ========================================================== */}

//               <div className="absolute left-[105px] top-[40px]">
//                 {/* Top Back */}

//                 <div className="flex">
//                   <div className="w-[80px] h-[55px] border-y-2 border-l-2 border-gray-700"></div>

//                   <div className="w-[80px] h-[55px] border-y-2 border-l-2 border-gray-700"></div>

//                   <div className="w-[80px] h-[55px] border-y-2 border-l-2 border-gray-700"></div>

//                   <div className="w-[70px] h-[55px] border-2 border-gray-700"></div>
//                 </div>

//                 {/* Horizontal Seat */}

//                 <div className="w-[310px] h-[30px] border-x-2 border-b-2 border-gray-700"></div>

//                 {/* Vertical Chaise (RIGHT SIDE) */}

//                 <div className="absolute right-0 top-[55px]">
//                   <div className="w-[70px] h-[90px] border-l-2 border-r-2 border-b-2 border-gray-700"></div>
//                 </div>

//                 {/* Vertical Back (RIGHT SIDE) */}

//                 <div className="absolute right-0 top-0 w-[20px] h-[145px] border-l-2 border-gray-700"></div>

//                 {/* Keep the divider comments exactly as in LeftLShape if you use them */}
//                 {/* =========================================================
//                               DEPTH DIMENSION
//                 ========================================================== */}

//                 {/* Depth moved to LEFT */}

//                 <div className="absolute top-[0px] left-[-40px]">
//                   {/* Vertical Line */}
//                   <div className="relative h-[85px] border-l border-black">
//                     {/* Top Arrow */}
//                     <div
//                       className="
//                         absolute
//                         -left-[4px]
//                         top-0
//                         w-0
//                         h-0
//                         border-b-[6px]
//                         border-b-black
//                         border-x-[4px]
//                         border-x-transparent
//                       "
//                     />

//                     {/* Bottom Arrow */}
//                     <div
//                       className="
//                         absolute
//                         -left-[4px]
//                         bottom-0
//                         w-0
//                         h-0
//                         border-t-[6px]
//                         border-t-black
//                         border-x-[4px]
//                         border-x-transparent
//                       "
//                     />
//                   </div>
//                 </div>
//                 {/* Depth Input */}
//                 <div className="absolute left-[-50px] top-[24px] -translate-x-full">
//                   <Controller
//                     name="attributes.measurements.1.depth"
//                     control={control}
//                     render={({ field }) => (
//                       <input
//                         {...field}
//                         type="number"
//                         placeholder="Depth"
//                         className="
//                             w-28
//                             border
//                             rounded-md
//                             px-2
//                             py-1
//                             text-center
//                             bg-white
//                             font-bold
//                             text-[18px]
//                             placeholder:text-[13px]
//                             placeholder:font-normal
//                           "
//                         onChange={(e) =>
//                           field.onChange(
//                             e.target.value === "" ? "" : Number(e.target.value),
//                           )
//                         }
//                       />
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* =========================================================
//                             NOTES
//         ========================================================== */}

//         <div className="flex justify-center ml-20 mt-8 lg:mt-0">
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
//                     w-full
//                     bg-white
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
//     </div>
//   );
// };

// export default RightLShapeSofaDiagram;
