import React, { useEffect, useState } from "react";
import UploadProduct from "../../components/Adminpanel/upload-product.jsx";
import AdminProductCard from "../../components/Adminpanel/adminProductCard.jsx";
import SummaryAPI from "../../common/index.js";

const products = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryAPI.all_product.url, {
      method: SummaryAPI.all_product.method,
      credentials: "include",
    });

    const dataResponse = await response.json();

    console.log("Product Data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg ">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* ALL PRODUCT */}
      <div className="flex flex-wrap  gap-3 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchData={fetchAllProduct}
            />
          );
        })}
      </div>

      {/* UPLOAD PRDUCT COMPONENT */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default products;
