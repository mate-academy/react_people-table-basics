import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../hooks/usePeople';

export const People = () => {
  const {
    data: people, isLoading, isError, isSuccess,
  } = usePeople();

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

          {isSuccess && !people?.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people?.length && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
