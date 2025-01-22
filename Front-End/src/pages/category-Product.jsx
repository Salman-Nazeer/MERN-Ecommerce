import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory.jsx";
import CategroyWiseProductDisplay from "../components/categoryWiseProductDesplay.jsx";
import VerticalCard from "../components/verticalCard.jsx";

const categoryProduct = () => {
  const param = useParams();
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    const response = await fetch();

    const dataResponse = await response.json();

    setData(dataResponse?.data || []);
    console.log("dataResponse", dataResponse);
  };

  console.log("Category", param);
  return (
    <div className="container mx-auto p-4 ">
      {/*  DESKTOP VERSION */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* LEFT SIDE */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* SORT BY */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 pb-1 border-b border-slate-300">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  // checked={sortBy === "asc"}
                  // onChange={handleOnChangeSortBy}
                  value={"asc"}
                />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  // checked={sortBy === "dsc"}
                  // onChange={handleOnChangeSortBy}
                  value={"dsc"}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div
                    key={categoryName + index}
                    className="flex items-center gap-3"
                  >
                    <input
                      type="checkbox"
                      name={"category"}
                      // checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      // onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/* RIGHT SIDE (product) */}
        <div className='px-4'>
              <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                  data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading}/>
                  )
              }
             </div>
            </div>
      </div>
    </div>
  );
};

export default categoryProduct;
