import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadPeopleTable = (): JSX.Element => {
    return (
      <>
        {isError
          ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )
          : (
            <>
              {people.length > 0
                ? (
                  <PeopleTable people={people} />
                )
                : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
            </>
          )}
      </>
    );
  };

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            loadPeopleTable()
          )}
        </div>
      </div>
    </>
  );
};
