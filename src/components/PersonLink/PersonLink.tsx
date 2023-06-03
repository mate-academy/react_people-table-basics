import React, { FC } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person
  selectedUser: string
};

export const PersonLink: FC<Props>
= React.memo(({ person, selectedUser }) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    father,
    mother,
    fatherName,
    motherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames(
        {
          'has-background-warning': slug === selectedUser,
        },
      )}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames(
            {
              'has-text-danger': sex === 'f',
            },
          )}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {(mother ? (
          <Link
            to={`../${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : motherName) || '-'}

      </td>
      <td>
        {(father ? (
          <Link
            to={`/people/${father.slug}`}
          >
            {father.name}
          </Link>
        ) : fatherName) || '-'}

      </td>
    </tr>
  );
});
