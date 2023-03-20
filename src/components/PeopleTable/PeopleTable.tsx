import { useState, useEffect } from 'react';
import { getPeople, extendPerson } from '../../api';
import { PersonWithParents } from '../../types';
import { PersonCell } from '../PersonCell/PersonCell';
import { Loader } from '../Loader';

export const PeopleTable = () => {
  const [people, setPeople] = useState<PersonWithParents[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(r => setPeople(extendPerson(r)))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people) {
    return <Loader />;
  }

  return (people.length === 0
    ? (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    ) : (
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
            <PersonCell
              person={person}
            />
          ))}
        </tbody>
      </table>
    )
  );
};
