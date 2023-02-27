import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface PeopleTablePropsType {
  people: Person[],
  personSlug: string,
}

export const PeopleTable: React.FC<PeopleTablePropsType> = ({
  people,
  personSlug,
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
          sex,
          born,
          died,
          fatherName,
          motherName,
          slug,
          mother,
          father,
        } = person;

        return (
          <tr
            data-cy="person"
            className={
              classNames({ 'has-background-warning': personSlug === slug })
            }
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {mother ? <PersonLink person={mother} /> : motherName || '-'}
            </td>
            <td>
              {father ? <PersonLink person={father} /> : fatherName || '-'}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
