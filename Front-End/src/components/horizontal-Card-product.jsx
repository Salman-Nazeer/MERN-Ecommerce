import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const horizontalproduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollElement = useRef();

  const { fetchUserProductCount } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserProductCount()
    }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollElement.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    };

    const element = scrollElement.current;
    element.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {showLeftButton && (
          <button
            className="bg-white rounded-full p-1 shadow-md absolute left-0 text-lg hidden md:block z-20"
            onClick={scrollLeft}
          >
            <FaAngleLeft />
          </button>
        )}
        {showRightButton && (
          <button
            className="bg-white rounded-full p-1 shadow-md absolute right-0 text-lg hidden md:block z-20"
            onClick={scrollRight}
          >
            <FaAngleRight />
          </button>
        )}

        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-md shadow flex"
                  key={product + index}
                >
                  <div className="bg-slate-200 animate-pulse h-full p-4 min-w-[120px] md:min-w-[145px]"></div>
                  <div className="p-4 grid gap-3 w-[90%]">
                    <h2 className="bg-slate-200 animate-pulse p-1 rounded-full font-medium text-base md:text-lg text-ellipsis line-clamp-1"></h2>
                    <p className="bg-slate-200 animate-pulse p-1 rounded-full capitalize"></p>
                    <div className="flex gap-3">
                      <p className="bg-slate-200 animate-pulse w-[30%] p-1 rounded-full font-medium"></p>
                      <p className="bg-slate-200 animate-pulse w-[30%] p-1 rounded-full line-through"></p>
                    </div>
                    <button className="bg-slate-200 animate-pulse text-sm px-3 py-0.5 rounded-full"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-md shadow flex"
                  key={product + index}
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full w-full hover:scale-110 transition-all"
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                      onClick={(e)=>handleAddToCart(e,product?._id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default horizontalproduct;
