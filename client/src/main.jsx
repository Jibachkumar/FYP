import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Protected from "./components/AuthLayout.jsx";
import Profile from "./components/Profile.jsx";
import Trip from "./pages/Trip.jsx";
import TripContent from "./components/editTrip.jsx";
import Success from "./pages/Success.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />{" "}
          </Protected>
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />{" "}
          </Protected>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protected authentication={true}>
            <Profile />{" "}
          </Protected>
        ),
      },
      {
        path: "/createtrip",
        element: (
          <Protected authentication={true}>
            <Trip />{" "}
          </Protected>
        ),
      },
      {
        path: "/tripcontent",
        element: (
          <Protected authentication={true}>
            <TripContent />{" "}
          </Protected>
        ),
      },
      {
        path: "/paymentsuccess",
        element: (
          <Protected authentication={false}>
            <Success />{" "}
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
