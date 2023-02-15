import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
  personSlugSelected: string | undefined
};

export const PeopleTable: React.FC<Props> = ({
  people,
  personSlugSelected,
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
        {people.map((person) => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === personSlugSelected,
            })}
          >
            <PersonLink
              person={person}
            />

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <a
                href={`#/people/${person.slug}`}
              >
                {person.motherName
                  ? (person.motherName)
                  : ('-')}
              </a>
            </td>
            <td>
              <a
                href={`#/people/${person.slug}`}
              >
                {person.fatherName
                  ? (person.fatherName)
                  : ('-')}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
