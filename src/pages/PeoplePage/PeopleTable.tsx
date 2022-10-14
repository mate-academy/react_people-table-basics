import React from 'react';
import Person from '../../components/Person';
import { IPerson } from '../../types';

interface Props {
  peopel: IPerson[];
}

const PeopleTable: React.FC<Props> = ({ peopel }) => {
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
        {peopel.map(person => (
          <Person person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
