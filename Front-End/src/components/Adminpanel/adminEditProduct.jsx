import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../../helpers/uploadImage";
import DisplayImage from "./displayImage";
import { MdDelete } from "react-icons/md";
import SummaryAPI from "../../common/index.js";
import { toast } from "react-toastify";

const adminEditProduct = ({ onClose, productData, fetchData }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImage, setopenFullScreenImage] = useState(false);
  const [fullScreenImage, setfullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProductImg = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {

    const deleteProductImage = [...data.productImage];
    deleteProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...deleteProductImage],
      };
    });
  };

  {
    /**UPLOAD PRODUCT */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productUploadResponse = await fetch(SummaryAPI.product_update.url, {
      method: SummaryAPI.product_update.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const uploadProduct = await productUploadResponse.json();

    if (uploadProduct.success) {
      toast.success(uploadProduct?.message);
      onClose();
      fetchData();
    }
    if (uploadProduct.error) {
      toast.error(uploadProduct?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 bottom-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 pb-14 rounded w-full max-w-2xl h-full max-h-[78%] overflow-hidden">
        <div className="flex justify-between items-center pb-2">
          <h2 className="font-bold text-lg">Edit Product</h2>
          <div
            className="text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-auto h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-1 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand"
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-1 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            value={data.category}
            className="p-1 bg-slate-100 border rounded"
            onChange={handleOnChange}
            name="category"
            required
          >
            <option value={""} disabled>
              Select Category
            </option>
            {productCategory.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProductImg}
                />
              </div>
            </div>
          </label>
          <div className="flex items-center gap-2">
            {data?.productImage[0] ? (
              data.productImage.map((el, index) => {
                return (
                  <div
                    className="w-20 h-20 cursor-pointer relative group mb-2"
                    key={index}
                  >
                    <img
                      src={el}
                      alt={el}
                      onClick={() => {
                        setopenFullScreenImage(true);
                        setfullScreenImage(el);
                      }}
                      className="w-full h-full object-cover bg-slate-100 border "
                    />

                    <div
                      className="absolute bottom-0 right-0 p-1 m-1 cursor-pointer text-white bg-red-600 rounded-full hidden group-hover:block"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-red-600 text-xs">
                *Please Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            name="price"
            value={data.price}
            onChange={handleOnChange}
            className="p-1 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter selling price"
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-1 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            className="h-28 p-1 bg-slate-100 border rounded resize-none"
            placeholder="Enter Product Description"
            rows={3}
            id="description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            required
          ></textarea>

          <button className="px-3 py-2 bg-red-600 text-white hover:bg-red-700">
            Update Product
          </button>
        </form>
      </div>

      {/* DISPLAY IMAGE ON FULL SIZE */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setopenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default adminEditProduct;
