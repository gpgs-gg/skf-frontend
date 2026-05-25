export const SECRET_KEY = import.meta.env.REACT_APP_SECRET_KEY;
export const MAP_KEY = import.meta.env.MAP_API_KEY;

export const SelectStyles = {
  control: (base) => ({
    ...base,
    width: "100%",
    paddingTop: "0.25rem",
    paddingBottom: "0.10rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.50rem",
    marginTop: "0.30rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: "0.375rem",
    boxShadow: "none",
    backgroundColor: "white",
    minHeight: "42px",
    outline: "none",

    "&:hover": {
      borderColor: "black",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "black" : "white",

    "&:hover": {
      backgroundColor: "#f3f4f6",
    },
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};
export const SelectStylesfilter = {
  control: (base, state) => ({
    ...base,
    width: "200px",
    paddingTop: "0.25rem",
    paddingBottom: "0.10rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.50rem",
    marginTop: "0.30rem",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: state.isFocused ? "black" : "black",
    borderRadius: "0.375rem",
    boxShadow: state.isFocused ? "black" : "black",
    backgroundColor: "white",
    minHeight: "40px",
    "&:hover": { borderColor: "black" },
  }),

  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "black" : "white",
    "&:hover": { backgroundColor: "#fed7aa" },
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    maxHeight: "200px",
    // overflowY: "auto",
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

// Status styles for order status badges
export const statusStyles = {
  Cancelled: "font-semibold text-red-800 bg-red-50 border-red-200",
  Pending: "font-semibold text-yellow-800 bg-yellow-50 border-yellow-200",
  Completed: "font-semibold text-green-800 bg-green-50 border-green-200",
  Processing: "font-semibold text-blue-800 bg-blue-50 border-blue-200",
  Open: "font-semibold text-indigo-800 bg-indigo-50 border-indigo-200",
};

export const getStatusStyle = (status) => {
  return (
    statusStyles[status] ||
    "font-semibold text-gray-800 bg-gray-50 border-gray-200"
  );
};
// Add these new style objects
export const InputStyles = {
  base: `
    w-full p-2 mt-1 rounded-lg border border-black bg-white
    focus:outline-none
    focus:ring-0
    focus:border-black
    transition-all duration-200
  `,
  error: "border-red-500",
};

export const TextareaStyles = {
  base: `
    w-full p-2 border border-black rounded-md bg-white
    focus:outline-none
    focus:ring-0
    focus:border-black
    transition-all duration-200 resize-y
  `,
  error: "border-red-500",
};
export const formatDateTime = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
