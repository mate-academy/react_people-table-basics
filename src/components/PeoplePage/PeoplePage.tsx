import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PersonTable } from '../PersonTable/PersonTable';
import { Person } from '../../types';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams();
  const [errorText, setErrorText] = useState('');

  const errorMessage = (error: string) => {
    setErrorText(error);
  };

  const getpeopleFromServer = useCallback(async () => {
    try {
      const response = await fetch(
        'https://mate-academy.github.io/react_people-table/api/people.json',
      );

      const personsFromServer = await response.json();

      const peopleWithParents = personsFromServer.map((person: Person) => {
        return {
          ...person,
          mother: personsFromServer.find(
            (per: Person) => per.name === person.motherName,
          ),
          father: personsFromServer.find(
            (per: Person) => per.name === person.fatherName,
          ),
        };
      });

      setPeople(peopleWithParents);
    } catch {
      errorMessage('Something went wrong');
    }
  }, []);

  useEffect(() => {
    getpeopleFromServer();
  }, []);
  const tabbleHeaderColumns
    = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <>
      <h1 className="title">People Page</h1>
      {people.length === 0
        ? (
          <>
            <Loader />
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorText}
            </p>
          </>
        )
        : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {tabbleHeaderColumns.map(column => (<th>{column}</th>))}
              </tr>
            </thead>

            <PersonTable people={people} slug={slug} />
          </table>
        )}
    </>
  );
});
