import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Login from "../pages/login";
import ForgotPassword from "../pages/forgot-password";
import SignUp from "../pages/signup";
import AdminPanel from "../pages/Admin/adminPanel";
import AllUser from "../pages/Admin/all-user";
import AllProducts from "../pages/Admin/allProducts";
import CategoryProduct from "../pages/category-Product";
import ProductDetails from "../pages/product-details";
import Cart from "../pages/cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "product-category/:categoryName",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUser />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
        ],
      },
    ],
  },
]);
