import cn from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
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
        {people.map(person => (
          <tr
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
            key={person.slug}
          >
            <td>
              <Link
                to={`../${person.slug}`}
                className={cn({
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
              {person.mother && (
                <Link
                  to={`../${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.motherName || '-'}
                </Link>
              )}

              {!person.mother && person.motherName
                ? person.motherName
                : '-'}
            </td>

            <td>
              {person.father && (
                <Link to={`../${person.father.slug}`}>
                  {person.fatherName || '-'}
                </Link>
              )}

              {!person.father && person.fatherName
                ? person.fatherName
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
