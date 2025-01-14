const backendDomin = "http://localhost:8080";

const SummaryAPI = {
  signUp: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout: {
    url: `${backendDomin}/api/logout`,
    method: "get",
  },
  all_user: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  update_user: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  upload_product: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  all_product: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  product_update: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
};

export default SummaryAPI;
