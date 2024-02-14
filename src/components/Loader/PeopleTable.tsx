import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
        {people.map(person => {
          return (
            (
              <tr
                data-cy="person"
                key={person.slug}
                className={cn({
                  'has-background-warning': person.slug === slug,
                })}
              >
                <td>
                  <Link
                    to={`/people/${person.slug}`}
                    className={person.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                {person.mother ? (
                  <td>
                    <Link
                      to={`/people/${person.mother.slug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  </td>
                ) : (
                  <td>{person.motherName ? person.motherName : '-'}</td>
                )}

                {person.father ? (
                  <td>
                    <Link to={`/people/${person.father.slug}`}>
                      {person.fatherName}
                    </Link>
                  </td>
                ) : (
                  <td>{person.fatherName ? person.fatherName : '-'}</td>
                )}
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
};
