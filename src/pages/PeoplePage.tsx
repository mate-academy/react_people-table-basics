import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [isPeopleLoadingError, setIsPeopleLoadingError] = useState(false);

  const getPeopleFromServer = () => {
    setIsPeopleLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsPeopleLoadingError(true))
      .finally(() => setIsPeopleLoading(false));
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const isNoPeople = !isPeopleLoading && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}

          {isPeopleLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          <PeopleTable
            people={people}
          />
        </div>
      </div>
    </>
  );
};
