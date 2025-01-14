import SummaryAPI from "../common";
import { toast } from "react-toastify";

const addToCard = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const product = id;

  console.log(product);

  const response = await fetch(SummaryAPI.addToCartProduct.url, {
    method: SummaryAPI.addToCartProduct.method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  const responseData = await response.json();

  if (responseData.success) {
    toast.success(responseData.message);
  }

  if (responseData.error) {
    toast.error(responseData.message);
  }

  return responseData;
};

export default addToCard;
