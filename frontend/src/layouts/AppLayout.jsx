import { Avatar, Badge, Button, Layout, Menu, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Notifications from "../components/notifications/Notifications.jsx";
import {
  BusseltonLogo,
  notificationIcon,
  settingsIcon,
  sidebarIcons,
  topbarHamburger,
} from "../constants/icons.js";
import {
  readAllNotifications,
  setNotifications,
  updateNotification,
} from "../redux/slices/notificationsSlice.js";
import socketService from "../services/socketService.js";
import API from "../utils/api.js";
import "./AppLayout.css";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const notificationList = useSelector(
    (state) => state.notifications.notificationList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const unreadNotifications = notificationList.filter(
    (notification) => notification.isRead === false
  );

  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleOpenChange = () => {
    setOpen((prev) => !prev);
  };

  const menuItems = sidebarIcons.map((icon) => {
    return {
      key: icon.place,
      className: selectedKey === icon.place ? "sidebar-icons" : "",
      icon: (
        <img
          src={icon.src}
          alt={icon.alt}
          className={`${selectedKey === icon.place ? "selected-icon" : ""}`}
        />
      ),
      label: icon.alt,
      onClick: () => {
        navigate(icon.route);
      },
    };
  });

  const fetchNotifications = async () => {
    try {
      const response = await API.get(`/notifications/${user.userId}`);
      if (response.status === 200) {
        dispatch(setNotifications({ data: response.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = async (id) => {
    try {
      const response = await API.patch(`/notifications/${id}`);
      if (response.status === 200) {
        dispatch(updateNotification({ id }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearAll = async () => {
    if (unreadNotifications.length > 0) {
      try {
        const response = await API.patch(`/notifications/?readAll=true`);
        if (response.status === 200) {
          dispatch(readAllNotifications());
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    socketService.connect();
    const path = location.pathname.split("/app/")[1]?.split("/")[0] || "home";
    setSelectedKey(path);
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [dispatch]);

  const content = (
    <div className="flex items-center justify-center flex-col">
      <Button
        onClick={() => handleNavigate("/app/profile/edit")}
        className="pop-button"
      >
        Edit Profile
      </Button>
      <Button
        onClick={() => handleNavigate("/app/logout")}
        className="pop-button"
      >
        Logout
      </Button>
    </div>
  );

  return (
    <Layout className="layout fixed-layout">
      <Sider className="sider" trigger={null} collapsible collapsed={collapsed}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="p-[11px] h-[86px] pt-[22px] pb-[22px] pl-[9px] pr-[9px]">
              <img
                className="logo-icon"
                src={BusseltonLogo}
                alt="Busselton Logo"
              />
            </div>

            <hr className="w-full border-b border-[#40ADFF]" />
            <Menu
              className="menu"
              theme="dark"
              mode="inline"
              selectedKeys={[selectedKey]}
              items={menuItems}
            />
          </div>

          <div className="flex flex-col items-center gap-4 justify-center mb-4">
            <div
              className={`w-18 h-10 rounded-md flex items-center justify-center ${
                selectedKey === "settings" ? "active" : ""
              }`}
            >
              <Link to="/app/settings/user-management">
                <img
                  className={`w-7 h-7 ${
                    selectedKey === "settings" ? "selected-icon" : ""
                  }`}
                  src={settingsIcon}
                  alt="Settings Icon"
                />
              </Link>
            </div>
            <div>
              <Popover
                content={content}
                arrow={false}
                trigger="click"
                placement="right"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <Avatar
                  size="large"
                  shape="square"
                  className="mx-auto w-[44px] cursor-pointer"
                  style={{ backgroundColor: "#FFE6E6", color: "#ED0F52" }}
                >
                  L
                </Avatar>
              </Popover>
            </div>
          </div>
        </div>
      </Sider>

      <Layout>
        <Header className="header">
          <div className="flex items-center gap-6">
            <Button
              className="hamburger-button"
              type="text"
              icon={<img className="icon" src={topbarHamburger} />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <h1 className="font-semibold text-xl">Land Developer Portal</h1>
          </div>

          <Popover
            content={
              <Notifications
                handleClear={handleClear}
                unreadNotifications={unreadNotifications}
              />
            }
            title={
              <h1 className="flex items-center justify-between">
                <span>Notifications</span>
                <Button
                  onClick={handleClearAll}
                  className="!text-base !text-[#2C7BE5] !font-medium cursor-pointer max-w-fit"
                >
                  Clear All
                </Button>
              </h1>
            }
            trigger="click"
            open={showNotifications}
            onOpenChange={(open) => setShowNotifications(open)}
            placement="bottomLeft"
            id="notification-popover"
          >
            <div className="flex items-center mr-6 cursor-pointer">
              <Badge count={unreadNotifications.length} overflowCount={9}>
                <img
                  className="w-5"
                  src={notificationIcon}
                  alt="Notification icon"
                />
              </Badge>
            </div>
          </Popover>
        </Header>

        <Content className="bg-[#F7F8F9] content">
          <Outlet />
        </Content>
      </Layout>

      <style scoped>
        {`

          .fixed-layout {
            height: 100vh;
            overflow: hidden;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
          }

          .sidebar-icons {
            width: 28px; 
            height: 28px;
            background-color: #e6f4ff;
          }

          .layout {
            min-height: 100vh;
            background-color: #3691D6; 
          }

          .sider {
            background-color: #3691D6;
          }

          .menu {
            background-color: #3691D6;
          }

          .header {
            height: 86px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px 24px;
            background: #FDFCFB;
            border: 1px solid #FCF8F5;
          }

          .hamburger-button {
                width: 36px !important;
                height: 36px;
                background: #F5F4F3;
                margin-left: 10px;
          }

          .hamburger-button .icon {
            width: 24px;
            height: 24px;
          } 

           .logo-icon {
            background: white;
            padding: 2px;
          }

          .selected-icon {
          filter: invert(1);
          }

          .content {
            height: calc(100vh - 86px);
            overflow: auto;
          }

          .active {
            background-color: #E6F4FF;
          }

          .pop-button{
            justify-content: flex-start;
          }

          #notification-popover {
            max-height:635px;
            width:500px;
            padding:0;
          }

          #notification-popover .ant-popover-title {
            padding:24px;
            font-size:20px;
            margin-bottom:0;
            border-bottom: 1px solid #E6E8F2;
            width:100%;
          }
          
          #notification-popover{
            display:block;
            overflow-y:auto
          }
          `}
      </style>
    </Layout>
  );
};

export default AppLayout;
