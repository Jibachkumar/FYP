import React, { useState } from "react";

function Home() {
  const [trip, settrip] = useState("");

  return (
    <div className=" w-full mt-[3rem] overflow-hidden block">
      <div className="relative w-full border-y-[2px] shadow-lg">
        <img
          className=" w-full h-[30rem] object-cover z-30 rounded-sm shadow-sm"
          src="https://panindiatours.com/uploads/home-package/1616113920best-of-nepal-tour2.jpg"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <form>
            <h2 className=" text-white text-[32px] font-semibold mb-[3px]">
              Plan your next{" "}
              <span className="italic text-red-900 font-bold ">journey</span>
            </h2>
            <div className=" h-[2.4rem] flex items-cente bg-white rounded-xl border-[3px] border-sky-600">
              <input
                type="text"
                id="book"
                placeholder="book"
                className=" w-[20rem] rounded-l-xl rounded-r-2xl focus:outline-none shadow-sm"
              />
              <div className=" bg-gray-500 w-[1px] h-[1.5rem] m-[4px]"></div>
              <button
                className=" bg-slate-200 text-black font-semibold px-[10px] py-[2px] rounded-2xl 
                shadow-md mr-[2px] border border-slate-300 hover:scale-105 transform transition duration-200 ease-in-out"
              >
                create
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* border line */}
      <div className="mt-16 border-b border-black-500 w-[80%] mx-auto"></div>

      {/* package tour */}
      <div className=" mt-8 md:w-[77%] h-auto mx-auto">
        <h2 className=" text-[18px] opacity-[0.8] font-semibold font-serif mt-[3.3rem]">
          {" "}
          ADVENTURE PACKAGE
        </h2>
        <div className="md:flex gap-[22px] justify-center">
          <div className="relative mt-5">
            <img
              className=" w-[14rem] h-[12rem] rounded-xl shadow-md "
              src="https://highlightstourism.com/wp-content/uploads/2019/10/tilicho-lake.jpg"
              alt="Adventure"
            />
            <div className="absolute top-0 left-0 w-full h-full text-center pt-[118px]">
              <p className=" font-serif text-sm font-medium text-white">
                centuries-old culture
              </p>
              <h2 className=" mt-[5px] font-serif text-[22px] text-black-950 font-semibold">
                mustang
              </h2>
            </div>
          </div>

          <div className="mt-5">
            <img
              className=" w-[14rem] h-[12rem] rounded-xl shadow-md "
              src="https://www.globaladventuretrekking.com/uploads/img/Rara-Lake.jpg"
              alt="Adventure"
            />
          </div>

          <div className="mt-5">
            <img
              className=" w-[14rem] h-[12rem] rounded-xl shadow-md "
              src="https://th.bing.com/th/id/R.b9b7a4934d1b88a68146f0e5b1716484?rik=IrlhBU3zwWhfNQ&pid=ImgRaw&r=0"
              alt="Adventure"
            />
          </div>

          <div className="mt-5">
            <img
              className=" w-[14rem] h-[12rem] rounded-xl shadow-md "
              src="https://highlightstourism.com/wp-content/uploads/2019/10/tilicho-lake.jpg"
              alt="Adventure"
            />
          </div>
          <div className="mt-5">
            <img
              className=" w-[14rem] h-[12rem] rounded-xl shadow-md "
              src="https://highlightstourism.com/wp-content/uploads/2019/10/tilicho-lake.jpg"
              alt="Adventure"
            />
          </div>
        </div>
      </div>

      {/* Famouse place */}
      <div className=" mt-8 w-[77%] h-auto mx-auto">
        <h2 className=" text-[18px] opacity-[0.8] font-semibold font-serif mt-[5rem]">
          {" "}
          MOST VISITED PLACES
        </h2>
        <div className="flex gap-[22px] justify-center ">
          <div className="relative mt-5 ">
            <img
              className=" w-[14rem] h-[12rem] rounded-xl shadow-md "
              src="https://highlightstourism.com/wp-content/uploads/2019/10/tilicho-lake.jpg"
              alt="Adventure"
            />
            <div className="absolute top-0 left-0 w-full h-full text-center pt-[118px]">
              <p className=" font-serif text-sm font-medium text-white">
                centuries-old culture
              </p>
              <h2 className=" mt-[5px] font-serif text-[22px] text-black-950 font-semibold">
                mustang
              </h2>
            </div>
          </div>

          <div className="mt-5">
            <img
              className=" w-[14rem] h-[12rem] rounded-xl shadow-md "
              src="https://www.globaladventuretrekking.com/uploads/img/Rara-Lake.jpg"
              alt="Adventure"
            />
          </div>

          <div className="mt-5">
            <img
              className=" w-[14rem] h-[12rem] rounded-xl shadow-md "
              src="https://th.bing.com/th/id/R.b9b7a4934d1b88a68146f0e5b1716484?rik=IrlhBU3zwWhfNQ&pid=ImgRaw&r=0"
              alt="Adventure"
            />
          </div>

          <div className="mt-5">
            <img
              className=" w-[14rem] h-[12rem] rounded-xl shadow-md "
              src="https://highlightstourism.com/wp-content/uploads/2019/10/tilicho-lake.jpg"
              alt="Adventure"
            />
          </div>
          <div className="mt-5">
            <img
              className=" w-[14rem] h-[12rem] rounded-xl shadow-md "
              src="https://highlightstourism.com/wp-content/uploads/2019/10/tilicho-lake.jpg"
              alt="Adventure"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
