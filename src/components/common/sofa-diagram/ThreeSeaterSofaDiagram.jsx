import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const ThreeSeaterSofaDiagram = ({ control }) => {
  return (
    <div className="w-full ">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="hidden lg:block absolute left-[-198px] top-[63%] md:w-[150px] lg:w-[260px] ">
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
          </div>

          {/* ================= Sofa Image ================= */}
          <img
            src={IMAGES.ThreeSeaterSofaDiagram}
            alt="Three Seater Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[51%] left-[90px] md:left-[170px] w-[120px]">
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
          <div className="absolute top-[20%] md:right-[10px] md:-left-[74px] w-[60px] md:w-[120px]">
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
          <div className="absolute top-[73%] right-[0px] md:right-[-0px] w-[60px] md:w-[120px]">
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

      {/* ================= Notes for md and small devices ================= */}
      <div className="lg:hidden md:mx-22">
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
      </div>
    </div>
  );
};

export default ThreeSeaterSofaDiagram;

// import React from "react";
// import { Controller } from "react-hook-form";

// const ThreeSeaterSofaDiagram = ({ control }) => {
//   return (
//     <div>
//       <div className="lg:flex justify-center ">
//         {/* first */}
//         <div className="origin-top scale-75 sm:scale-90 md:scale-95 lg:scale-100">
//           <div className="flex justify-center">
//             <div className="relative w-[420px] h-[220px]">
//               <div>
//                 {/* Width Line */}
//                 <div className="absolute top-[185px] left-[46px] w-[310px] border-t border-black">
//                   <div
//                     className="absolute -left-[1px] -top-[4px]
// w-0 h-0
// border-r-[6px] border-r-black
// border-y-[4px] border-y-transparent"
//                   />

//                   <div
//                     className="absolute -right-[1px] -top-[4px]
// w-0 h-0
// border-l-[6px] border-l-black
// border-y-[4px] border-y-transparent"
//                   />
//                   <div className="absolute -right-1 -top-1 h-3 border-l-2 border-black" />
//                 </div>

//                 {/* Width Input */}
//                 <div className="absolute top-[192px] left-[145px]">
//                   <Controller
//                     name="attributes.measurements.0.width"
//                     control={control}
//                     render={({ field }) => (
//                       <input
//                         {...field}
//                         type="number"
//                         placeholder="Enter Width"
//                         className="
//           w-28 border rounded-md px-2 py-1
//           text-center bg-white
//           font-bold text-[18px]
//           placeholder:font-normal placeholder:text-[13px]
//         "
//                         onChange={(e) =>
//                           field.onChange(
//                             e.target.value === "" ? "" : Number(e.target.value),
//                           )
//                         }
//                       />
//                     )}
//                   />
//                 </div>

//                 {/* Height Line */}
//                 <div className="absolute left-[15px] top-[35px] h-[120px] border-l border-black">
//                   {/* Top Arrow */}
//                   <div
//                     className="absolute -left-[4px] top-0 w-0 h-0
//        border-b-[6px] border-b-black
//        border-x-[4px] border-x-transparent"
//                   />

//                   {/* Bottom Arrow */}
//                   <div
//                     className="absolute -left-[4px] bottom-0 w-0 h-0
//        border-t-[6px] border-t-black
//        border-x-[4px] border-x-transparent"
//                   />

//                   {/* Extension Lines */}
//                   {/* <div className="absolute left-0 top-0 w-[18px] border-t border-black"></div>
//               <div className="absolute left-0 bottom-0 w-[18px] border-t border-black"></div> */}
//                 </div>

//                 {/* Height Input */}
//                 <div className="absolute top-[90px] left-[-100px]">
//                   <Controller
//                     name="attributes.measurements.0.height"
//                     control={control}
//                     render={({ field }) => (
//                       <input
//                         {...field}
//                         type="number"
//                         placeholder="Enter Height"
//                         className="
//           w-28 border rounded-md px-2 py-1
//           text-center bg-white
//           font-bold text-[18px]
//           placeholder:font-normal placeholder:text-[13px]
//         "
//                         onChange={(e) =>
//                           field.onChange(
//                             e.target.value === "" ? "" : Number(e.target.value),
//                           )
//                         }
//                       />
//                     )}
//                   />
//                 </div>

//                 {/* Sofa */}
//                 <div className="absolute left-[60px] top-[35px] b">
//                   {/* Back Cushions */}
//                   <div className="flex">
//                     <div className="w-24 h-14 border-2 border-gray-700 rounded-t-md"></div>
//                     <div className="w-24 h-14 border-y-2 border-r-2 border-gray-700 rounded-t-md"></div>
//                     <div className="w-24 h-14 border-y-2 border-r-2 border-gray-700 rounded-t-md"></div>
//                   </div>

//                   {/* Seat */}
//                   <div className="w-[288px] h-6 border-x-2 border-b-2 border-gray-700 rounded-b-sm"></div>
//                   <div className="w-[288px]  h-6 border-x-2 border-b-2 border-gray-700 rounded-b-sm"></div>

//                   {/* Armrests */}
//                   <div className="absolute  left-[-18px] top-8 w-5 h-18 border-2 border-gray-700 rounded-l-md"></div>
//                   <div className="absolute right-[-18px] top-8 w-5 h-18 border-2 border-gray-700 rounded-r-md"></div>

//                   {/* Legs */}
//                   <div className="absolute left-[0px] top-[104px] w-2 h-4 bg-gray-700"></div>
//                   <div className="absolute right-[-0px] border border-2 border-gray-700 bg-gray-700 top-[104px] w-2 h-4 "></div>
//                 </div>
//               </div>
//             </div>
//             <br />
//           </div>
//         </div>
//         {/* Notes */}
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
//             w-full
//             border
//             rounded-md
//             px-3
//             py-2
//             text-sm
//             resize-none
//             focus:outline-none
//             focus:ring-2
//             focus:ring-blue-500
//             focus:border-blue-500
//           "
//                 />
//               )}
//             />
//           </div>
//         </div>
//       </div>

//       {/* second */}
//       <div className="flex lg:mr-54 justify-center mt-4">
//         <div className="relative  w-[420px] h-[220px]">
//           {/* ================= Sofa ================= */}
//           <div className="absolute top-[40px]  left-[70px] w-[320px] h-[130px] border border-2 border-gray-700 ">
//             <div className="absolute left-[18px] right-[18px] top-[28px] border-b border border-gray-700"></div>

//             {/* Left Arm */}
//             <div className="absolute  left-0 top-0 w-[18px] h-full border-r   border-gray-700"></div>

//             {/* Right Arm */}
//             <div className="absolute  right-0 top-0 w-[18px] h-full border-l border-gray-700"></div>

//             {/* Seat Dividers */}
//             <div className="absolute  left-[105px] top-0 h-full border-l  border-gray-700"></div>

//             <div className="absolute left-[213px] top-0 h-full border-l  border-gray-700"></div>

//             {/* Legs */}
//             <div className="absolute left-[8px] bottom-[-8px] w-[5px] h-[8px] bg-gray-700"></div>

//             <div className="absolute right-[8px] bottom-[-8px] w-[5px] h-[8px]  bg-gray-700"></div>
//           </div>

//           {/* ================= Height Dimension ================= */}
//           <div className="absolute top-[40px] left-[420px] h-[130px] border-l border-black">
//             {/* Top Arrow */}
//             <div className="absolute -left-[4px] top-0 w-0 h-0 border-b-[6px] border-b-black border-x-[4px] border-x-transparent"></div>

//             {/* Bottom Arrow */}
//             <div className="absolute -left-[4px] bottom-0 w-0 h-0 border-t-[6px] border-t-black border-x-[4px] border-x-transparent"></div>

//             {/* Extension Lines */}
//             <div className="absolute -left-[30px] top-0 w-[30px] border-t border-black"></div>

//             <div className="absolute -left-[30px] bottom-0 w-[30px] border-t border-black"></div>

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
//           w-28 border rounded-md px-2 py-1
//           text-center bg-white
//           font-bold text-[18px]
//           placeholder:font-normal placeholder:text-[13px]
//         "
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

// export default ThreeSeaterSofaDiagram;
