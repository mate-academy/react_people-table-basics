import { Loader } from '../components/Loader';
import { usePeopleHooks } from '../services/PeoplePageHooks';
import { PeopleTable } from '../components/People/PeopleTable';

export const PeoplePage = () => {
  const { loading, people, peopleMap, error } = usePeopleHooks();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : error ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : (
            <PeopleTable people={people} peopleMap={peopleMap} />
          )}
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      </div>
    </>
  );
};
