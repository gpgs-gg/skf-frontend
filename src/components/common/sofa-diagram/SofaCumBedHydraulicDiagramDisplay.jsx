import { IMAGES } from "@/constants/images";

const SofaCumBedHydraulicDiagramDisplay = ({ product }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div className="w-full px-2">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes (Desktop) ================= */}
          <div className="hidden lg:block absolute left-[-248px] top-[60%] md:w-[150px] lg:w-[260px] max-w-md">
            <div className="w-full min-h-[108px] rounded-md border px-3 py-2 text-sm whitespace-pre-wrap bg-white">
              {notes}
            </div>
          </div>

          {/* ================= Diagram ================= */}
          <img
            src={IMAGES.SofaCumBedHydraulic}
            alt="Sofa Cum Bed Hydraulic Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[450px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute bottom-[12%] left-[67px] md:left-[130px] w-[120px]">
            <div
              className="
                w-full border rounded-md px-2 py-1
                text-center bg-white/90 backdrop-blur-sm
                shadow-sm font-bold
                text-[14px] sm:text-[16px] md:text-[18px]
              "
            >
              {width}
            </div>
          </div>

          {/* ================= Height ================= */}
          <div className="absolute top-[40%] left-[234px] md:left-[412px] w-[60px] md:w-[120px]">
            <div
              className="
                w-full border rounded-md px-2 py-1
                text-center bg-white/90 backdrop-blur-sm
                shadow-sm font-bold
                text-[14px] sm:text-[16px] md:text-[18px]
              "
            >
              {height}
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
            min-h-[80px]
            whitespace-pre-wrap
          "
        >
          {notes}
        </div>
      </div>
    </div>
  );
};

export default SofaCumBedHydraulicDiagramDisplay;

// import React from "react";
// import { IMAGES } from "@/constants/images";

// const SofaCumBedHydraulicDiagramDisplay = ({ product }) => {
//   const width = product?.attributes?.measurements?.[0]?.width || "-";
//   const height = product?.attributes?.measurements?.[0]?.height || "-";
//   const notes = product?.attributes?.measurements?.[0]?.notes || "-";

//   return (
//     <div className="w-full px-2">
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

//           {/* ================= Diagram ================= */}
//           <img
//             src={IMAGES.SofaCumBedHydraulic}
//             alt="Sofa Cum Bed Hydraulic Diagram"
//             className="w-[300px] h-[400px] md:w-[450px] md:h-[450px]"
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute bottom-[12%] left-[130px] w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {width}
//             </div>
//           </div>

//           {/* ================= Height ================= */}
//           <div className="absolute top-[40%] left-[412px] w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {height}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SofaCumBedHydraulicDiagramDisplay;
