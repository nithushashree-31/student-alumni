import { LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { toast } from "react-toastify";
import { setUserEmail } from "../../redux/slices/authSlice";
import UpdatePassword from "../update-password/UpdatePassword";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [counter, setCounter] = useState(60);
  const [formData, setFormData] = useState({});
  const [isCounting, setIsCounting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGenerateOtp = async (email) => {
    try {
      setFormData(email);
      setIsLoading(true);
      const response = await API.post("auth/forgot-password", email);
      if (response.status === 200) {
        console.log(response);
        setIsOtpSent(true);
        toast.success("OTP sent successfully!", {
          pauseOnHover: false,
          autoClose: 2000,
        });
        startCountdown();
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

  const submitOtp = async (otp) => {
    try {
      setIsLoading(true);
      const response = await API.post("/auth/validate-otp?from=forgot-password", {
        email: formData.email,
        otp: Number(otp),
      });
      if (response.status === 200) {
        dispatch(setUserEmail({value:{email:formData.email}}));
        toast.success(response.data.message, {
          pauseOnHover: false,
          autoClose: 2000,
        });
        // console.log(response);
        setIsOtpVerified(true);
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

  const resendOtp = () => {
    handleGenerateOtp(formData);
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

  if(isOtpVerified){
    return <UpdatePassword />
  }

  return (
    <div className="wrapper flex flex-col justify-between min-h-full max-h-[720px]">
      <div className="text-left">
        <h1 className="font-bold text-3xl mb-3">Forgot your password?</h1>
        {!isOtpSent ? (
          <p className="mb-4 font-normal text-lg">
            Follow the steps to reset the password
          </p>
        ) : (
          <p className="mb-4 font-normal text-lg">
            Enter the code we just sent to{" "} <br />
            <span className="font-semibold">{formData.email}</span>
          </p>
        )}

        <Form
          name="forgot-password"
          initialValues={{ remember: true }}
          layout="vertical"
          className="text-left"
          onFinish={handleGenerateOtp}
        >
          <Form.Item
            label="Mail Id"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Please input a valid email address!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter Details" readOnly={isOtpSent} />
          </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                size="large"
                block
                disabled={isOtpSent}
                className={` !text-white mt-4 !border-none ${
                  isOtpSent
                    ? "!bg-[#0e5882ad]"
                    : "!bg-[#0E5782] hover:!bg-[#0D4572]"
                }`}
              >
                {isLoading && !isOtpSent ? <LoadingOutlined /> : "Generate OTP"}
              </Button>
            </Form.Item>
        </Form>

        {isOtpSent ? (
          <Form layout="vertical">
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
              <Input.OTP
                length={6}
                autoFocus
                onChange={submitOtp}
                className="mt-5"
              />
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
          </Form>
        ) : (
          ""
        )}
        <p className="text-center mt-7">
          Back to{" "}
          <Link to="/auth/login" className="font-semibold">
            Login
          </Link>
        </p>
      </div>

      <p>Busselton Water &copy; {new Date().getFullYear()}</p>
    </div>
  );
};

export default ForgotPassword;
