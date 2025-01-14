import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

const zoomImage = ({ onClose, imgUrl }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative h-[95%] flex justify-center py-3 bg-white w-[95%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
        <img src={imgUrl} alt="Full Screen" className="max-w-full max-h-full" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2"
        >
          <CgClose />
        </button>
      </div>
    </div>
  );
};

export default zoomImage;
