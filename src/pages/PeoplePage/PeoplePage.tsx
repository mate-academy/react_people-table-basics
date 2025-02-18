import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { SOMETHING_WENT_WRONG_ERROR } from '../../constants/errors';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="block">
          <div className="box table-container">
            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {SOMETHING_WENT_WRONG_ERROR}
              </p>
            )}

            {people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {people && !hasError && (
              <PeopleTable people={people} currentSlug={String(slug)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
