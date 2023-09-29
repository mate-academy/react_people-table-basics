import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[],
  selectedSlug: string | undefined,
};

function setWomenClass(gender: string) {
  return classNames({
    'has-text-danger': gender === 'f',
  });
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
// !!!!!!!!!!

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
            data-cy="/people"
            key={person.slug}
          >
            <td>
              {person.slug === selectedSlug ? (
                <Link
                  to="/"
                  className={setWomenClass(person.sex)}
                >
                  {person.name}
                </Link>
              ) : (
                <Link
                  to={`/people/${person.slug}`}
                  className={setWomenClass(person.sex)}
                >
                  {person.name}
                </Link>
              )}
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName ?? '-'}</td>
            <td>{person.fatherName ?? '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
