const InfiniteLooper = ({ speed = 5000 }) => {
  const description = [
    "About Nepal, unique blend of adventure, cultural richness, and natural beauty",
    "Where to Go, Explore Mountains, Himalayas, delve into ancient cities, and experience vibrant culture.",
    "When is the best time to visit?, best time to visit is during spring and autumn ",
  ];

  return (
    <div className="w-full overflow-hidden pt-14">
      <div className="absolute flex justify-center items-center">
        <section
          className="flex animate-swipe"
          style={{ animation: `swipe ${speed}ms linear infinite` }}
        >
          {description.map(function (des, i) {
            if (i === 0)
              return (
                <div className="p-4" key={i}>
                  <div
                    className="relative top-0 left-0 py-3 px-5 w-[20rem] bg-blue-500 text-white font-bold flex items-center justify-center"
                    style={{
                      clipPath: "polygon(0 20%, 100% 0, 100% 80%, 0% 100%)",
                    }}
                  >
                    <p htmlFor={i} className=" text-white">
                      {" "}
                      {des}{" "}
                    </p>
                  </div>
                </div>
              );
            if (i === 1)
              return (
                <div className="p-4 " key={i}>
                  <div
                    className="relative top-0 left-0 w-[30rem] py-3 px-5 bg-orange-700 text-white flex items-center justify-center"
                    style={{
                      clipPath:
                        "polygon(0 50%, 25% 0, 70% 35%, 40% 0, 80% 10%, 90% 80%, 75% 100%, 50% 90%, 25% 100%, 0 90%)",
                    }}
                  >
                    <p htmlFor={i} className=" text-white">
                      {" "}
                      {des}{" "}
                    </p>
                  </div>
                </div>
              );
            if (i === description.length - 1)
              return (
                <div className="p-4" key={i}>
                  <div
                    className="relative top-0 left-0 w-[25rem] py-3 px-5 bg-lime-900 text-white flex items-center justify-center "
                    style={{
                      clipPath:
                        "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%, 0% 50%)",
                    }}
                  >
                    <p htmlFor={i} className=" text-white">
                      {" "}
                      {des}{" "}
                    </p>
                  </div>
                </div>
              );
          })}
        </section>
      </div>
      <style>
        {`
          @keyframes swipe {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export { InfiniteLooper };
