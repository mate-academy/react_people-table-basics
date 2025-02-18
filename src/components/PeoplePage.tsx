import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleList } from './PeopleList';

type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  mother: string;
  father: string;
  slug: string;
};

export const PeoplePage = () => {
  const { personHref } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
        setError(null);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  return (
    <PeopleList
      people={people}
      isLoading={loading}
      highlightedPersonSlug={personHref}
    />
  );
};
