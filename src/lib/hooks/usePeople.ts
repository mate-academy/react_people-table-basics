import { useState, useEffect } from 'react';

import { getPeople } from '../api/people';
import { Person } from '../../types/Person';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);

      try {
        const peopleFromServer: Person[] = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setHasLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return {
    people, setPeople, isLoading, hasLoadingError,
  };
};
