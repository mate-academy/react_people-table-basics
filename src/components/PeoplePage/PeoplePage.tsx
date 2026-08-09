import { usePeople } from '../../hooks/usePeople';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const peopleState = usePeople();

  const shouldRenderNoPeopleMessage =
    !peopleState.isLoading &&
    !peopleState.hasError &&
    peopleState.people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {peopleState.isLoading && <Loader />}

          {peopleState.hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {shouldRenderNoPeopleMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!peopleState.isLoading && !peopleState.hasError && (
            <PeopleTable people={peopleState.people} />
          )}
        </div>
      </div>
    </>
  );
};
