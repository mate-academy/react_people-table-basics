import React, { useState, useEffect } from 'react';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

import { Person } from '../types';
import { ErrorNames } from '../types/ErrorNames';

import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(ErrorNames.None);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => setHasError(ErrorNames.Unknown))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="box table-container">
          {loading && (
            <Loader />
          )}

          {!loading && hasError !== ErrorNames.None && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && people.length === 0 && hasError === ErrorNames.None && (
            <p data-cy="noPeopleMessage">
              {ErrorNames.NoPeople}
            </p>
          )}

          {!loading && people.length > 0 && hasError === ErrorNames.None && (
            <PeopleTable
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
};
