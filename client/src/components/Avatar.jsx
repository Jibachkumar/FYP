import React from "react";
import { useNavigate } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";

import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function AvatarProfile() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const items = [
    {
      label: "Profile",
      key: "1",
      slug: "/profile",
    },
    // {
    //   label: "Trip",
    //   key: "2",
    //   slug: "/trip",
    // },
    // {
    //   label: "Rating",
    //   key: "3",
    //   slug: "/rating",
    // },
    {
      label: "Logout",
      key: "4",
    },
  ];

  const onClick = ({ key }) => {
    if (key === "4") {
      dispatch(logout());
    } else {
      // Find the item with the matching key
      const selectedItem = items.find((item) => item.key === key);

      // Navigate using the slug property of the selected item
      if (selectedItem) {
        navigate(selectedItem.slug);
      }
    }
  };

  return (
    <div>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
      >
        <div onClick={(e) => e.preventDefault()}>
          <Space>
            <Space>
              <Avatar icon={<UserOutlined />} />
            </Space>
            <DownOutlined />
          </Space>
        </div>
      </Dropdown>
    </div>
  );
}

export default AvatarProfile;
