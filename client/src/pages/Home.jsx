import React, { useState } from "react";

import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaFire } from "react-icons/fa";

function Home() {
  const { register } = useForm();
  const navigate = useNavigate();

  const images = [
    {
      url: "https://inventpokhara.com/wp-content/uploads/2014/06/pokharacity.jpg",
      text: "must visited palce",
      title: "Pokhara",
    },
    {
      url: "https://t4.ftcdn.net/jpg/01/06/24/19/360_F_106241927_AQ3BRjRscmA0GKoYX4VdxQfQLPREZYfa.jpg",
      text: "chitwan national park",
      title: "Chitwan",
    },
    {
      url: "https://c8.alamy.com/comp/F06ABC/famous-janaki-mandir-goddess-janaki-temple-in-janakpurdhaam-nepal-F06ABC.jpg",
      text: "birthplace of god sita",
      title: "Janakpur",
    },
    {
      url: "https://www.nepaliteatraders.com/cdn/shop/articles/Ilam_Tea_Gardens_1600x.jpg?v=1568132900",
      text: "stunning natural beauty",
      title: "Ilam",
    },
    {
      url: "https://booking-manager-api-hop-nepal.s3.eu-west-1.amazonaws.com/file-manager/page/image-jiri-dolakha-district.jpg",
      text: "switzerland of nepal",
      title: "Jiri",
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
    {
      url: "https://www.adventurealternative.com/media/817072/langtang-valley-trek.jpg?height=1129&width=1082&quality=&mode=Crop&center=0,0&bgcolor=",
      text: "oldest monasteries region",
      title: "Langtang",
    },
    {
      url: "https://walkthroughhimalayas.com/storage/blog_images/FILE-2077507026-20200721094524.jpg",
      text: "world highest lake",
      title: "Tilicho",
    },
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

  return (
    <div className=" w-full mt-[2.7rem]">
      <div className="relative w-full shadow-sm">
        <img
          className="w-full h-[30rem] object-cover shadow-sm"
          src="https://www.andbeyond.com/wp-content/uploads/sites/5/pokhara-valley-nepal.jpg"
          alt=""
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-white text-4xl font-bold font-serif">
            <span className="">T</span>ra
            <span className=" text-blue-950 italic">vel</span> in{" "}
            <span className=" text-green-600">s</span>tyle
          </h2>
          <p className="text-white w-[26rem] text-[14px] italic font-serif">
            Enjoy unique journeys with comfort and trust. Your gateway to
            smarter, safer, and more beautiful travel awaits.
          </p>
          <div className="relative w-w-[22rem] mt-2">
            <Input
              {...register("createtrip", { required: true })}
              placeholder="Search destinations"
              autoComplete="createTrip"
              className=" md:w-[22rem] h-[37px] rounded-xl border-2 border-sky-700 pl-10 pr-8 text-base font-serif text-black"
              onClick={() => navigate("/createtrip")}
            />
            <IoMdSearch className="h-5 w-5 absolute left-4 top-2 text-gray-700" />
          </div>
        </div>
      </div>

      {/* border line */}
      <div className=" border-b w-full pt-6"></div>

      <div className=" w-full md:px-52 bg-white">
        {/* <div className=" pt-4"></div> */}

        {/* Nepal tour package */}
        <div className=" relative pt-4">
          <div className=" flex justify-between px-3 py-1 gap-1">
            <h2 className="font-serif text-xl font-bold">Nepal Tour Package</h2>
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
          <div className=" flex flex-wrap gap-[22px] justify-center pb-8 relative">
            {displayImages.map((image, index) => (
              <div
                key={index}
                className="mt-2 overflow-hidden transition-transform duration-500 ease-in-out cursor-pointer "
                style={{
                  transform: nepalIsSliding
                    ? "translateX(-100%)"
                    : "translateX(0)",
                  opacity: nepalIsSliding ? 0 : 1,
                }}
              >
                <img
                  className="w-[13rem] h-[11.4rem] rounded-xl shadow-md "
                  src={image.url}
                  alt={image.title}
                />
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className=" mt-3 py-1 w-28 flex items-center custom-shape opacity-90">
                    <FaFire className=" text-red-800 font-semibold" />
                    <p className="text-white text-base font-serif pl-2">
                      Offers
                    </p>
                  </div>

                  <div className=" mt-16 text-center z-50 text-white">
                    <p className="font-serif text-[16px]">{image.text}</p>
                    <h2 className="font-serif text-2xl">{image.title}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trekking place */}
        <div className="relative">
          <div className=" flex justify-between px-3 py-1 gap-1">
            <h2 className="font-serif text-xl font-bold">
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

          <div className=" flex flex-wrap gap-[22px] justify-center pb-8 relative">
            {adventureImages.map((image, index) => (
              <div
                key={index}
                className="mt-2 overflow-hidden transition-transform duration-500 ease-in-out cursor-pointer "
                style={{
                  transform: adventureIsSliding
                    ? "translateX(100%)"
                    : "translateX(0)",
                  opacity: adventureIsSliding ? 0 : 1,
                }}
              >
                <img
                  className="w-[13rem] h-[11.4rem] rounded-xl shadow-md "
                  src={image.url}
                  alt={image.title}
                />
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className=" mt-3 py-1 w-28 flex items-center custom-shape">
                    <FaFire className=" text-white font-semibold" />
                    <p className="text-white text-base font-serif pl-2">
                      Trekking
                    </p>
                  </div>

                  <div className=" mt-16 text-center z-50 text-white">
                    <p className="font-serif text-[16px]">{image.text}</p>
                    <h2 className="font-serif text-2xl">{image.title}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className=" pb-4"></div> */}
      </div>
    </div>
  );
}

export default Home;
