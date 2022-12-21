import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person,
  slug?: string,
};

export const PersonLink: React.FC<Props> = ({ person, slug }) => {
  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={`${person.sex === 'f' && 'has-text-danger'}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.mother
          ? (
            <Link
              className="has-text-danger"
              to={`/people/${person.mother.slug}`}
            >
              {person.mother.name}
            </Link>
          )
          : `${person.motherName
            ? `${person.motherName}`
            : '-'}`}
      </td>

      <td>
        {person.father
          ? (
            <Link
              to={`/people/${person.father.slug}`}
            >
              {person.father.name}
            </Link>
          )
          : `${person.fatherName
            ? `${person.fatherName}`
            : '-'}`}
      </td>
    </tr>
  );
};
