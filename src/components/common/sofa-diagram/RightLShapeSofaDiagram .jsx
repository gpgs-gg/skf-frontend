import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const RightLShapeSofaDiagram = ({ control, product, isView = false }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const depth = product?.attributes?.measurements?.[1]?.depth || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";
  return (
    <div className="w-full">
      {/* ================= Front View ================= */}
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="hidden lg:block absolute left-[-198px] top-[60%] md:w-[150px] lg:w-[260px] max-w-md">
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
            src={IMAGES.LShapeSofaDiagram}
            alt="Right L Shape Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[1%] left-[90px] md:left-[165px] w-[120px]">
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
          <div className="absolute top-[42%] right-[10px] lg:right-[-12px] w-[60px] md:w-[120px]">
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
          <div className="absolute top-[80%] md:top-[82%] right-[64px] md:right-[132px] w-[60px] md:w-[120px]">
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
        </div>
      </div>

      {/* ================= Notes for md & small devices ================= */}
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

export default RightLShapeSofaDiagram;

// import React from "react";
// import { Controller } from "react-hook-form";
// import { IMAGES } from "@/constants/images";

// const RightLShapeSofaDiagram = ({ control }) => {
//   return (
//     <div className="w-full">
//       {/* ================= Front View ================= */}
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[520px]">
//           {/* ================= Notes ================= */}
//           <div className="hidden lg:block absolute left-[-198px] top-[60%] md:w-[150px] lg:w-[260px] max-w-md">
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
//             src={IMAGES.LShapeSofaDiagram}
//             alt="Right L Shape Sofa Diagram"
//             className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute top-[1%] left-[90px] md:left-[165px] w-[120px]">
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
//           <div className="absolute top-[42%] right-[10px] lg:right-[-12px] w-[60px] md:w-[120px]">
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
//           <div className="absolute top-[80%] md:top-[82%] right-[64px] md:right-[132px] w-[60px] md:w-[120px]">
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
//         </div>
//       </div>

//       {/* ================= Notes for md & small devices ================= */}
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
//                 w-full bg-white border rounded-md
//                 px-3 py-2
//                 text-sm md:text-base
//                 resize-none
//                 focus:outline-none
//                 h-20
//               "
//             />
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default RightLShapeSofaDiagram;
