import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
  selectedSlug: string | undefined,
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
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
          <tr
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
            data-cy="person"
            key={person.slug}
          >
            <td>
              {person.slug === selectedSlug ? (
                <PersonLink
                  person={person}
                />
              ) : (
                <PersonLink
                  person={person}
                />
              )}
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td
              className={classNames({
                'has-text-danger': person.mother,
              })}
            >
              {person.mother ? (
                <PersonLink
                  person={person.mother}
                />
              ) : (
                <span>{person.motherName ?? '-'}</span>
              )}
            </td>

            <td>
              {person.father ? (
                <PersonLink
                  person={person.father}
                />
              ) : (
                <span>{person.fatherName ?? '-'}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
