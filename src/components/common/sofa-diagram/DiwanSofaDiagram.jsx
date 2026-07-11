import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const DiwanSofaDiagram = ({ control }) => {
  return (
    <div className="w-full px-2">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="absolute  top-[0%] left-[275px] -translate-x-1/2 w-[260px]">
            <Controller
              name="attributes.measurements.0.notes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={2}
                  placeholder="Enter Notes"
                  className="
                    w-full bg-white
                    border
                    rounded-md
                    px-2 py-2
                    text-xs sm:text-sm
                    resize-none
                    focus:outline-none
                   
                  "
                />
              )}
            />
          </div>
          {/* Diagram Image */}
          <img
            src={IMAGES.DiwanSofaDiagram}
            alt="Diwan Sofa Diagram"
            className="w-full h-auto"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[79%] left-1/2 -translate-x-1/2 w-[120px]">
            <Controller
              name="attributes.measurements.0.width"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter Width"
                  className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:text-[10px] sm:placeholder:text-[11px] md:placeholder:text-[13px]
                    shadow-sm
                  "
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                />
              )}
            />
          </div>

          {/* ================= Height ================= */}
          <div className="absolute top-[40%] -left-[74px] w-[120px]">
            <Controller
              name="attributes.measurements.0.height"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter Height"
                  className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:text-[10px] sm:placeholder:text-[11px] md:placeholder:text-[13px]
                    shadow-sm
                  "
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiwanSofaDiagram;
