import { Loader } from '../components/Loader';

import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPeople = () => {
    setLoading(true);

    getPeople()
      .then(res => {
        const peopleWithParents = res.map(person => {
          const father = res.find(
            personFather => person.fatherName === personFather.name,
          );
          const mother = res.find(
            personMother => person.motherName === personMother.name,
          );

          return {
            ...person,
            father,
            mother,
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="container">
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

          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </div>
  );
};
