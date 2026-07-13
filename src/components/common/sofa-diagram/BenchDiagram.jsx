import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const BenchDiagram = ({ control, product, isView = false }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div className="w-full px-2">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="hidden lg:block absolute left-[-198px] top-[42%] w-[260px] max-w-md">
            {isView ? (
              <div
                className="
                  w-full bg-white border rounded-md
                  px-2 xs:px-3
                  py-1.5 xs:py-2
                  text-xs xs:text-sm lg:text-[18px]
                  whitespace-pre-wrap
                  overflow-y-auto
                "
              >
                {notes}
              </div>
            ) : (
              <Controller
                name="attributes.measurements.0.notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Enter Notes"
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
            )}
          </div>

          {/* Diagram Image */}
          <img
            src={IMAGES.BenchDiagram}
            alt="Bench Stool Diagram"
            className="w-full h-auto"
          />
          {/* ================= Width ================= */}
          <div className="absolute top-[76%] left-1/2 -translate-x-1/2 w-[120px]">
            {isView ? (
              <div
                className="
                  w-full border rounded-md px-2 py-1
                  text-center bg-white/90 backdrop-blur-sm
                  font-bold text-[14px] sm:text-[16px] md:text-[18px]
                  shadow-sm
                "
              >
                {width}
              </div>
            ) : (
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
                      placeholder:font-normal
                      placeholder:text-[10px]
                      sm:placeholder:text-[11px]
                      md:placeholder:text-[13px]
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
            )}
          </div>

          {/* ================= Height ================= */}
          <div className="absolute top-[38%] left-[230px] md:left-[454px] w-[60px] md:w-[120px]">
            {isView ? (
              <div
                className="
                  w-full border rounded-md px-2 py-1
                  text-center bg-white/90 backdrop-blur-sm
                  font-bold text-[14px] sm:text-[16px] md:text-[18px]
                  shadow-sm
                "
              >
                {height}
              </div>
            ) : (
              <Controller
                name="attributes.measurements.0.height"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Enter Height"
                    className="
                      w-full border rounded-md px-2 py-1
                      text-center bg-white/90 backdrop-blur-sm
                      font-bold text-[14px] sm:text-[16px] md:text-[18px]
                      placeholder:font-normal
                      placeholder:text-[10px]
                      sm:placeholder:text-[11px]
                      md:placeholder:text-[13px]
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
            )}
          </div>
        </div>
      </div>

      {/* Notes for md & small devices */}
      <div className="lg:hidden md:mx-22">
        {isView ? (
          <div
            className="
              w-full bg-white border rounded-md
              px-3 py-2
              text-sm md:text-base
              h-20
              whitespace-pre-wrap
              overflow-y-auto
            "
          >
            {notes}
          </div>
        ) : (
          <Controller
            name="attributes.measurements.0.notes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Enter Notes"
                className="
                  w-full bg-white border rounded-md
                  px-3 py-2
                  text-sm md:text-base
                  resize-none
                  focus:outline-none
                  h-20
                "
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default BenchDiagram;

// import React from "react";
// import { Controller } from "react-hook-form";
// import { IMAGES } from "@/constants/images";

// const BenchDiagram = ({ control }) => {
//   return (
//     <div className="w-full px-2">
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[520px]">
//           {/* ================= Notes ================= */}
//           {/* ================= Notes ================= */}
//           <div className=" hidden lg:block absolute left-[-198px] top-[42%] w-[260px] max-w-md  w-[200px] ">
//             <div className="  ">
//               <Controller
//                 name="attributes.measurements.0.notes"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <textarea
//                     {...field}
//                     rows={4}
//                     placeholder="Enter Notes  "
//                     className="
//                        w-full bg-white
//                        border
//                        rounded-md
//                        px-2 xs:px-3
//                        py-1.5 xs:py-2
//                        text-xs xs:text-sm lg:text-[18px]
//                        resize-none
//                        focus:outline-none

//                      "
//                   />
//                 )}
//               />
//             </div>
//           </div>
//           {/* Diagram Image */}
//           <img
//             src={IMAGES.BenchDiagram}
//             alt="Bench Stool Diagram"
//             className="w-full h-auto"
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute top-[76%] left-1/2 -translate-x-1/2 w-[120px]">
//             <Controller
//               name="attributes.measurements.0.width"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="number"
//                   placeholder="Enter Width"
//                   className="
//                     w-full border rounded-md px-2 py-1
//                     text-center bg-white/90 backdrop-blur-sm
//                     font-bold text-[14px] sm:text-[16px] md:text-[18px]
//                     placeholder:font-normal
//                     placeholder:text-[10px]
//                     sm:placeholder:text-[11px]
//                     md:placeholder:text-[13px]
//                     shadow-sm
//                   "
//                   onChange={(e) =>
//                     field.onChange(
//                       e.target.value === "" ? "" : Number(e.target.value),
//                     )
//                   }
//                 />
//               )}
//             />
//           </div>

//           {/* ================= Height ================= */}
//           <div className="absolute top-[38%] left-[230px] md:left-[454px] w-[60px] md:w-[120px]">
//             <Controller
//               name="attributes.measurements.0.height"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="number"
//                   placeholder="Enter Height"
//                   className="
//                     w-full border rounded-md px-2 py-1
//                     text-center bg-white/90 backdrop-blur-sm
//                     font-bold text-[14px] sm:text-[16px] md:text-[18px]
//                     placeholder:font-normal
//                     placeholder:text-[10px]
//                     sm:placeholder:text-[11px]
//                     md:placeholder:text-[13px]
//                     shadow-sm
//                   "
//                   onChange={(e) =>
//                     field.onChange(
//                       e.target.value === "" ? "" : Number(e.target.value),
//                     )
//                   }
//                 />
//               )}
//             />
//           </div>

//           {/* ================= Notes ================= */}
//         </div>
//       </div>
//       {/* notes for md and small devices */}
//       <div className="lg:hidden md:mx-22">
//         <Controller
//           name="attributes.measurements.0.notes"
//           control={control}
//           defaultValue=""
//           render={({ field }) => (
//             <textarea
//               {...field}
//               placeholder="Enter Notes"
//               className="
//                       w-full bg-white border rounded-md
//                       px-3 py-2
//                       text-sm md:text-base
//                       resize-none
//                       focus:outline-none
//                       h-20
//                     "
//             />
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default BenchDiagram;
