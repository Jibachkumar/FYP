import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
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
    </div>
  );
}

export default App;
