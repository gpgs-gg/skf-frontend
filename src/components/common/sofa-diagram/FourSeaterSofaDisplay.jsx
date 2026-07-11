import React from "react";
import { IMAGES } from "@/constants/images";

const FourSeaterSofaDisplay = ({ product }) => {
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const depth = product?.attributes?.measurements?.[1]?.depth || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div className="w-full">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* Notes */}
          <div className="ml-[50px] md:ml-[120px] lg:ml-[130px] w-[200px]">
            <div className="w-full max-w-md">
              <div className="w-full min-h-[60px] rounded-md border  px-3 py-2 text-sm whitespace-pre-wrap">
                {notes}
              </div>
            </div>
          </div>

          {/* Diagram */}
          <img
            src={IMAGES.FoureaterSofa}
            alt="Four Seater Sofa Diagram"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* Width */}
          <div className="absolute top-[55%] left-[90px] md:left-[170px] w-[120px]">
            <div className="w-full rounded-md border  px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
              {width}
            </div>
          </div>

          {/* Height */}
          <div className="absolute top-[34%] right-[10px] md:-left-[70px] w-[60px] md:w-[120px]">
            <div className="w-full rounded-md border  px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
              {height}
            </div>
          </div>

          {/* Depth */}
          <div className="absolute top-[74%] right-[0px] md:right-[-5px] w-[60px] md:w-[120px]">
            <div className="w-full rounded-md border  px-2 py-1 text-center font-bold text-[14px] sm:text-[16px] md:text-[18px]">
              {depth}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourSeaterSofaDisplay;
