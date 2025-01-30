import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory.jsx";
import VerticalCard from "../components/verticalCard.jsx";
import SummaryAPI from "../common/index.js";

const categoryProduct = () => {
  const [showFilters, setShowFilters] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const URLSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = URLSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(SummaryAPI.filterProduct.url, {
      method: SummaryAPI.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();

    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);

    //format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Mobile Filter Toggle Button */}
      <button
        className="md:hidden bg-gray-200 px-3 py-1  rounded text-gray-700"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] gap-4">
        {/* LEFT SIDE FILTERS - Responsive Sidebar */}
        <div
          className={`bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-auto transition-transform transform ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 w-64 h-full md:relative md:translate-x-0 md:w-full md:h-auto md:block z-50 shadow-md md:shadow-none`}
        >
          <button
            className="md:hidden absolute top-2 right-2 text-red-600"
            onClick={() => setShowFilters(false)}
          >
            ✕
          </button>

          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 pb-1 border-b border-slate-300">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  id="Low-to-High"
                  value="asc"
                />
                <label htmlFor="Low-to-High">Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  id="High-to-Low"
                  value="dsc"
                />
                <label htmlFor="High-to-Low">Price - High to Low</label>
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div
                  key={categoryName.value + index}
                  className="flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[categoryName.value] || false}
                    value={categoryName.value}
                    id={categoryName.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName.value}>
                    {categoryName.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* RIGHT SIDE (Product Display) */}
        <div className="">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>

          <div className="min-h-[calc(100vh-120px)] scrollbar-none overflow-y-auto max-h-[calc(100vh-120px)] pb-10">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default categoryProduct;
