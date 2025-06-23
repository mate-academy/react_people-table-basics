import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../hooks/usePeople';

export const PeoplePage = () => {
  const {
    preparedPeople,
    isError,
    isNoPeopleOnServer,
    isLoadedPeople,
    isPeopleLoading,
  } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isLoadedPeople && <PeopleTable people={preparedPeople} />}
        </div>
      </div>
    </>
  );
};
