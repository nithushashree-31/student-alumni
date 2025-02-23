import React, { useState } from "react";
import { Popover, Select, Button, Input, Space, DatePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import filterIcon from "../../assets/filter-icon.svg";
import {
  PropertyTypeEnum,
  ApplicationStatusEnum,
  MeterSizeEnum,
} from "../water-services/utils/constants";

const FilterDropdown = ({ columns, onFilter, activeFilters = [] }) => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filters, setFilters] = useState(activeFilters);

  const getFilterInput = () => {
    const selectedField = columns.find((col) => col.key === selectedColumn);
    if (!selectedField) return null;

    switch (selectedField.dataType?.toLowerCase()) {
      case "date":
        return (
          <DatePicker
            onChange={(date) => setFilterValue(date ? date.toISOString() : "")}
            className="w-full"
          />
        );

      case "number":
      case "float":
      case "int":
        return (
          <Input
            type="number"
            placeholder="Enter numeric value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        );

      case "boolean":
        return (
          <Select
            value={filterValue}
            onChange={(value) => setFilterValue(value)}
            className="w-full"
          >
            <Select.Option value="true">Yes</Select.Option>
            <Select.Option value="false">No</Select.Option>
          </Select>
        );

      case "enum":
        if (selectedField.key === "propertyType") {
          return (
            <Select
              value={filterValue}
              onChange={(value) => setFilterValue(value)}
              placeholder="Select property type"
              className="w-full"
            >
              {Object.entries(PropertyTypeEnum).map(([key, value]) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          );
        } else if (selectedField.key === "applicationStatus") {
          return (
            <Select
              value={filterValue}
              onChange={(value) => setFilterValue(value)}
              placeholder="Select status"
              className="w-full"
            >
              {Object.entries(ApplicationStatusEnum).map(([key, value]) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          );
        } else if (selectedField.key === "meterSize") {
          return (
            <Select
              value={filterValue}
              onChange={(value) => setFilterValue(value)}
              placeholder="Select meter size"
              className="w-full"
            >
              {Object.entries(MeterSizeEnum).map(([key, value]) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          );
        }
        return null;

      default:
        return (
          <Input
            placeholder="Enter filter value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        );
    }
  };

  const getDisplayValue = (field, value) => {
    switch (field) {
      case "propertyType":
        return PropertyTypeEnum[value] || value;
      case "applicationStatus":
        return ApplicationStatusEnum[value] || value;
      case "meterSize":
        return MeterSizeEnum[value] || value;
      default:
        return value;
    }
  };

  const handleAddFilter = () => {
    if (!selectedColumn || !filterValue) return;

    const newFilter = {
      field: selectedColumn,
      value: filterValue,
    };

    const updatedFilters = [...filters, newFilter];
    setFilters(updatedFilters);

    // Convert filters to API format
    const filterObject = updatedFilters.reduce(
      (acc, filter) => ({
        ...acc,
        [filter.field]: filter.value,
      }),
      {}
    );

    onFilter(filterObject);

    // Reset inputs
    setSelectedColumn("");
    setFilterValue("");
  };

  const removeFilter = (indexToRemove) => {
    const updatedFilters = filters.filter(
      (_, index) => index !== indexToRemove
    );
    setFilters(updatedFilters);

    const filterObject = updatedFilters.reduce(
      (acc, filter) => ({
        ...acc,
        [filter.field]: filter.value,
      }),
      {}
    );

    onFilter(filterObject);
  };

  const content = (
    <div className="w-80">
      <div className="space-y-4">
        {/* Active Filters */}
        {filters.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Active Filters</h3>
            <Space direction="vertical" className="w-full">
              {filters.map((filter, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded w-full"
                >
                  <span className="text-sm">
                    {columns.find((col) => col.key === filter.field)?.title}:{" "}
                    {getDisplayValue(filter.field, filter.value)}
                  </span>
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => removeFilter(index)}
                    size="small"
                  />
                </div>
              ))}
            </Space>
          </div>
        )}

        {/* Add New Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Select Filter</h3>
          <Space direction="vertical" className="w-full">
            <Select
              value={selectedColumn}
              onChange={(value) => {
                setSelectedColumn(value);
                setFilterValue(""); // Reset filter value when column changes
              }}
              placeholder="Select column"
              className="w-full"
            >
              {columns.map((column) => (
                <Select.Option key={column.key} value={column.key}>
                  {column.title}
                </Select.Option>
              ))}
            </Select>

            {getFilterInput()}

            <Button
              type="primary"
              onClick={handleAddFilter}
              disabled={!selectedColumn || !filterValue}
              block
            >
              Add Filter
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottomRight"
      overlayClassName="filter-dropdown-overlay"
    >
      <Button
        icon={
          filters.length > 0 ? (
            <div className="relative">
              <img src={filterIcon} alt="Filter Icon" className="filter-icon" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {filters.length}
              </span>
            </div>
          ) : (
            <img src={filterIcon} alt="Filter Icon" className="filter-icon" />
          )
        }
        className={`filter-button ${
          filters.length > 0 ? "border-blue-500 text-blue-500" : ""
        }`}
      />
    </Popover>
  );
};

export default FilterDropdown;
