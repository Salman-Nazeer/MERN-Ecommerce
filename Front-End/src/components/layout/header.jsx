import React, { useContext, useState } from "react";
import Logo from "../logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryAPI from "../../common/index";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice";
import ROLE from "../../common/role";
import Context from "../../context";

const header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setmenuDisplay] = useState(false);
  const navigate = useNavigate();
  const context = useContext(Context);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryAPI.logout.url, {
      method: SummaryAPI.logout.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    // e.preventDefault();
    const { value } = e.target;
    console.log(value)
    if (value) {
      navigate(`/search?query=${value}`);
    } else {
      navigate("/search")
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-50">
      <div className="container h-full mx-auto flex items-center justify-between px-4">
        {/* LOGO */}
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        {/* SEARCH */}
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-1 focus-within:shadow outline-none">
          <input
            type="text"
            placeholder="Search product ..."
            className="w-full outline-none px-1 rounded-l-full"
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] w-13 h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        {/* IMG/CARD ICON/BTN */}
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setmenuDisplay((preve) => !preve)}
              >
                {user?.profilepic ? (
                  <img
                    src={user?.profilepic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                    title={user?.name}
                  />
                ) : (
                  <FaRegCircleUser title={user?.name} />
                )}
              </div>
            )}

            {/* That code in not correct it shows small box when clicked on admin profile */}
            {/* {menuDisplay && (
                  {user?.role === ROLE.ADMIN && (
              <div className="hidden md:block absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                    <Link
                      to={"admin-panal"}
                      className="whitespace-nowrap hover:bg-slate-200 p-2"
                      onClick={() => setmenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                </nav>
              </div>
                  )}
            )} */}

            {user?.role === ROLE.ADMIN && menuDisplay && (
              <div className="hidden md:block absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  <Link
                    to={"admin-panel/all-products"}
                    className="whitespace-nowrap hover:bg-slate-200 p-2"
                    onClick={() => setmenuDisplay((preve) => !preve)}
                  >
                    Admin Panel
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 "
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;
