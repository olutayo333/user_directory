'use client'
import { CardsProps, UserDataProps } from "@/types/homeTypes";
import React, { useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "@/public/images/ImagePlaceholder.png";
import Skeleton from "./Skeleton";
import { FaRegFolderClosed } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import Pagination from "./Pagination";
import ViewMoreModal from "./ViewMoreModal";

const Cards: React.FC<CardsProps> = ({
  loading,
  errorMessage,
  userData,
  searchKeyword,
  userDetail,
  setSearchKeyword,
  setUserDetail,
  filteredUser,
  pagination,
  setPageNumber,
  setPageSize
}) => {

  const [openModal, setOpenModal]= useState<boolean>(false)
  const closeModal = ()=>{
    setOpenModal(false); 
  };
  return (
    <section className="p-2 space-y-2">

      {/*  Search Bar */}
      {filteredUser && filteredUser?.length > 0 &&
        <div className="w-full flex justify-end">
          <div className="relative w-full max-w-md">
            {/* Icon inside input */}
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-slate-600 rounded-md w-full"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
        </div>}

      {/* Cards Grid Container */}
      <div className="lg:p-5 p-2 lg:gap-4 grid lg:grid-cols-4 grid-cols-1">
        {loading ? (
          // Loading State
          Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} />)
        ) : errorMessage ? (
          // Error State
          <p className="lg:text-[20px] font-[400]">{errorMessage}</p>
        ) : filteredUser && filteredUser?.length > 0 ? (
          
          //  Map Over Users
          filteredUser?.map((user, index) => (
            <div
              key={user?.login?.uuid ?? index}
              className="shadow-md lg:p-4 p-0 cursor-pointer transition-colors duration-500 hover:bg-[#2a283e] w-full flex lg:flex-col flex-row lg:gap-0 gap-5 my-3"
              onClick={() => { setUserDetail(user); setOpenModal(true) }}
            >
              {/* Image */}
              <div className="lg:w-full w-[33%] lg:h-48 h-24 overflow-hidden">
                <Image
                  src={user?.picture?.large || ImagePlaceholder}
                  alt={`${user?.name?.first ?? ""} ${user?.name?.last ?? ""}`}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>

              {/*  User Info  */}
              <div className="lg:w-full w-[66%]">

                <div className=" justify-between items-center lg:font-[400] text-[13px] text-[#b6b6b8] lg:my-2">
                  {/* Full Name - Mobile */}
                  <p className="lg:hidden text-white font-semibold text-[16px]">
                    {`${user?.name?.title ?? ""} ${user?.name?.first ?? ""} ${user?.name?.last ?? ""}`}
                  </p>

                  {/* Full Name - Desktop */}
                  <p className="hidden lg:block text-white font-semibold lg:text-[20px] lg:font-semibold lg:my-2">
                    {`${user?.name?.title ?? ""} ${user?.name?.first ?? ""} ${user?.name?.last ?? ""}`}
                  </p>

                  <p className="cursor-pointer" >
                    {user?.email ?? "N/A"}
                  </p>
                  <p>
                    {user?.location?.city ?? "N/A"},{" "}
                    {user?.location?.country ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (

          //  EMPTY STATE
          <div className="flex justify-center items-center my-8 col-span-full min-h-[50vh]">
            <div className="text-center">
              <div className="flex justify-center items-center">
                <FaRegFolderClosed className="text-4xl" />
              </div>
              <div className="mt-5">
                <p className="font-medium text-[#475467]">No Data found</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {
        filteredUser && filteredUser?.length > 0 && (
          <Pagination
            totalItems={pagination?.totalItems}
            from={pagination.from}
            to={pagination.to}
            pageNumber={pagination.pageNumber}
            pageSize={pagination.pageSize}
            lastPage={pagination.lastPage}
            currentPage={pagination.currentPage}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
          />
        )
      }


      {/* VIEW MORE MODAL */}
      {
        openModal && (
          <ViewMoreModal
            openModal={openModal}
            closeModal={closeModal}
            userDetail={userDetail}
          />
        )        
      }
    </section>
  );
};

export default Cards;
