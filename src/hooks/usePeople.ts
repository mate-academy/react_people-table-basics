import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const { areThereNoPeopleFromServer, areTherePeopleFromServer } =
    useMemo(() => {
      return {
        areThereNoPeopleFromServer:
          !isLoading && !errorMessage && !Boolean(people.length),
        areTherePeopleFromServer:
          !isLoading && !errorMessage && Boolean(people.length),
      };
    }, [people, isLoading, errorMessage]);

  return {
    people,
    isLoading,
    errorMessage,
    areThereNoPeopleFromServer,
    areTherePeopleFromServer,
  };
};
