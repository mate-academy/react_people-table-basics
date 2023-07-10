import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage: FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[] | null>(null);

  useEffect(() => {
    setIsError(false);
    setIsLoader(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoader ? (
            <Loader />
          ) : (
            <>
              {isError ? (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              ) : (
                <>
                  {people ? (
                    <PeopleTable people={people} />
                  ) : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
