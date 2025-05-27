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
import Admin from "./pages/Admin.jsx";
import Package from "./pages/Package.jsx";
import Review from "./pages/Review.jsx";
import ViewTrip from "./components/ViewTrip.jsx";
import {
  Dashboard,
  AdminLayout,
  Employee,
  Sales,
  Report,
} from "./components/index.js";

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
        path: "/review",
        element: (
          <Protected authentication={false}>
            <Review />,
          </Protected>
        ),
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
        path: "/trip",
        element: (
          <Protected authentication={false}>
            <Package />
          </Protected>
        ),
      },
      {
        path: "/trip/:id",
        element: (
          <Protected authentication={true}>
            <ViewTrip />
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
      {
        path: "/admincomponent",
        element: (
          <Protected authentication={false}>
            <Admin />{" "}
          </Protected>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Protected authentication={true} role="admin">
        <AdminLayout />
      </Protected>
    ),
    children: [
      {
        index: true,
        element: (
          <Protected authentication={true} role="admin">
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "employee",
        element: (
          <Protected authentication={true} role="admin">
            <Employee />
          </Protected>
        ),
      },
      {
        path: "sales",
        element: (
          <Protected authentication={true} role="admin">
            <Sales />
          </Protected>
        ),
      },
      {
        path: "report",
        element: (
          <Protected authentication={true} role="admin">
            <Report />
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
