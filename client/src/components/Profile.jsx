import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

import EditProfile from "./editprofile";

export default function Profile() {
  // const [formData, setFormData] = useState({});
  // const [updateSuccess, setUpdateSuccess] = useState(false);
  // const { loading, setLoading } = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Track whether the user is currently editing the profile
  //const { currentUser, loading, error } = useSelector((state) => state.user); // Select relevant state from Redux store
  const userData = useSelector((state) => state.auth.userData);

  //console.log(userData);
  if (userData && userData.data && userData.data.user) {
    console.log(userData.data.user);
  } else {
    console.log(
      "userData, userData.data, or userData.data.user is null or undefined"
    );
  }

  // Function to handle changes in input fields. Updates formData object with new field values
  const dispatch = useDispatch(); // Initialize useDispatch hook to dispatch actions

  const handleEditProfile = () => {
    setIsEditing(true); // Set isEditing state to true when the "Edit Profile" button is clicked
  };

  // Render the component
  return (
    <div className="w-full">
      <div className=" w-full h-[15rem] bg-slate-700 relative">
        {" "}
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Add Cover photo
        </h1>
      </div>
      <div className=" w-full h-[15rem] flex justify-center items-center bg-slate-50">
        <div className="bg-white h-52 absolute w-[85%] top-[13rem] z-40 rounded-sm shadow-sm ">
          <div className="md:max-w-7xl sm:max-w-xl max-w-md pl-16 py-8 flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
                  </Space>
                </Space>
              </div>
              <button
                className="p-1 rounded-md border border-slate-200"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            </div>
            {isEditing ? (
              <EditProfile />
            ) : (
              <div className="block py-3">
                <h2 className=" font-semibold">
                  full Name: {userData?.data?.user?.userName}
                </h2>
                <h2 className="font-semibold">
                  Email: {userData?.data?.user?.email}
                </h2>
                <h2 className="font-semibold">
                  Phone Number: {userData?.data?.user?.phoneNumber}
                </h2>
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
