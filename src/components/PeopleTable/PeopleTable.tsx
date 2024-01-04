import { useEffect, useState } from 'react';
import { PeopleTableProps } from './PeopleTable.types';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

export const PeopleTable: React.FC<PeopleTableProps> = (
  { personSlug },
) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then(allPeople => setPeople(allPeople))
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {(people.length === 0 && !isLoading) && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {!isLoading && (
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
              <PersonLink
                key={person.slug}
                people={people}
                person={person}
                personSlug={personSlug}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
