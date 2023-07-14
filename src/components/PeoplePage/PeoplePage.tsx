import React, { useState, useEffect } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [error, setError] = useState('');

  const isTableVisible = !isTableLoading && !error;
  const isErrorVisible = !isTableLoading && error;

  useEffect(() => {
    setIsTableLoading(true);

    getPeople()
      .then(visiblePeople => {
        const peopleMap = new Map<string, Person>();

        visiblePeople.forEach(person => {
          peopleMap.set(person.name, person);
        });

        const peopleWithParents = visiblePeople.map(person => {
          const mother = peopleMap.get(person.motherName);
          const father = peopleMap.get(person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(errorName => {
        setError(`Something went wrong: ${errorName}`);
      })
      .finally(() => {
        setIsTableLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isTableLoading && <Loader />}

      {isTableVisible && (
        <PeopleTable
          people={people}
        />
      )}

      {isErrorVisible && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}
    </>
  );
};
