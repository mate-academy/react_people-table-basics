import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person,
  // isSelected: (slug: string) => boolean,
};

export const PersonLink: React.FC<Props> = (
  { person },
) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
    slug,
  } = person;

  const { slug: selectedSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedSlug === slug,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <Link
              className="has-text-danger"
              to={`/people/${mother.slug}`}
            >
              {motherName}
            </Link>
          )
          : (
            <>
              {motherName || '-'}
            </>
          )}
      </td>
      <td>
        {father
          ? (
            <Link
              className="has-text-blue"
              to={`/people/${father.slug}`}
            >
              {fatherName}
            </Link>
          )
          : (
            <>
              {fatherName || '-'}
            </>
          )}
      </td>
    </tr>
  );
};
