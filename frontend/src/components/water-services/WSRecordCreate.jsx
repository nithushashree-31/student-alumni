import { Button, Form, Input, Radio, Select, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const PropertyTypeEnum = {
  MULTI_RESIDENTIAL: "Multi-Residential",
  NON_RESIDENTIAL: "Non-Residential",
};

const WSRecordCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        propertyType:
          values.propertyType === "Multi-Residential"
            ? "MULTI_RESIDENTIAL"
            : "NON_RESIDENTIAL",
        flowRate: parseFloat(values.flowRate),
        minPressureRequired: parseFloat(values.minPressureRequired),
        applicationStatus: "APPLICATION_SUBMITTED",
        buildingPlanSubmitted: values.buildingPlan || false,
      };

      const response = await API.post("/water-service", formattedValues);
      const recordId = response.data.id;
      message.success("Water service application submitted successfully");
      navigate(`/app/water-service/${recordId}/details`);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to submit water service application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-[#EDEDFF] rounded-tl-lg rounded-tr-lg flex justify-between h-[92px] p-6 items-center">
        <p className="text-2xl font-medium">
          Multi-Residential & Non-Residential
        </p>
        <div className="">
          <Button
            type="primary"
            style={{ width: 200, height: 44, fontWeight: 500 }}
            onClick={() => form.submit()}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="mx-auto bg-white p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            propertyType: "Multi-Residential",
          }}
        >
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Property Type</h2>
            <Form.Item
              name="propertyType"
              rules={[
                {
                  validator: (_, value) => {
                    if (
                      value === "Multi-Residential" ||
                      value === "Non-Residential"
                    ) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Please enter property type");
                    }
                  },
                },
                { required: true, message: "Please enter property type" },
              ]}
            >
              <Radio.Group>
                <Radio value="Multi-Residential">Multi-Residential</Radio>
                <Radio value="Non-Residential">Non-Residential</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Property Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <Form.Item
                label="Lot no"
                name="lotNo"
                rules={[{ required: true, message: "Please enter lot number" }]}
              >
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item
                label="House no"
                name="houseNo"
                rules={[
                  { required: true, message: "Please enter house number" },
                ]}
              >
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item
                label="ST/RD"
                name="street"
                rules={[{ required: true, message: "Please enter street" }]}
              >
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item
                label="Nearest Crossroad"
                name="nearestCrossroad"
                rules={[
                  {
                    required: true,
                    message: "Please enter nearest crossroad",
                  },
                ]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Owner Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <Form.Item
                label="Name"
                name="ownerName"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item
                label="Tel"
                name="ownerTel"
                rules={[{ required: true, message: "Please enter telephone" }]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Address</h2>
            <div className="grid grid-cols-2 gap-6">
              <Form.Item
                label="Address Line 1"
                name="addressLine1"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input maxLength={200} />
              </Form.Item>
              <Form.Item
                label="Suburb"
                name="suburb"
                rules={[{ required: true, message: "Please enter suburb" }]}
              >
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={[
                  { required: true, message: "Please enter postal code" },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "Please enter state" }]}
              >
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please enter country" }]}
              >
                <Input maxLength={50} />
              </Form.Item>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Builder Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <Form.Item
                label="Company Name"
                name="builderCompanyName"
                rules={[
                  { required: true, message: "Please enter company name" },
                ]}
              >
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item
                label="Contact"
                name="builderContact"
                rules={[{ required: true, message: "Please enter contact" }]}
              >
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item
                label="Tel"
                name="builderTel"
                rules={[{ required: true, message: "Please enter telephone" }]}
              >
                <Input maxLength={20} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="builderEmail"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" },
                ]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Water Service Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <Form.Item
                label="LHS No."
                name="lhsNo"
                rules={[{ required: true, message: "Please enter LHS number" }]}
              >
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item
                label="RHS No."
                name="rhsNo"
                rules={[{ required: true, message: "Please enter RHS number" }]}
              >
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item
                label="Meter Size"
                name="meterSize"
                rules={[
                  { required: true, message: "Please select meter size" },
                ]}
              >
                <Select>
                  <Select.Option value="SIZE_20MM">20mm</Select.Option>
                  <Select.Option value="SIZE_25MM">25mm</Select.Option>
                  <Select.Option value="SIZE_40MM">40mm</Select.Option>
                  <Select.Option value="SIZE_50MM">50mm</Select.Option>
                  <Select.Option value="SIZE_80MM">80mm</Select.Option>
                  <Select.Option value="SIZE_100MM">100mm</Select.Option>
                  <Select.Option value="SIZE_150MM">150mm</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Flow Rate"
                name="flowRate"
                rules={[
                  { required: true, message: "Please enter flow rate" },
                  {
                    type: "number",
                    transform: (value) => parseFloat(value),
                    message: "Please enter valid number",
                  },
                ]}
              >
                <Input suffix="m/s" type="number" step="0.1" />
              </Form.Item>
              <Form.Item
                label="Min Pressure Required"
                name="minPressureRequired"
                rules={[
                  {
                    required: true,
                    message: "Please enter minimum pressure",
                  },
                  {
                    type: "number",
                    transform: (value) => parseFloat(value),
                    message: "Please enter valid number",
                  },
                ]}
              >
                <Input suffix="PSI" type="number" step="0.1" />
              </Form.Item>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Please Note</h2>
            <Form.Item
              name="buildingPlanSubmitted"
              label="Building Plan required for multi residential development. Building plan submitted"
            >
              <Radio.Group>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </Form>
      </div>
      <style scoped>
        {`
          .ant-form-item:last-child {
            margin-top: 0px;
          }
        `}
      </style>
    </div>
  );
};

export default WSRecordCreate;
