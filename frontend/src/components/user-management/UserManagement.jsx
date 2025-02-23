import { Button, Select, Switch, Tabs } from "antd";
import { useEffect, useState } from "react";
import { backArrow, editPenIcon } from "../../constants/icons";
import API from "../../utils/api";
import ListTable from "../table/ListTable";
import { RoleMap } from "../water-services/utils/constants";
import "./UserManagement.css";

const UserManagement = () => {
  const [switchLoading, setSwitchLoading] = useState({});
  const [loading, setLoading] = useState(true);
  const [busseltonUsers, setBusseltonUsers] = useState([]);
  const [landDevelopers, setLandDevelopers] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("BUSSELTON_USER");

  const handleStatusChange = async (checked, userId) => {
    try {
      setSwitchLoading((prev) => ({ ...prev, [userId]: true }));

      await API.patch(`/user/status/${userId}`, {
        isActive: checked,
      });

      setBusseltonUsers((prevData) =>
        prevData.map((user) =>
          user.userId === userId ? { ...user, isActive: checked } : user
        )
      );
      setLandDevelopers((prevData) =>
        prevData.map((user) =>
          user.userId === userId ? { ...user, isActive: checked } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);

      setBusseltonUsers((prevData) =>
        prevData.map((user) =>
          user.userId === userId ? { ...user, isActive: !checked } : user
        )
      );
      setLandDevelopers((prevData) =>
        prevData.map((user) =>
          user.userId === userId ? { ...user, isActive: !checked } : user
        )
      );
    } finally {
      setSwitchLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const roleColors = {
    ADMIN: { label: "Admin", bgColor: "bg-[#3691D6]" },
    DSP: { label: "DSP", bgColor: "bg-[#AE36D6]" },
    MAP: { label: "Manager Assets and Planning", bgColor: "bg-[#D69B36]" },
    DTL: { label: "Distribution Team Leader", bgColor: "bg-[#D63673]" },
    FINANCE: { label: "Finance", bgColor: "bg-[#16B0CC]" },
    CUSTOMER_SERVICE: { label: "Customer Service", bgColor: "bg-[#365ED6]" },
    OPERATIONS_TEAM: { label: "Operation Team", bgColor: "bg-[#4E36D6]" },
    LAND_DEVELOPER: { label: "Land Developer", bgColor: "bg-[#31B700]" },
  };

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (_, row) => (
        <div>
          <div className="text-xl font-semibold">
            {row.firstName} {row.lastName}
          </div>
          <div className="text-[#6C6C6C]">{row.email}</div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        const roleData = roleColors[role] || {
          label: role,
          bgColor: "bg-black",
        };
        return (
          <span className={`${roleData.bgColor} px-3 py-1 text-white rounded`}>
            {roleData.label}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={(checked) => handleStatusChange(checked, record.userId)}
          loading={switchLoading[record.userId]}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-10">
          <Button icon={<img src={editPenIcon} />} type="link">
            Edit Profile
          </Button>
          <Button type="text">Reset Password</Button>
        </div>
      ),
    },
  ];

  const handleTabChange = async (activeKey) => {
    setLoading(true);
    try {
      let data;
      setActiveTabKey(activeKey);
      if (activeKey === "BUSSELTON_USER") {
        data = await fetchBusseltonUsers();
        setBusseltonUsers(data);
      } else {
        data = await fetchUsers({ role: "LAND_DEVELOPER" });
        setLandDevelopers(data);
      }
    } catch (error) {
      console.error("Error switching tabs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBusseltonUsers = async () => {
    try {
      const { data: userData } = await API.get("/user/busselton");
      return userData.map((item) => ({
        key: item.userId,
        ...item,
      }));
    } catch (error) {
      console.error("Error fetching Busselton users", error);
      return [];
    }
  };

  const fetchUsers = async (filters = {}) => {
    try {
      let endpoint = "/user";
      if (Object.keys(filters).length > 0) {
        const encodedFilters = encodeURIComponent(JSON.stringify(filters));
        endpoint = `/user?filters=${encodedFilters}`;
      }
      const { data: userData } = await API.get(endpoint);
      return userData.map((item) => ({
        key: item.userId,
        ...item,
      }));
    } catch (error) {
      console.error("Error fetching data", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const busseltonData = await fetchBusseltonUsers();
        setBusseltonUsers(busseltonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const items = [
    {
      key: "BUSSELTON_USER",
      label: "Busselton User",
      children: (
        <ListTable
          data={busseltonUsers}
          columns={columns}
          loading={loading}
          rowClassName={(record) => (!record.isActive ? "inactive-row" : "")}
        />
      ),
    },
    {
      key: "LAND_DEVELOPER",
      label: "Land Developer",
      children: (
        <ListTable
          data={landDevelopers}
          columns={columns}
          loading={loading}
          rowClassName={(record) => (!record.isActive ? "inactive-row" : "")}
        />
      ),
    },
  ];

  return (
    <>
      <div className="p-4">
        <div className="bg-white flex items-center justify-between py-7 rounded-[10px] pl-5 pr-5">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 items-center">
              <button>
                <img src={backArrow} alt="Back arrow" />
              </button>
              <h1 className="font-semibold text-xl">User Management</h1>
            </div>
          </div>

          <div className="flex gap-4">
            {activeTabKey === "BUSSELTON_USER" && (
              <Select
                defaultValue={"ADMIN"}
                className="w-54"
                options={Object.keys(RoleMap)
                  .filter((key) => key !== "LAND_DEVELOPER")
                  .map(function (key) {
                    return {
                      value: key,
                      label: RoleMap[key],
                    };
                  })}
              ></Select>
            )}
            <Button
              className="!rounded-sm w-32 !font-semibold !bg-[#3691D6]"
              type="primary"
            >
              Add User
            </Button>
          </div>
        </div>

        <div className="bg-white mt-4 px-2 rounded-[10px]">
          <Tabs
            defaultActiveKey="BUSSELTON_USER"
            onChange={handleTabChange}
            indicator={{ size: (origin) => origin - 60, align: "start" }}
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default UserManagement;
