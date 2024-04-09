import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { usePeople } from '../context/PeopleContext';

export const PeoplePage: React.FC = () => {
  const { isLoading, error, people } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      ) : (
        <>
          {people.length ? (
            <PeopleTable />
          ) : (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </>
      )}
    </>
  );
};
