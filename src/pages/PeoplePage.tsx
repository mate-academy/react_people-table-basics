import { useContext } from 'react';
import { Loader } from '../components/Loader';
import { PeopleContext } from '../context/PeopleContext';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const { people, isLoading, errorMessage } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              <PeopleTable />
            </>
          )}
        </div>
      </div>
    </>
  );
};
