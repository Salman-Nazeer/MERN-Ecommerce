import express from "express";

const router = express.Router();

console.log("routes are working");

import userSignUpController from "../controller/User/userSignUp.js";
import userSignInController from "../controller/User/userSignIn.js";
import userDetailsController from "../controller/User/userDetails.js";
import authToken from "../middleware/authToken.js";
import userLogout from "../controller/User/userLogout.js";
import allUsers from "../controller/User/allUsers.js";
import updateUser from "../controller/AdminPanel/updateUser.js";
import UploadProductController from "../controller/AdminPanel/uploadProduct.js";
import getProductController from "../controller/AdminPanel/getProduct.js";
import updateProductController from "../controller/AdminPanel/updateProduct.js";
import getCategoryProduct from "../controller/Product/getCategoreProductOne.js";
import getCategoreWiseProduct from "../controller/Product/getCategoreWiseProduct.js";
import getProductDetails from "../controller/Product/getProductDetails.js";
import addToCartController from "../controller/User/addToCartController.js";
import countAddToCartProduct from "../controller/User/countAddToCartProduct.js";
import addTocartViewProduct from "../controller/User/addToCartViewProduct.js";
import updateAddToCartProduct from "../controller/User/updateAddToCartProduct.js";
import deleteAddToCart from "../controller/User/deleteAddToCart.js";
import searchProduct from "../controller/Product/searchProduct.js";
import filterProduct from "../controller/Product/filterProduct.js";
import deleteProduct from "../controller/AdminPanel/deleteProduct.js";

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/logout", userLogout);
router.get("/user-details", authToken, userDetailsController);

// ADMIN PANEL
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// PRODUCT
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoreWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/searchProduct", searchProduct);
router.post("/filter-product", filterProduct)
router.post("/delete-product", deleteProduct);

// ADD TO CART
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/viewCartProduct", authToken, addTocartViewProduct);
router.post("/updateAddToCartProduct", authToken, updateAddToCartProduct);
router.post("/deleteAddToCartProduct", authToken, deleteAddToCart);


export default router;
