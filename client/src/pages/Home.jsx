import React, { useState } from "react";

function Home() {
  const [trip, settrip] = useState("");

  return (
    <div className=" max-w-auto h-auto">
      {/* trip plan section */}
      <div className=" bg-slate-900 h-[40rem] overflow-hidden">
        <form className="pt-[18rem] ">
          <div className="pl-[6rem] mb-2 md:pl-[38.5%]">
            <label
              className=" text-lg from-neutral-400 italic mb-2 text-white"
              htmlFor=""
            >
              Plan your next Destination
            </label>
          </div>
          <div className="sm:flex items-center justify-center">
            <input
              className="w-[24rem] h-[3rem] shadow appearance-none border rounded-lg  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="destination"
              type="text"
              placeholder="Destination"
            ></input>
            <button className="bg-white hover:bg-slate-200 text-black font-bold py-3 px-8 rounded-3xl focus:outline-none focus:shadow-outline">
              Create
            </button>
          </div>
        </form>
      </div>

      {/* trip section */}
    </div>
  );
}

export default Home;
