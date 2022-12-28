import React from 'react';
import { Person } from '../../types';
import { PersonItem } from './PersonItem';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  selectedPerson: string
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const findRelative = (relativeName: string | null) => {
    if (!relativeName) {
      return '-';
    }

    const relative = people.find(personItem => (
      personItem.name === relativeName
    ));

    if (relative) {
      return <PersonLink person={relative} />;
    }

    return `${relativeName}`;
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
            person={person}
            selectedPerson={selectedPerson}
            findRelative={findRelative}
          />
        ))}
      </tbody>
    </table>
  );
};
