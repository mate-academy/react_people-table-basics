import { useEffect, useState } from 'react';
import { Person } from '../types';
import { API_URL, ERROR_MESSAGE } from '../constants';

export const useFetchPeople = () => {
  const [dataPeople, setDataPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    fetch(API_URL)
      .then(people => people.json())
      .then(people => {
        setDataPeople(people);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch(() => {
        setErrorMessage(ERROR_MESSAGE);
      });
  }, []);

  return { dataPeople, isLoading, errorMessage };
};
