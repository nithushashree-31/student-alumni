  import React from "react";
  import group from "../../../assets/Group.svg";

  const DashboardCard = ({ pendingItems = 0 }) => {
    return (
      <div className="h-[240px] rounded-lg border border-gray-200 bg-[#E5F4FF]">
        <div className="flex items-center justify-between h-full">
          <div className="flex flex-col p-12.5">
            <span className="text-[80px] font-normal text-black leading-[112px]">
              {pendingItems}
            </span>
            <span className="text-black font-normal text-[24px] leading-[36px]">
              Pending on me
            </span>
          </div>

          <div className="flex items-center justify-center h-[240px]">
            <img
              src={group}
              alt="Dashboard illustration"
              className="opacity-80 h-full object-contain"
            />
          </div>
        </div>
      </div>
    );
  };

  export default DashboardCard;
