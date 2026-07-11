import React from "react";
import { IMAGES } from "@/constants/images";

const SofaCumBedPullOutDiagramDisplay = ({ product }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const bedLength = product?.attributes?.measurements?.[0]?.bedLength || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div className="w-full">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="absolute ml-[50px] md:ml-[100px] lg:ml-[80px] w-[260px]">
            <div className="w-full max-w-md">
              <div className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm whitespace-pre-wrap">
                {notes}
              </div>
            </div>
          </div>

          {/* ================= Diagram Image ================= */}
          <img
            src={IMAGES.SofaCumBedPullOutDiagram}
            alt="Sofa Cum Bed Pull Out Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px] pt-2"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[86%] left-[90px] md:left-[165px] w-[120px]">
            <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
              {width}
            </div>
          </div>

          {/* ================= Sofa Height ================= */}
          <div className="absolute top-[24%] left-[10px] md:left-[386px] w-[60px] md:w-[120px]">
            <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
              {height}
            </div>
          </div>

          {/* ================= Bed Length ================= */}
          <div className="absolute top-[56%] right-[10px] md:right-[12px] w-[60px] md:w-[120px]">
            <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
              {bedLength}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SofaCumBedPullOutDiagramDisplay;
