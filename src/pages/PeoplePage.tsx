import { useFetchPeople } from '../hooks/useFetchPeople';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const { people, isError } = useFetchPeople();

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          <PeopleTable />

        </div>
      </div>
    </div>
  );
};
