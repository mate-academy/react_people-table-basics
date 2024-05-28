import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();

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
        {people.map(
          ({
            slug,
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
            mother,
            father,
          }) => (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': personId === slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${slug}`}
                  className={classNames({
                    'has-text-danger': 'f' === sex,
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <Link
                    className="has-text-danger"
                    to={`/people/${mother.slug}`}
                  >
                    {motherName}
                  </Link>
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link to={`/people/${father.slug}`}>{fatherName}</Link>
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
