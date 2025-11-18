import { IUser } from '@/app/types/User';
import { atom, useAtom } from 'jotai';
import React, { useState } from 'react'

const limitAtom = atom(10);
const offsetAtom = atom(1);
const totalAtom = atom(0);
const usersAtom = atom<IUser[]>([])
const isLoadingAtom = atom(true);
const filterAtom = atom<string>('All')

function useUsers() {
  const [limit, setLimit] = useAtom(limitAtom);
  const [offset, setOffset] = useAtom(offsetAtom);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useAtom(usersAtom);
  const [total, setTotal] = useAtom(totalAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [filter, setFilter] = useAtom(filterAtom);

  return {
    isLoading,
    setIsLoading,
    total,
    setTotal,
    users, setUsers,
    search, setSearch,
    offset,
    setOffset,
    limit,
    filter,
    setFilter
  }
}

export default useUsers