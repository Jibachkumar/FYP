import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "../Avatar";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);

  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Trip",
      slug: "/trip",
    },
    {
      name: "Review",
      slug: "/review",
    },
  ];

  return (
    <header className="w-full">
      <nav className="w-full h-[2.7rem] bg-white shadow-md flex justify-between items-center fixed top-0 left-0 z-50 ">
        <div
          className=" flex text-[18px] font-mono text-red-700 pl-[2.5rem] md:pl-[11rem] italic font-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <span className="">explore</span>
          <div className="mt-[3px]">
            <span className="font-bolditalic">nepal</span>
          </div>
        </div>
        <div>
          <ul className="flex items-center gap-8 md:mr-[16rem] relative">
            {navItems.map((items, index) => (
              <li
                key={index}
                onClick={() => navigate(items.slug)}
                className={`text-[16px]  text-black opacity-[0.9] font-serif cursor-pointer pr-2 hover:bg-slate-300 px-[10px] py-[3px] duration-300 ease-in-out rounded-full ${
                  location.pathname === items.slug
                    ? "bg-slate-300 px-2 shadow-sm"
                    : ""
                }`}
              >
                {items.name}
              </li>
            ))}
            {authStatus ? (
              <li className=" cursor-pointer">
                <Link to={"/profile"}>
                  <Avatar />
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"}>
                  <button className="bg-transparent font-serif font-medium px-2  rounded-md shadow-md border-2 border-black opacity-[0.9] hover:scale-105 transform transition duration-300 ease-in-out text-black">
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

{
  /* <div className="ml-[10rem] text-md ">
          Explore-<span className="">-Nepal</span>
        </div>
        <ul className="flex gap-4  sm:mr-[13rem] ">
          {navItems.map((items) => (
            <li
              key={items.name}
              onClick={() => navigate(items.slug)}
              className="text-[16px] text-black font-serif font-medium cursor-pointer hover: bg-white ml-4"
            >
              {items.name}
            </li>
          ))}
        </ul> */
}
