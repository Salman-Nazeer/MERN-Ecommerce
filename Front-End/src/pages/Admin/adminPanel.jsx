import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const adminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="pt-2 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
                title={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/* NAVIGATION */}
        <div className="mt-2">
          <nav className="grid p-4 gap-1 ">
            <Link to={"all-users"} className="hover:bg-slate-100 p-1">
              All Users
            </Link>
            <Link to={"all-products"} className="hover:bg-slate-100 p-1">
              All Product
            </Link>
          </nav>
        </div>
      </aside>

      <main className="p-2 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default adminPanel;
