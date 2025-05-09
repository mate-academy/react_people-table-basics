import React from 'react';
import { IPerson } from '../../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

export const Person: React.FC<IPerson> = ({
  name,
  sex,
  born,
  died,
  slug,
  fatherName,
  motherName,
  fatherLinkSlug,
  motherLinkSlug,
}) => {
  const { slug: selectedSlug } = useParams();

  const father = fatherLinkSlug ? (
    <Link to={`/person/${fatherLinkSlug}`}>{fatherName}</Link>
  ) : (
    fatherName
  );

  const mother = motherLinkSlug ? (
    <Link className="has-text-danger" to={`/person/${motherLinkSlug}`}>
      {motherName}
    </Link>
  ) : (
    motherName
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedSlug,
      })}
    >
      <td>
        <Link
          to={`/person/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother || '-'}</td>
      <td>{father || '-'}</td>
    </tr>
  );
};
