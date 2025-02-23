import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordValidator } from "../signup/passwordValidator";
import API from "../../utils/api"; // Import API handler
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      return;
    }

    setIsLoading(true);
    try {
      console.log(user);
      const response = await API.post("/auth/update-password", {email:user.email, password});
      if (response.status === 200) {
        toast.success("Password updated successfully!", {
          pauseOnHover: false,
          autoClose: 2000,
        });
        setPasswordChanged(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        pauseOnHover: false,
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper flex flex-col justify-between h-full max-h-[720px]">
      {!passwordChanged ? (
        <div className="text-left">
          <h1 className="font-bold text-3xl mb-3">Update Your Password</h1>
          <p className="mb-4 font-normal text-lg">
            Enter a new password below to <br/> change your password.
          </p>

          <Form name="updatePassword" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                { required: true, message: ""},
                { validator: (_, value) => passwordValidator(value) },
              ]}
            >
              <Input.Password placeholder="Enter new password" size="large" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match!");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="!bg-[#0E5782] !text-white !border-[#0E5782] hover:!bg-[#0D4572] mt-3"
                disabled={isLoading}
              >
                {isLoading ? <LoadingOutlined /> : "Reset Password"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div className="text-left">
          <h1 className="font-bold text-3xl mb-3">Password Changed!</h1>
          <p className="mb-4 font-normal text-lg">
            Your Password has been <br /> changed successfully.
          </p>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            className="!bg-[#0E5782] !text-white !border-[#0E5782] hover:!bg-[#0D4572] mt-3"
            onClick={() => navigate("/auth/login")}
          >
            Back To Login
          </Button>
        </div>
      )}

      <p>Busselton Water &copy; {new Date().getFullYear()}</p>
    </div>
  );
};

export default UpdatePassword;
