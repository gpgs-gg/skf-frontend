import React from "react";
import { IMAGES } from "@/constants/images";

const LeftLShapeSofaDisplay = ({ product }) => {
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
          <div className="hidden lg:block absolute left-[-268px] top-[50%] md:w-[150px] lg:w-[260px] max-w-md">
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
            src={IMAGES.LLeftSofaDiagaram}
            alt="Left L Shape Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px] mt-2"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[0%] left-[90px] md:left-[150px] w-[120px]">
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
          <div className="absolute top-[38%] md:left-[-70px] lg:left-[-114px] w-[60px] md:w-[80px] lg:w-[120px]">
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
          <div className="absolute md:w-[120px] top-[29%] right-[10px] md:right-[-40px] w-[60px]">
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

          {/* ================= Notes (Mobile & Tablet) ================= */}
          <div className="lg:hidden absolute top-[80%] w-[360px] md:mx-22">
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
      </div>
    </div>
  );
};

export default LeftLShapeSofaDisplay;

// import React from "react";
// import { IMAGES } from "@/constants/images";

// const LeftLShapeSofaDisplay = ({ product }) => {
//   const width = product?.attributes?.measurements?.[0]?.width || "-";
//   const height = product?.attributes?.measurements?.[0]?.height || "-";
//   const depth = product?.attributes?.measurements?.[1]?.depth || "-";
//   const notes = product?.attributes?.measurements?.[0]?.notes || "-";

//   return (
//     <div className="w-full">
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[520px]">
//           {/* ================= Notes ================= */}
//           <div className="ml-[50px] md:ml-[100px] lg:ml-[80px] w-[260px] ">
//             <div className="w-full max-w-md">
//               <div className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm whitespace-pre-wrap">
//                 {notes}
//               </div>
//             </div>
//           </div>

//           {/* ================= Sofa Image ================= */}
//           <img
//             src={IMAGES.LLeftSofaDiagaram}
//             alt="Left L Shape Sofa Diagram"
//             className="w-[300px] pt-2 h-[400px] md:w-[450px] md:h-[400px] "
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute top-[14%] left-[90px] md:left-[150px] w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {width}
//             </div>
//           </div>

//           {/* ================= Height ================= */}
//           <div className="absolute top-[35%] right-[10px] md:right-[-40px] w-[60px] md:w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {height}
//             </div>
//           </div>

//           {/* ================= Depth ================= */}
//           <div className="absolute top-[78%] right-[120px] md:right-[369px] w-[60px] md:w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {depth}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeftLShapeSofaDisplay;
