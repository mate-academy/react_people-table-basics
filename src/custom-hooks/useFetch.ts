import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export function useFetchPeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .then(() => setIsLoading(false))
      .catch(() => setErrorMessage('Something went wrong'));
  }, []);

  return {
    isLoading,
    people,
    errorMessage,
  };
}
