import React, { useState } from "react";

function Home() {
  const [trip, settrip] = useState("");

  return (
    <div className=" mt-[3.8rem] overflow-hidden">
      <div className="relative">
        <img
          className=" w-full h-[30.5rem] object-cover z-30"
          src="https://panindiatours.com/uploads/home-package/1616113920best-of-nepal-tour2.jpg"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <h2 className=" text-white text-lg">hello</h2>
          <form action="" className="">
            <input type="text" className=" w-[20rem] h-[2rem] rounded-2xl " />
            <button>create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
