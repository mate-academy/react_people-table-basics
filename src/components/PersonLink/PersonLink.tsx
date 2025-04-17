import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectedSlug: string;
  nameToSlugMap: Map<string, string>;
};

export const PersonLink: React.FC<Props> = ({
  person,
  selectedSlug,
  nameToSlugMap,
}) => {
  const { name, slug, sex, born, died, fatherName, motherName } = person;

  const motherSlug = motherName && nameToSlugMap.get(motherName);
  const fatherSlug = fatherName && nameToSlugMap.get(fatherName);

  return (
    <tr
      data-cy="person"
      className={selectedSlug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName && motherSlug ? (
          <Link to={`/people/${motherSlug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {fatherName && fatherSlug ? (
          <Link to={`/people/${fatherSlug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
