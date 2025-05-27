import React from "react";

function Admin() {
  const handleMenuBtn = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
    sidebar.classList.toggle("lg:hidden");
  };
  return (
    <div className="bg-gray-200  w-full">
      {/* header */}
      <div className="bg-white border-b-2 mt-[4.5rem]">
        <div className="w-full h-full  flex justify-between items-center py-2 px-20">
          {/* <!-- Ícono de Menú  --> */}
          <button onClick={handleMenuBtn} className="lg:hidden">
            <i className="fas fa-bars text-cyan-500 text-lg"></i>
          </button>
          {/* <!-- Logo --> */}
          <div className="ml-1">
            <span>jibachh</span>
          </div>

          {/* <!-- Ícono de Notificación y Perfil --> */}
          <div className="space-x-4">
            <button>
              <i className="fas fa-bell text-cyan-500 text-lg"></i>
            </button>

            {/* <!-- Botón de Perfil --> */}
            <button>
              <i className="fas fa-user text-cyan-500 text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Left-dashboard-parts Barra lateral --> */}
      <div
        id="sidebar"
        class="lg:block hidden bg-white w-64 rounded-none border-none"
      >
        {/* //<!-- Items --> */}
        <div class="p-4 space-y-4">
          {/* <!-- Inicio --> */}
          <a
            href="#"
            aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400"
          >
            <i class="fas fa-home text-white"></i>
            <span class="mr-1 font-medium">Admin</span>
          </a>

          <a
            href="#"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
          >
            <i class="fas fa-gift"></i>
            <span>Recompensas</span>
          </a>

          {/* <a
            href="#"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
          >
            <i class="fas fa-store"></i>
            <span>Sucursalses</span>
          </a> */}

          <a
            href="#"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
          >
            <i class="fas fa-exchange-alt"></i>
            <span>Transactions</span>
          </a>

          <a
            href="#"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
          >
            <i class="fas fa-wallet"></i>
            <span>Logout</span>
          </a>
        </div>
      </div>

      {/* <!-- right-bashboard-part*/}
      <div className="w-full sm:w-full lg:absolute top-28 px-6 py-8">
        {/* search input fields */}
        <div class="bg-white lg:ml-[18.8rem] lg:w-[77.5%] rounded-full border-none p-3 mb-4 shadow-md">
          <div class="flex items-center ">
            <i class="px-3 fas fa-search ml-1" />
            <input
              type="text"
              placeholder="Search..."
              class="ml-3 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Container of trip deatils  */}
        <div class="lg:flex gap-4 items-stretch lg:ml-[17.5rem]">
          {/* <!-- Left part --> */}
          <div class="bg-white md:p-2 lg:ml-6 p-6 rounded-lg border border-gray-200 mb-6 lg:mb-0 shadow-md lg:w-[28%]">
            <div class="flex justify-center items-center space-x-5 h-full">
              <div>
                <p>Current balance</p>
                <h2 class="text-4xl font-bold text-gray-600">50.365</h2>
                <p>25.365 $</p>
              </div>
              <img
                src="https://www.emprenderconactitud.com/img/Wallet.png"
                alt="wallet"
                class="h-24 md:h-20 w-38"
              />
            </div>
          </div>

          {/* right part */}
          <div class="bg-white p-4 rounded-lg xs:mb-4 max-w-full shadow-md lg:w-[65%]">
            {/* <!-- Cajas pequeñas --> */}
            <div class="flex flex-wrap justify-between h-full">
              {/* <!-- Caja pequeña 1 --> */}
              <div class="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                <i class="fas fa-hand-holding-usd text-white text-4xl"></i>
                <p class="text-white">Despoit </p>
              </div>

              {/* <!-- Caja pequeña 2 --> */}
              <div class="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                <i class="fas fa-exchange-alt text-white text-4xl"></i>
                <p class="text-white">Booked List</p>
              </div>

              {/* <!-- Caja pequeña 3 --> */}
              <div class="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2">
                <i class="fas fa-qrcode text-white text-4xl"></i>
                <p class="text-white">Charges list</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Table Transaction --> */}
      <div class="bg-white rounded-lg p-4 shadow-md my-4">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left border-b-2 w-full">
                <h2 class="text-ml font-bold text-gray-600">Transactions</h2>
              </th>
            </tr>
          </thead>
          <div>
            <tr class="border-b w-full">
              <td class="px-4 py-2 text-left align-top w-full">
                <div>
                  <h2>Comercio</h2>
                  <p>24/07/2023</p>
                </div>
              </td>
              <td class="px-4 py-2 text-right text-cyan-500 w-full">
                <p>
                  <span>150$</span>
                </p>
              </td>
            </tr>
            <tr class="border-b w-full">
              <td class="px-4 py-2 text-left align-top w-full">
                <div>
                  <h2>Comercio</h2>
                  <p>24/06/2023</p>
                </div>
              </td>
              <td class="px-4 py-2 text-right text-cyan-500 w-full">
                <p>
                  <span>15$</span>
                </p>
              </td>
            </tr>
            <tr class="border-b w-full">
              <td class="px-4 py-2 text-left align-top w-full">
                <div>
                  <h2>Comercio</h2>
                  <p>02/05/2023</p>
                </div>
              </td>
              <td class="px-4 py-2 text-right text-cyan-500 w-full">
                <p>
                  <span>50$</span>
                </p>
              </td>
            </tr>
          </div>
        </table>
      </div>
    </div>
  );
}

export default Admin;
