import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

function findParent(data: Person[] | null, name: string | null) {
  if (!data || !name) {
    return;
  }

  return data.find(person => person.name === name);
}

export function PeoplePage() {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(res => {
        const aggregatePeople = res.map(person => {
          return {
            ...person,
            mother: findParent(res, person.motherName),
            father: findParent(res, person.fatherName),
          };
        });

        setPeople(aggregatePeople);
      })
      .catch(() => {
        setError('Something went wrong');
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

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {people?.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people?.length !== 0 && !isLoading && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
}
