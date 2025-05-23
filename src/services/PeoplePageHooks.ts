import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { client } from './client';

export const usePeopleHooks = () => {
  const { load } = client;
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      try {
        const ppl = await load();

        setPeople(ppl);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  const peopleMap = useMemo(() => {
    const map = new Map<string, Person>();

    people.forEach(person => map.set(person.name, person));

    return map;
  }, [people]);

  return { loading, people, peopleMap, error };
};
