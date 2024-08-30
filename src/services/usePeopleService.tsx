import { useFetchData } from '../hooks/useFetchData';
import { Person } from '../types';

export const usePeopleService = () => {
  const { fetchData, isLoading, isError } = useFetchData();

  const API_BASE = 'https://mate-academy.github.io/react_people-table/api/';

  const getPeople = () => fetchData<Person[]>(`${API_BASE}/people.json`);

  return {
    isLoading,
    getPeople,
    isError,
  };
};
