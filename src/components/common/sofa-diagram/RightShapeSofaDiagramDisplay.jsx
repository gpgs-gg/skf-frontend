import React from "react";
import { IMAGES } from "@/constants/images";

const RightShapeSofaDiagramDisplay = ({ product }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const depth = product?.attributes?.measurements?.[1]?.depth || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div className="w-full">
      {/* ================= Front View ================= */}
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes (Desktop) ================= */}
          <div className="hidden lg:block absolute left-[-198px] top-[60%] md:w-[150px] lg:w-[260px] max-w-md">
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
              {notes || "-"}
            </div>
          </div>

          {/* ================= Sofa Image ================= */}
          <img
            src={IMAGES.LShapeSofaDiagram}
            alt="Right L Shape Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[1%] left-[90px] md:left-[165px] w-[120px]">
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
          </div>

          {/* ================= Height ================= */}
          <div className="absolute top-[42%] right-[10px] lg:right-[-12px] w-[60px] md:w-[120px]">
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
          </div>

          {/* ================= Depth ================= */}
          <div className="absolute top-[80%] md:top-[82%] right-[64px] md:right-[132px] w-[60px] md:w-[120px]">
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
          </div>
        </div>
      </div>

      {/* ================= Notes (Mobile & Tablet) ================= */}
      <div className="lg:hidden md:mx-22">
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
          {notes || "-"}
        </div>
      </div>
    </div>
  );
};

export default RightShapeSofaDiagramDisplay;

// import React from "react";
// import { IMAGES } from "@/constants/images";

// const RightShapeSofaDiagramDisplay = ({ product }) => {
//   const width = product?.attributes?.measurements?.[0]?.width || "-";
//   const height = product?.attributes?.measurements?.[0]?.height || "-";
//   const depth = product?.attributes?.measurements?.[1]?.depth || "-";
//   const notes = product?.attributes?.measurements?.[0]?.notes || "-";

//   return (
//     <div className="w-full">
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[520px]">
//           {/* ================= Notes ================= */}
//           <div className="ml-[50px] md:ml-[100px] lg:ml-[80px] w-[260px]">
//             <div className="w-full max-w-md">
//               <div className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm whitespace-pre-wrap">
//                 {notes}
//               </div>
//             </div>
//           </div>

//           {/* ================= Sofa Image ================= */}
//           <img
//             src={IMAGES.LShapeSofaDiagram}
//             alt="Right L Shape Sofa Diagram"
//             className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute top-[15%] left-[90px] md:left-[165px] w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {width}
//             </div>
//           </div>

//           {/* ================= Height ================= */}
//           <div className="absolute top-[48%] right-[10px] md:right-[-12px] w-[60px] md:w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {height}
//             </div>
//           </div>

//           {/* ================= Depth ================= */}
//           <div className="absolute top-[82%] right-[120px] md:right-[132px] w-[60px] md:w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {depth}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RightShapeSofaDiagramDisplay;
