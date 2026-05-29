import { Person } from '../../types';
import { getPeople } from '../../api';
import React from 'react';
import { Loader } from './Loader';
import { PersonLink } from './Person.link';

export const PeopleTable = () => {
  const [peopleLoading, setPeopleLoading] = React.useState(false);
  const [peopleError, setPeopleError] = React.useState(false);
  const [people, setPeople] = React.useState<Person[]>([]);
  const [empty, setEmpty] = React.useState(false);

  React.useEffect(() => {
    const fetchPeople = async () => {
      try {
        setPeopleLoading(true);
        const loaded = await getPeople();

        setPeople(loaded);
        setEmpty(loaded.length === 0);
      } catch {
        setPeopleError(true);
      } finally {
        setPeopleLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      {peopleLoading && <Loader />}
      {peopleError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!peopleLoading && !peopleError && empty && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!peopleLoading && !peopleError && !empty && (
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
              <PersonLink key={person.slug} person={person} people={people} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
