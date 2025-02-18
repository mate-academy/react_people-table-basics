import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const isWoman = person.sex === 'f';

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': isWoman })}
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
            to={`/people/${person.mother?.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>

      <td>
        {person.father ? (
          <Link to={`/people/${person.father?.slug}`}>{person.fatherName}</Link>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
