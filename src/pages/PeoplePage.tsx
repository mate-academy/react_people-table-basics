import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) {
      return;
    }

    hasLoaded.current = true;

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="section">
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && isError && (
        <p data-cy="peopleLoadingError">Failed to load people.</p>
      )}

      {!isLoading && !isError && people.length === 0 && (
        <p data-cy="noPeopleMessage">No people found.</p>
      )}

      {!isLoading && !isError && people.length > 0 && (
        <PeopleTable people={people} selectedSlug={slug} />
      )}
    </div>
  );
};
