import { useCallback, useEffect, useMemo, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types';

interface UsePeopleReturn {
  people: Person[];
  peopleWithParents: Person[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePeople = (): UsePeopleReturn => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getPeople();

      setPeople(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load people';

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const peopleWithParents = useMemo(() => {
    const peopleMap = new Map(people.map(p => [p.name, p]));

    return people.map(person => ({
      ...person,
      mother: person.motherName ? peopleMap.get(person.motherName) : undefined,
      father: person.fatherName ? peopleMap.get(person.fatherName) : undefined,
    }));
  }, [people]);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  return {
    people,
    peopleWithParents,
    isLoading,
    error,
    refetch: loadPeople,
  };
};
