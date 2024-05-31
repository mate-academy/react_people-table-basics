import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const usePeopleData = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emptyResponseMessage, setEmptyResponseMessage] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const peopleFromServer = await getPeople();

        if (peopleFromServer.length === 0) {
          setEmptyResponseMessage('There are no people on the server');
        }

        setPeople(peopleFromServer);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  return { people, isLoading, error, emptyResponseMessage };
};
