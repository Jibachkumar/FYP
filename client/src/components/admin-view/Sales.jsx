import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

function Sales() {
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      // setLoader(true);
      try {
        const response = await fetch(
          "http://localhost:7000/api/v1/users/trip/userbookedtripdetails"
        );

        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        setTripData([data.data]);
      } catch (error) {
        console.log(error.message);
      } finally {
        // setLoader(false);
      }
    };

    fetchTrips();
  }, []);

  const allItems = useMemo(() => {
    const bookings = tripData[0]?.bookings || [];
    const trips = tripData[0]?.trips || [];

    // Normalize bookings
    const bookingItems = bookings.map((b) => ({
      type: "booking",
      userName: b.user?.userName,
      phoneNumber: b.user?.phoneNumber,
      email: b.user?.email,
      destination: b.trip?.name,
      duration: b.trip?.duration,
    }));

    // Normalize trips
    const tripItems = trips.map((t) => ({
      type: "trip",
      userName: t.user_id.userName,
      phoneNumber: t.user_id?.phoneNumber || "N/A",
      email: t.user_id?.email || "N/A",
      destination: t.name || t.destination,
      duration: t.duration,
    }));

    // Combine both arrays
    return [...bookingItems, ...tripItems];
  }, [tripData]);

  console.log(allItems);

  return (
    <div>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="flex items-center text-[22px] font-extrabold text-[#0B1A72] leading-none">
            <i className="fas fa-users mr-2"></i> Customers
          </h1>
        </div>

        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <form
            className="flex items-center w-full sm:w-auto"
            role="search"
            aria-label="Search customers"
          >
            <label htmlFor="search-customers" className="sr-only">
              Search customers
            </label>
            <input
              id="search-customers"
              type="search"
              placeholder="Search customers"
              className="border border-[#2B2B9B] rounded-l-md px-3 py-2 w-full sm:w-[320px] text-[14px] text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B] focus:border-[#2B2B9B]"
            />
            <button
              type="button"
              aria-label="Filter options"
              className="bg-[#E5E7EB] border border-l-0 border-[#E5E7EB] rounded-r-md px-3 py-2 text-[#2B2B9B] hover:bg-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B]"
            >
              <i className="fas fa-bars"></i>
            </button>
            <button
              type="reset"
              aria-label="Clear search"
              className="ml-2 text-[#6B7280] hover:text-[#2B2B9B] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B]"
            >
              <i className="fas fa-times"></i>
            </button>
          </form>

          <div className="flex space-x-3 justify-end w-full sm:w-auto">
            <button
              type="button"
              className="bg-[#001AFF] text-white rounded-md px-4 py-2 text-[14px] font-semibold hover:bg-[#000ECC] focus:outline-none focus:ring-2 focus:ring-[#000ECC]"
            >
              + Customer
            </button>
          </div>
        </section>

        <section className="border border-[#E5E7EB] bg-white rounded-lg p-4">
          <div className="flex space-x-4 mb-3">
            <button
              type="button"
              className="flex items-center space-x-2 rounded-md border border-[#D1D5DB] bg-white px-3 py-1 text-[14px] font-semibold text-[#2B2B9B] hover:bg-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B]"
              aria-pressed="true"
            >
              <i className="fas fa-list-ul"></i>
              <span>List view</span>
            </button>
          </div>

          <table className="w-full text-[13px] text-[#6B7280] border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="pl-2 pr-3 py-2 text-left align-top w-[40px]">
                  <input
                    type="checkbox"
                    aria-label="Select all customers"
                    className="cursor-pointer"
                  />
                </th>
                <th className="pl-2 pr-3 py-2 text-left align-top font-semibold text-[#6B7280] select-none cursor-pointer">
                  <div className="flex items-center space-x-1">
                    <span className=" font-serif text-blue-900">userName</span>
                    <i className="fas fa-sort text-blue-900"></i>
                  </div>
                </th>
                <th className="pl-2 pr-3 py-2 text-left align-top font-semibold text-[#6B7280] select-none cursor-pointer">
                  <div className="flex items-center space-x-1">
                    <span className="font-serif text-blue-900">
                      Phone / email
                    </span>
                    <i className="fas fa-sort text-blue-900"></i>
                  </div>
                </th>
                <th className="pl-2 pr-3 py-2 text-left align-top font-semibold text-[#6B7280] select-none cursor-pointer">
                  <div className="flex items-center space-x-1">
                    <span className="font-serif text-blue-900">
                      Destination
                    </span>
                    <i className="fas fa-sort text-blue-900"></i>
                  </div>
                </th>
                <th className="pl-2 pr-3 py-2 text-left align-top font-semibold text-[#6B7280] select-none cursor-pointer">
                  <div className="flex items-center space-x-1">
                    <span className="font-serif text-blue-900">Duration</span>
                    <i className="fas fa-sort text-blue-900"></i>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-blue-900 font-serif">
              {allItems.map((trip) => (
                <tr key={trip._id} className="border-b border-[#E5E7EB]">
                  <td className="pl-2 pr-3 py-3 align-top">
                    <input
                      type="checkbox"
                      aria-label={`Select ${trip.type || "User"}`}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="pl-2 pr-3 py-3 align-top font-semibold">
                    {trip.userName || "N/A"}
                  </td>
                  <td className="pl-2 pr-3 py-3 align-top leading-tight">
                    <div>{trip.phoneNumber || "N/A"}</div>
                    <div>{trip.email || "N/A"}</div>
                  </td>
                  <td className="pl-2 pr-3 py-3 align-top leading-tight">
                    <div>{trip.destination || "N/A"}</div>
                  </td>
                  <td className="pl-2 pr-3 py-3 align-top leading-tight">
                    <div>{trip.duration || "N/A"}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-6 space-x-3">
            <button
              type="button"
              aria-label="Previous page"
              className="rounded-md bg-[#E5E7EB] px-4 py-2 text-[#6B7280] hover:bg-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B]"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              type="button"
              aria-label="Next page"
              className="rounded-md bg-[#E5E7EB] px-4 py-2 text-[#6B7280] hover:bg-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B]"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="flex justify-center mt-1 text-[11px] text-[#6B7280]">
            <i className="fas fa-stopwatch mr-1"></i> Show count
          </div>
        </section>
      </div>
    </div>
  );
}

export default Sales;
