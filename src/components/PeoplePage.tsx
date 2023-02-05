import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleList } from './PeopleList';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [listOfPeople, setListOfPeople] = useState<Person[]>([]);

  const loadPeopleList = async () => {
    setIsLoading(true);

    try {
      const data = await getPeople();

      setListOfPeople(data);
      setIsError(false);
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPeopleList();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!listOfPeople.length && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {listOfPeople.length > 0 && !isLoading && !isError && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <PeopleList listOfPeople={listOfPeople} />
            </table>
          )}
        </div>
      </div>
    </>
  );
};
