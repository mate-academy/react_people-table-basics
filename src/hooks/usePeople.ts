import { useEffect, useState } from 'react';
import * as apiServices from '../api';
import { Person } from '../types';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);

    apiServices
      .getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const findPersonByName = (name: string | null | undefined): Person | null => {
    if (!name) {
      return null;
    }

    return people.find(p => p.name === name) || null;
  };

  return { people, isLoading, errorMessage, findPersonByName };
};
