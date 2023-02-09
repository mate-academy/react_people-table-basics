import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types/Person';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadedPeople = async () => {
    try {
      const peopleFromserver = await getPeople();

      const preparedPeople = peopleFromserver.map(person => {
        const father = peopleFromserver.find(dad => (
          dad.name === person.fatherName
        ));
        const mother = peopleFromserver.find(mom => (
          mom.name === person.motherName
        ));

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(preparedPeople);
    } catch {
      setError('Unable to load people');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadedPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
});
