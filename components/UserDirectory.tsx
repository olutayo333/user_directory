'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Cards from '@/components/Cards';
import { PaginationProps, UserDataProps } from '@/types/homeTypes';
import { useGetUsersQuery } from '@/redux/api/apiSlice';

import React from 'react'

const UserDirectory = () => {
const [errorMessage, setErrorMessage] = useState<string>('');
    const [filteredUser, setFilteredUsers] = useState<UserDataProps[]>();
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [userDetail, setUserDetail] = useState<UserDataProps>();

    const [pagination, setPagination] = useState<PaginationProps>({
        totalItems: 0,
        from: 0,
        to: 0,
        pageNumber: 1,
        pageSize: 12,
        currentPage: 1,
        lastPage: 0,
    });

    const userArgs = useMemo(() => ({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
    }), [pagination.pageNumber, pagination.pageSize]);

    const {
        data: userData,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useGetUsersQuery(userArgs, {
        refetchOnMountOrArgChange: false,
    });
    console.log(pagination)

    //SEARCH LOGIC
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (!searchKeyword.trim()) {
                setFilteredUsers(userData?.results);
                setPagination((prev) => ({ ...prev, currentPage: userData?.page || 1 }))
                setPagination((prev) => ({ ...prev, totalItems: userData?.results?.length || 12 }))
                return;
            }

            const keyword = searchKeyword.toLowerCase();
            const results = userData?.results?.filter((user: any) => {
                const fullName = `${user?.name?.first} ${user?.name?.last}`.toLowerCase();
                const email = user?.email?.toLowerCase() || '';
                const city = user?.location?.city?.toLowerCase() || '';
                const country = user?.location?.country?.toLowerCase() || '';

                return (
                    fullName.includes(keyword) ||
                    email.includes(keyword) ||
                    city.includes(keyword) ||
                    country.includes(keyword)
                );
            });

            setFilteredUsers(results || []);
            setPagination((prev) => ({ ...prev, currentPage: userData?.page }))
            setPagination((prev) => ({ ...prev, totalItems: results?.length }))
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [searchKeyword, userData]);

    return (
        <div className="p-2 space-y-2">
            {/* Logos */}
            <section>
                <div className="flex justify-center items-center mx-auto p-2 lg:border-none border-b border-[#272735] lg:pb-0">
                    <label className="lg:block hidden">
                        <Image
                            src="/images/logo.png"
                            alt="BLOTT Image"
                            width={800}
                            height={400}
                            priority
                            className="w-full h-auto max-w-[800px] md:max-w-[600px] sm:max-w-[400px]"
                        />
                    </label>

                    <label className="block lg:hidden">
                        <Image
                            src="/images/BLOTT.png"
                            alt="User Directory"
                            width={800}
                            height={400}
                            priority
                            className="w-full h-auto max-w-[800px]"
                        />
                    </label>
                </div>
                <label className="lg:text-[30px] text-[24px] font-bold lg:tracking-wide text-center flex justify-center">
                    USER DIRECTORY
                </label>
            </section>

            {/* Cards */}
            <Cards
                loading={isLoading || isFetching}
                errorMessage={errorMessage}
                userData={userData || []}
                userDetail={userDetail}
                setUserDetail={setUserDetail}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                filteredUser={filteredUser || []}
                pagination={pagination}
                setPageNumber={(arg: number) =>
                    setPagination((prev) => ({ ...prev, pageNumber: arg, currentPage: arg }))
                }
                setPageSize={(size: number) =>
                    setPagination((prev) => ({ ...prev, pageSize: size }))
                }
            />

        </div>
    );

}

export default UserDirectory
