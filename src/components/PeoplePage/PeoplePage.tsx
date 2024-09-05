import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        <h1 className="title">People Page</h1>

        {isLoading && <Loader />}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && <PeopleTable people={people} />}
      </div>
    </div>
  );
};
