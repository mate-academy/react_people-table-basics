import React from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = React.useState<Person[]>();
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => setPeople(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people
          && (people.length === 0
            ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
            : (
              <PeopleTable people={people} />
            )
          )}
      </div>
    </>
  );
};
