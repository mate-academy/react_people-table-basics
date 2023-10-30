import { Loader } from '../components/Loader';
import { usePeople } from '../store/PeopleContext';
import { People } from '../components/People';

export const PeoplePage = () => {
  const {
    people,
    loading,
    errorMessage,
  } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && (
            <Loader />
          )}
          {!!people.length && (
            <People people={people} />
          )}
          {!loading && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
