import React from "react";

import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    // {
    //   name: "Signup",
    //   slug: "/signup",
    //   isButton: true,
    // },
    {
      name: "Login",
      slug: "/login",
      isButton: true,
    },
  ];

  return (
    <header className="w-full">
      <nav className="w-full h-[3.1rem] bg-slate-50 shadow-md flex justify-between items-center fixed top-0 left-0 z-50 ">
        <div
          className=" flex text-[19px] font-mono text-red-700 pl-[2.5rem] md:pl-[11rem] italic font-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <span className="">explore</span>
          <div className="mt-[3px]">
            <span className="font-bolditalic">nepal</span>
          </div>
        </div>
        <div>
          <ul className="flex mr-[6.7rem] md:mr-[16rem] relative">
            {navItems.map((items, index) => (
              <li
                key={items.name}
                onClick={() => navigate(items.slug)}
                className={`text-[16px] text-black opacity-[0.9] font-serif cursor-pointer  ${
                  index === navItems.length - 1
                    ? "md:pl-[8rem]"
                    : " px-[14px] py-[4px] hover:text-white hover:bg-slate-500 rounded-full duration-400 ease-in-out"
                } `}
              >
                {items.isButton ? (
                  <button className=" bg-transparent text-[14px] font-semibold px-3 py-1 rounded-md shadow-sm border border-black opacity-[0.9] hover:text-black hover:scale-105 transform transition duration-400 ease-in-out absolute top-[50%] -translate-y-1/2">
                    {items.name}
                  </button>
                ) : (
                  items.name
                )}
              </li>
            ))}
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
