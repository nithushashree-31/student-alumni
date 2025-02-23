import { CloseOutlined } from "@ant-design/icons";
import { Avatar, Button, Empty, List } from "antd";
import { formatDistanceToNowStrict } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";

const Notifications = ({ handleClear, unreadNotifications }) => {
  const notifications = useSelector(
    (state) => state.notifications.notificationList
  );
  if (unreadNotifications.length === 0) {
    return (
      <Empty
        styles={{ image: { height: 60 } }}
        className="py-4"
        description="No new notifications"
      />
    );
  }
  return (
    <List
      className="!p-5 !pt-0"
      itemLayout="horizontal"
      dataSource={notifications}
      renderItem={(item) => {
        if (!item.isRead) {
          const getFormattedTime = (createdAt) => {
            const strictString = formatDistanceToNowStrict(new Date(createdAt));
            const [countStr, unit] = strictString.split(" ");
            const count = parseInt(countStr, 10);
            let formattedUnit = unit;

            if (unit.startsWith("minute")) {
              formattedUnit = count === 1 ? "minute" : "mins";
            } else if (unit.startsWith("hour")) {
              formattedUnit = count === 1 ? "hour" : "hours";
            } else if (unit.startsWith("day")) {
              formattedUnit = count === 1 ? "day" : "days";
            } else if (unit.startsWith("week")) {
              formattedUnit = count === 1 ? "week" : "weeks";
            }
            return `${count} ${formattedUnit} ago`;
          };

          return (
            <List.Item>
              <div className="notification-item w-full flex gap-4 items-center justify-evenly">
                <Avatar
                  size="large"
                  style={{ backgroundColor: "#9FD4ED", color: "#0E5782" }}
                >
                  {item.sender.firstName.charAt(0)}
                </Avatar>
                <div className="notification-content w-60 leading-[24]">
                  <h1 className="text-base font-medium">New Info Form</h1>
                  <p className="text-base text-[#999999]">{item.message}</p>
                </div>
                <span className="text-[#666666]">
                  {getFormattedTime(item.createdAt)}
                </span>
                <Button
                  className="max-w-fit"
                  onClick={() => handleClear(item.id)}
                >
                  <CloseOutlined />
                </Button>
              </div>
            </List.Item>
          );
        }
      }}
    />
  );
};

export default Notifications;
