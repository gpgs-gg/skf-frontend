import React from "react";
import { IMAGES } from "@/constants/images";

const ReclinerSofa1SeaterDiagramDisplay = ({ product }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const depth = product?.attributes?.measurements?.[1]?.depth || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <>
      {/* ================= Desktop & Tablet ================= */}
      <div className="hidden md:block w-full px-2">
        <div className="flex justify-center overflow-hidden">
          <div className="relative w-full max-w-[620px]">
            {/* ================= Notes ================= */}
            <div className="hidden lg:block absolute left-[-242px] top-[60%] md:w-[150px] lg:w-[260px] max-w-md">
              <div
                className="
                  w-full bg-white border rounded-md
                  px-2 xs:px-3 py-1.5 xs:py-2
                  text-xs xs:text-sm lg:text-[18px]
                  min-h-[108px]
                  whitespace-pre-wrap
                "
              >
                {notes}
              </div>
            </div>

            {/* ================= Recliner Diagram ================= */}
            <img
              src={IMAGES.ReclinerSofa1Seater}
              alt="Recliner Sofa 1 Seater"
              className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
            />

            {/* ================= Width ================= */}
            <div className="absolute top-[76%] left-[50px] w-[60px] md:left-[100px] lg:left-[66px] lg:w-[120px]">
              <div className="w-full border rounded-md px-2 py-1 text-center bg-white/90 backdrop-blur-sm font-bold text-[14px] sm:text-[16px] md:text-[18px]">
                {width}
              </div>
            </div>

            {/* ================= Height ================= */}
            <div className="absolute top-[40%] left-[0px] md:left-[-26px] lg:left-[-92px] w-[60px] lg:w-[120px]">
              <div className="w-full border rounded-md px-2 py-1 text-center bg-white/90 backdrop-blur-sm font-bold text-[14px] sm:text-[16px] md:text-[18px]">
                {height}
              </div>
            </div>

            {/* ================= Depth ================= */}
            <div className="absolute top-[76%] left-[180px] w-[60px] md:left-[290px] lg:left-[266px] lg:w-[120px]">
              <div className="w-full border rounded-md px-2 py-1 text-center bg-white/90 backdrop-blur-sm font-bold text-[14px] sm:text-[16px] md:text-[18px]">
                {depth}
              </div>
            </div>
          </div>
        </div>

        {/* ================= Notes (Tablet) ================= */}
        <div className="lg:hidden md:mx-22">
          <div className="w-full bg-white border rounded-md px-3 py-2 text-sm md:text-base min-h-[80px] whitespace-pre-wrap">
            {notes}
          </div>
        </div>
      </div>

      {/* ================= Mobile ================= */}
      <div className="px-2 md:hidden">
        <div className="flex justify-center overflow-hidden">
          <div className="relative w-full max-w-[620px]">
            <img
              src={IMAGES.ReclinerSofa1Seater}
              alt="Recliner Sofa 1 Seater"
              className="w-[300px] h-[400px]"
            />

            {/* Width */}
            <div className="absolute top-[76%] left-[50px] w-[60px]">
              <div className="w-full border rounded-md px-2 py-1 text-center bg-white/90 backdrop-blur-sm font-bold text-[14px]">
                {width}
              </div>
            </div>

            {/* Height */}
            <div className="absolute top-[40%] left-[0px] w-[60px]">
              <div className="w-full border rounded-md px-2 py-1 text-center bg-white/90 backdrop-blur-sm font-bold text-[14px]">
                {height}
              </div>
            </div>

            {/* Depth */}
            <div className="absolute top-[76%] left-[180px] w-[60px]">
              <div className="w-full border rounded-md px-2 py-1 text-center bg-white/90 backdrop-blur-sm font-bold text-[14px]">
                {depth}
              </div>
            </div>
          </div>
        </div>

        {/* ================= Notes (Mobile) ================= */}
        <div className="mt-2">
          <div className="w-full bg-white border rounded-md px-3 py-2 text-sm min-h-[80px] whitespace-pre-wrap">
            {notes}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReclinerSofa1SeaterDiagramDisplay;

// import React from "react";
// import { IMAGES } from "@/constants/images";

// const ReclinerSofa1SeaterDiagramDisplay = ({ product }) => {
//   const width = product?.attributes?.measurements?.[0]?.width || "-";
//   const height = product?.attributes?.measurements?.[0]?.height || "-";
//   const depth = product?.attributes?.measurements?.[1]?.depth || "-";
//   const notes = product?.attributes?.measurements?.[0]?.notes || "-";

//   return (
//     <div className="w-full px-2">
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[620px]">
//           {/* ================= Notes ================= */}
//           <div className="absolute top-[5%] ml-[50px] md:ml-[100px] lg:ml-[80px] w-[260px]">
//             <div className="w-full max-w-md">
//               <div className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm whitespace-pre-wrap">
//                 {notes}
//               </div>
//             </div>
//           </div>

//           {/* ================= Recliner Diagram ================= */}
//           <img
//             src={IMAGES.ReclinerSofa1Seater}
//             alt="Recliner Sofa 1 Seater"
//             className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
//           />

//           {/* ================= Width ================= */}
//           <div className="absolute top-[76%] left-[51%] -translate-x-1/2 w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {width}
//             </div>
//           </div>

//           {/* ================= Depth ================= */}
//           <div className="absolute top-[76%] left-[22%] -translate-x-1/2 w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {depth}
//             </div>
//           </div>

//           {/* ================= Height ================= */}
//           <div className="absolute top-[40%] -left-[90px] w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {height}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReclinerSofa1SeaterDiagramDisplay;
