import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const LeftLShapeSofaDiagram = ({ control, product, isView = false }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const depth = product?.attributes?.measurements?.[1]?.depth || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";
  return (
    <div className="w-full">
      {/* ================= Front View ================= */}
      <div className="flex justify-center overflow-hidden ">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="hidden lg:block absolute left-[-268px] top-[50%] md:w-[150px] lg:w-[260px] max-w-md">
            {isView ? (
              <div
                className="
      w-full bg-white
      border
      rounded-md
      px-2 xs:px-3
      py-1.5 xs:py-2
      text-xs xs:text-sm lg:text-[18px]
      h-36 md:h-36 lg:h-27
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
          w-full bg-white
          border
          rounded-md
          px-2 xs:px-3
          py-1.5 xs:py-2
          text-xs xs:text-sm lg:text-[18px]
          resize-none
          focus:outline-none
          h-36 md:h-36 lg:h-27
        "
                  />
                )}
              />
            )}
          </div>

          {/* ================= Sofa Image ================= */}
          <img
            src={IMAGES.LLeftSofaDiagaram}
            alt="Left L Shape Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px] mt-2 "
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[0%] left-[90px] md:left-[150px] w-[120px]">
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
          <div className="absolute top-[38%] md:left-[-70px] lg:left-[-114px] w-[60px] md:w-[80px] lg:w-[120px]">
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
                    placeholder="Height"
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

          {/* ================= Depth ================= */}
          <div className="absolute  md:w-[120px] top-[29%] right-[10px] md:right-[-40px] w-[60px] ">
            {isView ? (
              <div
                className="
      w-full border rounded-md px-2 py-1
      text-center bg-white/90 backdrop-blur-sm
      font-bold text-[14px] sm:text-[16px] md:text-[18px]
      shadow-sm
    "
              >
                {depth}
              </div>
            ) : (
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
          {/* ================= Notes for md & small devices ================= */}
          <div className="lg:hidden absolute top-[80%] w-[360px] md:mx-22 ">
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
      </div>
    </div>
  );
};

export default LeftLShapeSofaDiagram;

// import React from "react";
// import { Controller } from "react-hook-form";
// import { IMAGES } from "@/constants/images";

// const LeftLShapeSofaDiagram = ({ control }) => {
//   return (
//     <div className="w-full">
//       {/* ================= Front View ================= */}
//       <div className="flex justify-center overflow-hidden ">
//         <div className="relative w-full max-w-[520px]">
//           {/* ================= Notes ================= */}
//           <div className="hidden lg:block absolute left-[-268px] top-[50%] md:w-[150px] lg:w-[260px] max-w-md">
//             <Controller
//               name="attributes.measurements.0.notes"
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <textarea
//                   {...field}
//                   placeholder="Enter Notes"
//                   className="
//                     w-full bg-white
//                     border
//                     rounded-md
//                     px-2 xs:px-3
//                     py-1.5 xs:py-2
//                     text-xs xs:text-sm lg:text-[18px]
//                     resize-none
//                     focus:outline-none
//                     h-36 md:h-36 lg:h-27
//                   "
//                 />
//               )}
//             />
//           </div>

//           {/* ================= Sofa Image ================= */}
//           <img
//             src={IMAGES.LLeftSofaDiagaram}
//             alt="Left L Shape Sofa Diagram"
//             className="w-[300px] h-[400px] md:w-[450px] md:h-[400px] mt-2 "
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute top-[0%] left-[90px] md:left-[150px] w-[120px]">
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
//           <div className="absolute top-[38%] md:left-[-70px] lg:left-[-114px] w-[60px] md:w-[80px] lg:w-[120px]">
//             <Controller
//               name="attributes.measurements.0.height"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="number"
//                   placeholder="Height"
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

//           {/* ================= Depth ================= */}
//           <div className="absolute  md:w-[120px] top-[29%] right-[10px] md:right-[-40px] w-[60px] ">
//             <Controller
//               name="attributes.measurements.1.depth"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="number"
//                   placeholder="Depth"
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
//           {/* ================= Notes for md & small devices ================= */}
//           <div className="lg:hidden absolute top-[80%] w-[360px] md:mx-22 ">
//             <Controller
//               name="attributes.measurements.0.notes"
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <textarea
//                   {...field}
//                   placeholder="Enter Notes"
//                   className="
//                 w-full bg-white border rounded-md
//                 px-3 py-2
//                 text-sm md:text-base
//                 resize-none
//                 focus:outline-none
//                 h-20
//               "
//                 />
//               )}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeftLShapeSofaDiagram;
