import React from 'react';
import { PersonInfo } from './PersonInfo';
import { Person } from '../types';

type Props = {
  people: Person[] | null,
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const getParent = (parentName: string | null) => {
    return people?.find(p => parentName === p.name);
  };

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

        {people?.map(person => {
          const mother = getParent(person.motherName);
          const father = getParent(person.fatherName);

          return (
            <PersonInfo
              key={person.slug}
              person={person}
              mother={mother}
              father={father}
            />
          );
        })}

      </tbody>
    </table>
  );
};
