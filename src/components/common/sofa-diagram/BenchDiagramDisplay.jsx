import React from "react";
import { IMAGES } from "@/constants/images";

const BenchDiagramDisplay = ({ product }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div className="w-full px-2">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="absolute top-[5%] ml-[50px] md:ml-[100px] lg:ml-[110px] w-[260px]">
            <div className="w-full max-w-md">
              <div className="w-full min-h-[60px] rounded-md border px-3 py-2 text-sm whitespace-pre-wrap">
                {notes}
              </div>
            </div>
          </div>

          {/* ================= Diagram Image ================= */}
          <img
            src={IMAGES.BenchDiagram}
            alt="Bench Stool Diagram"
            className="w-full h-auto"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[76%] left-1/2 -translate-x-1/2 w-[120px]">
            <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
              {width}
            </div>
          </div>

          {/* ================= Height ================= */}
          <div className="absolute top-[38%] left-[454px] w-[120px]">
            <div className="w-full rounded-md border px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
              {height}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchDiagramDisplay;
