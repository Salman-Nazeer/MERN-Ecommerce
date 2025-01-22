import React, { useContext, useState } from "react";
import Logo from "../logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
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
  const [searchValue, setSearchValue] = useState("");
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

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchValue}`);
    setSearchValue("");
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-50">
      <div className="container h-full mx-auto flex items-center justify-between px-2 md:px-4">
        {/* LOGO */}
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        {/* SEARCH */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-1 focus-within:shadow outline-none"
        >
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full outline-none px-1 rounded-l-full"
          />
          <button
            type="submit"
            className="text-lg min-w-[50px] w-13 h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white"
          >
            <GrSearch />
          </button>
        </form>

        {/* IMG/CARD ICON/BTN */}
        <div className="flex items-center gap-4 md:gap-7">
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
            <Link to={"/cart"} className="text-3xl relative">
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
              <>
                <button
                  onClick={handleLogout}
                  className="hidden md:block px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 "
                >
                  Logout
                </button>

                <button
                  onClick={handleLogout}
                  className="md:hidden text-xl px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 "
                >
                  <MdLogout />
                </button>
              </>
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
