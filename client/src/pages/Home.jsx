import { useState } from "react";
import Input from "../components/Input";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import { getTrip } from "../store/tripSlice.js";
import { useDispatch } from "react-redux";
import { useTripData } from "../components/hooks/useTripData";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tripData } = useTripData();
  console.log(tripData);

  const images = [
    {
      url: "https://t4.ftcdn.net/jpg/01/06/24/19/360_F_106241927_AQ3BRjRscmA0GKoYX4VdxQfQLPREZYfa.jpg",
      text: "chitwan national park",
      title: "Classic",
      name: "Chitwan",
    },
    {
      url: "https://c8.alamy.com/comp/F06ABC/famous-janaki-mandir-goddess-janaki-temple-in-janakpurdhaam-nepal-F06ABC.jpg",
      text: "birthplace of god sita",
      title: "Family",
      name: "Janakpur",
    },
    {
      url: "https://booking-manager-api-hop-nepal.s3.eu-west-1.amazonaws.com/file-manager/page/image-jiri-dolakha-district.jpg",
      text: "switzerland of nepal",
      title: "Adventure",
      name: "Jiri",
    },
    {
      url: "https://visiteverestnepal.com/wp-content/uploads/2022/10/Pathibhara-Temple-768x576.jpg",
      text: "Hindu and Limbu pilgrims",
      title: "Pathivara",
    },
    {
      url: "https://worldexpeditions.com/croppedImages/Indian-Sub-Continent/Nepal/LachlanGardiner_WestNepal_2019_DSLR01_HIGHRES-9781-988225-500px.jpg",
      text: "text for image 2",
      title: "title for image 2",
    },
  ];
  const adventurepic = [
    // {
    //   url: "https://www.adventurealternative.com/media/817072/langtang-valley-trek.jpg?height=1129&width=1082&quality=&mode=Crop&center=0,0&bgcolor=",
    //   text: "oldest monasteries region",
    //   title: "Langtang",
    // },
    // {
    //   url: "https://walkthroughhimalayas.com/storage/blog_images/FILE-2077507026-20200721094524.jpg",
    //   text: "world highest lake",
    //   title: "Tilicho",
    // },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnaZuiBAHQJvszq153lUZbFMGjGkXpoyv25g&s",
      text: "centuries-old culture",
      title: " Mustang",
    },
    {
      url: "https://assets.zeezest.com/blogs/PROD_Kanchenjunga%20banner_1687672795844.png",
      text: "numerous flora and fauna",
      title: "kanchenjunga",
    },
    {
      url: "https://www.tripsavvy.com/thmb/WVg26IxyCIsl0kVkAIy0TCNMajI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/suspension-bridge-in-manaslu-circuit-trekking-route--himalaya-mountains-range-in-nepal-1225727807-6e2a6ef2101e44d386312359f660d853.jpg",
      text: "eighth highest peak",
      title: "manaslu",
    },
    {
      url: "https://content.r9cdn.net/rimg/dimg/b5/83/6bb3ed36-city-53364-16a6dfa3bab.jpg?width=1366&height=768&xhint=2459&yhint=1271&crop=true",
      text: "Everest Base Camp trek",
      title: "Lukla",
    },
    {
      url: "https://www.altitudehimalaya.com/media/files/Blog/Adventures/Gosaikunda-trekking.jpg",
      text: " Langtang National Park",
      title: "Gosaikunda",
    },
  ];

  const initialDisplayCount = 5; // Initial number of images to display

  // State variables for Nepal Tour Package
  const [nepalCurrentImageIndex, setNepalCurrentImageIndex] = useState(0);
  const [nepalIsSliding, setNepalIsSliding] = useState(false);

  // State variables for Adventure Destinations
  const [adventureCurrentImageIndex, setAdventureCurrentImageIndex] =
    useState(0);
  const [adventureIsSliding, setAdventureIsSliding] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Function to handle next action for Nepal Tour Package
  const nepalHandleNext = () => {
    if (!nepalIsSliding) {
      setNepalIsSliding(true);
      setNepalCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setNepalIsSliding(false), 80); // Set a timeout to reset sliding after transition duration
    }
  };

  // Function to handle previous action for Nepal Tour Package
  const nepalHandlePrev = () => {
    if (!nepalIsSliding) {
      setNepalIsSliding(true);
      setNepalCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setTimeout(() => setNepalIsSliding(false), 80); // Set a timeout to reset sliding after transition duration
    }
  };

  // Function to handle next action for Adventure Destinations
  const adventureHandleNext = () => {
    if (!adventureIsSliding) {
      setAdventureIsSliding(true);
      setAdventureCurrentImageIndex((prevIndex) =>
        prevIndex === adventurepic.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setAdventureIsSliding(false), 80); // Set a timeout to reset sliding after transition duration
    }
  };

  // Function to handle previous action for Adventure Destinations
  const adventureHandlePrev = () => {
    if (!adventureIsSliding) {
      setAdventureIsSliding(true);
      setAdventureCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? adventurepic.length - 1 : prevIndex - 1
      );
      setTimeout(() => setAdventureIsSliding(false), 80); // Set a timeout to reset sliding after transition duration
    }
  };

  // Slice images based on current index for Nepal Tour Package
  const displayImages = images.slice(
    nepalCurrentImageIndex,
    nepalCurrentImageIndex + initialDisplayCount
  );

  // Slice images based on current index for Adventure Destinations
  const adventureImages = adventurepic.slice(
    adventureCurrentImageIndex,
    adventureCurrentImageIndex + initialDisplayCount
  );

  const handleDestinationSearch = async (name) => {
    try {
      if (!name) return;
      const response = await fetch(
        "http://localhost:7000/api/v1/users/alltrip"
      );

      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }

      const data = await response.json();

      const matchDestination = data.data.find(
        (place) => place.name === name.toLowerCase()
      );
      if (matchDestination) {
        dispatch(getTrip(matchDestination));
        navigate("/createtrip");
      } else {
        dispatch(getTrip("Sorry did not match destination name"));
        navigate("/createtrip");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" w-full mt-[2.7rem]">
      {/* 1st section */}
      <div className="relative w-full bg-slate-700">
        {/* <!-- Image --> */}
        <div className="w-full h-full">
          <img
            className="w-full h-[36rem] object-cover"
            src="https://www.andbeyond.com/wp-content/uploads/sites/5/pokhara-valley-nepal.jpg"
            alt=""
          />
        </div>

        {/* <!-- Centered content --> */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
          <h2 className="text-white text-4xl font-bold font-serif">
            <span>T</span>ra
            <span className="text-blue-950 italic">vel</span> in{" "}
            <span className="text-green-600">s</span>tyle
          </h2>
          <p className="text-white w-[26rem] text-[14px] italic font-serif">
            Enjoy unique journeys with comfort and trust. Your gateway to
            smarter, safer, and more beautiful travel awaits.
          </p>
          <div className="relative w-[25rem] mt-2 flex items-center rounded-full overflow-hidden border border-slate-50  bg-white">
            <Input
              placeholder="Search destinations"
              className="flex-grow text-black px-5 py-[5px] placeholder-gray-400 focus:ring-0 focus:outline-none"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              onClick={() => handleDestinationSearch(searchInput)}
              className="h-full px-3 ml-[6.5rem] bg-[#FE5D26] hover:bg-gray-900 text-white flex items-center justify-center"
            >
              <IoMdSearch className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/*  2nd section  */}
      {/* bg-[#f9f7f0] */}
      <div className="bg-slate-50">
        <h1
          className="text-5xl font-extrabold text-gray-800 text-center pt-4"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Places to go
        </h1>
        <h2 className="text-center font-mono font-bold text-xl">
          Nepal Tourism center
        </h2>
        <div className="relative top-3 left-0 h-[20rem] flex justify-between items-center">
          <div className=" relative text-black -top-[35px] z-10 pl-[13rem] font-serif">
            <h1
              className=" font-extrabold text-5xl text-indigo-950 pl-2"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              WAYS TO <span className=" text-red-950">TRAVEL</span>
            </h1>
            <p className=" font-semibold text-indigo-950 italic text-md">
              We offer you authentic ways to travel with us Classical
              <br />
              Adventures, Real Adventures, or Luxury Adventures!
            </p>
            <Link to={"/trip"}>
              <button
                className="px-5 py-2 mt-3 text-xl font-serif font-semibold sm:text-base text-yellow-800 border border-yellow-400 rounded-md hover:outline-none hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                type="button"
              >
                SEE ALL TRIPS
              </button>
            </Link>
          </div>

          <div className="absolute flex top-0 gap-2 z-10 ml-auto right-16">
            {images.slice(0, 3).map((img) => (
              <div
                key={img.title}
                className="relative w-[15rem] h-[15rem] overflow-hidden"
              >
                <img
                  className="w-full h-full rounded-full shadow-sm object-cover transition-transform duration-1000 ease-in-out hover:scale-150 cursor-pointer"
                  src={img.url}
                  alt={img.title}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
                  <h2 className=" relative top-14 font-serif text-3xl ">
                    {img.title}
                  </h2>
                </div>
                ;
              </div>
            ))}
          </div>
        </div>

        {/* <div className="bg-[#123458] relative -top-24 font-serif ml-auto lg:right-[150px] z-10 text-white p-8 max-w-[600px]">
          <h1 className="font-extrabold text-xl leading-tight mb-4">
            Customize your Trip and book trip package
          </h1>
          <p className="text-base leading-relaxed mb-6">
            Create new core memories with the family this summer in Nepal.{" "}
            <br />
            Redeem our offer today!
          </p>
          <button
            className="bg-white text-[#1a1a1a] font-semibold rounded-full px-6 py-2 inline-flex items-center space-x-2 shadow-md hover:shadow-lg transition-shadow"
            type="button"
          >
            <span>Find out more</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div> */}

        {/* Policy writing  */}
        <div className=" relative -top-16 z-10">
          <h1 className=" text-center font-serif font-bold text-xl text-indigo-950 pl-2">
            A blog with travel inspiration
          </h1>
          <p className=" text-center font-mono font-semibold">
            Take a look here for inspiring information to optimally prepare for{" "}
            <br />
            your trip, to make your trip more sustainable or to add some special{" "}
            <br />
            elements to your trip.
          </p>

          <div className=" relative max-w-7xl  mx-auto font-serif">
            <div className="absolute mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* <!-- Card Template --> */}
              <div className="group relative bg-white rounded-xl p-6  overflow-hidden cursor-pointer">
                <div className="relative z-10 space-y-3">
                  <h2 className="text-[#2c3e50] text-xl font-bold">
                    Equipment And Safety
                  </h2>
                  <p className="text-[#7f7f7f] text-sm sm:text-base leading-relaxed">
                    We provide high-quality equipment for tents, foam
                    mattresses, remote and high-altitude areas—all essential for
                    porters & staff.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0 bg-[#0047b3] rounded-b-xl transition-all duration-700 group-hover:h-full z-0"></div>
              </div>

              {/* <!-- Transportation --> */}
              <div className="group relative bg-white rounded-xl p-6 overflow-hidden cursor-pointer">
                <div className="relative z-10 space-y-3">
                  <h2 className="font-playfair text-[#2c3e50] text-lg sm:text-xl font-bold">
                    Transportation
                  </h2>
                  <p className="text-[#7f7f7f] text-sm sm:text-base leading-relaxed">
                    Our guides will escort you to all destinations. Trips
                    outside the Kathmandu Valley use large buses or Toyota Land
                    Cruisers.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0 bg-[#0047b3] rounded-b-xl transition-all duration-700 group-hover:h-full z-0"></div>
              </div>

              {/* <!-- Staff --> */}
              <div className="group relative bg-white rounded-xl p-6  overflow-hidden cursor-pointer">
                <div className="relative z-10 space-y-3">
                  <h2 className="font-playfair text-[#2c3e50] text-lg sm:text-xl font-bold">
                    Staff
                  </h2>
                  <p className="text-[#7f7f7f] text-sm sm:text-base leading-relaxed">
                    Our staff (Guides, Sherpas, cooks) are trained and certified
                    by Nepal's Ministry of Tourism and Civil Aviation.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0 bg-[#0047b3] rounded-b-xl transition-all duration-700 group-hover:h-full z-0"></div>
              </div>

              {/* <!-- Price & Guarantee --> */}
              <div className="group relative bg-white rounded-xl p-6  overflow-hidden cursor-pointer">
                <div className="relative z-10 space-y-3">
                  <h2 className="font-playfair text-[#2c3e50] text-lg sm:text-xl font-bold">
                    Price &amp; Guarantee
                  </h2>
                  <p className="text-[#7f7f7f] text-sm sm:text-base leading-relaxed">
                    Our motto is client satisfaction. We offer fair pricing with
                    professional-grade services and full transparency.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0 bg-[#0047b3] rounded-b-xl transition-all duration-700 group-hover:h-full z-0"></div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Large yellow circle top left --> */}
        <div className="relative -top-[25rem] left-28 w-40 h-40 rounded-full bg-[#e6a600] "></div>

        {/* <!-- Large green circle bottom right --> */}
        <div className="relative -top-[25rem] -right-[34rem] w-40 h-40 rounded-full bg-[#3adba1]"></div>
      </div>

      {/* 3rd section */}
      <div className=" w-full md:px-52 bg-white">
        {/* Nepal tour package */}
        <div className=" relative pt-4">
          <div className=" flex justify-between px-3 py-1 gap-1">
            <h2 className="font-serif text-black text-xl font-bold">
              Nepal Tour Package
            </h2>
            <div className=" w-16 h-6 text-center">
              {nepalCurrentImageIndex !== 0 && (
                <button
                  onClick={nepalHandlePrev}
                  className=" rounded-md px-1 pb-1 font-medium text-2xl opacity-60 shadow-sm bg-stone-100 focus:outline-none"
                >
                  &lt;
                </button>
              )}
              {nepalCurrentImageIndex !==
                images.length - initialDisplayCount && (
                <button
                  onClick={nepalHandleNext}
                  className="rounded-md font-medium text-2xl opacity-60 shadow-sm px-1 pb-1 bg-stone-100  focus:outline-none"
                >
                  &gt;
                </button>
              )}
            </div>
          </div>

          <div className="relative flex flex-wrap gap-[22px] justify-center pb-8">
            {tripData
              .filter((item) => item.type === "classic")
              .map((image, index) => (
                <div
                  key={index}
                  className="relative mt-2 w-[13rem] h-[11.4rem] overflow-hidden rounded-xl shadow-md cursor-pointer group"
                  onClick={() => navigate(`/trip/${image._id}`)}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover rounded-xl transition-transform duration-1000 ease-in-out group-hover:scale-150"
                      src={image.images[0].url}
                      alt={image.name}
                    />
                  </div>

                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="mt-3 py-1 w-28 flex items-center custom-shape opacity-90">
                      <FaFire className="text-red-800 font-semibold" />
                      <p className="text-white text-base font-serif pl-2">
                        Offers
                      </p>
                    </div>

                    <div className="mt-16 text-center z-50 text-white">
                      {/* <p className="font-serif text-[16px]">{image.text}</p> */}
                      <h2 className="font-serif text-2xl">{image.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Trekking place */}
        <div className="relative">
          <div className=" flex justify-between px-3 py-1 gap-1">
            <h2 className="font-serif text-black text-xl font-bold">
              Adventure Destinations
            </h2>
            <div className=" w-16 h-6 text-center">
              {adventureCurrentImageIndex !== 0 && (
                <button
                  onClick={adventureHandlePrev}
                  className="rounded-md px-1 pb-1 font-medium text-2xl opacity-60 shadow-sm bg-stone-100 focus:outline-none"
                >
                  &lt;
                </button>
              )}
              {adventureCurrentImageIndex !==
                adventurepic.length - initialDisplayCount && (
                <button
                  onClick={adventureHandleNext}
                  className="rounded-md px-1 pb-1 font-medium text-2xl opacity-60 shadow-sm bg-stone-100 focus:outline-none"
                >
                  &gt;
                </button>
              )}
            </div>
          </div>

          <div className="relative flex flex-wrap gap-[22px] justify-center pb-8">
            {tripData
              .filter((item) => item.type === "adventure")
              .map((image, index) => (
                <div
                  key={index}
                  className="relative mt-2 w-[13rem] h-[11.4rem] overflow-hidden rounded-xl shadow-md cursor-pointer group"
                  onClick={() => navigate(`/trip/${image._id}`)}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover rounded-xl transition-transform duration-1000 ease-in-out group-hover:scale-150"
                      src={image.images[0].url}
                      alt={image.name}
                    />
                  </div>

                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="mt-3 py-1 w-28 flex items-center custom-shape opacity-90">
                      <FaFire className="text-red-800 font-semibold" />
                      <p className="text-white text-base font-serif pl-2">
                        Treeking
                      </p>
                    </div>

                    <div className="mt-16 text-center z-50 text-white">
                      {/* <p className="font-serif text-[16px]">{image.text}</p> */}
                      <h2 className="font-serif text-2xl">{image.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
