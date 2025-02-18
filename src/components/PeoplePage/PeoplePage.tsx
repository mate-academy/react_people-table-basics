import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { ErrorTypes } from '../../types/errors';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(ErrorTypes.GENERAL))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {ErrorTypes.GENERAL}
            </p>
          )}

          {!people.length && !errorMessage && !isLoading && (
            <p data-cy="noPeopleMessage">{ErrorTypes.NO_PEOPLE}</p>
          )}

          {people.length && !errorMessage && !isLoading && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
