import { useEffect } from 'react';
import { usePeopleContext } from '../context/PeopleContext';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PersonList/PersonList';

export const PeoplePage = () => {
  const { getAllPeople, loading, error, people } = usePeopleContext();

  useEffect(() => {
    getAllPeople();
  }, [getAllPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && <PeopleList />}
        </div>
      </div>
    </>
  );
};
