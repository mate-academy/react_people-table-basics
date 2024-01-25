import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(res => {
        const normalizedPeople = res.map(person => {
          return {
            ...person,
            mother: res.find(p => p.name === person.motherName),
            father: res.find(p => p.name === person.fatherName),
          };
        });

        setPeople(normalizedPeople);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!loading && !people.length && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {!loading && !!people.length && <PeopleTable people={people} />}
          </div>
        </div>
      </div>
    </main>
  );
};
