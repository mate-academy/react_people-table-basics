import React from 'react';
import classNames from 'classnames';

import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          to={`${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          person.mother ? (
            <a
              className="has-text-danger"
              href={`#/people/${person.mother.slug}`}
            >
              {person.motherName}
            </a>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          person.father ? (
            <a href={`#/people/${person.father.slug}`}>{person.fatherName}</a>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
