import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../hooks/usePeople';

export const PeoplePage = () => {
  const { people, error, isLoading } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !error && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length !== 0 && !error && !isLoading && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
