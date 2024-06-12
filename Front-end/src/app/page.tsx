"use client";
import "./globals.css";
import UserTable from "./components/UserTable";
import { useState } from "react";
import AddUserPopup from "./components/AddUserPopup";
import SearchUserPopup from "./components/SearchUserPopup";
import SearchParamsDisplay from "./components/SearchParamsDisplay";
import { ChakraProvider } from "@chakra-ui/react";
import { MdPersonAdd, MdPersonSearch, MdSearch } from "react-icons/md";

export default function Home() {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    username: "",
    fullname: "",
    role: "",
    project: "",
  });

  const handleSearch = (searchParams: {
    username: string;
    fullname: string;
    role: string;
    project: string;
  }) => {
    setSearchParams(searchParams);
  };

  const handleRemoveSearchParam = (key: string) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [key]: "",
    }));
    refreshData();
  };

  const openCreatePopup = () => {
    setIsCreatePopupOpen(true);
  };

  const closeCreatePopup = () => {
    setIsCreatePopupOpen(false);
  };
  const openSearchPopup = () => {
    setIsSearchPopupOpen(true);
  };

  const closeSearchPopup = () => {
    setIsSearchPopupOpen(false);
  };

  const refreshData = () => {
    setRefresh(!refresh);
  };
  return (
    <ChakraProvider>
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-4 text-center mt-10">
          Users Management
        </h1>
        <div className="flex items-center mb-4">
          <button
            className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center ml-auto mr-0"
            onClick={openCreatePopup}
          >
            <MdPersonAdd size={25} />
          </button>
          <button
            className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center ml-5 mr-12"
            onClick={openSearchPopup}
          >
            <MdPersonSearch size={25} />
          </button>
        </div>

        <SearchParamsDisplay
          searchParams={searchParams}
          onRemove={handleRemoveSearchParam}
        />

        <UserTable refresh={refresh} searchParams={searchParams} />

        {isSearchPopupOpen && (
          <SearchUserPopup onSearch={handleSearch} onClose={closeSearchPopup} />
        )}
        {isCreatePopupOpen && (
          <AddUserPopup onClose={closeCreatePopup} onSave={refreshData} />
        )}
      </div>
    </ChakraProvider>
  );
}
