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
        const peopleWithParents = visiblePeople.map(
          (person, _, serverPeople) => {
            const mother = serverPeople.find(m => m.name === person.motherName);
            const father = serverPeople.find(f => f.name === person.fatherName);

            return {
              ...person,
              mother,
              father,
            };
          },
        );

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setError('Something went wrong');
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
