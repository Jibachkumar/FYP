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
    {
      name: "Login",
      slug: "/login",
    },
    {
      name: "Signup",
      slug: "/signup",
    },
  ];

  return (
    <div>
      <header className="">
        <nav className="w-full h-[3.8rem] bg-white shadow-md flex justify-between items-center fixed top-0 left-0 z-50 border-b-2">
          <div className=" flex text-[18px] font-mono text-red-700 md:pl-[11rem]">
            <span className="italic font-semibold inline-block transform skew-x-30">
              explore
            </span>
            <div className="mt-[3px]">
              <span className="italic font-semibold font-bolditalic inline-block transform skew-x-85 ">
                nepal
              </span>
            </div>
          </div>
          <div>
            <ul className="flex gap-4  sm:mr-[13rem] ">
              {navItems.map((items) => (
                <li
                  key={items.name}
                  onClick={() => navigate(items.slug)}
                  className="text-[16px] text-zinc-700 font-serif cursor-pointer hover: bg-white ml-4"
                >
                  {items.name}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </div>
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
