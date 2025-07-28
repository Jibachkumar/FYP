import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import CheckoutPayment from "../components/CheckoutPayment.jsx";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import L from "leaflet";
import "leaflet-routing-machine";
import { trip } from "../store/tripSlice.js";
import geocodeLocation from "./utils/geocodeLocation.js";

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
  const [expanded, setExpanded] = useState(null);
  const [mappedItinerary, setMappedItinerary] = useState([]);
  const [viewMap, setViewMap] = useState(false);

  const peopleRef = useRef(null);

  const addPeople = () => {
    setPeople((prev) => prev + 1);
    setPrice((old) => old + pricePerPerson);

    // Add highlight className
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

  const toggleItem = (id) => {
    setExpanded((prev) => (prev == id ? null : id));
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

  // for Map location coords fetch
  useEffect(() => {
    if (!data?.data?.itinerary) return;

    const fetchItineraryCoords = async () => {
      const itineraryWithCoords = await Promise.all(
        data.data.itinerary.map(async (item, index) => {
          const coords = await geocodeLocation(`Nepal, ${item.place}`);

          // Determine mode from title
          let mode = null;
          const title = item.title.toLowerCase();

          if (title.includes("drive")) {
            mode = "🚐";
          } else if (title.includes("fly")) {
            mode = "✈️";
          } else if (title.includes("trek")) {
            mode = "🚶";
          } else {
            mode = "🚐"; // default to drive if none matched
          }

          return {
            ...item,
            coords,
            day: item.day,
            mode,
          };
        })
      );
      setMappedItinerary(itineraryWithCoords);
    };

    fetchItineraryCoords();
  }, [data]);

  console.log(mappedItinerary);

  // ✈️, 🚐, 🚶
  function TripMap({ mapId, myItinerary, w = "455px", h = "100%" }) {
    const itinerary = myItinerary;

    const coords = itinerary[0].coords;

    useEffect(() => {
      const map = L.map(mapId).setView([coords.lat, coords.lng], 7);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Group by coordinate string
      const coordGroups = {};

      // Add numbered markers for each stop
      itinerary.forEach((stop) => {
        if (!stop.coords) {
          console.warn(`Missing coords for Day ${stop.day}: ${stop.place}`);
        }

        const key = `${stop.coords.lat},${stop.coords.lng}`;

        if (!coordGroups[key]) {
          coordGroups[key] = {
            coords: stop.coords,
            days: [],
            place: stop.place,
          };
        }

        coordGroups[key].days.push(stop.day);
      });

      // Create one marker per unique location
      Object.values(coordGroups).forEach((group) => {
        const { coords, days, place } = group;

        const icon = L.divIcon({
          html: `
      <div style="
        background: #e74c3c;
        color: white;
        padding: 4px 4px;
        border-radius: 1px;
        font-size: 10px;
        font-weight: bold;
        text-align: center;
        display: inline-block;
        max-width: 100px;
        line-height: 1.2;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      ">
        <div>Day ${days.join(", ")}</div>
        <div style="font-size: 10px; font-weight: normal;">${place}</div>
      </div>
    `,
          className: "custom-marker",
          iconAnchor: [20, 20],
        });

        L.marker([coords.lat, coords.lng], { icon }).addTo(map);
      });

      for (let i = 1; i < itinerary.length; i++) {
        const from = itinerary[i - 1];
        const to = itinerary[i];
        const mode = to.mode || "🚐";
        const isDashed = mode === "✈️" || mode === "🚶";

        if (!from.coords || !to.coords) {
          console.warn(
            `Skipping route from day ${from.day} to ${to.day} due to missing coords`
          );
          continue;
        }

        if (mode === "🚐") {
          // Use routing machine only for driving segments
          L.Routing.control({
            waypoints: [
              L.latLng(from.coords.lat, from.coords.lng),
              L.latLng(to.coords.lat, to.coords.lng),
            ],
            lineOptions: {
              styles: [
                {
                  color: "blue",
                  weight: 2,
                  dashArray: isDashed ? "6, 8" : null,
                },
              ],
            },
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            show: false,
            createMarker: () => null,
          }).addTo(map);
        } else {
          // Use dashed polyline for flight or walking
          L.polyline(
            [
              [from.coords.lat, from.coords.lng],
              [to.coords.lat, to.coords.lng],
            ],
            {
              color: "blue",
              weight: 1,
              dashArray: "6, 6",
            }
          ).addTo(map);
        }

        // Travel mode emoji in the middle
        const midLat = (from.coords.lat + to.coords.lat) / 2;
        const midLng = (from.coords.lng + to.coords.lng) / 2;

        if (mode) {
          const emojiIcon = L.divIcon({
            html: `<div style="font-size: 22px;">${mode}</div>`,
            className: "emoji-marker",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });
          L.marker([midLat, midLng], { icon: emojiIcon }).addTo(map);
        }
      }
      // Completely remove any UI container
      document
        .querySelectorAll(".leaflet-routing-container")
        .forEach((el) => el.remove());

      return () => map.remove();
    }, [mapId]);

    return (
      <div
        id={mapId}
        style={{
          height: `${h}`,
          width: `${w}`,
          zIndex: 1,
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
        }}
      ></div>
    );
  }

  return (
    <div className=" mt-12 w-full pb-5 mx-auto bg-slate-50 scroll-smooth">
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
              {data.data.name.charAt(0).toUpperCase() + data.data.name.slice(1)}{" "}
              Tour
            </h2>
            <ul className="flex space-x-8 font-serif">
              <li>
                <a
                  className="text-red-600 border-b-2 border-red-600 pb-[30px]"
                  href="#main-info"
                >
                  Main Information
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#cost-includes">
                  Cost Includes
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#itinerary">
                  Itinerary
                </a>
              </li>

              <li>
                <a className="hover:underline" href="#trip-info">
                  Trip Information
                </a>
              </li>
            </ul>
          </div>

          {/* main information */}
          <div
            id="main-info"
            className="max-w-5xl bg-white mx-auto gap-24 p-5 mt-5 mb-6 relative"
          >
            <div className="absolute top-0 left-0 h-6 w-1.5 bg-[#d0021b]"></div>
            <div className="">
              <p className="text-[#4a4a4a] font-mono text-sm leading-relaxed mb-2">
                {data.data.description}.
              </p>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="bg-white p-3 flex gap-x-4">
                  <i className="far fa-clock text-red-600 text-3xl"></i>
                  <div className="flex flex-col">
                    <label
                      htmlFor="duration"
                      className="text-sm text-slate-700  font-serif font-medium leading-none m-0 p-0"
                    >
                      Duration
                    </label>
                    <p className="text-xs sm:text-sm text-gray-700 font-serif font-semibold leading-none m-0 p-0">
                      {data.data.duration} days
                    </p>
                  </div>
                </div>
                <div className="bg-white p-3 flex gap-x-4">
                  <i className="far fa-calendar-alt text-red-600 text-3xl"></i>
                  <div className="flex flex-col">
                    <label
                      htmlFor="date"
                      className="text-sm text-slate-700  font-serif font-medium leading-none m-0 p-0"
                    >
                      Start Date
                    </label>
                    <p className="text-xs sm:text-sm text-gray-700 font-serif font-semibold">
                      {data.data.startDate.split("T")[0] || 8 / 15 / 2025}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-3 flex gap-x-5">
                  <i className="far fa-user text-red-600 text-3xl"></i>
                  <div className="flex flex-col">
                    <label
                      htmlFor="age"
                      className="text-sm text-slate-700  font-serif font-medium leading-none m-0 p-0"
                    >
                      Age
                    </label>
                    <p className="text-xs sm:text-sm text-gray-700 font-serif font-semibold leading-none m-0 p-0">
                      {data.data.age_range}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-3 flex gap-x-4">
                  <i className="fa-solid fa-location-dot text-red-600 text-3xl"></i>
                  <div className="flex flex-col">
                    <label
                      htmlFor="age"
                      className="text-sm text-slate-700  font-serif font-medium leading-none m-0 p-0"
                    >
                      Starting City
                    </label>
                    <p className="text-xs sm:text-sm text-gray-700 font-serif font-semibold leading-none m-0 p-0">
                      Kathmandu
                    </p>
                  </div>
                </div>
                <div className="bg-white p-3 flex gap-x-4">
                  <i className="fas fa-box-open text-red-600 text-2xl"></i>
                  <div className="flex flex-col">
                    <label
                      htmlFor="operatedIn"
                      className="text-sm text-slate-700  font-serif font-medium leading-none m-0 p-0"
                    >
                      Operated In
                    </label>
                    <p className="text-xs sm:text-sm text-gray-700 font-serif font-semibold">
                      {data.data.operated_in}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="w-full h-[320px]"
                onClick={() => {
                  setViewMap(true);
                }}
              >
                {mappedItinerary.length > 0 && (
                  <TripMap
                    mapId={`map-route-${mappedItinerary[0]._id}`}
                    myItinerary={mappedItinerary}
                  />
                )}
              </div>
            </div>
          </div>

          {/* info section */}
          <section
            id="trip-info"
            className="bg-white max-w-5xl mx-auto w-full p-8 relative font-serif"
          >
            <div className="absolute top-0 left-0 h-6 w-1.5 bg-[#d0021b]"></div>
            {/* Flights & Transfers */}
            <div>
              <h3 className="font-bold text-lg mb-2">Flights & Transfers</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <i className="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  <span>
                    complimentary arrival, and departure airport transfers by
                    private car | van
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i class="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  <span>
                    Group airport transfers for Lukla flights by private van
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i class="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  <span>
                    Kathmandu (Ramechhap) - Lukla - Kathmandu (Ramechhap)
                    flights
                  </span>
                </li>
              </ul>
            </div>

            {/* Gears, Guides & Entry Permits */}
            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2">
                Gears, Guides & Entry Permits
              </h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <i class="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  <span>Two Trek Leaders for the group</span>
                </li>
                <li className="flex items-start gap-2">
                  <i class="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  <span>One Porter for each two trekkers</span>
                </li>
                <li className="flex items-start gap-2">
                  <i class="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  <span>
                    Individual duffle bag, pair of trekking poles & sleeping bag
                    per person
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i class="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  <span>
                    Trekking Permits: Sagarmatha National Park fees, Local
                    Government taxes
                  </span>
                </li>
              </ul>
            </div>

            {/* Accommodations & Meals */}
            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2">Accommodations & Meals</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <i className="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  <span>
                    3 nights 4 star hotel accommodation with breakfast in
                    Kathmandu
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  <span>
                    11 nights of mountain lodges accommodation on full board in
                    the Himalayas
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  <span>14 breakfasts, 11 lunches & 14 dinner</span>
                </li>
              </ul>
            </div>
            {/* <section>
              <h2 className="font-bold  text-lg text-[#d0021b] font-serif mb-3">
                Flights & Transfers
              </h2>
              <div className="flex">
                <i className="fa-regular fa-circle-check text-red-700 text-lg"></i>
                <p className="text-[#4a4a4a] mt-1 text-sm font-mono leading-relaxed mb-8">
                  complimentary arrival, and departure airport transfers by
                  private car | van
                </p>
              </div>
            </section>
            <section>
              <h1 className="font-bold text-lg font-serif text-[#d0021b] mb-4">
                Gears, Guides & Entry Permits
              </h1>
              <p className="text-[#4a4a4a] font-mono text-sm leading-relaxed mb-4">
                {data.data.description}.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-xl font-serif text-[#d0021b] mb-4">
                Accommodations & Meals
              </h3>
              <ul className="text-[#4a4a4a] font-serif text-sm leading-relaxed list-disc list-inside space-y-1">
                <li>
                  <i className="fa-regular fa-circle-check text-red-700 text-lg"></i>
                  Expore Nepal can help you plan and book trips and manage your
                  itineraries
                </li>
                <li>Comfortable transport during the tour.</li>
                <li>include food and hotel.</li>
                <li>Entrance fee.</li>
              </ul>
            </section> */}
          </section>

          {/* Itinerary details */}
          <section
            id="itinerary"
            className="bg-white max-w-5xl mt-4 mx-auto w-full p-8 font-serif relative"
          >
            <div className="absolute top-0 left-0 h-6 w-1.5 bg-[#d0021b]"></div>

            <ul className="space-y-3 text-[#222222] font-serif text-base font-semibold relative z-10">
              {data?.data?.itinerary?.map((item, index) => {
                const isFirst = index === 0;
                const isLast = index === data.data.itinerary.length - 1;

                return (
                  <li key={index} className="relative flex gap-3 items-start">
                    {/* Icon stays in fixed position */}
                    {isFirst && (
                      <div className="relative">
                        <i className="fas fa-map-marker-alt text-[#f26a4b] z-20"></i>
                      </div>
                    )}
                    {!isFirst && !isLast && (
                      <div className="relative -left-[2px]">
                        <i className="far fa-circle text-[#f26a4b] z-20"></i>
                      </div>
                    )}
                    {isLast && (
                      <div className="relative">
                        <i className="fas fa-flag text-[#f26a4b] z-20"></i>
                      </div>
                    )}
                    {/* Timeline vertical line (below icon only, not overlapping) */}
                    {!isLast && (
                      <span className="absolute top-4 left-[5px] w-px h-full bg-[#f26a4b] z-0"></span>
                    )}

                    {/* Text and expanding content stack vertically */}
                    <div key={item._id} className="flex flex-col">
                      <button
                        onClick={() => toggleItem(item._id)}
                        className="text-left focus:outline-none "
                      >
                        <strong>{item.day}:</strong> {item.title}
                      </button>
                      {expanded === item._id && (
                        <p
                          className={`transition-all duration-700 ease-in-out overflow-hidden mt-1 text-xs font-mono text-gray-500 ${
                            expanded === item._id
                              ? "max-h-[1000px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* booking details */}
          <section
            id="cost-includes"
            className="bg-white max-w-5xl mt-4 mx-auto w-full p-8 font-serif relative"
          >
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

          {viewMap && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-10">
              <div className="relative bg-white rounded-lg shadow-lg ">
                <button
                  onClick={() => setViewMap(false)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs z-50"
                >
                  ✕ Close
                </button>
                <div className="max-w-5xl h-[600px]">
                  {mappedItinerary.length > 0 && (
                    <TripMap
                      mapId={`modal-map-route-full"`}
                      myItinerary={mappedItinerary}
                      w="64rem"
                      h="600px"
                    />
                  )}
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
