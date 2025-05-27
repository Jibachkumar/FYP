import { useState, useEffect } from "react";

function Dashboard() {
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      // setLoader(true);
      try {
        const response = await fetch(
          "http://localhost:7000/api/v1/users/trip/allbookedtrip"
        );

        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        setTripData(data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        // setLoader(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Heading and filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="sm:ml-auto">
              <div
                className="inline-flex rounded-md bg-gray-100 text-xs font-semibold text-gray-700"
                role="group"
              >
                <button
                  type="button"
                  className="px-3 py-1 rounded-l-md hover:bg-gray-200"
                >
                  This week
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 text-blue-900 rounded-none font-bold"
                >
                  This month
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded-r-md hover:bg-gray-200"
                >
                  This year
                </button>
              </div>
            </div>
          </div>

          {/* Getting started and help */}
          <section className=" font-serif flex flex-col md:flex-row justify-between bg-white border border-gray-200 rounded-md p-4 mb-4">
            <div className="md:w-2/3">
              <h2 className="font-extrabold text-gray-900 flex items-center gap-1 mb-1">
                <i className="fas fa-rocket"></i> Getting started
              </h2>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                <li className="line-through">Start free trial</li>
                <li>Make a Trip</li>
                <li>Configure payment types</li>
                <li>Customize Your Booking Settings</li>
                <li>Add company information and optionally a logo</li>
                <li>Create a Trip</li>
              </ul>
              <div
                className="mt-3 w-full bg-gray-100 rounded-full h-4 overflow-hidden"
                aria-label="Progress bar"
              >
                <div
                  className="bg-green-400 h-4 text-[10px] font-semibold text-white text-center leading-4"
                  style={{ width: "16.6667%" }}
                >
                  (1/6) Confirmed
                </div>
              </div>
            </div>
            <div className="md:w-1/3 mt-4 md:mt-0 text-center lg:text-right">
              <h3 className="font-extrabold text-gray-900 flex items-center justify-center gap-1 mb-1">
                <i className="fas fa-phone-alt"></i> Free help
              </h3>
              <p className="text-xs text-gray-600 mb-1">
                We can help with any question
              </p>
              <p className="font-extrabold text-gray-900">+977-1-4420858</p>
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-serif">
            <div className="bg-[#F8EEDF] border border-gray-200 rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2 text-gray-700">
                <i className="fas fa-chart-line text-sm"></i>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{tripData.total}</p>
                <p className="text-xs text-gray-600">Total Booking</p>
              </div>
            </div>
            <div className="bg-[#FFDEDE] border border-gray-200 rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2 text-gray-700">
                <i className="fas fa-cash-register text-sm"></i>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {tripData.finalHighestName}
                </p>
                <p className="text-xs text-gray-600">Highest Booked Trip</p>
              </div>
            </div>
            <div className="bg-[#F1EFEC] border border-gray-200 rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2 text-gray-700">
                <span className="text-sm font-semibold">$</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {tripData.totalEarnings}
                </p>
                <p className="text-xs text-gray-600">Total Earning</p>
              </div>
            </div>
            <div className="bg-[#F4F8D3] border border-gray-200 rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2 text-gray-700">
                <i className="fas fa-list-ul text-sm"></i>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">1</p>
                <p className="text-[9px] text-gray-500">
                  1 higher from last week
                </p>
                <p className="text-xs text-gray-600">Tickets</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
