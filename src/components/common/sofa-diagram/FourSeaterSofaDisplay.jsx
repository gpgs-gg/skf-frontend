import React from "react";
import { IMAGES } from "@/constants/images";

const FourSeaterSofaDisplay = ({ product }) => {
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
                w-full bg-white border rounded-md
                px-2 xs:px-3
                py-1.5 xs:py-2
                text-xs xs:text-sm lg:text-[18px]
                whitespace-pre-wrap
                h-36 md:h-36 lg:h-27
                overflow-y-auto
              "
            >
              {notes || "-"}
            </div>
          </div>

          {/* Sofa Image */}
          <img
            src={IMAGES.FoureaterSofa}
            alt="Four Seater Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* Width */}
          <div className="absolute top-[48%] left-[90px] md:left-[170px] w-[120px]">
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

          {/* Height */}
          <div className="absolute top-[20%] md:right-[10px] left-[-2px] md:-left-[70px] w-[60px] md:w-[120px]">
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

          {/* Depth */}
          <div className="absolute top-[68%] right-[0px] md:right-[-5px] w-[60px] md:w-[120px]">
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
            whitespace-pre-wrap
            h-20
            overflow-y-auto
          "
        >
          {notes || "-"}
        </div>
      </div>
    </div>
  );
};

export default FourSeaterSofaDisplay;
