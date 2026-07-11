const SofaSelectionModal = ({ open, onOpenChange, sofaOptions, onSelect }) => {
  if (!open) return null;

  //console.log("Sofa Options in Modal:", sofaOptions); // Debugging line to check sofaOptions

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="relative w-[100%]  max-h-[98vh] overflow-y-auto rounded-xl bg-white p-6">
        {/* Header */}
        <div className="mt-25 mb-6 flex items-center justify-between border-b pb-3">
          <h2 className="text-2xl font-semibold">Select Sofa Type</h2>

          <button
            onClick={() => onOpenChange(false)}
            className="h-9 w-9 rounded-full bg-gray-100 text-xl hover:bg-red-100"
          >
            ✕
          </button>
        </div>

        {/* Sofa Grid */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {sofaOptions.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onSelect(item.value);
                onOpenChange(false);
              }}
              className="overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.label}
                className="h-40 w-full object-contain bg-gray-50 p-3"
              />

              <div className="border-t p-3 text-center text-sm font-medium">
                {item.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SofaSelectionModal;
