import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  peoples: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ peoples, selectedSlug }) => {
  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
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
        {peoples.map(person => {
          const mother =
            peoples.find(p => p.name === person.motherName) || null;
          const father =
            peoples.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedSlug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName
                  )
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
