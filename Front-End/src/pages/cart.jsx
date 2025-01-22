import React, { useContext, useEffect, useState } from "react";
import SummaryAPI from "../common";
import Context from "../context";
import displayPKRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

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

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryAPI.updateCartProduct.url, {
      method: SummaryAPI.updateCartProduct.method,
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ _id: id, quantity: qty + 1 }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty > 1) {
      const response = await fetch(SummaryAPI.updateCartProduct.url, {
        method: SummaryAPI.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id: id, quantity: qty - 1 }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deteleProduct = async (id) => {
    console.log("id", id);
    const response = await fetch(SummaryAPI.deleteCartProduct.url, {
      method: SummaryAPI.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const totalQTY = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPRICE = data.reduce(
    (pre, curr) => pre +( curr.quantity * curr?.productId?.sellingPrice),
    0
  );

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
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
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded-md grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 py-2 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        alt=""
                      />
                    </div>

                    <div className="px-4 py-2 relative">
                      {/* Delete Product */}
                      <div
                        className="absolute top-0 right-0 p-2 m-1 cursor-pointer text-red-600 hover:bg-red-600 hover:text-white rounded-full"
                        onClick={() => deteleProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl me-4 text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p className="text-red-600 font-medium text-lg">
                          {displayPKRCurrency(product?.productId?.sellingPrice)}
                        </p>{" "}
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayPKRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white h-6 w-6 flex justify-center items-center rounded"
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <button>{product?.quantity}</button>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white h-6 w-6 flex justify-center items-center rounded"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
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
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 text-lg text-slate-600 font-medium">
                <p>Quantity</p>
                <p>{totalQTY}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 text-lg text-slate-600 font-medium">
                <p>Total Price</p>
                <p>{displayPKRCurrency(totalPRICE)}</p>
                </div>
                
                <button className="bg-blue-600 p-3 text-white w-full">Payment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default cart;
