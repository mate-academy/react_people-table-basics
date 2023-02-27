import cn from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
  selectedSlug: string,
};

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  selectedSlug,
}) => {
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
            slug, sex, motherName, fatherName, born, died,
          } = person;

          const mother = people.find(mom => mom.name === motherName);
          const father = people.find(dad => dad.name === fatherName);
          const hasMotherOnServer = mother
            ? <PersonLink person={mother} /> : motherName;
          const hasFatherOnServer = father
            ? <PersonLink person={father} /> : fatherName;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({
                'has-background-warning': selectedSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{motherName ? hasMotherOnServer : '-'}</td>
              <td>{fatherName ? hasFatherOnServer : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
