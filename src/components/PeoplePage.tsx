import { useEffect } from 'react';
import { usePeople } from '../providers/PeopleProvider';
import { PeoplePageContent } from './PeoplePageContent';

export const PeoplePage = () => {
  const {
    getPeopleFromApi,
    resetPeople,
  } = usePeople();

  useEffect(() => {
    getPeopleFromApi();

    return () => {
      resetPeople();
    };
  }, [getPeopleFromApi, resetPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {/* {isLoading && <Loader />}
          {isError && <ErrorMessage />}
          {!isLoading && !!people && <PeopleList />}
          {!isError && !isLoading && !people?.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )} */}
          <PeoplePageContent />
        </div>
      </div>
    </>
  );
};
