import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = { person: Person };

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.mother ? (
          <Link
            className="has-text-danger"
            to={`/people/${person.mother.slug}`}
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName
        )}
      </td>

      <td>
        {person.father ? (
          <Link to={`/people/${person.father.slug}`}>{person.fatherName}</Link>
        ) : (
          person.fatherName
        )}
      </td>
    </tr>
  );
};
