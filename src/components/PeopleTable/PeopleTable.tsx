import React from 'react';
import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[]
  selectedSlug: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const findParent = (
    ArrayOfPeople: Person[],
    parent: string | null,
  ):Person | null => {
    return ArrayOfPeople.find(user => user.name === parent) || null;
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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          const mother = findParent(people, motherName);
          const father = findParent(people, fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : motherName || '-'}
              </td>

              <td>
                {father
                  ? <PersonLink person={father} />
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
