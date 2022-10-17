import React from 'react';
import PersonComponent from '../../components/PersonComponent';
import { Person } from '../../types';

interface Props {
  people: Person[];
}

const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
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
          <PersonComponent person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
