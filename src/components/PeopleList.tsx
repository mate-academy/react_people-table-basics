import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { client } from '../utils/fetchPeople';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeopleList: React.FC = () => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [getError, setGetError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchPeople = async () => {
      try {
        const response = await client.get<Person[]>('/people.json');

        const preparedPeople = response.map(person => ({
          ...person,
          mother: response.find(
            mother => mother.name === person.motherName,
          ),
          father: response.find(
            father => father.name === person.fatherName,
          ),
        }));

        setPeople(preparedPeople);
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

        {!isLoading && !getError && !people.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !getError && people.length && (
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
