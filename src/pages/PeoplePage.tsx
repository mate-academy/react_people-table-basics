import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { findPeopleFamily } from '../helpers/findPeopleFamilly';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [peopleError, setPeopleError] = useState('');

  useEffect(() => {
    setPeopleLoading(true);
    getPeople()
      .then((peopleFromServer) => setPeoples(peopleFromServer))
      .catch(() => {
        setPeopleError('Something went wrong');
      })
      .finally(() => setPeopleLoading(false));
  }, []);

  const normalizePeoples = findPeopleFamily(peoples);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!peopleError && !peopleLoading && peoples.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {peopleError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {peopleError}
            </p>
          )}
          {peopleLoading ? (
            <Loader />
          ) : (
            <PeopleTable peoples={normalizePeoples} />
          )}
        </div>
      </div>
    </>
  );
};
