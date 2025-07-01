import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';

export function usePeople() {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setError(null);
    setPeople(null);

    getPeople().then(setPeople).catch(setError);
  }, []);

  return { people, error, slug };
}
