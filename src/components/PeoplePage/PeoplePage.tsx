import { useState, useEffect } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeopleList)
      .catch(error => {
        setErrorMessage(true);
        throw error;
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleList.length === 0 && !loader && !errorMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {peopleList.length > 0 && <PeopleTable peopleList={peopleList} />}
        </div>
      </div>
    </>
  );
};
