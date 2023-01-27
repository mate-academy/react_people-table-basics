import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types/Person';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();

      const preparedPeople = peopleFromServer.map(person => {
        const father = peopleFromServer.find(dad => (
          dad.name === person.fatherName
        ));
        const mother = peopleFromServer.find(mom => (
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
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
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
