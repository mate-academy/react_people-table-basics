import React from 'react';
import { PersonRow } from './PersonRow/PersonRow';
import { NewPerson } from '../../../react-app-env';

interface Props {
  people: NewPerson[],
}

export const PeopleTable: React.FC <Props> = ({ people }) => {
  return (
    <table className="table is-bordered is-striped is-hoverable
      column is-half is-offset-one-quarter"
    >
      <thead>
        <tr className="is-selected">
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
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
