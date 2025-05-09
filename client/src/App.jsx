import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRedirectToast } from "./components/hooks/useRedirectToast.js";

function App() {
  useRedirectToast();

  return (
    <div className=" w-full">
      <div className="w-full">
        <Header />
      </div>
      <main className="w-full ">
        <Outlet />
      </main>
      <div>
        <Footer />
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

export default App;
