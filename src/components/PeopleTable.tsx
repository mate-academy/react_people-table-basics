import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  visiblePeople :Person[];
};
export const PeopleTable :React.FC<Props> = ({ visiblePeople }) => {
  const { slug } = useParams();

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
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
            data-cy="person"
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                onClick={() => person.slug === slug}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {
                person.mother?.slug ? (
                  <Link
                    to={`/people/${person.mother?.slug}`}
                    className="has-text-danger"
                    onClick={() => slug === person.mother?.slug}
                  >
                    {person.mother?.name}
                  </Link>
                ) : (
                  <p>{person.motherName ? person.motherName : '-'}</p>
                )
              }

            </td>
            <td>
              {
                person.father?.slug ? (
                  <Link
                    to={`/people/${person.father?.slug}`}
                    onClick={() => slug === person.father?.slug}
                  >
                    {person.fatherName ? person.fatherName : '-'}
                  </Link>
                ) : (
                  <p>{person.fatherName ? person.fatherName : '-'}</p>
                )
              }
            </td>
          </tr>

        ))}

      </tbody>
    </table>
  );
};
