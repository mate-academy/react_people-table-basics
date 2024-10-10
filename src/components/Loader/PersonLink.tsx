import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

import { Person } from '../../types';

interface Props {
  person: Person;
  activeSlug: string | undefined;
}

export const PersonLink: React.FC<Props> = ({
  person: {
    slug,
    sex,
    name,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  },
  activeSlug,
}) => {
  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': activeSlug === slug })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
