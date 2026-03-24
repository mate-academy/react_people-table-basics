import React, { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { Loader } from '../Loader';

import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeopleList)

      .catch(error => {
        setErrorMessage(true);
        throw error;
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {peopleList.length === 0 && !loading && !errorMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {peopleList.length > 0 && <PeopleTable peopleList={peopleList} />}
        </div>
      </div>
    </>
  );
};
