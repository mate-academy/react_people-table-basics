import { useEffect, useState } from 'react';
import { getPeople } from '../api/getPeople';
import { Person } from '../model/Person';

type UsePeopleResult = {
  people: Person[];
  isLoading: boolean;
  isError: boolean;
};

export const usePeople = (): UsePeopleResult => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    people,
    isLoading,
    isError,
  };
};
