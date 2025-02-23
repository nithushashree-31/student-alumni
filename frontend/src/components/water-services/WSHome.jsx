import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import ListTable from "../table/ListTable";
import DashboardCard from "./dashboard/Dashboard";
import {
  ApplicationStatusEnum,
  MeterSizeEnum,
  PropertyTypeEnum,
  getStatusClassName,
} from "./utils/constants";

const fetchColumns = async () => {
  try {
    const { data: fields } = await API.get("/fields/list/waterService");

    return fields.map((field) => ({
      title: field.displayName,
      dataIndex: field.name,
      key: field.name,
      dataType: field.dataType,
      render: (value) => renderCellValue(field, value),
    }));
  } catch (error) {
    console.error("Error fetching columns:", error);
    return [];
  }
};

const renderCellValue = (field, value) => {
  if (field.name === "applicationStatus") {
    const statusValue = ApplicationStatusEnum[value] || value;
    return (
      <span className={getStatusClassName(statusValue)}>{statusValue}</span>
    );
  }

  if (field.name === "id") {
    return <Link to={`/app/water-service/${value}/details`}>{value}</Link>;
  }

  if (field.name === "propertyType") {
    return PropertyTypeEnum[value] || value;
  }

  if (field.name === "meterSize") {
    return MeterSizeEnum[value] || value;
  }

  if (field.name === "createdAt" || field.name === "modifiedAt") {
    return new Date(value).toLocaleDateString();
  }

  return value;
};

const WSHomePage = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterString, setFilterString] = useState("{}");
  const [sortConfig, setSortConfig] = useState("{}");
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const fetchDataWithFilters = async (
    filters = "{}",
    sort = "{}",
    page = 1,
    pageSize = 10
  ) => {
    try {
      setLoading(true);
      const { data: waterServiceData } = await API.get("/water-service", {
        params: {
          filter: filters,
          sort,
          page,
          limit: pageSize,
        },
      });

      setData(
        waterServiceData.data.map((item) => ({
          key: item.id,
          ...item,
        }))
      );
      setTotal(waterServiceData.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchColumnsData = async () => {
      setLoading(true);
      const columnsData = await fetchColumns();
      setColumns(columnsData);
      setLoading(false);
    };

    fetchColumnsData();
  }, []);

  useEffect(() => {
    fetchDataWithFilters(
      filterString,
      sortConfig,
      pagination.current,
      pagination.pageSize
    );
  }, [filterString, sortConfig, pagination.current, pagination.pageSize]);

  const handleFilter = (newFilterString) => {
    setFilterString(newFilterString);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleSort = (newSortConfig) => {
    setSortConfig(JSON.stringify(newSortConfig));
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handlePaginationChange = ({ current, pageSize }) => {
    setPagination({ current, pageSize });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <DashboardCard />
      <ListTable
        className="pl-4 pr-4"
        columns={columns}
        data={data}
        loading={loading}
        title="Water Services Applications"
        onFilter={handleFilter}
        onSort={handleSort}
        total={total}
        current={pagination.current}
        pageSize={pagination.pageSize}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default WSHomePage;
