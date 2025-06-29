import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRedirectToast } from "../hooks/useRedirectToast.js";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/authSlice.js";

function AdminLayout() {
  useRedirectToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#131D4F] flex">
      <aside className="flex flex-col bg-[#242f66] w-52  select-none fixed h-screen z-10">
        <div className="flex items-center gap-2 px-4 py-[14px] shadow-md">
          <div className="flex text-xl font-mono italic font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            <span className="font-bolditalic">
              {userData.data?.user?.userName}
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-4 space-y-1 px-2  text-sm font-semibold">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-sky-200 text-white"
                  : " hover:bg-slate-50 text-sky-600"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
              />
            </svg>
            Dashboard
          </NavLink>
          <NavLink
            to="sales"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-sky-200 text-sky-700"
                  : "text-sky-600 hover:bg-slate-50"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h18v2H3V3zm2 4h14v14H5V7zm3 3v4h2v-4H8zm4 0v4h2v-4h-2z" />
            </svg>
            Sales
          </NavLink>
          <NavLink
            to="post"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-sky-200 text-purple-700"
                  : "text-purple-600 hover:bg-slate-50"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="2" rx="1" />
              <rect x="3" y="9" width="18" height="2" rx="1" />
              <rect x="3" y="14" width="18" height="2" rx="1" />
              <rect x="3" y="19" width="18" height="2" rx="1" />
            </svg>
            POST
          </NavLink>
        </div>
      </aside>
      <div className="flex flex-col flex-1 ml-52">
        {/* Top bar */}
        <div className=" px-4 py-[14px] shadow-md bg-[#192458] sticky top-0 z-10">
          <div className="flex justify-between items-center text-xs text-gray-600 mb-2 select-none">
            <div className="pl-16">
              <span className=" text-white/50 font-medium text-center font-serif sm:mb-0">
                Hi {userData.data.user.userName}
              </span>
              {/* <div className="flex items-center justify-center gap-2 lg:ml-6  bg-[#1f2e7c] rounded-md px-2 text-[10px] font-semibold text-gray-900">
                <span className="text-white/50">
                  free trial with all features available
                </span>
                <span className="text-red-600 font-semibold">subscription</span>
              </div> */}
            </div>
            <div className=" flex  gap-4 lg:mr-20">
              <button
                aria-label="Notifications"
                className="text-gray-700 hover:text-gray-900"
              >
                <i className="fas fa-bell text-white/50"></i>
              </button>
              <div
                aria-label="User menu"
                className="flex items-center gap-1 text-white/50 hover:text-gray-900"
              >
                <i className="fas fa-user"></i>
                <span className="text-sm font-semibold">
                  {userData.data.user.userName}
                </span>
                <div className="relative">
                  <i
                    className="fas fa-caret-down cursor-pointer"
                    onClick={() => setShowDropdown((prev) => !prev)}
                  ></i>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-md rounded-md z-50">
                      <button
                        onClick={handleLogoutClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 mt-1 overflow-y-auto px-4">
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default AdminLayout;
