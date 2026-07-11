import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const ReclinerSofa1SeaterDiagram = ({ control }) => {
  return (
    <div className="w-full px-2">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[620px]">
          {/* ================= Notes ================= */}
          {/* ================= Notes ================= */}
          <div className=" absolute top-[5%] ml-[50px] md:ml-[100px] lg:ml-[80px] w-[260px]">
            <div className="w-full max-w-md">
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
                                                             w-full
                                                             bg-white
                                                             border
                                                             rounded-md
                                                             px-2 xs:px-3
                                                             py-1.5 xs:py-2
                                                             text-xs xs:text-sm
                                                             resize-none
                                                             focus:outline-none
                                                             
                                                            
                                                           "
                  />
                )}
              />
            </div>
          </div>
          {/* Recliner Diagram */}
          <img
            src={IMAGES.ReclinerSofa1Seater}
            alt="Recliner Sofa 1 Seater"
            className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[76%] left-[51%] -translate-x-1/2 w-[120px]">
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

          {/* ================= Depth ================= */}
          <div className="absolute top-[76%] left-[22%] -translate-x-1/2 w-[120px]">
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
          </div>

          {/* ================= Height ================= */}
          <div className="absolute top-[40%] -left-[90px] w-[120px]">
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

export default ReclinerSofa1SeaterDiagram;
