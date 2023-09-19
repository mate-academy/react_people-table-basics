import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleList } from './PeopleList';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!people.length ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )
            : <PeopleList people={people} />}
        </div>
        {!isLoading && isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
      </div>
    </>
  );
};
