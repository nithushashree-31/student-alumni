import React from "react";
import { Pagination } from "antd";

const CustomPagination = ({
  current,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}) => {
  const handleChange = (page, size) => {
    if (size !== pageSize) {
      onPageSizeChange(size);
    } else {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between py-4 px-6">
      <div className="text-sm text-gray-700">
        {`${(current - 1) * pageSize + 1}-${Math.min(
          current * pageSize,
          total
        )} of ${total} items`}
      </div>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={handleChange}
        showSizeChanger
        showQuickJumper={false}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
};

export default CustomPagination;
