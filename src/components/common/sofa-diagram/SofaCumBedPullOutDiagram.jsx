import { IMAGES } from "@/constants/images";
import { Controller } from "react-hook-form";

const SofaCumBedPullOutDiagram = ({ control }) => {
  return (
    <div className="w-full">
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[520px]">
          {/* ================= Notes ================= */}
          <div className="absolute left-[-228px] top-[60%] w-[260px] max-w-md  w-[200px] ">
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

          {/* ================= Diagram Image ================= */}
          <img
            src={IMAGES.SofaCumBedPullOutDiagram}
            alt="Sofa Cum Bed Pull Out Diagram"
            className="w-[300px]  h-[400px] md:w-[450px] md:h-[400px]"
          />

          {/* ================= Width ================= */}
          <div className="absolute top-[86%] left-[90px] md:left-[165px] w-[120px]">
            <Controller
              name="attributes.measurements.0.width"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Width"
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
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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

          {/* ================= Sofa Height ================= */}
          <div className="absolute top-[24%] left-[10px] md:left-[386px] w-[60px] md:w-[120px]">
            <Controller
              name="attributes.measurements.0.height"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Height"
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
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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

          {/* ================= Bed Length ================= */}
          <div className="absolute top-[56%] right-[10px] md:right-[12px] w-[60px] md:w-[120px]">
            <Controller
              name="attributes.measurements.0.bedLength"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Depth"
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
                    placeholder:font-normal
                    placeholder:text-[10px]
                    sm:placeholder:text-[11px]
                    md:placeholder:text-[13px]
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

export default SofaCumBedPullOutDiagram;
