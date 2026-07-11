import React from "react";
import { Controller } from "react-hook-form";

const ChaiseLoungeDiagram = ({ control }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="relative w-[420px] h-[240px]">
        {/* Width */}
        {/* <div className="absolute top-6 left-20  w-56 border-t-2 border-gray-600" /> */}

        <div className="absolute  mb-8  left-36">
          <Controller
            name="attributes.measurements.0.width"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Length"
                className="w-28 border rounded px-2 py-1 text-center"
              />
            )}
          />
        </div>

        {/* Height */}
        <div className="absolute top-10 left-10 h-32 border-l-2 border-gray-600" />

        <div className="absolute top-24 left-[-85px]">
          <Controller
            name="attributes.measurements.0.height"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Depth"
                className="w-28 border rounded px-2 py-1 text-center"
              />
            )}
          />
        </div>

        {/* Sofa */}
        <div className="absolute left-20  top-10">
          <div className="flex">
            <div className="w-24 h-14 border-2"></div>
            <div className="w-20 h-14 border-y-2 border-r-2"></div>
          </div>

          <div className="w-44 h-10 border-x-2 border-b-2"></div>

          <div className="absolute right-0 top-14 w-16 h-24 border-l-2 border-r-2 border-b-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ChaiseLoungeDiagram;
