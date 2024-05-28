import { useEffect, useState } from 'react';

import { addParentsInfo } from './addParentsInfo';
import { Person } from '../../types';
import { getPeople } from '../../api';

interface PeopleHookType {
  people: Person[];
  isLoading: boolean;
  hasError: boolean;
}

export const usePeople = (): PeopleHookType => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(res => setPeople(addParentsInfo(res)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { people, isLoading, hasError };
};
