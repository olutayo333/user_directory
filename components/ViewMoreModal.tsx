'use client';

import { ViewMoreModalProps } from '@/types/homeTypes';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';

const ViewMoreModal: React.FC<ViewMoreModalProps> = (
    { openModal, closeModal, userDetail }
) => {
  if (!openModal || !userDetail) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-[#0D1321] text-black dark:text-white rounded-lg p-6 w-full max-w-lg relative shadow-lg">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-xl rounded-full bg-white text-black hover:text-red-500"
          onClick={closeModal}
        >
          <IoMdClose className='font-bold'/>
        </button>

        {/* User Image */}
        <div className="flex justify-center mb-4">
          <Image
            src={userDetail?.picture?.large}
            alt="User Picture"
            width={100}
            height={100}
            className="rounded-full border border-gray-300"
          />
        </div>

        {/* User Info */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">
            {userDetail?.name?.title} {userDetail?.name?.first} {userDetail?.name?.last}
          </h2>
          <p className="text-sm text-gray-400">
            {userDetail?.email}
          </p>
          <p className="text-sm">{userDetail?.phone}</p>
          <p className="text-sm">
            {userDetail?.location?.street?.number} {userDetail?.location?.street?.name}, {userDetail?.location?.city}, {userDetail?.location?.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewMoreModal;
