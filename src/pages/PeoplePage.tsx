import React, { useContext, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { PeopleContext } from '../store/PeopleContext';

export const PeoplePage: React.FC = () => {
  const { people, loading, errorMessage, loadPeople } =
    useContext(PeopleContext);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {people.length > 0 ? (
                <PeopleList people={people} />
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
