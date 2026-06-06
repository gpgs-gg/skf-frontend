import React from "react";
import { FiX } from "react-icons/fi";

const ImagePreviewModal = ({ isOpen, image, onClose }) => {
  if (!isOpen || !image) return null;

  const imageSrc =
    image?.url ||
    image?.preview ||
    (image instanceof File
      ? URL.createObjectURL(image)
      : typeof image === "string"
        ? image
        : "");

  const fileName = image?.originalName || image?.name || "";

  return (
    <div
      className="
        fixed inset-0
        z-[9999]
        mt-26
        bg-black/80
        flex
        items-center
        justify-center
        p-4
      "
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            -top-12
            right-0
            w-10
            h-10
            rounded-full
            bg-white
            text-black
            flex
            items-center
            justify-center
            cursor-pointer
            shadow-lg
          "
        >
          <FiX size={22} />
        </button>

        {/* Image */}
        <img
          src={imageSrc}
          alt={fileName}
          className="
            w-full
            max-h-[65vh]
            object-contain
            rounded-2xl
            p-2
          "
        />

        {/* Optional File Name */}
        {/* 
        <div className="mt-3 text-center text-white text-sm">
          {fileName}
        </div>
        */}
      </div>
    </div>
  );
};

export default ImagePreviewModal;
// import React from "react";
// import { FiX } from "react-icons/fi";

// const ImagePreviewModal = ({
//   isOpen,
//   onClose,
//   image,
//   title = "Image Preview",
// }) => {
//   if (!isOpen || !image) return null;

//   return (
//     <div
//       className="
//         fixed inset-0 z-[9999]
//         bg-black/70 backdrop-blur-sm
//         flex items-center justify-center
//         p-4
//       "
//       onClick={onClose}
//     >
//       <div
//         className="
//           relative
//           bg-white
//           rounded-3xl
//           shadow-2xl
//           w-full
//           max-w-5xl
//           max-h-[95vh]
//           overflow-hidden
//           animate-in fade-in zoom-in duration-200
//         "
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div
//           className="
//             flex items-center justify-between
//             px-5 py-4
//             border-b
//             bg-gray-50
//           "
//         >
//           <h2 className="font-semibold text-lg text-gray-800">{title}</h2>

//           <button
//             type="button"
//             onClick={onClose}
//             className="
//               w-9 h-9
//               rounded-full
//               hover:bg-gray-200
//               flex items-center justify-center
//               transition
//             "
//           >
//             <FiX size={20} />
//           </button>
//         </div>

//         {/* Image */}
//         <div
//           className="
//             flex items-center justify-center
//             bg-black
//             p-4
//             overflow-auto
//             max-h-[85vh]
//           "
//         >
//           <img
//             src={image}
//             alt="Preview"
//             className="
//               max-w-full
//               max-h-[80vh]
//               object-contain
//               rounded-2xl
//             "
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImagePreviewModal;
