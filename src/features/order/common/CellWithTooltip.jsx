import React, { useState } from "react";

// =========================
// 🔹 REUSABLE CELL TOOLTIP
// Supports:
// - Worklog tooltip
// - Normal tooltip
// - Simple preview
// =========================

const CellWithTooltip = ({ value, disableTooltip = false }) => {
  const [show, setShow] = useState(false);

  // =========================
  // 🔹 SIMPLE CELL
  // =========================
  if (disableTooltip) {
    return (
      <div className="truncate overflow-hidden text-ellipsis">
        {value ?? "-"}
      </div>
    );
  }

  // =========================
  // 🔹 DETECT WORKLOG
  // =========================
  const isWorklog = typeof value === "string" && value.includes("[");

  // =========================
  // 🔹 PREVIEW LINE
  // =========================
  const previewLine = isWorklog
    ? value.split("\n").find((line) => line.startsWith("["))
    : value;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* ========================================
          🔹 TABLE PREVIEW
      ======================================== */}
      <div className="truncate overflow-hidden text-ellipsis text-sm text-gray-700 cursor-pointer">
        {previewLine ?? "-"}
      </div>

      {/* ========================================
          🔹 WORKLOG TOOLTIP
      ======================================== */}
      {show && isWorklog && (
        <div
          className="
            absolute right-0 top-7 z-[9999]
            bg-white border border-gray-200
            rounded-2xl shadow-2xl
            p-4
            w-[420px]
            max-h-[350px]
            overflow-y-auto
          "
        >
          <div className="space-y-1">
            {value.split("\n").map((line, i) => {
              const isHeader = line.startsWith("[");

              const isEmpty = line.trim() === "";

              if (isEmpty) {
                return <div key={i} className="h-2" />;
              }

              return (
                <div
                  key={i}
                  className={`
                      text-sm leading-relaxed break-words
                      ${
                        isHeader
                          ? "text-gray-500 font-medium border-b border-gray-100 pb-1 mt-2"
                          : "text-black font-semibold"
                      }
                    `}
                >
                  {line}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================
          🔹 NORMAL TOOLTIP
      ======================================== */}
      {show && !isWorklog && (
        <div
          className="
            absolute left-0 top-7 z-[9999]
            bg-white border border-gray-200
            rounded-xl shadow-xl
            p-3 text-sm
            break-words
            max-w-[350px]
          "
        >
          <pre className="whitespace-pre-wrap font-sans">{value ?? "-"}</pre>
        </div>
      )}
    </div>
  );
};

export default CellWithTooltip;