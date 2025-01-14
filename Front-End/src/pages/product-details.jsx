import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryAPI from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayPKRCurrency from "../helpers/displayCurrency";
import ZoomImage from "../components/zoom-image";
import Recommendedproduct from "../components/recomended-product";

const productdetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const param = useParams();
  const [loadig, setloading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [fullScreenImage, setfullScreenImage] = useState("");
  const [openFullScreenImage, setopenFullScreenImage] = useState(false);
  const productImageListLoading = new Array(4).fill(null);

  const fetchProductDetails = async () => {
    setloading(true);
    const response = await fetch(SummaryAPI.productDetails.url, {
      method: SummaryAPI.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: param?.id,
      }),
    });
    setloading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [param.id]);

  const handleMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL);
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row lg:gap-11 ">
        {/* ** PRODUCT IMAGE** */}
        <div className="h-[26rem] flex flex-col lg:flex-row-reverse gap-4">
          <div>
            {loadig ? (
              <div className="h-[300px] w-[300px] lg:h-full lg:w-96 bg-slate-200 animate-pulse"></div>
            ) : (
              <div className="h-[300px] w-full lg:h-full lg:w-96 bg-slate-200 p-2">
                <img
                  src={activeImage}
                  className="h-full w-full object-scale-down mix-blend-multiply"
                  onClick={() => {
                    setopenFullScreenImage(true);
                    setfullScreenImage(activeImage);
                  }}
                />
              </div>
            )}
          </div>

          <div className="h-full">
            {loadig ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      key={el + index}
                      className="w-20 h-20 bg-slate-200 rounded animate-pulse"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 justify-center lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      key={imgURL + index}
                      className="w-20 h-20 bg-slate-200 rounded p-1"
                    >
                      <img
                        src={imgURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => {
                          handleMouseEnterProduct(imgURL);
                        }}
                        onClick={() => {
                          handleMouseEnterProduct(imgURL);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ** PRODUCT DETAILS** */}
        <div className=" lg:w-3/5 ps-1">
          {loadig ? (
            <div className="grid gap-1 w-full py-4">
              <p className="bg-red-200 animate-pulse  h-6 lg:h-8 w-full rounded-full text-lg inline-block"></p>
              <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full rounded-full"></h2>
              <p className="capitalize bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full rounded-full"></p>
              <div className="text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full rounded-full"></div>
              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full">
                <p className="text-red-600 bg-slate-200 w-2/12 h-6 lg:h-8 animate-pulse rounded-full"></p>
                <p className="text-slate-400 line-through bg-slate-200 w-2/12 h-6 lg:h-8 animate-pulse rounded-full"></p>
              </div>
              <div className="flex items-center gap-3 my-2 w-full">
                <button className="h-6 lg:h-8  bg-slate-200 rounded-full animate-pulse w-full"></button>
                <button className="h-6 lg:h-8  bg-slate-200 rounded-full animate-pulse w-full"></button>
              </div>

              <div className="w-full">
                <p className="text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded-full animate-pulse w-full"></p>
                <p className="bg-slate-200 rounded-full animate-pulse h-10 lg:h-12  w-full"></p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 py-4 w-full">
              <p className="bg-red-200 text-red-600 px-2 rounded-full text-lg w-fit">
                {data?.brandName}
              </p>
              <h2 className="text-2xl lg:text-4xl font-medium capitalize">
                {data?.productName}
              </h2>
              <p className="text-slate-400 capitalize">{data?.category}</p>
              <div className="text-red-600 flex items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
              <div className="flex items-center gap-2 text-2xl ld:text-3xl font-medium">
                <p className="text-red-600">
                  {displayPKRCurrency(data?.sellingPrice)}
                </p>
                <p className="text-slate-400 line-through">
                  {displayPKRCurrency(data?.price)}
                </p>
              </div>
              <div className="flex items-center gap-3 my-2">
                <button
                  className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                  // onClick={(e) => handleBuyProduct(e, data?._id)}
                >
                  Buy
                </button>
                <button
                  className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                  // onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add To Cart
                </button>
              </div>

              <div className="w-full ">
                <p className="text-slate-600 font-medium my-1">
                  Description :{" "}
                </p>
                <p className="break-words  w-full">{data?.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {data?.category && (
        <Recommendedproduct
          category={data?.category}
          heading={"Recommended Product"}
          currentProductId={data._id}
        />
      )}

      {/* DISPLAY IMAGE ON FULL SIZE */}
      {openFullScreenImage && (
        <ZoomImage
          onClose={() => setopenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default productdetails;
