export const PropertyTypeEnum = {
  MULTI_RESIDENTIAL: "Multi Residential",
  NON_RESIDENTIAL: "Non Residential",
};

export const ApplicationStatusEnum = {
  APPLICATION_UNDER_REVIEW: "Application Under Review",
  APPLICATION_SUBMITTED: "Application Submitted",
};

export const RoleMap = {
  ADMIN: "Admin",
  DSP: "DSP",
  MAP: "Map",
  DTL: "DTL",
  FINANCE: "Financial",
  CUSTOMER_SERVICE: "Customer Service",
  OPERATIONS_TEAM: "Operations Team",
  LAND_DEVELOPER: "Land Developer",
};

export const MeterSizeEnum = {
  SIZE_20MM: "20mm",
  SIZE_25MM: "25mm",
  SIZE_40MM: "40mm",
  SIZE_50MM: "50mm",
  SIZE_80MM: "80mm",
  SIZE_100MM: "100mm",
  SIZE_150MM: "150mm",
};

export const getStatusClassName = (statusValue) => {
  return `px-3 py-1 text-sm ${
    statusValue === "Application Under Review"
      ? "bg-yellow-100 text-yellow-800"
      : statusValue === "Application Submitted"
      ? "bg-green-100 text-green-800"
      : statusValue === "Application Rejected"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800"
  }`;
};