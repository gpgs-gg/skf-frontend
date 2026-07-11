import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const CornerSofaDiagram = ({ control }) => {
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
            src={IMAGES.CornerSofaDiagram}
            alt="Corner Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[11%] left-[90px] md:left-[140px] w-[120px]">
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
          <div className="absolute top-[52%] left-[10px] md:left-[400px] w-[60px] md:w-[120px]">
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
          <div className="absolute top-[90%] right-[10px] md:right-[185px] w-[60px] md:w-[120px]">
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

export default CornerSofaDiagram;

// import { Controller } from "react-hook-form";

// const CornerSofaDiagram = ({ control }) => {
//   return (
//     <div>
//       <div className="lg:flex justify-center">
//         {/* ================= Diagram ================= */}
//         <div className="origin-top scale-75 sm:scale-90 md:scale-95 lg:scale-100">
//           <div className="flex justify-center">
//             <div className="relative w-[620px] h-[430px]">
//               {/* =========================================
//                       WIDTH DIMENSION
//               ========================================= */}

//               <div className="absolute top-[20px] left-[120px] w-[210px] border-t border-black">
//                 {/* Left Arrow */}
//                 <div
//                   className="
//                     absolute
//                     -left-[1px]
//                     -top-[4px]
//                     w-0
//                     h-0
//                     border-r-[6px]
//                     border-r-black
//                     border-y-[4px]
//                     border-y-transparent
//                   "
//                 />

//                 {/* Right Arrow */}
//                 <div
//                   className="
//                     absolute
//                     -right-[1px]
//                     -top-[4px]
//                     w-0
//                     h-0
//                     border-l-[6px]
//                     border-l-black
//                     border-y-[4px]
//                     border-y-transparent
//                   "
//                 />
//               </div>

//               {/* Width Input */}

//               <div className="absolute top-[-22px] left-[170px]">
//                 <Controller
//                   name="attributes.measurements.0.width"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="number"
//                       placeholder="Total Width"
//                       className="
//                         w-36
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

//               {/* =========================================
//                       CORNER SOFA
//               ========================================= */}

//               <div className="absolute left-[120px] top-[60px]">
//                 {/* ================= TOP SECTION ================= */}

//                 <div className="flex">
//                   {/* Back Rest */}
//                   <div className="w-[210px] h-[28px] border-2 border-gray-700"></div>
//                 </div>

//                 {/* Seat */}

//                 <div className="w-[210px] h-[62px] border-x-2 border-b-2 border-gray-700"></div>

//                 {/* ================= RIGHT SIDE ================= */}

//                 <div className="absolute left-[182px] top-[28px]">
//                   {/* Back */}
//                   <div className="w-[28px] h-[182px] border-l-2 border-r-2 border-b-2 border-gray-700"></div>
//                 </div>

//                 {/* Right Seat */}

//                 <div className="absolute left-[120px] top-[90px]">
//                   <div className="w-[62px] h-[120px] border-l-2 border-r-2 border-b-2 border-gray-700"></div>
//                 </div>

//                 {/* ================= INSIDE CUTOUT ================= */}

//                 {/* ================= CUSHION LINES ================= */}

//                 {/* Corner Seam */}
//               </div>
//               {/* =========================================
//                     RIGHT LENGTH DIMENSION
//               ========================================= */}

//               <div className="absolute left-[345px] top-[60px] h-[210px] border-l border-black">
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

//               {/* Right Length Input */}

//               <div className="absolute left-[356px] top-[132px]">
//                 <Controller
//                   name="attributes.measurements.0.rightLength"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="number"
//                       placeholder="Length"
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

//               {/* =========================================
//                     DEPTH DIMENSION
//               ========================================= */}

//               <div className="absolute top-[275px] left-[242px] w-[92px] border-t border-black">
//                 {/* Left Arrow */}
//                 <div
//                   className="
//                     absolute
//                     -left-[1px]
//                     -top-[4px]
//                     w-0
//                     h-0
//                     border-r-[6px]
//                     border-r-black
//                     border-y-[4px]
//                     border-y-transparent
//                   "
//                 />

//                 {/* Right Arrow */}
//                 <div
//                   className="
//                     absolute
//                     -right-[1px]
//                     -top-[4px]
//                     w-0
//                     h-0
//                     border-l-[6px]
//                     border-l-black
//                     border-y-[4px]
//                     border-y-transparent
//                   "
//                 />
//               </div>

//               {/* Depth Input */}

//               <div className="absolute left-[230px] top-[292px]">
//                 <Controller
//                   name="attributes.measurements.0.depth"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="number"
//                       placeholder="Depth"
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
//             </div>
//           </div>
//         </div>

//         {/* =========================================
//                     NOTES
//         ========================================= */}

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

// export default CornerSofaDiagram;
