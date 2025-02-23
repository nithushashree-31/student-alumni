import React, { useState } from "react";
import { Popover, Select, Button, Space } from "antd";
import sortIcon from "../../assets/sort-icon.svg";

 const SortDropdown = ({ columns, onSort, activeSort = null }) => {
   const [selectedColumn, setSelectedColumn] = useState(
     activeSort?.field || ""
   );
   const [sortOrder, setSortOrder] = useState(activeSort?.order || "asc");

   const handleSort = () => {
     if (!selectedColumn) return;

     const sortObject = {
       [selectedColumn]: sortOrder,
     };

     onSort(sortObject);
   };

   const clearSort = () => {
     setSelectedColumn("");
     setSortOrder("asc");
     onSort({});
   };

   const content = (
     <div className="w-80">
       <div className="space-y-4">
         <div>
           <h3 className="text-sm font-medium mb-2">Sort By</h3>
           <Space direction="vertical" className="w-full">
             <Select
               value={selectedColumn}
               onChange={(value) => {
                 setSelectedColumn(value);
                 // Automatically apply sort when column is selected
                 const sortObject = value ? { [value]: sortOrder } : {};
                 onSort(sortObject);
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

             {selectedColumn && (
               <Select
                 value={sortOrder}
                 onChange={(value) => {
                   setSortOrder(value);
                   // Automatically apply sort when order is changed
                   onSort({ [selectedColumn]: value });
                 }}
                 className="w-full"
               >
                 <Select.Option value="asc">Ascending</Select.Option>
                 <Select.Option value="desc">Descending</Select.Option>
               </Select>
             )}

             {selectedColumn && (
               <Button type="text" onClick={clearSort} block>
                 Clear Sort
               </Button>
             )}
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
       overlayClassName="sort-dropdown-overlay"
     >
       <Button
         icon={
           selectedColumn ? (
             <div className="relative">
               <img src={sortIcon} alt="Sort Icon" className="sort-icon" />
               <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-2 h-2" />
             </div>
           ) : (
             <img src={sortIcon} alt="Sort Icon" className="sort-icon" />
           )
         }
         className={`sort-button ${
           selectedColumn ? "border-blue-500 text-blue-500" : ""
         }`}
       />
     </Popover>
   );
 };

export default SortDropdown;
