import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

import { getPeople } from '../../api';

import { Person } from '../../types';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();

      const preparedPeople = peopleFromServer.map(person => {
        const mother = peopleFromServer.find(mom => (
          mom.name === person.motherName));
        const father = peopleFromServer.find(dad => (
          dad.name === person.fatherName));

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(preparedPeople);
    } catch (err) {
      setIsError('Unable to load people');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && (<PeopleTable people={people} />)}
        </div>
      </div>
    </>
  );
});
