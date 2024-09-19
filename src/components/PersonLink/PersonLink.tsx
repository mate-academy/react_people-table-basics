import React from 'react';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
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

  const { slug: slugUrl } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slugUrl === slug })}
    >
      <td>
        <Link
          to={`../${slug}`}
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
          <Link to={`../${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`../${father.slug}`}>{father.name}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
