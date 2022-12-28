import React from 'react';
import { Person } from '../../types';
import { PersonItem } from './PersonItem';

type Props = {
  people: Person[],
  selectedPerson: string
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const findRelative = (relativeName: string | null) => {
    if (!relativeName) {
      return null;
    }

    const relative = people.find(personItem => (
      personItem.name === relativeName
    ));

    if (relative) {
      return relative;
    }

    return relativeName;
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
        {people.map(person => (
          <PersonItem
            key={person.slug}
            mother={findRelative(person.motherName)}
            father={findRelative(person.fatherName)}
            person={person}
            selectedPerson={selectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
