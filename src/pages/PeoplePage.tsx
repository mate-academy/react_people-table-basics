import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorM, setErrorM] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopl => {
        const peopleWithParents = peopl.map(person => {
          return {
            ...person,
            mother: peopl.find(p => p.name === person.motherName),
            father: peopl.find(p => p.name === person.fatherName),
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => setErrorM('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorM && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorM}
            </p>
          )}

          {people.length < 1 && !errorM && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !errorM && people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <PeopleTable key={person.slug} person={person} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
