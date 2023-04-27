import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  isSelected: boolean;
};

export const PersonInfo: React.FC<Props> = ({
  person,
  isSelected,
}) => {
  const {
    slug,
    name,
    sex,
    fatherName,
    motherName,
    born,
    died,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            className="has-text-danger"
            to={`../${mother.slug}`}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link
            to={`../${father.slug}`}
          >

            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
