import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  fatherLink: string | null;
  motherLink: string | null;
};

export const PersonItem: React.FC<Props> = ({
  person,
  fatherLink,
  motherLink,
}) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`../people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {motherLink && person.motherName ? (
          <Link to={`../people/${motherLink}`} className="has-text-danger">
            {person.motherName}
          </Link>
        ) : (
          <p>{person.motherName || '-'}</p>
        )}
      </td>

      <td>
        {fatherLink && person.fatherName ? (
          <Link to={`../people/${fatherLink}`}>{person.fatherName}</Link>
        ) : (
          <p>{person.fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
