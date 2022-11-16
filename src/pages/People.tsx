import { FC, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { Person } from '../types';

export const People: FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPeopleList = async () => {
    setIsLoading(true);

    try {
      const response = await getPeople();

      const people = response.map(person => {
        const mother = response.find(mom => mom.name === person.motherName);
        const father = response.find(fath => fath.name === person.fatherName);

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeopleList(people);
    } catch {
      setLoadingError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getPeopleList();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(peopleList.length === 0 && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {(!isLoading && peopleList.length > 0) && (
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

              <PeopleList
                peopleList={peopleList}
              />

            </table>
          )}
        </div>
      </div>
    </>
  );
};
