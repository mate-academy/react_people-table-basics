import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PersonRow } from '../PersonRow';
import { useParams } from 'react-router-dom';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(result => setPeople(result))
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const { slug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!error && !loading && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!error && !loading && (
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
                <PersonRow
                  key={person.slug}
                  person={person}
                  slug={slug}
                  people={people}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
