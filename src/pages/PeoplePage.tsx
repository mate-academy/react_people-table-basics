import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const { personSlug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => {
        if (isMounted) {
          setPeople(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={personSlug} />
          )}
        </div>
      </div>
    </>
  );
};
