import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type PersonItemProps = {
  person: Person;
};

export const PersonItem: React.FC<PersonItemProps> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {!person.mother
          ? (<td>{person.motherName || '-'}</td>)
          : (
            <Link
              to={`/people/${person.mother?.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          )}

      </td>
      <td>
        {!person.mother
          ? (<td>{person.fatherName || '-'}</td>)
          : (
            <Link
              to={`/people/${person.father?.slug}`}
            >
              {person.fatherName}
            </Link>
          )}

      </td>
    </tr>
  );
};
