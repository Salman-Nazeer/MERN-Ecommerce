import React, { useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from "./adminEditProduct";
import displayPKRCurrency from "../../helpers/displayCurrency";
import SummaryAPI from "../../common";
import { toast } from "react-toastify";

const adminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(SummaryAPI.delete_product.url, {
        method: SummaryAPI.delete_product.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: data._id }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        fetchData(); // Refresh the product list
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="bg-white p-4 rounded h-72 flex flex-col">
      <div className="w-32 flex flex-col flex-grow">
        <div className="w-32 h-36 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto w-full object-contain h-full"
          />
        </div>

        <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1>

        <p className="font-semibold">{displayPKRCurrency(data?.price)}</p>

        <div className="flex justify-end gap-3 w-fit ml-auto mt-auto">
          <div
            className="p-2 bg-green-100 hover:bg-green-600 mb-0 rounded-full cursor-pointer hover:text-white"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
          <div
            className="p-2 bg-red-100 hover:bg-red-600 mb-0 rounded-full cursor-pointer hover:text-white"
            onClick={handleDeleteProduct}
          >
            <MdDelete />
          </div>
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
