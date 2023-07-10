import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getPeople()
      // .then(() => setPeople([]))
      .then(setPeople)
      .catch(() => {
        setIsError(true);
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

          {isError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) : (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
