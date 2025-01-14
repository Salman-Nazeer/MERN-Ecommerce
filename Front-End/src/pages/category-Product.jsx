import React from "react";
import { useParams } from "react-router-dom";

const categoryProduct = () => {
  const param = useParams();
  console.log("Category", param);
  return <div>{param.categoryName}</div>;
};

export default categoryProduct;
