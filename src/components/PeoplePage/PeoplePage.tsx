import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const peopleWithParents = people.map(person => {
    const mother = people.find(m => person.motherName === m.name);
    const father = people.find(f => person.fatherName === f.name);

    return {
      ...person,
      mother,
      father,
    };
  });

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !isError && <PeopleTable people={peopleWithParents} />}
        </div>
      </div>
    </>
  );
};
