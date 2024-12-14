// import React, { useState } from "react";
// import { IoMdSearch } from "react-icons/io";
// import { useForm } from "react-hook-form";
// import Input from "../components/Input";
// import { useDispatch } from "react-redux";
// import { trip as tripSlice } from "../store/tripSlice";
// import { useNavigate } from "react-router-dom";

// function CreateTrip() {
//   const { register, handleSubmit, getValues, setValue, watch } = useForm();
//   const [currentInputIndex, setCurrentInputIndex] = useState(0);

//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const inputFields = [
//     {
//       name: "destination",
//       placeholder: "Enter places where you wanna go",
//       type: "text",
//       label: "What destination would be your favorite to visit next?",
//     },
//     {
//       name: "startDate",
//       placeholder: "Enter Start Date",
//       type: "date",
//       label: "Choose when you want to travel",
//     },
//     {
//       name: "duration",
//       placeholder: "Enter Duration",
//       type: "text",
//       label: "what is the duration of your trip",
//     },
//     {
//       name: "people",
//       placeholder: "Enter Number of People",
//       type: "text",
//       label: "who will be on this trip with you?",
//     },
//     {
//       name: "activity",
//       placeholder: "Enter Activity",
//       type: "text",
//       label: "activity",
//     },
//   ];

//   const createTrip = async (data, e) => {
//     e.preventdefault();

//     setCurrentInputIndex((prevIndex) => {
//       // Check if the next index will be equal to the length of inputFields array
//       if (prevIndex === inputFields.length - 1) {
//         console.log("Loop stopped at the last input field");
//         return;
//       }
//       return prevIndex + 1;
//     });
//     // setCurrentInputIndex((prevIndex) => {
//     //   return prevIndex === inputFields.length - 1 ? 0 : prevIndex + 1;
//     // });

//     // if (currentInputIndex === inputFields.length - 1) {
//     //   console.log("Loop stopped at the last input field");
//     //   return;
//     // }

//     console.log(data);
//     e.target.reset();
//     try {
//       const tripData = await fetch("/api/v1/users/trip", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...data,
//         }),
//       });

//       if (tripData.ok) throw new Error(`log in Error ${tripData.status}!`);

//       const createdTrip = tripData.json();

//       console.log(createdTrip);
//       console.log(createdTrip.message);

//       if (createTrip) {
//         dispatch(tripSlice(createTrip));
//         navigate("/tripcontent");
//       }
//     } catch (Error) {
//       console.log(Error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(createTrip)}>
//         <div className=" flex items-center bg-white rounded-xl border-[3px]">
//           <div>
//             <Input
//               {...register(inputFields[currentInputIndex].name, {
//                 required: true,
//               })}
//               type={inputFields[currentInputIndex].type}
//               placeholder={inputFields[currentInputIndex].placeholder}
//               autoComplete={inputFields[currentInputIndex].name}
//               className="w-[2rem] h-[2.5rem] bg-white  focus:outline-none pl-10 text-base font-serif text-black"
//             />
//           </div>
//           <div className=" flex items-center">
//             {" "}
//             <IoMdSearch
//               className="h-5 w-5 absolute left-3 text-gray-700" // Position the search icon to the right
//               alt="Search Icon"
//             />
//             <div className=" bg-gray-500 w-[1px] h-[1.5rem] m-[4px]"></div>
//             <button
//               type="submit"
//               className=" bg-slate-200 text-black font-semibold px-[10px] py-[2px] rounded-2xl
//                 shadow-md mr-[2px] border border-slate-300 hover:scale-105 transform transition duration-200 ease-in-out"
//             >
//               create
//             </button>
//           </div>
//         </div>
//         {/* {showInputField === false && (
//           <div className="flex items-center bg-white rounded-xl border-[3px]">
//             <div>
//               <Input
//                 {...register(inputFields[currentInputIndex].name, {
//                   required: true,
//                 })}
//                 placeholder="Search destinations"
//                 autoComplete="destination"
//                 className="w-[2rem] h-[2.5rem] bg-white  focus:outline-none pl-10 text-base font-serif text-black"
//               />
//             </div>
//             <div className=" flex items-center">
//               {" "}
//               <IoMdSearch
//                 className="h-5 w-5 absolute left-3 text-gray-700" // Position the search icon to the right
//                 alt="Search Icon"
//               />
//               <div className=" bg-gray-500 w-[1px] h-[1.5rem] m-[4px]"></div>
//               <button
//                 type="submit"
//                 className=" bg-slate-200 text-black font-semibold px-[10px] py-[2px] rounded-2xl
//                 shadow-md mr-[2px] border border-slate-300 hover:scale-105 transform transition duration-200 ease-in-out"
//               >
//                 create
//               </button>
//             </div>
//           </div>
//         )}
//         {showInputField && (
//           <div>
//             {inputFields[currentInputIndex].name === "startDate" && (
//               <Input
//                 {...register(inputFields[currentInputIndex].name, {
//                   required: true,
//                 })}
//                 placeholder="start date"
//                 type="text"
//                 className="w-[2rem] h-[2.5rem] bg-white  focus:outline-none pl-10 text-base font-serif text-black"
//               />
//             )}

//             {inputFields[currentInputIndex].name === "endDate" && (
//               <Input
//                 {...register(inputFields[currentInputIndex].name, {
//                   required: true,
//                 })}
//                 placeholder="end date"
//                 type="text"
//                 autoComplete="end date"
//                 className="w-[2rem] h-[2.5rem] bg-white  focus:outline-none pl-10 text-base font-serif text-black"
//               />
//             )}

//             {inputFields[currentInputIndex].name === "duration" && (
//               <Input
//                 {...register(inputFields[currentInputIndex].name, {
//                   required: true,
//                 })}
//                 placeholder="duration"
//                 type="text"
//                 autoComplete="duration"
//                 className="w-[2rem] h-[2.5rem] bg-white  focus:outline-none pl-10 text-base font-serif text-black"
//               />
//             )}
//           </div>
//         )} */}
//       </form>
//     </div>
//   );
// }

// export default CreateTrip;
