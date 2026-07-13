import React from "react";
import { IMAGES } from "@/constants/images";

const OttomanDiagramDisplay = ({ product }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div className="w-full">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes (Desktop) ================= */}
          <div className="hidden lg:block absolute left-[-248px] top-[40%] w-[260px]">
            <div
              className="
                w-full bg-white
                border
                rounded-md
                px-3 py-2
                text-sm lg:text-[18px]
                whitespace-pre-wrap
                min-h-[110px]
              "
            >
              {notes}
            </div>
          </div>

          {/* ================= Diagram Image ================= */}
          <img
            src={IMAGES.OttomanDiagram}
            alt="Ottoman Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[17%] left-[50px] md:left-[265px] w-[60px] lg:w-[120px]">
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
          <div className="absolute top-[49%] left-[10px] md:left-[415px] w-[60px] md:w-[120px]">
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

          {/* ================= Notes (Mobile & Tablet) ================= */}
          <div className="absolute w-[260px] lg:hidden left-[25px] md:left-[120px] top-[75%]">
            <div
              className="
                w-full bg-white
                border
                rounded-md
                px-3 py-2
                text-sm md:text-base
                whitespace-pre-wrap
                h-20
              "
            >
              {notes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OttomanDiagramDisplay;

// import React from "react";
// import { IMAGES } from "@/constants/images";

// const OttomanDiagramDisplay = ({ product }) => {
//   const width = product?.attributes?.measurements?.[0]?.width || "-";
//   const height = product?.attributes?.measurements?.[0]?.height || "-";
//   const notes = product?.attributes?.measurements?.[0]?.notes || "-";

//   return (
//     <div className="w-full">
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[520px]">
//           {/* ================= Notes ================= */}
//           <div className="absolute top-[1%] ml-[50px] md:ml-[100px] lg:ml-[80px] w-[260px]">
//             <div className="w-full max-w-md">
//               <div className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm whitespace-pre-wrap">
//                 {notes}
//               </div>
//             </div>
//           </div>

//           {/* ================= Diagram Image ================= */}
//           <img
//             src={IMAGES.OttomanDiagram}
//             alt="Ottoman Diagram"
//             className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute top-[17%] left-[70px] md:left-[265px] w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {width}
//             </div>
//           </div>

//           {/* ================= Height ================= */}
//           <div className="absolute top-[49%] left-[10px] md:left-[415px] w-[60px] md:w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {height}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OttomanDiagramDisplay;
