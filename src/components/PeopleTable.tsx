import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

interface Props {
  people: Person[];
}
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  return (
    <>
      {people.length !== 0 ? (
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
                key={person.born}
                person={person}
                people={people}
                personSlug={personSlug}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};
