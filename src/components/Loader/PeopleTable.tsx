import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
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
        {people.map(person => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <PersonLink person={person} />
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link
                  to={`/people/${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.mother.name}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <Link to={`/people/${person.father.slug}`}>
                  {person.father.name}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
