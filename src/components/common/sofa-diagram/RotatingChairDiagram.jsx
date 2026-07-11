import { Controller } from "react-hook-form";

const RotatingChairDiagram = ({ control }) => {
  return (
    <div className="flex justify-center">
      <div className="relative w-[320px] h-[260px]">
        {/* Width Line */}
        <div className="absolute top-[155px] left-[90px] w-[110px] border-t-2 border-gray-600">
          <div className="absolute -left-1 -top-1 h-3 border-l-2 border-gray-600" />
          <div className="absolute -right-1 -top-1 h-3 border-l-2 border-gray-600" />
        </div>

        {/* Width */}
        <div className="absolute top-[165px] left-[95px]">
          <Controller
            name="attributes.measurements.0.width"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Width"
                className="w-24 border rounded-md px-2 py-1 text-center bg-white font-bold text-[18px] placeholder:text-[13px]"
              />
            )}
          />
        </div>

        {/* Height Line */}
        <div className="absolute left-[38px] top-[40px] h-[110px] border-l-2 border-gray-600">
          <div className="absolute -left-1 top-0 w-3 border-t-2 border-gray-600" />
          <div className="absolute -left-1 bottom-0 w-3 border-t-2 border-gray-600" />
        </div>

        {/* Height */}
        <div className="absolute top-[80px] left-[-70px]">
          <Controller
            name="attributes.measurements.0.height"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Height"
                className="w-24 border rounded-md px-2 py-1 text-center bg-white font-bold text-[18px] placeholder:text-[13px]"
              />
            )}
          />
        </div>

        {/* Chair */}
        <div className="absolute left-[85px] top-[40px]">
          {/* Back */}
          <div className="w-28 h-14 border-2 border-gray-700 rounded-t-xl"></div>

          {/* Seat */}
          <div className="w-28 h-7 border-x-2 border-b-2 border-gray-700 rounded-b-md"></div>

          {/* Stand */}
          <div className="ml-[54px] w-[2px] h-10 bg-gray-700"></div>

          {/* Base */}
          <div className="relative">
            <div className="absolute left-[54px] top-0 w-[2px] h-7 bg-gray-700"></div>

            <div className="absolute left-[54px] top-0 w-14 h-[2px] bg-gray-700 rotate-45 origin-left"></div>

            <div className="absolute left-[54px] top-0 w-14 h-[2px] bg-gray-700 -rotate-45 origin-left"></div>

            <div className="absolute left-[54px] top-0 w-14 h-[2px] bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatingChairDiagram;
