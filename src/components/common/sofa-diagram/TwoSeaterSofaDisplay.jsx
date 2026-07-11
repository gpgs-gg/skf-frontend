// TwoSeaterSofaDisplay.jsx
const TwoSeaterSofaDisplay = ({ product }) => {
  // Get values from product with fallbacks
  const width = product?.attributes?.measurements?.[0]?.width || "-";
  const height = product?.attributes?.measurements?.[0]?.height || "-";
  const depth = product?.attributes?.measurements?.[1]?.depth || "-";
  const notes = product?.attributes?.measurements?.[0]?.notes || "-";

  return (
    <div>
      <div className="lg:flex justify-around">
        {/* ================= Front View ================= */}
        <div className="origin-top scale-75 sm:scale-90 md:scale-95 lg:scale-100">
          <div className="flex justify-center">
            <div className="relative w-[380px] h-[220px]">
              {/* Width Line */}
              <div className="absolute top-[185px] left-[40px] w-[224px] border-t border-black">
                {/* Left Arrow */}
                <div
                  className="
                    absolute -left-[1px] -top-[4px]
                    w-0 h-0
                    border-r-[6px] border-r-black
                    border-y-[4px] border-y-transparent
                  "
                />

                {/* Right Arrow */}
                <div
                  className="
                    absolute -right-[1px] -top-[4px]
                    w-0 h-0
                    border-l-[6px] border-l-black
                    border-y-[4px] border-y-transparent
                  "
                />

                <div className="absolute -right-1 -top-1 h-3 border-l-2 border-black" />
              </div>

              {/* Width Display */}
              <div className="absolute top-[192px] left-[90px]">
                <div
                  className="
                    w-28 border rounded-md px-2 py-1
                    text-center bg-gray-100
                    font-bold text-[18px]
                  "
                >
                  {width}
                </div>
              </div>

              {/* Height Line */}
              <div className="absolute left-[15px] top-[35px] h-[130px] border-l border-black">
                <div
                  className="
                    absolute -left-[4px] top-0
                    w-0 h-0
                    border-b-[6px] border-b-black
                    border-x-[4px] border-x-transparent
                  "
                />

                <div
                  className="
                    absolute -left-[4px] bottom-0
                    w-0 h-0
                    border-t-[6px] border-t-black
                    border-x-[4px] border-x-transparent
                  "
                />
              </div>

              {/* Height Display */}
              <div className="absolute top-[90px] left-[-100px]">
                <div
                  className="
                    w-28 border rounded-md px-2 py-1
                    text-center bg-gray-100
                    font-bold text-[18px]
                  "
                >
                  {height}
                </div>
              </div>

              {/* Sofa */}
              <div className="absolute left-[55px] top-[35px]">
                {/* Back Cushions */}
                <div className="flex">
                  <div className="w-20 h-14 border-2 border-gray-700 rounded-t-md"></div>

                  <div className="w-20 h-14 border-y-2 border-r-2 border-gray-700 rounded-t-md"></div>
                </div>

                {/* Seat */}
                <div className="w-[160px] h-6 border-x-2 border-b-2 border-gray-700 rounded-b-sm"></div>

                <div className="w-[160px] h-6 border-x-2 border-b-2 border-gray-700 rounded-b-sm"></div>

                {/* Armrests */}
                <div className="absolute left-[-18px] top-8 w-5 h-18 border-2 border-gray-700 rounded-l-md"></div>

                <div className="absolute right-[-18px] top-8 w-5 h-18 border-2 border-gray-700 rounded-r-md"></div>

                {/* Legs */}
                <div className="absolute left-0 top-[104px] w-2 h-4 bg-gray-700"></div>

                <div className="absolute right-0 top-[104px] w-2 h-4 bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Notes ================= */}
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-md">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Notes
            </label>

            <div
              className="
                w-full
                border
                rounded-md
                px-3
                py-2
                text-sm
                bg-gray-100
                min-h-[100px]
              "
            >
              {notes}
            </div>
          </div>
        </div>
      </div>

      {/* ================= Top View ================= */}
      <div className="flex justify-center mt-8">
        <div className="relative w-[360px] h-[220px]">
          {/* ================= Sofa ================= */}
          <div className="absolute top-[40px] left-[70px] w-[200px] h-[130px] border border-2 border-gray-700">
            {/* Back Cushion Line */}
            <div className="absolute left-[18px] right-[18px] top-[28px] border-b border-gray-700"></div>

            {/* Left Arm */}
            <div className="absolute left-0 top-0 w-[18px] h-full border-r border-gray-700"></div>

            {/* Right Arm */}
            <div className="absolute right-0 top-0 w-[18px] h-full border-l border-gray-700"></div>

            {/* Seat Divider */}
            <div className="absolute left-[100px] top-0 h-full border-l border-gray-700"></div>

            {/* Legs */}
            <div className="absolute left-[8px] bottom-[-8px] w-[5px] h-[8px] bg-gray-700"></div>

            <div className="absolute right-[8px] bottom-[-8px] w-[5px] h-[8px] bg-gray-700"></div>
          </div>

          {/* ================= Depth Dimension ================= */}
          <div className="absolute top-[40px] left-[300px] h-[130px] border-l border-black">
            {/* Top Arrow */}
            <div
              className="
                absolute -left-[4px] top-0
                w-0 h-0
                border-b-[6px] border-b-black
                border-x-[4px] border-x-transparent
              "
            />

            {/* Bottom Arrow */}
            <div
              className="
                absolute -left-[4px] bottom-0
                w-0 h-0
                border-t-[6px] border-t-black
                border-x-[4px] border-x-transparent
              "
            />

            {/* Extension Lines */}
            <div className="absolute -left-[30px] top-0 w-[30px] border-t border-black"></div>

            <div className="absolute -left-[30px] bottom-0 w-[30px] border-t border-black"></div>

            {/* Depth Display */}
            <div className="absolute top-[48px] left-[18px]">
              <div
                className="
                  w-28 border rounded-md px-2 py-1
                  text-center bg-gray-100
                  font-bold text-[18px]
                "
              >
                {depth}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoSeaterSofaDisplay;
