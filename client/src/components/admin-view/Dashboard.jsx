import { useState, useEffect, useMemo } from "react";
import BarChart from "../utils/BarChart";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

function Dashboard() {
  const [data, setTripData] = useState([]);
  const [bookedTripData, setBookedTripData] = useState([]);
  const [rating, setRating] = useState([]);
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 320;
  const gap = 48;
  const visibleCards = 3;

  const maxIndex = Math.max(0, rating.length - visibleCards);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

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
        setTripData(data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        // setLoader(false);
      }
    };

    fetchTrips();
  }, []);

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
        setBookedTripData([data.data]);
      } catch (error) {
        console.log(error.message);
      } finally {
        // setLoader(false);
      }
    };

    fetchTrips();
  }, []);

  const allBookedTrips = useMemo(() => {
    const bookings = bookedTripData[0]?.bookings || [];
    const trips = bookedTripData[0]?.trips || [];

    // Normalize bookings
    const bookingItems = bookings.map((b) => ({
      userName: b.user?.userName,
      email: b.user?.email,
      destination: b.trip?.name,
      duration: b.trip?.duration,
      booked: "Package Booked",
      people: b.trip?.people || 2,
      image: b.trip?.images[0]?.url,
    }));

    // Normalize trips
    const tripItems = trips.map((t) => ({
      userName: t.user_id.userName,
      email: t.user_id?.email || "N/A",
      destination: t.name || t.destination,
      duration: t.duration,
      image: t.image[0],
      people: t?.people || 2,
      booked: "Customize Trip",
    }));

    // Combine both arrays
    return [...bookingItems, ...tripItems];
  }, [bookedTripData]);

  console.log(allBookedTrips);

  const totalPages = Math.ceil(allBookedTrips.length / pageSize);

  const visibleItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return allBookedTrips.slice(start, end);
  }, [allBookedTrips, page]);

  // console.log(visibleItems);

  // fetch rating
  useEffect(() => {
    const fetchRating = async () => {
      // setLoader(true);
      try {
        const response = await fetch(
          "http://localhost:7000/api/v1/users/triprating",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.data);
        setRating(data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        // setLoader(false);
      }
    };

    fetchRating();
  }, []);

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      // setLoader(true);
      try {
        const response = await fetch(
          "http://localhost:7000/api/v1/users/alluser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.data.length);
        setUser(data.data.length);
      } catch (error) {
        console.log(error.message);
      } finally {
        // setLoader(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Main content */}
        <div className="flex-1 p-2">
          {/* Heading and filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="font-serif font-extrabold text-lg text-black">
              Overview
            </h1>
            {/* <div className="sm:ml-auto">
              <div
                className="inline-flex rounded-md bg-[#192458] text-white shadow-md text-xs font-semibold"
                role="group"
              >
                <button
                  type="button"
                  className="px-3 py-2 font-serif rounded-l-md hover:bg-gray-200"
                >
                  This week
                </button>
                <button
                  type="button"
                  className="px-3 py-2 font-serif  rounded-none font-bold"
                >
                  This month
                </button>
                <button
                  type="button"
                  className="px-3 py-2 font-serif rounded-r-md hover:bg-gray-200"
                >
                  This year
                </button>
              </div>
            </div> */}
          </div>

          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-black font-serif mb-4">
            <div className="bg-white/80 shadow-md rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2 ">
                <i className="fas fa-chart-line text-sm"></i>
              </div>
              <div className="text-right">
                <p className="font-semibold ">{data.total}</p>
                <p className="text-xs ">Total Booking</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <i className="fas fa-cash-register text-sm"></i>
              </div>
              <div className="text-right">
                <p className="font-semibold ">{data.finalHighestName}</p>
                <p className="text-xs ">Highest Booked Trip</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <span className="text-sm font-semibold">$</span>
              </div>
              <div className="text-right">
                <p className="font-semibold ">{data.totalEarnings}</p>
                <p className="text-xs ">Total Earning</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <i className="fa-solid fa-id-card-clip"></i>
              </div>
              <div className="text-right">
                <p className="font-semibold ">{user}</p>
                <p className="text-xs ">Total User</p>
              </div>
            </div>
          </section>

          {/* booking Schedule and booking bar chart */}
          <div className="flex gap-6 mb-4">
            <div
              className="w-[640px] h-[400px] px-2  py-3 rounded-sm bg-white"
              style={{
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 className="font-serif text-lg font-medium  mb-3">
                Recent Booking Schedule
              </h2>
              <div className="space-y-3  w-full h-[260px] transition-transform duration-500 ease-in-out">
                {visibleItems.map((trip, index) => (
                  <div className="flex" key={index}>
                    <div>
                      <img
                        src={trip.image}
                        alt="tripImage"
                        className="w-[150px] h-[80px] overflow-hidden rounded-md"
                      />
                    </div>
                    <div className="px-3 flex flex-col gap-[3px]">
                      <h2 className="font-serif text-base font-semibold">
                        {trip.destination}
                      </h2>
                      <p className="font-serif w-full">{trip.userName}</p>
                      <label className="text-sm font-serif" htmlFor="people">
                        {trip.people} people
                      </label>
                    </div>
                    <div className="relative ml-auto flex justify-center items-center">
                      <label
                        htmlFor="tripDuration"
                        className="bg-green-700 p-2 rounded-md text-white font-serif font-medium md:ml-44"
                      >
                        {trip.duration} Days
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center pt-6 space-x-3">
                {/* Previous */}
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className={`rounded-md px-4 py-2 focus:outline-none ${
                    page <= 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#E5E7EB] text-[#6B7280] hover:bg-[#D1D5DB] focus:ring-2 focus:ring-[#2B2B9B]"
                  }`}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                {/* Next */}
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={page >= totalPages}
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className={`rounded-md px-4 py-2 focus:outline-none ${
                    page * pageSize >= allBookedTrips.length
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#E5E7EB] text-[#6B7280] hover:bg-[#D1D5DB] focus:ring-2 focus:ring-[#2B2B9B]"
                  }`}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <BarChart data={bookedTripData} />
          </div>

          {/* booking review content */}
          <div className="max-w-[1307px] mx-auto p-6 rounded-md shadow-lg bg-white flex items-center justify-center mb-4">
            <div className="w-full">
              <h2 className="font-semibold text-slate-800 text-md font-serif mb-6">
                Latest Review by Customers
              </h2>

              <div className="relative flex items-center">
                {/* Left arrow */}
                <button
                  aria-label="Previous"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="absolute left-0 z-10 bg-green-900 text-white w-10 h-10 rounded-md flex items-center justify-center"
                >
                  <i className="fas fa-arrow-left"></i>
                </button>

                {/* 🔒 This wrapper hides overflow and sets visible width to exactly 3 cards */}
                <div
                  className="overflow-hidden mx-auto"
                  style={{
                    width: `${
                      cardWidth * visibleCards + gap * (visibleCards - 1)
                    }px`,
                  }}
                >
                  {/* Sliding container */}
                  <div
                    className="flex space-x-12 transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${
                        currentIndex * (cardWidth + gap)
                      }px)`,
                      willChange: "transform",
                    }}
                  >
                    {rating &&
                      rating.map((rate) => (
                        <div
                          key={rate._id}
                          className="min-w-[320px] max-w-[320px] font-serif bg-white rounded-xl shadow-md p-6 flex flex-col justify-between border border-transparent"
                        >
                          <h2 className="font-semibold font-serif mb-2">
                            {rate.trip_id?.name}
                          </h2>
                          <p className="text-gray-500 text-xs leading-relaxed mb-6">
                            {rate.comments}
                          </p>
                          <div className="flex items-center space-x-4">
                            <img
                              alt="Portrait"
                              className="w-12 h-12 rounded-lg object-cover"
                              src={rate.trip_id.images[0].url}
                            />
                            <div className="flex-1">
                              <p className="text-gray-700 font-semibold text-sm">
                                {rate.user_id.userName}
                              </p>
                              <p className="text-gray-700 italic text-xs">
                                {rate.user_id.email}
                              </p>
                              <Box>
                                <Rating
                                  name="hover-feedback"
                                  value={rate.rating}
                                  readOnly
                                  emptyIcon={
                                    <StarIcon
                                      style={{ opacity: 0.55 }}
                                      fontSize="inherit"
                                    />
                                  }
                                />
                              </Box>
                            </div>
                            <i className="fas fa-check-circle text-green-500 text-lg"></i>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Right arrow */}
                <button
                  aria-label="Next"
                  onClick={handleNext}
                  disabled={currentIndex === maxIndex}
                  className="absolute right-0 z-10 bg-green-900 text-white w-10 h-10 rounded-md flex items-center justify-center"
                >
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
