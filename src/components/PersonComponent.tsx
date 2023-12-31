import React, { memo } from 'react';

import { Link } from 'react-router-dom';
import { Person } from '../types';
import { getPersonByName } from '../utils/getPersonByName';

interface Props {
  person: Person,
  people: Person[],
  isSelected: boolean,
}

export const PersonComponent: React.FC<Props> = memo(({
  person: {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  },
  people,
  isSelected,
}) => {
  const mother = getPersonByName(people, motherName);
  const father = getPersonByName(people, fatherName);

  const sexClass = sex === 'f' ? 'has-text-danger' : '';
  const selectedClass = isSelected ? 'has-background-warning' : '';

  return (
    <tr data-cy="person" className={selectedClass}>
      <td>
        <Link to={`../${slug}`} className={sexClass}>
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
              to={`../${mother.slug}`}
              className="has-text-danger"
            >
              {mother.name}
            </Link>
          )
          : (<span>{motherName || '-'}</span>)}
      </td>
      <td>
        {father
          ? (<Link to={`../${father.slug}`}>{father.name}</Link>)
          : (<span>{fatherName || '-'}</span>)}
      </td>
    </tr>
  );
});
