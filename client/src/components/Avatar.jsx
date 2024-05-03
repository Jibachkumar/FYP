import React from "react";
import { useNavigate } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";

function AvatarProfile() {
  const navigate = useNavigate();

  const items = [
    {
      label: "Profile",
      key: "1",
      slug: "/profile",
    },
    {
      label: "Trip",
      key: "2",
      slug: "/",
    },
    {
      label: "Rating",
      key: "3",
      slug: "/rating",
    },
    {
      label: "Logout",
      key: "4",
      slug: "/logout",
    },
  ];

  const onClick = ({ key }) => {
    // Find the item with the matching key
    const selectedItem = items.find((item) => item.key === key);

    // Navigate using the slug property of the selected item
    if (selectedItem) {
      navigate(selectedItem.slug);
    } else {
      message.info(`Item with key ${key} not found`);
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
