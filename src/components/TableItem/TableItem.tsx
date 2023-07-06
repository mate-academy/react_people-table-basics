import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person,
}

export const TableItem: React.FC<Props> = ({
  person,
}) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': person.slug === slug },
      )}
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
            {person.mother.name}
          </Link>
        ) : person.motherName || '-'}

      </td>

      <td>
        {person.father ? (
          <Link to={`/people/${person.father.slug}`}>
            {person.father.name}
          </Link>
        ) : person.fatherName || '-'}
      </td>
    </tr>
  );
};
