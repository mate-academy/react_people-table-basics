import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[],
  slug: string | undefined,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  slug,
}) => {
  const getPeopleParents = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    return parent
      ? (
        <Link
          to={`/people/${parent.slug}`}
          className={classnames(
            {
              'has-text-danger': parent.sex === 'f',
            },
          )}
        >
          {parent.name}
        </Link>
      )
      : parentName || '-';
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classnames(
              {
                'has-background-warning': slug === person.slug,
              },
            )}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={classnames(
                  {
                    'has-text-danger': person.sex === 'f',
                  },
                )}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getPeopleParents(person.motherName)}</td>
            <td>{getPeopleParents(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
