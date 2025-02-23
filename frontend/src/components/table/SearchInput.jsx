import React, { useState, useEffect, useCallback } from "react";
import { Input } from "antd";
import searchIcon from "../../assets/search-icon.svg";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timer, setTimer] = useState(null);

  const handleSearch = (value) => {
    let filterObject = {};

    if (value) {
      filterObject = {
        appNumber: {
          contains: value,
        },
      };
    }

    onSearch(JSON.stringify(filterObject));
  };

  const debouncedSearch = useCallback(
    (value) => {
      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        handleSearch(value);
      }, 500);

      setTimer(newTimer);
    },
    [timer]
  );

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const onChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative">
      <Input
        placeholder="Search by Application Number"
        className="search-input"
        value={searchTerm}
        onChange={onChange}
        allowClear
      />
      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
        <span className="h-10.5 border-l border-gray-300 mr-2" />
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
      </span>
    </div>
  );
};

export default SearchInput;
