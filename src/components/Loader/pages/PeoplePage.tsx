import { PeopleTable } from '../../PeopleTable/PeopleTable';
import { Loader } from '../Loader';
import { usePeople } from '../../../store/peopleContext';

export const PeoplePage = () => {
  const { people, loading, loadingError } = usePeople();

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && (
            <Loader />
          )}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people.length === 0 && !loadingError && !loading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable
              people={people}
            />
          )}
        </div>
      </div>
    </div>
  );
};
