import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  peopleList: Person[];
}

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const findParent = (parentName: string) => {
    return peopleList.find(person => person.name === parentName);
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
        {peopleList.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            findParent={findParent}
          />
        ))}
      </tbody>
    </table>
  );
};
