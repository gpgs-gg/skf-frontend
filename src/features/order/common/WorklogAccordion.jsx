import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const WorklogAccordion = ({ worklog, title = "Worklog" }) => {
  const [open, setOpen] = useState(false);

  if (!worklog) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50"
      >
        <span className="font-medium text-gray-700">{title}</span>

        {open ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
      </button>

      {/* CONTENT */}
      {open && (
        <div className="p-3 max-h-60 overflow-y-auto bg-white border-t">
          <div className="space-y-2 text-xs">
            {worklog.split("\n").map((line, i) => {
              const isHeader = line.startsWith("[");
              const isEmpty = line.trim() === "";

              if (isEmpty) {
                return <div key={i} className="h-2" />;
              }

              return (
                <div
                  key={i}
                  className={
                    isHeader
                      ? "text-gray-500 font-medium"
                      : "text-black font-semibold"
                  }
                >
                  {line}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorklogAccordion;