import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./adminEditProduct";
import displayPKRCurrency from "../../helpers/displayCurrency";

const adminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-32 flex flex-col h-full">
        <div className="w-32 h-36 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto w-full object-contain h-full"
          />
        </div>

        <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1>

        <p className="font-semibold">{displayPKRCurrency(data?.price)}</p>

        <div
          className="w-fit ml-auto mt-auto p-2 bg-green-100 hover:bg-green-600 mb-0 rounded-full cursor-pointer hover:text-white"
          onClick={() => setEditProduct(true)}
        >
          <MdModeEditOutline />
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default adminProductCard;
