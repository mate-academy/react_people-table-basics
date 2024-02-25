import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasErrorPeople, setHasErrorPeople] = useState(false);

  useEffect(() => {
    setHasErrorPeople(false);
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasErrorPeople(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {hasErrorPeople && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading && !people.length && !hasErrorPeople && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!!people.length && !loading && !hasErrorPeople && (
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
                <PersonLink person={person} people={people} key={person.slug} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
