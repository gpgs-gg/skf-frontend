import React from "react";
import { Controller } from "react-hook-form";
import { IMAGES } from "@/constants/images";

const ReclinerSofa1SeaterDiagram = ({ control }) => {
  return (
    <>
      {/* // large devices */}
      <div className=" hidden md:block w-full px-2">
        {/* ================= Front View ================= */}
        <div className="flex justify-center overflow-hidden">
          <div className="relative w-full max-w-[620px]">
            {/* ================= Notes ================= */}
            <div className="hidden lg:block absolute left-[-242px] top-[60%] md:w-[150px] lg:w-[260px] max-w-md">
              <Controller
                name="attributes.measurements.0.notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Enter Notes"
                    className="
                    w-full bg-white
                    border
                    rounded-md
                    px-2 xs:px-3
                    py-1.5 xs:py-2
                    text-xs xs:text-sm lg:text-[18px]
                    resize-none
                    focus:outline-none
                    h-36 md:h-36 lg:h-27
                  "
                  />
                )}
              />
            </div>

            {/* ================= Recliner Diagram ================= */}
            <img
              src={IMAGES.ReclinerSofa1Seater}
              alt="Recliner Sofa 1 Seater"
              className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
            />

            {/* ================= Width ================= */}
            {/* LG position kept same */}
            <div className="absolute top-[76%] left-[50px] w-[60px] md:left-[100px] lg:left-[66px] lg:w-[120px] ">
              <Controller
                name="attributes.measurements.0.width"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Width"
                    className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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
            {/* LG position kept same */}
            <div className="absolute top-[40%] left-[-0px] md:left-[-26px] lg:left-[-92px] md:right-[44px] w-[60px] lg:w-[120px]">
              <Controller
                name="attributes.measurements.0.height"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder=" Height"
                    className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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
            <div className="absolute top-[76%] left-[180px] w-[60px] lg:left-[266px] md:left-[290px] lg:w-[120px]">
              <Controller
                name="attributes.measurements.1.depth"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Depth"
                    className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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

        {/* ================= Notes for md & small devices ================= */}
        <div className="lg:hidden md:mx-22">
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
      {/* // mobile */}
      {/* mobile */}
      <div className="px-2 md:hidden">
        {/* ================= Front View ================= */}
        <div className="flex md:block justify-center overflow-hidden">
          <div className="relative w-full max-w-[620px]">
            {/* ================= Notes ================= */}
            <div className="hidden lg:block absolute left-[-242px] top-[60%] md:w-[150px] lg:w-[260px] max-w-md">
              <Controller
                name="attributes.measurements.0.notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Enter Notes"
                    className="
                    w-full bg-white
                    border
                    rounded-md
                    px-2 xs:px-3
                    py-1.5 xs:py-2
                    text-xs xs:text-sm lg:text-[18px]
                    resize-none
                    focus:outline-none
                    h-36 md:h-36 lg:h-27
                  "
                  />
                )}
              />
            </div>

            {/* ================= Recliner Diagram ================= */}
            <img
              src={IMAGES.ReclinerSofa1Seater}
              alt="Recliner Sofa 1 Seater"
              className="w-[300px] h-[400px] md:w-[450px] md:h-[400px]"
            />

            {/* ================= Width ================= */}
            {/* LG position kept same */}
            <div className="absolute top-[76%] left-[50px] w-[60px] md:left-[65px] lg:w-[120px] ">
              <Controller
                name="attributes.measurements.0.width"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Width"
                    className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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
            {/* LG position kept same */}
            <div className="absolute top-[40%] left-[-0px] md:left-[-26px] lg:left-[-92px] md:right-[44px] w-[60px] lg:w-[120px]">
              <Controller
                name="attributes.measurements.0.height"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder=" Height"
                    className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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
            <div className="absolute top-[76%] left-[180px] w-[60px] md:left-[170px] lg:w-[120px]">
              <Controller
                name="attributes.measurements.1.depth"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Depth"
                    className="
                    w-full border rounded-md px-2 py-1
                    text-center bg-white/90 backdrop-blur-sm
                    font-bold text-[14px] sm:text-[16px] md:text-[18px]
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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

        {/* ================= Notes for md & small devices ================= */}
        <div className="lg:hidden md:mx-22">
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
    </>
  );
};

export default ReclinerSofa1SeaterDiagram;
