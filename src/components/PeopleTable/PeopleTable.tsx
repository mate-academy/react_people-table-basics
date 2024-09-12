import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow/PersonRow';
import { useParams } from 'react-router-dom';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { slug = null } = useParams();

  const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  const getPreparedPeople = () => {
    return people.map(person => {
      return {
        ...person,
        mother: people.find(human => human.name === person.motherName),
        father: people.find(human => human.name === person.fatherName),
      };
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      // .then(setPeople)
      .then(data => {
        setPeople(data);
        setHasFetched(true);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {people && people.length === 0 && hasFetched && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {people && people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {columnNames.map(name => {
                    return <th key={name}>{name}</th>;
                  })}
                </tr>
              </thead>

              <tbody>
                {getPreparedPeople().map(person => (
                  <PersonRow
                    key={person.slug}
                    person={person}
                    isActive={person.slug === slug}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
