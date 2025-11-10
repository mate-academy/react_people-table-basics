import React, { useState } from 'react';
import { Person } from '../../types';
import { PeopleLink } from './PeopleLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [localSelected, setLocalSelected] = useState<string | undefined>(
    undefined,
  );

  const normalize = (str: string | null | undefined) => {
    if (!str) {
      return '';
    }

    return str.trim().toLowerCase();
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
          const isSelected = selectedSlug
            ? normalize(selectedSlug) === normalize(person.slug)
            : normalize(localSelected) === normalize(person.slug);

          const mother = people.find(
            p => normalize(p.name) === normalize(person.motherName),
          );
          const father = people.find(
            p => normalize(p.name) === normalize(person.fatherName),
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({ 'has-background-warning': isSelected })}
              onClick={() => !selectedSlug && setLocalSelected(person.slug)}
            >
              <td>
                <PeopleLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <PeopleLink person={mother} />
                ) : person.motherName ? (
                  <span className="has-text-danger">{person.motherName}</span>
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <PeopleLink person={father} />
                ) : person.fatherName ? (
                  <span className="has-text-link">{person.fatherName}</span>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
