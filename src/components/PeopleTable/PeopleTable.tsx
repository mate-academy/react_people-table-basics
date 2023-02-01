import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = memo(({ people }) => (
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

    {people.map(person => (
      <tbody>
        <tr
          data-cy="person"
          className="has-background-warning"
        >
          <td>
            <PersonLink person={person} />
          </td>

          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.mother
              ? (
                <Link
                  to={`#/people/${person.mother.slug}`}
                >
                  {person.mother.name}
                </Link>
              )
              : (
                person.motherName || '-'
              )}
          </td>
          <td>
            {person.father
              ? (
                <Link
                  to={`#/people/${person.father.slug}`}
                >
                  {person.father.name}
                </Link>
              )
              : (
                person.fatherName || '-'
              )}
          </td>
        </tr>
      </tbody>
    ))}
  </table>
));
