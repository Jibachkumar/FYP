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
    <header className="w-full h-full">
      <nav className="w-full h-[2.9rem] bg-slate-700 shadow-lg flex justify-between items-center fixed top-0 left-0 z-50 ">
        <div
          className=" flex text-xl font-mono text-red-950 pl-[2.5rem] md:pl-[11rem] italic font-semibold"
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
                className={`text-[17px] text-black/100  font-serif cursor-pointer pr-2  px-[10px] py-[3px] duration-300 ease-in-out hover:opacity-50 
                  ${
                    items.slug === location.pathname
                      ? " text-black/50"
                      : "opacity-100"
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
