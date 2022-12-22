import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  people: Person[],
  slug: string,
}

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const findRelative = (relativesName: string | null) => {
    const relative = people.find(person => person.name === relativesName);

    if (relative) {
      return (
        <Link
          to={`/people/${relative.slug}`}
          className={classNames(
            { 'has-text-danger': relative.sex === 'f' },
          )}
        >
          {relative.name}
        </Link>
      );
    }

    return relativesName || '-';
  };

  return (
    <div className="block">
      <div className="box table-container">
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
                key={person.slug}
                data-cy="person"
                className={classNames(
                  { 'has-background-warning': slug === person.slug },
                )}
              >
                <td>
                  <Link
                    to={`/people/${person.slug}`}
                    className={classNames(
                      { 'has-text-danger': person.sex === 'f' },
                    )}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>{findRelative(person.motherName)}</td>
                <td>{findRelative(person.fatherName)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
