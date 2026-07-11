import { Controller } from "react-hook-form";

const SofaMeasurementDiagram = ({ control, index }) => {
  if (!control) return null;

  return (
    <div className="flex justify-center items-center rounded-xl">
      <div className="relative w-[360px] h-[170px] rounded-lg">
        {/* WIDTH LINE */}
        <div className="absolute top-10 left-24 w-48 border-t-2 border-gray-500" />

        {/* DEPTH LINE */}
        <div className="absolute top-10 left-24 h-20 border-l-2 border-gray-500" />

        {/* WIDTH */}
        <div className="absolute top-0 left-36">
          <Controller
            name={`attributes.measurements.${index}.width`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Width"
                className="w-24 border rounded-md px-2 py-1 text-center bg-white
                  font-bold text-[18px]
                  placeholder:text-[13px]"
              />
            )}
          />
        </div>

        {/* DEPTH */}
        <div className="absolute top-16 left-0">
          <Controller
            name={`attributes.measurements.${index}.height`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter Depth"
                className="w-24 border rounded-md px-2 py-1 text-center bg-white
                  font-bold text-[18px]
                  placeholder:text-[13px]"
              />
            )}
          />
        </div>

        {/* SOFA BOX */}
        <div className="absolute top-10 left-24 w-48 h-20 border-2 border-gray-500 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500 font-medium">SOFA</span>
        </div>

        {/* NOTES */}
        <div className="absolute top-12 left-28 w-44">
          <Controller
            name={`attributes.measurements.${index}.details`}
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                placeholder="Enter Notes"
                className="w-full bg-white border rounded-md px-2 py-2
                  text-sm resize-none placeholder:text-[13px]"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
// const SofaMeasurementDiagram = ({ control, index }) => {
//   if (!control) return null;

//   return (
//     <div className="flex justify-center items-center rounded-xl">
//       <div className="relative w-[420px] h-[260px]">
//         {/* WIDTH LINE */}
//         <div className="absolute top-5 left-24 w-56 border-t-2 border-gray-500" />

//         {/* DEPTH LINE */}
//         <div className="absolute top-20 right-10 h-28 border-l-2 border-gray-500" />

//         {/* WIDTH INPUT */}
//         <div className="absolute top-0 left-44">
//           <Controller
//             name={`attributes.measurements.${index}.width`}
//             control={control}
//             render={({ field }) => (
//               <input
//                 {...field}
//                 type="text"
//                 placeholder="Width"
//                 className="w-24 border rounded-md px-2 py-1 text-center font-bold text-[18px]
//                 placeholder:text-[13px] bg-white"
//               />
//             )}
//           />
//         </div>

//         {/* DEPTH INPUT */}
//         <div className="absolute top-32 right-0">
//           <Controller
//             name={`attributes.measurements.${index}.height`}
//             control={control}
//             render={({ field }) => (
//               <input
//                 {...field}
//                 type="text"
//                 placeholder="Depth"
//                 className="w-24 border rounded-md px-2 py-1 text-center font-bold text-[18px]
//                 placeholder:text-[13px] bg-white"
//               />
//             )}
//           />
//         </div>

//         {/* SOFA */}
//         <div className="absolute left-24 top-16">
//           {/* Back Rest */}
//           <div className="w-56 h-10 bg-gray-300 border-2 border-gray-500 rounded-t-xl" />

//           {/* Seat */}
//           <div className="w-56 h-16 bg-gray-200 border-x-2 border-b-2 border-gray-500" />

//           {/* Arms */}
//           <div className="absolute left-0 top-8 w-5 h-20 bg-gray-300 border border-gray-500 rounded-l-lg" />
//           <div className="absolute right-0 top-8 w-5 h-20 bg-gray-300 border border-gray-500 rounded-r-lg" />

//           {/* Legs */}
//           <div className="absolute left-6 bottom-[-8px] w-2 h-3 bg-gray-600" />
//           <div className="absolute right-6 bottom-[-8px] w-2 h-3 bg-gray-600" />
//         </div>

//         {/* NOTES */}
//         <div className="absolute bottom-0 left-24 w-56">
//           <Controller
//             name={`attributes.measurements.${index}.details`}
//             control={control}
//             render={({ field }) => (
//               <textarea
//                 {...field}
//                 rows={3}
//                 placeholder="Enter Notes"
//                 className="w-full border rounded-md px-2 py-2 resize-none
//                 placeholder:text-[13px]"
//               />
//             )}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

export default SofaMeasurementDiagram;
