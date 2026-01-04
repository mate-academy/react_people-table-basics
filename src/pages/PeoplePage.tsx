import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleByName = useMemo(() => {
    const map = new Map<string, Person>();

    people.forEach(p => map.set(p.name, p));

    return map;
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !hasError && people.length > 0 && (
        <PeopleTable
          people={people}
          selectedSlug={slug}
          peopleByName={peopleByName}
        />
      )}

      {isLoading && (
        <div className="block">
          <div className="box table-container">
            <Loader />
          </div>
        </div>
      )}
    </>
  );
};
