import React from 'react';
import cn from 'classnames';

import { Person } from '../../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  selectedPersonSlug: string;
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  selectedPersonSlug,
  people,
}) => (
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
      {people.map(person => {
        const {
          sex, born, died, motherName, fatherName, slug,
        } = person;

        const isSelected = slug === selectedPersonSlug;

        const mother = people.find(parent => parent.name === motherName);
        const father = people.find(parent => parent.name === fatherName);
        const personMotherName = motherName || '-';
        const personFatherName = fatherName || '-';

        return (
          <tr
            data-cy="person"
            key={slug}
            className={cn({
              'has-background-warning': isSelected,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {!mother ? personMotherName : <PersonLink person={mother} />}
            </td>
            <td>
              {!father ? personFatherName : <PersonLink person={father} />}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
