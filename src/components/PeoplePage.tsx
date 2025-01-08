import React, { useContext, useEffect } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleContext } from '../context/PeopleContext';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const { people, setPeople, isError, setIsError, loading, setLoading } =
    useContext(PeopleContext);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {isError}
            </p>
          )}

          {people.length === 0 && !isError && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && !isError && !loading && <PeopleTable />}
        </div>
      </div>
    </>
  );
};
