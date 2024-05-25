import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { client } from '../utils/fetchPeople';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeopleList: React.FC = () => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [getError, setGetError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const womanNames = people.filter((person) => person.sex === 'f');
  const manNames = people.filter((person) => person.sex === 'm');

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const response = await client.get<Person[]>('/people.json');

        setPeople(response);
      } catch (error) {
        setGetError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {getError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !getError && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !getError && people.length > 0 && (
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

            <tbody>
              {people.map(person => {
                return (
                  <PeopleTable
                    key={person.slug}
                    person={person}
                    womanNames={womanNames}
                    manNames={manNames}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
