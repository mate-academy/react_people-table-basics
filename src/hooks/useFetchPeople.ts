import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const useFetchPeople = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const {
    isLoading,
    isError,
    isFetching,
  } = useQuery(['people'], getPeople, {
    onSuccess: (data) => {
      setPeople(
        data.map((person) => ({
          ...person,
          mother: data.find((mother) => mother.name === person.motherName),
          father: data.find((father) => father.name === person.fatherName),
        })),
      );
    },
  });

  return {
    people,
    isLoading,
    isError,
    isFetching,
  };
};
