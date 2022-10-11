import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  peopleTable: Person[],
  slugPersone: string | null,
}

export const PeopleTable: React.FC<Props> = ({
  peopleTable,
  slugPersone,
}) => {
  const isActive = (persone: Person) => persone.slug === slugPersone;

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
        {peopleTable.map(persone => (
          <>
            <tr
              data-cy="person"
              key={persone.slug}
              className={classNames({
                'has-background-warning': isActive(persone),
              })}
            >
              <td>
                <PersonLink persone={persone} />
              </td>

              <td>{persone.sex}</td>
              <td>{persone.born}</td>
              <td>{persone.died}</td>

              <td>
                {persone.mother ? (
                  <PersonLink persone={persone.mother} />
                ) : (
                  persone.motherName || '-'
                )}
              </td>

              <td>
                {persone.father ? (
                  <PersonLink persone={persone.father} />
                ) : (
                  persone.fatherName || '-'
                )}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
