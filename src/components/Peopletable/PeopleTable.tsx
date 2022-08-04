import React from 'react';
import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table is-striped">
      <thead>
        <tr>
          <th title="Name"> Name</th>
          <th title="sex">Sex</th>
          <th title="born">Born</th>
          <th title="died">Died</th>
          <th title="mother">Mother</th>
          <th title="father">Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          const father = people
            .find(parent => person.fatherName === parent.name)
            || person.fatherName
            || '"John Doe"';
          const mother = people
            .find(parent => person.motherName === parent.name)
            || person.motherName
            || '"Jane Doe"';

          return (
            <PersonRow
              person={person}
              key={person.slug}
              father={father}
              mother={mother}
            />
          );
        })}

      </tbody>
    </table>
  );
};
