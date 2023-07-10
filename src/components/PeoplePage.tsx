import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

const tableHeads = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeoplePage: React.FC<{}> = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setPeople(await getPeople());
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const isErrorMessageVisible = !isLoading && error;
  const isPeopleTableVisible = !isLoading && !error && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}

      {isErrorMessageVisible
        && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

      {isPeopleTableVisible
        && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {tableHeads.map(head => (
                  <th key={head}>{head}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <PersonLink
                  person={person}
                  people={people}
                  key={person.slug}
                />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
