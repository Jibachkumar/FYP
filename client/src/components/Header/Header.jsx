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
    <header className="w-full h-full ">
      <nav className="w-full py-[12px] bg-[#393E46] shadow-lg flex justify-between items-center fixed top-0 left-0 z-50 ">
        <div
          className=" flex text-xl font-mono  md:pl-[11rem] italic font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <span>explore</span>
          <div className="mt-[3px]">
            <span>nepal</span>
          </div>
        </div>
        <div>
          <ul className="flex items-center gap-8 md:mr-[16rem] relative">
            {navItems.map((items, index) => (
              <li
                key={index}
                onClick={() => navigate(items.slug)}
                className={`text-[16px] font-serif cursor-pointer pr-2  px-[8px] py-[3px] duration-300 ease-in-out 
                  ${
                    items.slug === location.pathname
                      ? " text-black"
                      : "text-white hover:text-black"
                  } 
                `}
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
                  <button className="bg-transparent font-serif font-medium px-2  rounded-md shadow-md border-2 border-white/70 opacity-[0.9] hover:scale-105 transform transition duration-300 ease-in-out text-white">
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
