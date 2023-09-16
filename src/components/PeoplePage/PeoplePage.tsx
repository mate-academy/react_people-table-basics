import React, { useState, useEffect } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { setPeopleWithParents } from '../../helpers/helpers';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [error, setError] = useState('');

  const isTableVisible = !isTableLoading && !error;
  const isErrorVisible = !isTableLoading && error;

  useEffect(() => {
    setIsTableLoading(true);

    getPeople()
      .then(people => {
        const peopleByName = new Map<string, Person>();

        people.forEach(person => {
          peopleByName.set(person.name, person);
        });

        const peopleWithParents = setPeopleWithParents(people, peopleByName);

        setVisiblePeople(peopleWithParents);
      })
      .catch(visibleError => {
        setError(`Something went wrong: ${visibleError}`);
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
          people={visiblePeople}
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
