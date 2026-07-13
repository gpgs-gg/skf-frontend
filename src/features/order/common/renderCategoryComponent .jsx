import SofaDiagramRenderer from "./SofaDiagramRenderer";

const renderCategoryComponent = (product) => {
  const category = product.category?.toLowerCase();

  switch (category) {
    case "curtains":
      return <CurtainDiagramRenderer product={product} />;

    case "sofa-&seating":
      return <SofaDiagramRenderer product={product} />;

    // case "mattress":
    //   return <MattressDiagramRenderer product={product} />;

    // case "wallpaper":
    //   return <WallpaperDiagramRenderer product={product} />;

    // case "flooring":
    //   return <FlooringDiagramRenderer product={product} />;

    // case "rugs":
    //   return <RugsDiagramRenderer product={product} />;

    // case "bed linen":
    //   return <BedLinenDiagramRenderer product={product} />;

    // case "bath linen":
    //   return <BathLinenDiagramRenderer product={product} />;

    // case "blinds":
    //   return <BlindsDiagramRenderer product={product} />;

    default:
      return <div className="text-sm text-gray-400">No preview available.</div>;
  }
};

export default renderCategoryComponent;

const CurtainDiagramRenderer = ({ product }) => {
  const measurements = product?.attributes?.measurements || [];

  if (!measurements.length) return null;

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-4">
        {measurements.map((m, i) => (
          <div key={i} className="px-10">
            {m.windowName && (
              <div className="flex justify-center mb-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  {m.windowName}
                </span>
              </div>
            )}

            <div className="flex justify-center">
              <div className="relative w-[280px] md:w-[360px] h-[150px]">
                {/* Curtain Lines */}
                <div className="absolute top-10 left-16 w-46 border-t-2 border-gray-500"></div>
                <div className="absolute top-10 left-16 h-24 border-l-2 border-gray-500"></div>

                {/* Width */}
                <div className="absolute top-0 left-29 w-15 md:w-24 border rounded-md px-2 py-1 text-center bg-white font-bold text-[18px]">
                  {m.width || "-"}
                </div>

                {/* Height */}
                <div className="absolute top-18 w-15 md:w-24 md:-left-10 border rounded-md px-2 py-1 text-center bg-white font-bold text-[18px]">
                  {m.height || "-"}
                </div>

                {/* Notes */}
                <div className="absolute top-12 left-18 w-44 h-21 bg-white border rounded-xl p-2 shadow-sm">
                  <p className="text-xs">{m.details || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
