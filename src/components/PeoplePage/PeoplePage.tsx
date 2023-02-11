import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const getPeopleList = () => {
    setIsLoad(true);

    getPeople()
      .then((data) => setPeopleList(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoad(false));
  };

  useEffect(() => {
    getPeopleList();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoad && (
            <Loader />
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleList && (
            <PeopleTable peopleList={peopleList} />
          )}

          {peopleList?.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
