import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import SummaryAPI from "./common/index";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryAPI.current_user.url, {
      method: SummaryAPI.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };
  useEffect(() => {
    /**user details */
    fetchUserDetails();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user datails fetch
        }}
      >
        {/* <ToastContainer />

        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer className=""/> */}

        <div className="flex flex-col min-h-screen">
          <ToastContainer />
          <Header />
          <main className="flex-grow pt-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
