import Input from "./Input";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { login as authLogin } from "../store/authSlice.js";
import { useDispatch } from "react-redux";

const editProfile = ({ userData, onEditSuccess }) => {
  console.log(userData);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const changeProfile = async (data) => {
    console.log(data);
    try {
      const { email, userName, phoneNumber } = data;
      if (!email || !userName || !phoneNumber)
        throw new Error("empty email or password !");

      const response = await fetch("/api/v1/users/editprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          userName,
          phoneNumber,
        }),
      });
      console.log("response: ", response);

      if (!response.ok) {
        throw new Error(`Login in Error ${response.status}!`);
      }

      const user = await response.json();

      if (user) {
        dispatch(authLogin(user));
        toast.success(user.message);
        onEditSuccess();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center h-full bg-gray-100 shadow-lg p-5 relative -top-[16rem]">
      <form onSubmit={handleSubmit(changeProfile)}>
        <h2 className=" font-bold pb-5 text-xl font-serif text-green-900 text-center">
          Edit Profile
        </h2>
        <Input
          {...register("userName", { required: true })}
          label="Full Name : "
          placeholder={userData?.data?.user?.userName}
          autoComplete="name"
          className="md:ml-8 md:w-[20rem] border  p-[4px]"
        />

        <Input
          {...register("phoneNumber", { required: true })}
          label="phone-number:"
          placeholder={userData?.data?.user?.phoneNumber}
          className="md:ml-1 md:w-[20rem] border  p-[4px]"
        />

        <Input
          {...register("email", {
            required: true,
          })}
          label="Email : "
          placeholder={userData?.data?.user?.email}
          type="email"
          autoComplete="email"
          className="md:ml-[68px] md:w-[20rem] border  p-[4px]"
        />
        <div className=" text-center mt-8 mb-4">
          <button
            type="submit"
            className=" bg-sky-900 w-[20rem] md:w-[25rem] py-[6px] rounded-2xl shadow-md text-white font-semibold font-sans hover:scale-105 transform transition duration-200 ease-in-out"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};
export default editProfile;
