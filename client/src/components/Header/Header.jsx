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
    <div className="w-full">
      <header className="flex h-[4.3rem] bg-white border-b">
        <nav className="flex mx-auto my-auto">
          <ul className="flex gap-4">
            {navItems.map((items) => (
              <li
                key={items.name}
                onClick={() => navigate(items.slug)}
                className="text-[16px] text-black font-serif font-medium cursor-pointer"
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
