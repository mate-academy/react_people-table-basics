import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleItem } from '../PeopleItem';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="box table-container">
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!people.length && !error && !loading && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && !!people.length && (
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
              <PeopleItem key={person.slug} person={person} people={people} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
