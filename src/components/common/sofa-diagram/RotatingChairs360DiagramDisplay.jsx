import React from "react";
import { IMAGES } from "@/constants/images";

const RotatingChairs360DiagramDisplay = ({ product }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div className="w-full">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="absolute top-[5%] ml-[20px] md:ml-[100px] lg:ml-[80px] w-[260px]">
            <div className="w-full max-w-md">
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
                  min-h-[60px]
                "
              >
                {notes}
              </div>
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
          </div>

          {/* ================= Height ================= */}
          <div className="absolute top-[40%] md:-left-[100px] w-[60px] md:w-[120px]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatingChairs360DiagramDisplay;

// import React from "react";
// import { IMAGES } from "@/constants/images";

// const RotatingChairs360DiagramDisplay = ({ product }) => {
//   const width = product?.attributes?.measurements?.[0]?.width || "-";
//   const height = product?.attributes?.measurements?.[0]?.height || "-";
//   const notes = product?.attributes?.measurements?.[0]?.notes || "-";

//   return (
//     <div className="w-full">
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[520px]">
//           {/* ================= Notes ================= */}
//           <div className="absolute top-[5%] ml-[50px] md:ml-[100px] lg:ml-[80px] w-[260px]">
//             <div className="w-full max-w-md">
//               <div className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm whitespace-pre-wrap">
//                 {notes}
//               </div>
//             </div>
//           </div>

//           {/* ================= Diagram Image ================= */}
//           <img
//             src={IMAGES.RotatingChairs360Diagram}
//             alt="360 Rotating Chair Diagram"
//             className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute top-[68%] left-[35px] md:left-[80px] w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {width}
//             </div>
//           </div>

//           {/* ================= Height ================= */}
//           <div className="absolute top-[40%] md:-left-[100px] w-[60px] md:w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {height}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RotatingChairs360DiagramDisplay;
