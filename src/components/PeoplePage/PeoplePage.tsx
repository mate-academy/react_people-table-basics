import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { matchParents } from '../../utils/helpers';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await getPeople();
        const withParents = matchParents(response as Person[]);

        setPeople(withParents);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people && !people.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people && !!people.length && (
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
                <PersonLink key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
