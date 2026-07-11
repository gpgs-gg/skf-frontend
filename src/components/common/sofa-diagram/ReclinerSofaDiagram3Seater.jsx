import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const ReclinerSofaDiagram3Seater = ({ control }) => {
  return (
    <div className="w-full px-2">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="absolute left-[-240px] top-[60%] w-[260px] max-w-md  w-[200px] ">
            <div className="  ">
              <Controller
                name="attributes.measurements.0.notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Enter Notes  "
                    className="
                          w-full bg-white
                          border
                          rounded-md
                          px-2 xs:px-3
                          py-1.5 xs:py-2
                          text-xs xs:text-sm lg:text-[18px]
                          resize-none
                          focus:outline-none
                        
                        "
                  />
                )}
              />
            </div>
          </div>
          {/* Diagram Image */}
          <img
            src={IMAGES.ReclinerSofaDiagram3Seater}
            alt="Recliner Sofa 3 Seater"
            className="w-full h-auto"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[120px]">
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
          <div className="absolute top-[39%] left-[477px] w-[120px]">
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

          {/* ================= Depth ================= */}
          {/* <div className="absolute top-[47%] right-[-70px] w-[120px]">
            <Controller
              name="attributes.measurements.1.depth"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter Depth"
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
          </div> */}

          {/* ================= Notes ================= */}
        </div>
      </div>
    </div>
  );
};

export default ReclinerSofaDiagram3Seater;
