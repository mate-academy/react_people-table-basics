import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!people && !errorMessage && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!errorMessage && people?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people && people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
