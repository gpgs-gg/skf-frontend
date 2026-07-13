import { IMAGES } from "@/constants/images";

const ThreeSeaterSofaDisplay = ({ product }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const depth = product?.attributes?.measurements?.[1]?.depth || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div className="w-full">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes (Desktop) ================= */}
          <div className="hidden lg:block absolute left-[-198px] top-[63%] md:w-[150px] lg:w-[260px]">
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
            src={IMAGES.ThreeSeaterSofaDiagram}
            alt="Three Seater Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[51%] left-[90px] md:left-[170px] w-[120px]">
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
          <div className="absolute top-[20%] md:right-[10px] md:-left-[74px] w-[60px] md:w-[120px]">
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

          {/* ================= Depth ================= */}
          <div className="absolute top-[73%] right-[0px] md:right-[-0px] w-[60px] md:w-[120px]">
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
          </div>
        </div>
      </div>

      {/* ================= Notes for md and small devices ================= */}
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

export default ThreeSeaterSofaDisplay;
// const ThreeSeaterSofaDisplay = ({ product }) => {
//   const width = product?.attributes?.measurements?.[0]?.width || "-";
//   const height = product?.attributes?.measurements?.[0]?.height || "-";
//   const depth = product?.attributes?.measurements?.[1]?.depth || "-";
//   const notes = product?.attributes?.measurements?.[0]?.notes || "-";

//   return (
//     <div className="w-full">
//       <div className="flex justify-center overflow-hidden">
//         <div className="relative w-full max-w-[520px]">
//           {/* Notes */}
//           <div className="ml-[50px] md:ml-[120px] lg:ml-[130px] w-[200px]">
//             <div className="w-full max-w-md">
//               <div className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm whitespace-pre-wrap">
//                 {notes}
//               </div>
//             </div>
//           </div>

//           {/* Diagram */}
//           <img
//             src={IMAGES.ThreeSeaterSofaDiagram}
//             alt="Three Seater Sofa Diagram"
//             className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
//           />

//           {/* Width */}
//           <div className="absolute top-[55%] left-[90px] md:left-[170px] w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {width}
//             </div>
//           </div>

//           {/* Height */}
//           <div className="absolute top-[34%] right-[10px] md:-left-[70px] w-[60px] md:w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {height}
//             </div>
//           </div>

//           {/* Depth */}
//           <div className="absolute top-[74%] right-[0px] md:right-[-5px] w-[60px] md:w-[120px]">
//             <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
//               {depth}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
