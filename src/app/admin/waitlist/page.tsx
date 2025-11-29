'use client';
import { IWaitlist } from '@/helper/model/waitlist';
import httpService from '@/helper/services/httpService';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Spinner } from '@heroui/react';
import { dateTimeFormat } from '@/helper/utils/dateFormat';

export default function WaitList() {
    const [waitlist, setWaitlist] = useState<IWaitlist[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState<number | null>(null);



    const { data, isLoading, isError } = useQuery({
        queryKey: ['get-waitlist', page],
        queryFn: () => httpService.get(`/waitlist?page=${page}`),
    });

      const { data: analyticsData, } = useQuery({
        queryKey: ['get-analytics'],
        queryFn: () => httpService.get(`/waitlist/total`),
    });

    useEffect(() => {
        if (data) {
            setWaitlist(data?.data?.data || []);
        }
    }, [data]);

    useEffect(() => {
        if (analyticsData) {
            const total = Number(analyticsData?.data?.data ?? 0);
            setTotalEntries(total || null);
            const pages = Math.max(1, Math.ceil(total / 10));
            setTotalPages(pages);
            if (page > pages) {
                setPage(pages);
            }
        }
    }, [analyticsData, page]);
  return (
    <div className='w-full h-full'>
        <div className='w-full h-[150px] rounded-lg bg-white flex justify-center items-center flex-col'>
            <p className='font-bold text-2xl'>TOTAL ENTRIES</p>
            <p className='text-3xl font-semibold text-gray-900'>{totalEntries ?? '-'}</p>
        </div>

        <div className='bg-white rounded-xl mt-6'>
            <div className='overflow-x-auto relative'>
                {(!isLoading && waitlist?.length > 0) && (
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='text-left py-3 px-6 text-sm font-medium text-gray-600'>Name</th>
                                <th className='text-left py-3 px-6 text-sm font-medium text-gray-600'>Email</th>
                                <th className='text-left py-3 px-6 text-sm font-medium text-gray-600'>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {waitlist.map((row) => (
                                <tr key={row._id} className='border-b border-gray-100 hover:bg-gray-50'>
                                    <td className='py-4 px-6 text-sm text-gray-900'>{row.name}</td>
                                    <td className='py-4 px-6 text-sm text-gray-900'>{row.email}</td>
                                    <td className='py-4 px-6 text-sm text-gray-900'>{dateTimeFormat(String(row.createdAt))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {(!isLoading && waitlist?.length < 1) && (
                    <div className='w-full h-24 flex justify-center items-center flex-col'>
                        <p className='text-sm text-gray-600'>There are currently no waitlist entries</p>
                    </div>
                )}

                {(isLoading && waitlist?.length < 1) && (
                    <div className='w-full h-24 flex justify-center items-center flex-col'>
                        <Spinner />
                        <p className='text-sm text-gray-600 mt-2'>Loading waitlist...</p>
                    </div>
                )}

                {(isLoading && waitlist?.length > 0) && (
                    <div className='absolute inset-0 bg-white/60 flex items-center justify-center'>
                        <div className='flex flex-col items-center'>
                            <Spinner />
                            <p className='text-sm text-gray-600 mt-2'>Refreshing data...</p>
                        </div>
                    </div>
                )}
            </div>

            <div className='p-6 border-t border-gray-200'>
                <div className='flex items-center'>
                    <div className='flex items-center justify-between w-full gap-2'>
                        {page > 1 && (
                            <button
                                className='px-3 py-1 text-sm text-gray-600 hover:text-gray-900'
                                onClick={() => setPage(Math.max(1, page - 1))}
                            >
                                ← Previous
                            </button>
                        )}
                        <div className='flex items-center gap-1'>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    className={`px-3 py-1 text-sm rounded ${p === page ? 'bg-[#EEF0FF] text-[#5160E7]' : 'text-gray-600 hover:text-gray-900'}`}
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                        {page < totalPages && (
                            <button
                                className='px-3 py-1 text-sm text-gray-600 hover:text-gray-900'
                                onClick={() => setPage(Math.min(totalPages, page + 1))}
                            >
                                Next →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
