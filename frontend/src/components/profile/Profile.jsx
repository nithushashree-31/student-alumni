import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { backArrow } from "../../constants/icons";
import { passwordValidator } from "../signup/passwordValidator";

const Profile = () => {
  const [form] = Form.useForm();

  const handleProfileSubmit = () => {
    console.log("Hello i'm from form");
  };

  return (
    <>
      <div className="p-4 flex flex-col gap-4">
        <div className="bg-white flex py-7 rounded-[10px] pl-5 pr-5">
          <div className="flex gap-4 items-center">
            <button>
              <img src={backArrow} alt="Back arrow" />
            </button>
            <h1 className="font-semibold text-xl">Profile</h1>
          </div>
        </div>

        <div className="bg-white rounded-[10px] p-4">
          <Form
            name="profile"
            form={form}
            initialValues={{ remember: true }}
            layout="vertical"
            className="text-left"
            onFinish={handleProfileSubmit}
          >
            <Row gutter={16}>
              <Col span={7}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please input your first name" },
                  ]}
                >
                  <Input size="large" placeholder="Enter First Name" />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your last name" },
                  ]}
                >
                  <Input size="large" placeholder="Enter Last Name" />
                </Form.Item>
              </Col>
            </Row>

            <Col span={7}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email" },
                  {
                    type: "email",
                    message: "Please input a valid email address",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Email" />
              </Form.Item>
            </Col>

            <Col span={7}>
              <Form.Item
                label="Business Number"
                name="busninessNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your business number",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Business Number" />
              </Form.Item>
            </Col>

            <Col span={7}>
              <Form.Item
                label="Telephone Number"
                name="telephoneNumber"
                className="mt-2"
                rules={[
                  {
                    message: "Please input your telephone number",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Telephone Number" />
              </Form.Item>
            </Col>

            <Row gutter={16}>
              <Col span={7}>
                <Form.Item
                  label="Current Password"
                  name="password"
                  rules={[
                    {
                      validator: (_, value) =>
                        passwordValidator(value, form.getFieldValue("email")),
                    },
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter Current Password"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    {
                      validator: (_, value) =>
                        passwordValidator(value, form.getFieldValue("email")),
                    },
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter New Password"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[
                    {
                      validator: (_, value) =>
                        passwordValidator(value, form.getFieldValue("email")),
                    },
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter Confirm Password"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={7}>
                <Form.Item>
                  <Button className="profile-cancel-btn" size="large" block>
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    size="large"
                    block
                    className="!bg-[#3691D6] !text-white !border-[#3691D6] hover:!bg-[#0D4572]"
                  >
                    Update
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <style scoped>
          {`

        .profile-cancel-btn {
            color: #0E5782;
            border: 1px solid #0E5782 !important;
        }
          `}
        </style>
      </div>
    </>
  );
};

export default Profile;
