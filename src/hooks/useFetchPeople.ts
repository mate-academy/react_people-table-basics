import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const useFetchPeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { isLoading, isError } = useQuery(['people'], getPeople, {
    onSuccess: (data) => {
      setPeople(data);
    },
  });

  return { people, isLoading, isError };
};
