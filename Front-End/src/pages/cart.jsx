import React, { useContext, useEffect, useState } from "react";
import SummaryAPI from "../common";
import Context from "../context";

const cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryAPI.addToCartProductView.url, {
      method: SummaryAPI.addToCartProductView.method,
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  console.log("data", data);

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        {/* ***** VIEW PRODUCT ***** */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    key={el + "cart" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 rounded-md animate-pulse"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                  key={product?._id + "cart" + index}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded-md flex items-center"
                  >
                    <div className="w-28 h-28 flex items-center justify-center">
                    <img
                    src={product?.productId?.productImage[0]}
                    alt=""
                    className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  </div>
                );
              })}
        </div>

        {/* ******Summary***** */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 birder border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-slate-200">Total</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default cart;
