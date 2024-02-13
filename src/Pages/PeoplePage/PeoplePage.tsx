import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!!errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!isLoading
            && !people.length
            && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          {!!people.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
