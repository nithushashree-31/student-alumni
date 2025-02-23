import { LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userIcon from "../../assets/user-icon.png";
import { loginUser } from "../../redux/slices/authSlice";
import API from "../../utils/api";
import "./Login.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCredentialsCorrect, setIsCredentialsCorrect] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [counter, setCounter] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setFormData(data);
    try {
      setIsLoading(true);
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
        toast.success(response.data.message, {
          pauseOnHover: false,
          autoClose: 2000,
        });
        dispatch(loginUser({ user: response.data.user }));
        navigate("/app", {
          replace: true,
        });
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        pauseOnHover: false,
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitOtp = async (otp) => {
    try {
      setIsLoading(true);
      const response = await API.post("/auth/validate-otp?from=login", {
        email: formData.email,
        otp: Number(otp),
      });
      if (response.status === 200) {
        toast.success(response.data.message, {
          pauseOnHover: false,
          autoClose: 2000,
        });
        dispatch(loginUser({ user: response.data.user }));
        navigate("/app", {
          replace: true,
        });
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        pauseOnHover: false,
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = () => {
    handleLogin(formData);
  };

  const startCountdown = () => {
    setCounter(10);
    setIsCounting(true);
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsCounting(false);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };
  return (
    <>
      <div className="wrapper flex flex-col justify-between h-full max-h-[720px]">
        <div>
          <h1 className="font-bold text-2xl mb-3">Hello,</h1>
          <p className="mb-4 font-normal">Login to your account</p>

          <Form
            name="login"
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            className="text-left"
            onFinish={handleLogin}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please input a valid email address!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Email"
                suffix={<img src={userIcon} />}
                readOnly={isCredentialsCorrect}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter Password"
                size="large"
                readOnly={isCredentialsCorrect}
              />
            </Form.Item>

            {!isCredentialsCorrect ? (
              <>
                <Link
                  to="/auth/forgot-password"
                  className="block text-right !text-black font-medium"
                >
                  Forgot Password?
                </Link>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    size="large"
                    block
                    className="!bg-[#0E5782] mt-3 !text-white !border-[#0E5782] hover:!bg-[#0D4572]"
                  >
                    {isLoading ? <LoadingOutlined /> : "Login"}
                  </Button>
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  label="OTP"
                  name="otp"
                  rules={[
                    {
                      required: true,
                      message: "Please input your OTP!",
                    },
                  ]}
                >
                  <Input.OTP length={6} autoFocus onChange={submitOtp} />
                </Form.Item>
                <Button
                  size="large"
                  block
                  className={` !text-white mt-4 !border-none ${
                    isCounting
                      ? "!bg-[#0e5882ad]"
                      : "!bg-[#0E5782] hover:!bg-[#0D4572]"
                  }`}
                  onClick={resendOtp}
                  disabled={isCounting}
                >
                  {isLoading ? (
                    <LoadingOutlined />
                  ) : isCounting ? (
                    `Resend OTP in ${counter}s`
                  ) : (
                    "Resend OTP"
                  )}
                </Button>
              </>
            )}
            <div className={`${isCredentialsCorrect ? "hidden" : ""} mt-10`}>
              <p className="text-base text-center">
                Don't have an account?{" "}
                <Link className="!text-black font-bold" to="/auth/signup">
                  Signup
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
                  <div className="w-full max-w-92 text-left mt-4 font-semibold !text-base">
                    <Checkbox name="terms" className="">
                      I have read and agree to Busselton Water's <br />
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

export default Login;
