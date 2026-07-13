import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const ChaiseLoungeSofaDiagram = ({ control }) => {
  return (
    <div className="w-full px-2">
      <div className="flex justify-center overflow-hidden pb-2 md:pb-0">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          {/* ================= Notes ================= */}
          <div className=" hidden lg:block absolute top-[5%]  ml-[50px] md:ml-[100px] lg:ml-[150px] w-[260px]">
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
          {/* Diagram Image */}
          <img
            src={IMAGES.ChaiseLoungeSofaDiagram}
            alt="Chaise Lounge Sofa Diagram"
            className="w-full h-auto mt-4"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[88%] left-1/2 -translate-x-1/2 w-[120px] ">
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
          <div className="absolute top-[42%] lg:-left-[85px] md:-left-[52px] md:w-[80px] w-[60px] lg:w-[120px]">
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
      {/* notes for md and small devices */}
      <div className="lg:hidden md:mx-22 pt-6">
        <Controller
          name="attributes.measurements.0.notes"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Enter Notes"
              className="
                w-full bg-white border rounded-md
                px-3 py-2
                text-sm md:text-base
                resize-none
                focus:outline-none
                h-20
              "
            />
          )}
        />
      </div>
    </div>
  );
};

export default ChaiseLoungeSofaDiagram;
