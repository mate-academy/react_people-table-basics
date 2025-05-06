import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

type PersonProps = {
  person: Person;
  hasInTable: (name: string) => Person | undefined;
};

export const PersonLink: React.FC<PersonProps> = ({ person, hasInTable }) => {
  const { name, sex, born, died, slug, fatherName, motherName } = person;

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
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
        {motherName === null ? (
          '-'
        ) : hasInTable(motherName) ? (
          <Link
            className={classNames({
              'has-text-danger': hasInTable(motherName),
            })}
            to={`/people/${hasInTable(motherName)?.slug}`}
          >
            {motherName}
          </Link>
        ) : (
          `${motherName}`
        )}
      </td>
      <td>
        {fatherName === null ? (
          '-'
        ) : hasInTable(fatherName) ? (
          <Link to={`/people/${hasInTable(fatherName)?.slug}`}>
            {fatherName}
          </Link>
        ) : (
          `${fatherName}`
        )}
      </td>
    </tr>
  );
};
