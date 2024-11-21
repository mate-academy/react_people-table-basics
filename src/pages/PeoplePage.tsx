import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');

  const loadPeople = () => {
    setIsLoading(true);
    setError('');

    getPeople()
      .then(res => {
        const peopleWithFamily = res.map(person => {
          const father = res.find(p => p.name === person.fatherName);
          const mother = res.find(p => p.name === person.motherName);

          return {
            ...person,
            father,
            mother,
          };
        });

        setPeople(peopleWithFamily);
      })
      .catch(() => setError('Unable to load data'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && !error && <Loader />}
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {people.length === 0 && !error && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        {!isLoading && people.length > 0 && <PeopleTable people={people} />}
      </div>
    </>
  );
};