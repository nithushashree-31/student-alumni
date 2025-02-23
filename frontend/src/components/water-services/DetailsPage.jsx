import {
  Button,
  Card,
  Checkbox,
  Col,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import selectedTab from "../../assets/selected-tab.svg";
import unselectedTab from "../../assets/unselected-tab.svg";
import API from "../../utils/api";

import {
  ApplicationStatusEnum,
  getStatusClassName,
  MeterSizeEnum,
  PropertyTypeEnum,
} from "./utils/constants";
const { Title } = Typography;

const ReadOnlyField = ({
  label,
  value,
  showCheckbox = false,
  required = true,
}) => (
  <div className="w-full">
    <div className="field-label flex items-center gap-2">
      {showCheckbox && (
        <Checkbox
          checked={!!value}
          className="[&_.ant-checkbox-checked_.ant-checkbox-inner]:bg-blue-500 [&_.ant-checkbox-checked_.ant-checkbox-inner]:border-blue-500 [&_.ant-checkbox-inner:after]:border-white"
        />
      )}
      <span className="pl-1">{label}</span>
      {required && <span className="text-red-500">*</span>}
    </div>
    <div className="field-value w-full">{value || "-"}</div>
  </div>
);

const DetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [activeTab, setActiveTab] = useState("Application Submission");

  const { id } = useParams();
  const tabs = ["Application Submission", "Quote", "Job order", "Closure"];

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/water-service/${id}`);

      if (response.data) {
        setData(response.data);
        if (
          response.data.attachments &&
          Array.isArray(response.data.attachments)
        ) {
          setFileList(response.data.attachments);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch details:", error);
      message.error("Failed to load details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const CenteredSpinner = () => {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large"></Spin>
      </div>
    );
  };

  if (loading) {
    return <CenteredSpinner />;
  }

  const formatAddress = (addressData) => {
    const addressParts = [
      addressData.addressLine1,
      addressData.suburb,
      addressData.postalCode,
      addressData.state,
      addressData.country,
    ];
    return addressParts.filter(Boolean).join(", ");
  };

  return (
    <div className="details-page p-4 space-y-4">
      <style scoped>{`
        .details-page .heading {
          font-weight: 400;
          font-size: 24px;
          line-height: 36px;
        }

        .details-page .normal-text {
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          color: #555555;
        }

        .details-page .field-label {
          color: #666;
          margin-bottom: 8px;
          padding-left: 4px;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
        }

        .details-page .field-value {
          height: 56px;
          background-color: #F7F7F7;
          border: 1px solid #E6E8F2;
          max-width: 260px;
          padding: 16px;
          display: flex;
          align-items: center;
          border-radius: 8px;
        }

        .details-page .top-banner {
          background-color: #EDEDFF;
          margin: -24px;
          margin-bottom: 24px;
          padding: 16px;
          height: 92px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .details-page .attachments-section {
          background-color: #F7F8FF;
          border: 1px solid #E6E8F2;
          border-radius: 8px;
          padding: 16px;
          margin-top: 16px;
        }

        .details-page .address-text {
          color: #656688;
          font-size: 24px;
          margin-top: 8px;
        }

        .details-page .add-comment-btn {
          background-color: #3691D6;
          border-color: #3691D6;
        }

        .details-page .please-note {
          margin-top: 24px;
          margin-bottom: 16px;
        }

        .details-page .yes-indicator {
          margin-left: 20px;
          font-size: 22px;
          font-weight: normal;
          line-height: 33px;
        }
      `}</style>

      {/* Top Info Box */}
      <Card>
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-medium">#{data.id}</div>
            <div
              className={`text-lg font-medium rounded-md ${getStatusClassName(
                ApplicationStatusEnum[data.applicationStatus]
              )}`}
            >
              {ApplicationStatusEnum[data.applicationStatus]}
            </div>
          </div>
          <div className="address-text">{formatAddress(data)}</div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex mt-4 bg-gray-50">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`px-6 py-4 cursor-pointer mx-1 first:ml-0 rounded-t-lg bg-white flex items-center gap-2 ${
              activeTab === tab
                ? "text-black font-medium text-base leading-6 border-b-2 border-blue-600"
                : "text-gray-500 font-normal text-sm leading-[21px]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            <img
              src={activeTab === tab ? selectedTab : unselectedTab}
              alt=""
              className="w-4 h-4"
            />
            {tab}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <Card className="rounded-[8px]">
        <div className="top-banner">
          <Title level={5} className="heading">
            Application Details
          </Title>
          <Button type="primary" className="add-comment-btn">
            Add Comment
          </Button>
        </div>

        {/* Property Type */}
        <ReadOnlyField
          label="Property Type"
          value={PropertyTypeEnum[data.propertyType]}
          required={false}
        />

        {/* Property Details */}
        <Title level={5} className="heading mt-4">
          Property Details
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="Lot no" value={data.lotNo} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="House no" value={data.houseNo} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="ST/RD" value={data.stRd} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField
              label="Nearest Crossroad"
              value={data.nearestCrossroad}
            />
          </Col>
        </Row>

        {/* Owner Details */}
        <Title level={5} className="heading mt-4">
          Owner Details
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={6}>
            <ReadOnlyField label="Name" value={data.ownerName} />
          </Col>
          <Col xs={24} sm={6}>
            <ReadOnlyField label="Tel" value={data.ownerTel} />
          </Col>
        </Row>

        {/* Address */}
        <Title level={5} className="heading mt-4">
          Address
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="Address Line 1" value={data.addressLine1} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="Suburb" value={data.suburb} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="Postal Code" value={data.postalCode} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="State" value={data.state} />
          </Col>
        </Row>
        <Row gutter={[24, 24]} className="mt-4">
          <Col xs={24} sm={12}>
            <ReadOnlyField label="Country" value={data.country} />
          </Col>
        </Row>

        {/* Builder Details */}
        <Title level={5} className="heading mt-4">
          Builder Details
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="Company Name" value={data.companyName} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="Contact" value={data.builderContact} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="Tel" value={data.builderTel} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="Email" value={data.builderEmail} />
          </Col>
        </Row>

        {/* Water Service Details */}
        <Title level={5} className="heading mt-4">
          Water Service Details
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField
              label="LHS No."
              value={data.lhsNo}
              showCheckbox={true}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField
              label="RHS No."
              value={data.rhsNo}
              showCheckbox={true}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField
              label="Meter Size"
              value={MeterSizeEnum[data.meterSize]}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ReadOnlyField label="Flow Rate" value={data.flowRate} />
          </Col>
        </Row>
        <Row gutter={[24, 24]} className="mt-4">
          <Col xs={24} sm={12}>
            <ReadOnlyField
              label="Min Pressure Required"
              value={data.minPressure}
            />
          </Col>
        </Row>

        {/* Please Note */}
        <Title level={5} className="heading mt-4">
          Please Note
        </Title>
        <div className="please-note normal-text">
          Building Plan required for multi residential development. Building
          plan submitted
          <span className="yes-indicator">Yes</span>
        </div>

        {/* Attachments */}
        <div className="attachments-section">
          <Title
            level={5}
            className="heading mb-4 text-[20px] font-medium leading-[28px]"
          >
            Attachments
          </Title>
          {fileList.map((file, index) => (
            <div key={index} className="flex items-center mt-2">
              <span>{file.name}</span>
            </div>
          ))}
          {fileList.length === 0 && <div>No attachments</div>}
        </div>
      </Card>
    </div>
  );
};

export default DetailsPage;
