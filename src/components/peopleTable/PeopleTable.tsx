import React, { FC, useMemo } from 'react';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[] | null
  selectedUser: string
};

export const PeopleTable:FC<Props> = React.memo(({ people, selectedUser }) => {
  const peopleWithParents = useMemo(() => people?.map(human => {
    const humanFather = people.find(man => man.name === human.fatherName);
    const humanMother = people.find(man => man.name === human.motherName);

    const updatedHuman = { ...human };

    if (humanFather) {
      updatedHuman.father = humanFather;
    }

    if (humanMother) {
      updatedHuman.mother = humanMother;
    }

    return updatedHuman;
  }), [people]);

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
        {peopleWithParents
      && peopleWithParents
        .map(person => (
          <PersonLink
            key={person.name}
            person={person}
            selectedUser={selectedUser}
          />
        ))}
      </tbody>
    </table>
  );
});
