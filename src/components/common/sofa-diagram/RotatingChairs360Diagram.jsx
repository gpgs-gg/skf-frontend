import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const RotatingChairs360Diagram = ({ control, product, isView = false }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div className="w-full ">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="absolute top-[5%] ml-[20px] md:ml-[100px] lg:ml-[80px] w-[260px]">
            <div className="w-full max-w-md">
              {isView ? (
                <div
                  className="
                    w-full
                    bg-white
                    border
                    rounded-md
                    px-2 xs:px-3
                    py-1.5 xs:py-2
                    text-xs xs:text-sm
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
                      rows={2}
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
              )}
            </div>
          </div>

          {/* ================= Diagram Image ================= */}
          <img
            src={IMAGES.RotatingChairs360Diagram}
            alt="360 Rotating Chair Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />
          {/* ================= Width ================= */}
          <div className="absolute top-[68%] left-[35px] md:left-[80px] w-[120px]">
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
          <div className="absolute top-[40%] md:-left-[100px] w-[60px] md:w-[120px]">
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
        </div>
      </div>

      {/* ================= Notes for md & small devices ================= */}
      <div className="lg:hidden pt-4">
        {isView ? (
          <div
            className="
              w-full bg-white border rounded-md
              px-3 py-2
              text-sm md:text-base
              whitespace-pre-wrap
              overflow-y-auto
              h-20
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
                  h-20 md:h-28 lg:h-32
                "
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default RotatingChairs360Diagram;

// import React from "react";
// import { Controller } from "react-hook-form";
// import { IMAGES } from "@/constants/images";

// const RotatingChairs360Diagram = ({ control }) => {
//   return (
//     <div className="w-full">
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[520px]">
//           {/* ================= Notes ================= */}
//           <div className=" absolute top-[5%]  ml-[20px] md:ml-[100px] lg:ml-[80px] w-[260px]">
//             <div className="w-full max-w-md">
//               <Controller
//                 name="attributes.measurements.0.notes"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <textarea
//                     {...field}
//                     rows={2}
//                     placeholder="Enter Notes"
//                     className="
//                                                                w-full
//                                                                bg-white
//                                                                border
//                                                                rounded-md
//                                                                px-2 xs:px-3
//                                                                py-1.5 xs:py-2
//                                                                text-xs xs:text-sm
//                                                                resize-none
//                                                                focus:outline-none

//                                                              "
//                   />
//                 )}
//               />
//             </div>
//           </div>

//           {/* ================= Diagram Image ================= */}
//           <img
//             src={IMAGES.RotatingChairs360Diagram}
//             alt="360 Rotating Chair Diagram"
//             className="w-[300px] h-[400px]  md:w-[450px] md:h-[400px]"
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute top-[68%] left-[35px] md:left-[80px] w-[120px]">
//             <Controller
//               name="attributes.measurements.0.width"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="number"
//                   placeholder="Width"
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
//           {/* <div className="absolute top-[68%] right-[10px] md:right-[20px] w-[120px]">
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
//           </div> */}

//           {/* ================= Height ================= */}
//           <div className="absolute top-[40%]  md:-left-[100px] w-[60px] md:w-[120px]">
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
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RotatingChairs360Diagram;
