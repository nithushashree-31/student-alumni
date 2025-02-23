import { Button, Table } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import plusIcon from "../../assets/plus-icon.svg";
import CustomPagination from "./CustomPagination";
import FilterDropdown from "./FilterDropdown";
import "./ListTable.css";
import SearchInput from "./SearchInput";
import SortDropdown from "./SortDropdown";

const ListTable = ({
  data,
  columns,
  loading,
  title,
  className,
  rowClassName,
  onFilter,
  onSort,
  total,
  onPaginationChange,
  current,
  pageSize,
}) => {
  const [filterObject, setFilterObject] = useState({});

  const handleFilter = (filterObject) => {
    setFilterObject(filterObject);
    const filterString = JSON.stringify(filterObject);
    onFilter(filterString);
  };

  const handleSort = (sortObject) => {
    onSort(sortObject);
  };
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/app/water-service/create");
  };

  const handleSearch = (searchFilterString) => {
    const searchFilter = JSON.parse(searchFilterString);
    const combinedFilter = {
      ...filterObject,
      ...searchFilter,
    };
    onFilter(JSON.stringify(combinedFilter));
  };

  return (
    <>
      <div className={`bg-white rounded-[8px] ${className}`}>
        {title && (
          <div className="p-4 pl-0 pr-0">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium leading-9">{title}</h2>

              <div className="flex items-center gap-6">
                <SearchInput onSearch={handleSearch} />
                <FilterDropdown columns={columns} onFilter={handleFilter} />
                <SortDropdown columns={columns} onSort={handleSort} />

                <Button
                  type="primary"
                  icon={
                    <img src={plusIcon} alt="Plus Icon" className="plus-icon" />
                  }
                  className="add-button"
                  onClick={handleAddClick}
                />
              </div>
            </div>
          </div>
        )}

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={false}
          rowKey={(record) => record.key}
          rowClassName={rowClassName}
        />

        <CustomPagination
          current={current}
          pageSize={pageSize}
          total={total}
          onPageChange={(page) =>
            onPaginationChange({ current: page, pageSize })
          }
          onPageSizeChange={(size) =>
            onPaginationChange({ current: 1, pageSize: size })
          }
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </div>

      <style scoped>
        {`
          .filter-dropdown-overlay {
            min-width: 320px;
          }
          
          .filter-icon {
            width: 22px !important;
            height: 22px !important;
          }
          
          .filter-button {
            background-color: #f2f4ff !important;
            border: none !important;
            width: 44px !important;
            height: 44px !important;
            border-radius: 4px !important;
          }

          .search-input {
            width: 264px !important;
            height: 42px !important;
            padding-left: 12px !important;
            padding-right: 32px !important;
            border-radius: 4px !important;
          }

          .search-icon {
            width: 18px !important;
            height: 18px !important;
          }

          .sort-button {
            border: none !important;
            background-color: transparent !important;
            width: 21px !important;
            height: 22px !important;
          }

          .plus-icon {
            width: 14px !important;
            height: 14px !important;
          }

          .add-button {
            background-color: #3691d6 !important;
            width: 38px !important;
            height: 38px !important;
            border: 2px solid #3691d6 !important;
            padding: 0 !important;
            font-size: 19px !important;
            border-radius: 4px !important;
          }
        `}
      </style>
    </>
  );
};

export default ListTable;
