import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";

import { useSelector } from "react-redux";

const editProfile = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [showLabel, setShowLabel] = useState(false); // State to manage the visibility of the label
  console.log(userData);

  // Define a function to handle changes in input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value }); // Update the formData state by spreading the existing formData and updating the value corresponding to the input field's ID
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 6,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 10,
          },
        }
      : null;
  return (
    <div className="flex justify-center h-full">
      <Form
        className="bg-slate-100 rounded-md shadow-md sm:w-[42rem]"
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
        style={{
          maxWidth: formLayout === "inline" ? "none" : 600,
        }}
      >
        <h2 className=" font-bold pt-6 text-xl text-center">Edit Profile</h2>
        <Form.Item name="layout"></Form.Item>
        <Form.Item label="userName" name="userName">
          <Input placeholder={userData?.data?.user?.userName} />
        </Form.Item>
        <Form.Item label="Email" email="email">
          <Input placeholder={userData?.data?.user?.email} />
        </Form.Item>
        <Form.Item label="PhoneNumber" name="PhoneNumber">
          <Input
            placeholder={userData?.data?.user?.phoneNumber}
            value={userData?.data?.user?.phoneNumber}
          />
        </Form.Item>
        <Form.Item label="Avatar" name="avatar">
          <Input placeholder={userData?.data?.user?.phoneNumber} />
        </Form.Item>
        <Form.Item label="cover Image" name="coverImage">
          <Input placeholder={userData?.data?.user?.phoneNumber} />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" className="bg-blue-500">
            Edit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default editProfile;
