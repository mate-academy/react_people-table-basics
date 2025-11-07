import React, { useMemo } from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const byName = useMemo(
    () => new Map(people.map(p => [p.name, p] as const)),
    [people],
  );

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
          const isSelected = person.slug === selectedSlug;

          const motherName = person.motherName?.trim();
          const fatherName = person.fatherName?.trim();

          const mother = motherName ? byName.get(motherName) : undefined;
          const father = fatherName ? byName.get(fatherName) : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!motherName ? (
                  '-'
                ) : mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName
                )}
              </td>
              <td>
                {!fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
