import { IMAGES } from "@/constants/images";
import { Controller } from "react-hook-form";

const SofaCumBedPullOutDiagram = ({ control, product, isView = false }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const bedLength = product?.attributes?.measurements?.[0]?.bedLength || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";
  return (
    <div className="w-full">
      {/* ================= Front View ================= */}
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="hidden lg:block absolute left-[-238px] top-[60%] md:w-[150px] lg:w-[260px] max-w-md">
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
      whitespace-pre-wrap overflow-y-auto
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

          {/* ================= Diagram Image ================= */}
          <img
            src={IMAGES.SofaCumBedPullOutDiagram}
            alt="Sofa Cum Bed Pull Out Diagram"
            className="w-[300px] h-[400px]  md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          {/* LG position kept same */}
          <div className="absolute top-[86%] left-[90px] md:left-[165px] w-[120px]">
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
                    placeholder="Width"
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
          {/* LG position kept same */}
          <div className="absolute top-[24%] left-[262px] md:left-[386px] w-[60px] md:w-[120px]">
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

          {/* ================= Bed Length / Depth ================= */}
          {/* LG position kept same */}
          <div className="absolute top-[56%] right-[22px] md:right-[12px] w-[60px] md:w-[120px]">
            {isView ? (
              <div
                className="
      w-full border rounded-md px-2 py-1
      text-center bg-white/90 backdrop-blur-sm
      font-bold text-[14px] sm:text-[16px] md:text-[18px]
      shadow-sm
    "
              >
                {bedLength}
              </div>
            ) : (
              <Controller
                name="attributes.measurements.0.bedLength"
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
      whitespace-pre-wrap overflow-y-auto
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

export default SofaCumBedPullOutDiagram;

// import { IMAGES } from "@/constants/images";
// import { Controller } from "react-hook-form";

// const SofaCumBedPullOutDiagram = ({ control }) => {
//   return (
//     <div className="w-full">
//       {/* ================= Front View ================= */}
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[520px]">
//           {/* ================= Notes ================= */}
//           <div className="hidden lg:block absolute left-[-238px] top-[60%] md:w-[150px] lg:w-[260px] max-w-md">
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

//           {/* ================= Diagram Image ================= */}
//           <img
//             src={IMAGES.SofaCumBedPullOutDiagram}
//             alt="Sofa Cum Bed Pull Out Diagram"
//             className="w-[300px] h-[400px]  md:w-[450px] md:h-[400px]"
//           />

//           {/* ================= Width ================= */}
//           {/* LG position kept same */}
//           <div className="absolute top-[86%] left-[90px] md:left-[165px] w-[120px]">
//             <Controller
//               name="attributes.measurements.0.width"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="number"
//                   placeholder="Width"
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
//           {/* LG position kept same */}
//           <div className="absolute top-[24%] left-[250px] md:left-[386px] w-[60px] md:w-[120px]">
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

//           {/* ================= Bed Length / Depth ================= */}
//           {/* LG position kept same */}
//           <div className="absolute top-[56%] right-[10px] md:right-[12px] w-[60px] md:w-[120px]">
//             <Controller
//               name="attributes.measurements.0.bedLength"
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

// export default SofaCumBedPullOutDiagram;
