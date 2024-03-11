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
    <div className="w-full h-auto">
      <header className="w-full flex justify-between items-center h-[4.8rem] bg-white border-b fixed">
        <div className="ml-[10rem] text-xl ">
          Explore-<span className="block ml-[3rem]">-Nepal</span>
        </div>
        <nav className="">
          <ul className="flex gap-4  sm:mr-[13rem] ">
            {navItems.map((items) => (
              <li
                key={items.name}
                onClick={() => navigate(items.slug)}
                className="text-[16px] text-black font-serif font-medium cursor-pointer hover: bg-white "
              >
                {items.name}
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
