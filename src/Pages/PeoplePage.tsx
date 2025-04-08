import { PeopleTable } from '../components/PeopleTable';
import { PeopleContext } from '../Contexts/PeopleContext';
import { Loader } from '../components/Loader';
import { useContext } from 'react';

export const PeoplePage = () => {
  const { isError, isLoading, people } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && people.length && <PeopleTable />}

          {!isLoading && !isError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
