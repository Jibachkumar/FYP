import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CheckoutPayment from "../components/CheckoutPayment.jsx";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import { trip } from "../store/tripSlice.js";

function ViewTrip() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedExtra, setSelectedExtra] = useState("no-extras");
  const [tripView, setTripView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [people, setPeople] = useState(1);
  const [price, setPrice] = useState(0);
  const [pricePerPerson, setPricePerPerson] = useState(0);

  const peopleRef = useRef(null);

  const addPeople = () => {
    setPeople((prev) => prev + 1);
    setPrice((old) => old + pricePerPerson);

    // Add highlight class
    if (peopleRef.current) {
      peopleRef.current.classList.add(
        "text-green-600",
        "font-bold",
        "scale-110"
      );

      // Remove highlight after a short delay
      setTimeout(() => {
        peopleRef.current.classList.remove(
          "text-green-600",
          "font-bold",
          "scale-110"
        );
      }, 500);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? data.data.images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === data.data.images.length - 1 ? 0 : prev + 1
    );
  };

  // fetching Destination
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`/api/v1/users/alltrip/${id}`);

        if (!response.ok) throw new Error(`Failed to fetch trip details`);

        const data = await response.json();
        console.log(data);
        setData(data);
        setPrice(data.data.price);
        setPricePerPerson(data.data.price);
      } catch (error) {
        new Error(error.message);
      }
    };
    fetchTrip();
  }, [id]);

  // booking trip
  const handleBooking = async () => {
    try {
      const response = await fetch(`/api/v1/users/trip/${id}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) throw new Error(`Failed to fetch trip details`);

      const data = await response.json();
    } catch (error) {
      new Error(error.message);
    }
  };

  return (
    <div className=" mt-12 w-full pb-5 mx-auto bg-slate-50">
      {data ? (
        <div className=" w-full">
          {/* images */}
          <section className="relative w-full max-w-full">
            <img
              alt={data.data.name}
              className="w-full h-[37rem] object-cover"
              height="400"
              src={data.data.images[1].url}
              width="1440"
            />
            <button
              className="absolute bottom-6 left-6 flex items-center space-x-2 text-white text-xs bg-black bg-opacity-50 rounded px-3 py-2 hover:bg-opacity-70"
              type="button"
              onClick={() => setTripView(true)}
            >
              <i className="fas fa-camera"></i>
              <span>View Photos</span>
            </button>
          </section>
          {/* <!-- Bottom navigation bar --> */}
          <div className="flex flex-wrap justify-between px-[13rem] items-center border-b border-gray-200 bg-gray-50 py-4 text-gray-700">
            <h2 className="font-bold font-serif text-2xl  text-black">
              {data.data.name.charAt(0).toUpperCase() + data.data.name.slice(1)}
            </h2>
            <ul className="flex space-x-8 font-serif">
              <li>
                <a
                  className="text-red-600 border-b-2 border-red-600 pb-[30px]"
                  href="#"
                >
                  Main Information
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Itinerary
                </a>
              </li>

              <li>
                <a className="hover:underline" href="#">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          <div className="grid max-w-5xl bg-white mx-auto grid-cols-2 sm:grid-cols-4 gap-24 p-5 mt-5 mb-6 relative">
            <div className="absolute top-0 left-0 h-6 w-1.5 bg-[#d0021b]"></div>
            <div className="bg-white shadow-sm  p-4 flex flex-col items-center text-center">
              <i className="far fa-clock text-red-600 text-xl mb-1"></i>
              <p className="text-xs sm:text-sm text-gray-700 font-serif font-semibold">
                {data.data.duration} days/nights
              </p>
            </div>
            <div className="bg-white shadow-sm p-4 flex flex-col items-center text-center">
              <i className="far fa-calendar-alt text-red-600 text-xl mb-1"></i>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold">
                Aug-10-2025
              </p>
            </div>
            <div className="bg-white shadow-sm p-4 flex flex-col items-center text-center">
              <i className="fas fa-box-open text-red-600 text-xl mb-1"></i>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold">
                Operated In: {data.data.operated_in}
              </p>
            </div>
            <div className="bg-white shadow-sm p-4 flex flex-col items-center text-center">
              <i className="far fa-user text-red-600 text-xl mb-1"></i>
              <p className="text-xs sm:text-sm font-serif text-gray-700 font-semibold">
                Age: {data.data.age_range}
              </p>
            </div>
          </div>

          {/* info section */}
          <section className="bg-white max-w-5xl mx-auto w-full p-8 relative">
            <div className="absolute top-0 left-0 h-6 w-1.5 bg-[#d0021b]"></div>
            <section>
              <h2 className="font-bold  text-lg text-[#d0021b] font-serif mb-3">
                Main Info
              </h2>
              <p className="text-[#4a4a4a] text-sm font-mono leading-relaxed mb-8">
                trip offers a diverse experience combining cultural exploration,
                natural beauty, and adventure, making it a popular destination
                for travelers. Key highlights include visiting UNESCO World
                Heritage sites like Kathmandu Durbar Square and Pashupatinath
                Temple, experiencing the tranquil beauty of Pokhara, and
                engaging in wildlife encounters at Chitwan National Park. Many
                tours also include trekking opportunities and opportunities to
                learn about Nepali culture and traditions.
              </p>
            </section>
            <section>
              <h1 className="font-bold text-lg font-serif text-[#d0021b] mb-4">
                Details for {data.data.name} Tour Packages
              </h1>
              <p className="text-[#4a4a4a] font-mono text-sm leading-relaxed mb-4">
                {data.data.description}.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-xl font-serif text-[#d0021b] mb-4">
                Tour Inclusions and Exclusions
              </h3>
              <ul className="text-[#4a4a4a] font-serif text-sm leading-relaxed list-disc list-inside space-y-1">
                <li>
                  Expore Nepal can help you plan and book trips and manage your
                  itineraries
                </li>
                <li>Comfortable transport during the tour.</li>
                <li>include food and hotel.</li>
                <li>Entrance fee.</li>
              </ul>
            </section>
          </section>

          {/* booking details */}
          <section className="bg-white max-w-5xl mt-4 mx-auto w-full p-8 font-serif relative">
            <div className="absolute top-0 left-0 h-6 w-1.5 bg-[#d0021b]"></div>
            <h2 className="text-gray-900 font-semibold text-lg mb-3">
              Price details
            </h2>
            <div className="flex justify-between text-gray-700 text-sm mb-2">
              <span className="font-semibold">Extras</span>
              <span className="text-xs self-center">price</span>
            </div>
            <div>
              <label className="flex items-center mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="extras"
                  value="no-extras"
                  defaultChecked
                  className="form-radio text-blue-600 border-gray-300 focus:ring-0"
                />

                <span className="ml-2 text-gray-700 text-sm">
                  Per person price
                </span>
                <span className="ml-auto text-gray-700 text-sm">
                  + ${data.data.price}
                </span>
              </label>
              <label className="flex items-center mb-3 cursor-pointer">
                <input
                  type="radio"
                  name="extras"
                  value="no-extras"
                  checked={selectedExtra === "no-extras"}
                  onChange={(e) => setSelectedExtra(e.target.value)}
                  className="form-radio text-blue-600 border-gray-300 focus:ring-0"
                />
                <span className="ml-2 text-gray-700 text-sm">
                  Add person{" "}
                  <button
                    className="text-xl font-extralight text-green-500 focus:outline-none hover:text-red-800"
                    onClick={addPeople}
                  >
                    +
                  </button>{" "}
                </span>
                <span className="ml-auto text-gray-700 text-sm" ref={peopleRef}>
                  + {people}
                </span>
              </label>
            </div>
            <div className="text-xs text-red-700 mb-3 flex items-center gap-1">
              <span>Non-refundable</span>
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="flex flex-col items-end space-y-1 mb-4">
              <span className="bg-green-700 text-white text-xs font-medium px-2 py-0.5 rounded">
                $10% vat include
              </span>
              <a
                href="#"
                className="text-xs text-green-700 underline hover:text-gray-900"
              >
                {data.data.duration} day/night
              </a>
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-id-badge text-lg text-green-700"></i>
                <span className="text-base text-green-700">{people}</span>
                <span className="text-sm text-green-700">people</span>
              </div>
              <div className="text-sm font-semibold text-green-700">
                ${price} total
              </div>

              <div className="text-xs text-green-700 flex items-center gap-1">
                <i className="fas fa-check"></i>
                <span>Total includes taxes and fees</span>
              </div>
            </div>

            <div
              onClick={handleBooking}
              className="w-full bg-blue-600 text-center hover:bg-blue-700 text-white font-semibold text-sm rounded-md py-2 mb-2"
            >
              <CheckoutPayment trip={data} />
            </div>
            <p className="text-center text-xs text-gray-600">
              You will not be charged yet
            </p>
          </section>

          {tripView && (
            <div className="fixed top-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-black rounded-2xl w-full max-w-5xl h-[30rem] overflow-hidden flex flex-col shadow-lg relative">
                <div className="absolute top-4 right-4 z-50">
                  <button
                    aria-label="Close"
                    className="text-black hover:text-gray-700 focus:outline-none"
                    onClick={() => setTripView(false)}
                  >
                    <i className="fas fa-times text-2xl"></i>
                  </button>
                </div>
                <div className="flex relative justify-center items-center h-full">
                  <img
                    src={data.data.images[currentIndex].url}
                    alt={data.data.name}
                    className="rounded-xl max-w-full object-cover"
                    height="320"
                    width="1024"
                  />
                  {/* Previous Button */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-white/70 focus:outline-none rounded-full hover:bg-white z-50"
                  >
                    <i className="fas fa-chevron-left text-base"></i>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-white/70 focus:outline-none rounded-full hover:bg-white z-50"
                  >
                    <i className="fas fa-chevron-right text-base"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-opacity-50 z-50">
          <Spin />
        </div>
      )}
    </div>
  );
}

export default ViewTrip;
