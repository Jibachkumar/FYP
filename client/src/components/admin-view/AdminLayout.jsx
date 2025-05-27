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
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="flex flex-col bg-white w-48 border-r border-gray-200 select-none fixed h-screen z-10">
        <div className="flex items-center gap-1 px-4 py-3 border-b border-gray-200">
          <div className=" flex text-xl font-mono text-red-950 pl-[6px] italic font-extrabold">
            {/* <span className="">Geek</span> */}
            <div className="">
              <span className="font-bolditalic">
                {userData.data?.user?.userName}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 space-y-1 text-sm font-semibold">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-r-lg ${
                isActive ? "bg-sky-200 text-purple-800" : " hover:bg-sky-50"
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
              `flex items-center gap-2 px-4 py-2 rounded-r-lg ${
                isActive
                  ? "bg-sky-200 text-sky-700"
                  : "text-sky-600 hover:bg-sky-50"
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
            to="employee"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-r-lg ${
                isActive
                  ? "bg-sky-200 text-purple-700"
                  : "text-purple-600 hover:bg-sky-50"
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

          <NavLink
            to="report"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-r-lg ${
                isActive
                  ? "bg-sky-200 text-[#393E46]"
                  : "text-[#393E46] hover:bg-sky-50"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 17h2v-6H3v6zm4 0h2v-4H7v4zm4 0h2v-8h-2v8zm4 0h2v-2h-2v2zm4 0h2v-10h-2v10z" />
            </svg>
            Report
          </NavLink>
        </div>
      </aside>
      <div className="flex flex-col flex-1 ml-48">
        {/* Top bar */}
        <div className=" px-4 py-[14px] flex items-center border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-end lg:gap-x-[750px] text-xs text-gray-600 mb-2 select-none">
            <div className="flex w-full items-end gap-1 font-normal">
              <span className=" text-blue-900 font-medium text-center font-serif sm:mb-0">
                Hi {userData.data.user.userName}
              </span>
              <button
                type="button"
                className="flex items-center gap-2 lg:ml-6 bg-yellow-400 rounded-md px-2 py-1 text-[10px] font-semibold text-gray-900"
              >
                <span>free trial with all features available</span>
                <span className="text-green-600 font-semibold">
                  subscription
                </span>
              </button>
            </div>
            <div className="flex items-center gap-4 lg:mr-20">
              <button
                aria-label="Notifications"
                className="text-gray-700 hover:text-gray-900"
              >
                <i className="fas fa-bell"></i>
              </button>
              <div
                aria-label="User menu"
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
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
