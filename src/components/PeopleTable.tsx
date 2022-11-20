import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

export const PeopleTable:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState('');

  const getPeopleFromsServer = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (Error) {
      setHasError(true);
      setIsLoading(false);

      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getPeopleFromsServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>

          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable
            is-narrow is-fullwidth"
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

            <tbody>
              {people.map((person: Person) => (
                <PersonInfo
                  person={person}
                  key={person.slug}
                  people={people}
                  isActive={isActive}
                  setIsActive={setIsActive}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
