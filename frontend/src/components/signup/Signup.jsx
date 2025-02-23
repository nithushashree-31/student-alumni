import { LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../utils/api";
import { passwordValidator } from "./passwordValidator";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSignup = async (value) => {
    try {
      setIsLoading(true);
      const response = await API.post("/auth/signup", {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password,
        role: "ADMIN"
      });
      if (response.status === 201) {
        toast.success("Signed up successfully!", {
          pauseOnHover: false,
          autoClose: 2000,
        });

        navigate("/auth/login");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        pauseOnHover: false,
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="wrapper flex flex-col justify-between h-full max-h-[720px]">
        <div>
          <h1 className="font-bold text-2xl mb-3">Hello,</h1>
          <p className="mb-4 font-normal">Sign up to your account</p>

          <Form
            name="signup"
            form={form}
            initialValues={{ remember: true }}
            layout="vertical"
            className="text-left"
            onFinish={handleSignup}
          >
            {/* First Name & Last Name on the Same Line */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter First Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}
                >
                  <Input size="large" placeholder="Enter Last Name" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please input a valid email address!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  validator: (_, value) =>
                    passwordValidator(value, form.getFieldValue("email")),
                },
              ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                size="large"
                block
                className="!bg-[#0E5782] !text-white !border-[#0E5782] hover:!bg-[#0D4572] mt-3"
              >
                {isLoading ? <LoadingOutlined /> : "Sign Up"}
              </Button>
            </Form.Item>

            <div className="my-5 text-center text-[16px]">
              <p>
                Already have an account?{" "}
                <Link className="!text-black font-bold" to="/auth/login">
                  Login
                </Link>
              </p>
              <div className="flex justify-center text-center">
                <Form.Item
                  name="terms"
                  valuePropName="checked"
                  rules={[
                    {
                      required: true,
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(
                            "You must agree to the terms and conditions!"
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <div className="w-full max-w-92 text-left mt-4 font-semibold text-base">
                    <Checkbox name="terms">
                      I have read and agree to Busselton Water's{" "}<br />
                      <Link className="!text-[#0E5782] !underline">
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link className="!text-[#0E5782] !underline">
                        Privacy Statement
                      </Link>
                    </Checkbox>
                  </div>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>

        <p>Busselton Water &copy; {new Date().getFullYear()}</p>
      </div>
      <style scoped>
        {`
               .ant-checkbox-wrapper{
                margin:0 auto;
               } 
                .ant-checkbox+span{
                    padding-inline-start:15px;
                    font-size:16px;
                }
        `}
      </style>
    </>
  );
};

export default Signup;
