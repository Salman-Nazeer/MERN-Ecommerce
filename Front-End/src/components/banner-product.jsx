import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

import imageMobile1 from "../assest/banner/img1_mobile.jpg";
import imageMobile2 from "../assest/banner/img2_mobile.webp";
import imageMobile3 from "../assest/banner/img3_mobile.jpg";
import imageMobile4 from "../assest/banner/img4_mobile.jpg";
import imageMobile5 from "../assest/banner/img5_mobile.png";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const bannerproduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    imageMobile1,
    imageMobile2,
    imageMobile3,
    imageMobile4,
    imageMobile5,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const previousImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center p-1 hidden">
          <div className="flex justify-between w-full text-2xl">
            <button
              className="bg-white rounded-full p-1 shadow-md"
              onClick={previousImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white rounded-full p-1 shadow-md"
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/** DESKTOP AND TABLET VERSION **/}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full translate"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} className="w-full h-full transition-all" />
              </div>
            );
          })}
        </div>

        {/** MOBILE VERSION **/}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full translate"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imageURL}
                  className="w-full h-full transition-all object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default bannerproduct;
