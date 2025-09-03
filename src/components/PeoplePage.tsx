import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const { people, errorMessage, isLoading } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {!isLoading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {!errorMessage && !isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!errorMessage && !isLoading && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
