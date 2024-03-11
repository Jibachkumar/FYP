import { useState } from "react";

// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-auto h-auto">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
