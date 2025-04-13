import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import React from 'react';
import { Loader } from './Loader';
import { PeopleList } from './PeopleList';

const mappedPeople = (people: Person[]) => {
  return people.map(person => {
    const father = people.find(p => p.name === person.fatherName);
    const mother = people.find(p => p.name === person.motherName);

    return {
      ...person,
      father: father || undefined,
      mother: mother || undefined,
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(mappedPeople(peopleFromServer));
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && !loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!people.length && !error && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && !error && !loading && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </div>
  );
};
