import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const UShapeSofaDiagram = ({ control, product, isView = false }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const depth = product?.attributes?.measurements?.[1]?.depth || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";
  return (
    <div className="w-full">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="hidden lg:block absolute left-[-288px] top-[60%] md:w-[150px] lg:w-[260px] max-w-md">
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
            src={IMAGES.UShapeSofaDiagram}
            alt="U Shape Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px] mt-2"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[0%] left-[90px] md:left-[144px] w-[120px]">
            {isView ? (
              <div
                className="
      w-full border rounded-md px-2 py-1
      text-center bg-white/90 backdrop-blur-sm
      shadow-sm
      font-bold
      text-[14px] sm:text-[16px] md:text-[18px]
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
            )}
          </div>

          {/* ================= Height ================= */}
          <div className="absolute top-[48%] left-[272px] md:left-[440px] w-[70px] md:w-[120px]">
            {isView ? (
              <div
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
            )}
          </div>

          {/* ================= Depth ================= */}
          <div className="absolute top-[91%] right-[86px] md:right-[110px] w-[60px] md:w-[120px]">
            {isView ? (
              <div
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
            )}
          </div>
        </div>
      </div>
      {/* ================= Notes for md & small devices ================= */}
      <div className="lg:hidden mt-2 md:mx-22">
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

export default UShapeSofaDiagram;

// import React from "react";
// import { Controller } from "react-hook-form";
// import { IMAGES } from "@/constants/images";

// const UShapeSofaDiagram = ({ control }) => {
//   return (
//     <div className="w-full">
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[520px]">
//           {/* ================= Notes ================= */}
//           <div className="hidden lg:block absolute left-[-268px] top-[60%] w-[260px] max-w-md  w-[200px] ">
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
//                            w-full bg-white
//                            border
//                            rounded-md
//                            px-2 xs:px-3
//                            py-1.5 xs:py-2
//                            text-xs xs:text-sm lg:text-[18px]
//                            resize-none
//                            focus:outline-none

//                          "
//                   />
//                 )}
//               />
//             </div>
//           </div>

//           {/* ================= Sofa Image ================= */}
//           <img
//             src={IMAGES.UShapeSofaDiagram}
//             alt="U Shape Sofa Diagram"
//             className="w-[300px] h-[400px] md:w-[450px] md:h-[400px] mt-2"
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute top-[0%] left-[90px] md:left-[144px] w-[120px]">
//             <Controller
//               name="attributes.measurements.0.width"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="number"
//                   placeholder="Enter Width"
//                   className="
//                     w-full
//                     border
//                     rounded-md
//                     px-2
//                     py-1
//                     text-center
//                     bg-white/90
//                     backdrop-blur-sm
//                     shadow-sm
//                     font-bold
//                     text-[14px]
//                     sm:text-[16px]
//                     md:text-[18px]
//                     placeholder:font-normal
//                     placeholder:text-[10px]
//                     sm:placeholder:text-[11px]
//                     md:placeholder:text-[13px]
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
//           <div className="absolute top-[48%] left-[238px] md:left-[440px] w-[70px] md:w-[120px]">
//             <Controller
//               name="attributes.measurements.0.height"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="number"
//                   placeholder="Height"
//                   className="
//                     w-full
//                     border
//                     rounded-md
//                     px-2
//                     py-1
//                     text-center
//                     bg-white/90
//                     backdrop-blur-sm
//                     shadow-sm
//                     font-bold
//                     text-[14px]
//                     sm:text-[16px]
//                     md:text-[18px]
//                     placeholder:font-normal
//                     placeholder:text-[10px]
//                     sm:placeholder:text-[11px]
//                     md:placeholder:text-[13px]
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
//           <div className="absolute top-[91%] right-[60px] md:right-[110px] w-[60px] md:w-[120px]">
//             <Controller
//               name="attributes.measurements.1.depth"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="number"
//                   placeholder="Depth"
//                   className="
//                     w-full
//                     border
//                     rounded-md
//                     px-2
//                     py-1
//                     text-center
//                     bg-white/90
//                     backdrop-blur-sm
//                     shadow-sm
//                     font-bold
//                     text-[14px]
//                     sm:text-[16px]
//                     md:text-[18px]
//                     placeholder:font-normal
//                     placeholder:text-[10px]
//                     sm:placeholder:text-[11px]
//                     md:placeholder:text-[13px]
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
//       <div className="lg:hidden mt-2 md:mx-22">
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

// export default UShapeSofaDiagram;
