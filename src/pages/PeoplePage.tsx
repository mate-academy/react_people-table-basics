import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { usePeople } from '../store/PeopleContext';

export const PeoplePage = () => {
  const { people, loading, errorMessage } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && people.length > 0 && <PeopleList people={people} />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!loading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
