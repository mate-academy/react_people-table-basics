import React from 'react';
import { Person as PersonType } from '../../types';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: PersonType;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personSlug === person.slug })}
    >
      <td>
        <Link
          to={`${slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <Link to={`${mother.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link to={`${father.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
