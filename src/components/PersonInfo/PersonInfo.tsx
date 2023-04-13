import React from 'react';
import classNames from 'classnames';

import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person,
}

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    mother,
    father,
    born,
    died,
    slug,
    fatherName,
    motherName,
  } = person;

  const { userSlug } = useParams();

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': slug === userSlug,
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
        {mother ? (
          <Link
            to={`/people/${mother.slug}`}
            className={classNames({
              'has-text-danger': mother.sex === 'f',
            })}
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
            to={`/people/${father.slug}`}
            className={classNames({
              'has-text-danger': father.sex === 'f',
            })}
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
