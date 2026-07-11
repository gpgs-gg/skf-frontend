import { Controller } from "react-hook-form";

const StorageSofaDiagram = ({ control }) => {
  return (
    <div className="flex justify-center">
      <div className="relative w-[420px] h-[230px]">
        {/* Width Line */}
        <div className="absolute top-[185px] left-[40px] w-[320px] border-t-2 border-gray-600">
          <div className="absolute -left-1 -top-1 h-3 border-l-2 border-gray-600" />
          <div className="absolute -right-1 -top-1 h-3 border-l-2 border-gray-600" />
        </div>

        {/* Width */}
        <div className="absolute top-[192px] left-[145px]">
          <Controller
            name="attributes.measurements.0.width"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Width"
                className="w-28 border rounded-md px-2 py-1 text-center bg-white font-bold text-[18px] placeholder:text-[13px]"
              />
            )}
          />
        </div>

        {/* Height Line */}
        <div className="absolute left-[15px] top-[35px] h-[130px] border-l-2 border-gray-600">
          <div className="absolute -left-1 top-0 w-3 border-t-2 border-gray-600" />
          <div className="absolute -left-1 bottom-0 w-3 border-t-2 border-gray-600" />
        </div>

        {/* Height */}
        <div className="absolute top-[90px] left-[-90px]">
          <Controller
            name="attributes.measurements.0.height"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Height"
                className="w-28 border rounded-md px-2 py-1 text-center bg-white font-bold text-[18px] placeholder:text-[13px]"
              />
            )}
          />
        </div>

        {/* Sofa */}
        <div className="absolute left-[60px] top-[35px]">
          {/* Back Cushions */}
          <div className="flex">
            <div className="w-24 h-14 border-2 border-gray-700 rounded-t-md"></div>
            <div className="w-24 h-14 border-y-2 border-r-2 border-gray-700 rounded-t-md"></div>
            <div className="w-24 h-14 border-y-2 border-r-2 border-gray-700 rounded-t-md"></div>
          </div>

          {/* Storage Base */}
          <div className="relative w-[288px] h-10 border-x-2 border-b-2 border-gray-700">
            {/* Storage Lid */}
            <div className="absolute left-0 top-0 w-full border-t-2 border-dashed border-gray-500"></div>

            {/* Handle */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-8 h-2 border border-gray-600 rounded-full"></div>
          </div>

          {/* Arms */}
          <div className="absolute left-[-18px] top-6 w-5 h-14 border-2 border-gray-700 rounded-l-md"></div>

          <div className="absolute right-[-18px] top-6 w-5 h-14 border-2 border-gray-700 rounded-r-md"></div>

          {/* Legs */}
          <div className="absolute left-3 top-[94px] w-1 h-4 bg-gray-700"></div>

          <div className="absolute right-3 top-[94px] w-1 h-4 bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default StorageSofaDiagram;
