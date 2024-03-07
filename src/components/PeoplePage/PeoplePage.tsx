import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { getPeopleWithParents } from '../../services/getPeopleWithParents';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setError(false);
    setDataLoaded(false);

    getPeople()
      .then(response => {
        setPeople(getPeopleWithParents(response));
        setDataLoaded(true);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!dataLoaded && !error && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {dataLoaded && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {dataLoaded && people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
});
