import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const findParents = (peoples: Person[]) => {
    const parents = peoples.map(person => {
      const withParens = { ...person };

      withParens.mother = peoples.find(p => p.name === person.motherName);

      withParens.father = peoples.find(p => p.name === person.fatherName);

      return withParens;
    });

    return parents;
  };

  const loadPeople = () => {
    setLoading(true);

    getPeople()
      .then(res => {
        const parents = findParents(res);

        setPeople(parents);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  };

  useEffect(loadPeople, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!people.length && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length !== 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
