import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {loading && <Loader />}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading && !hasError && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !hasError && people.length > 0 && (
          <PeopleTable people={people} selectedSlug={slug} />
        )}
      </div>
    </>
  );
};
