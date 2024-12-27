import React from 'react';
import { PersonLinkItem } from '../PersonLinkItem/PersonLinkItem';
import { Person } from '../../types/Person';
import cn from 'classnames';

interface Props {
  person: Person;
  prevSlug: string;
}

export const PersonLink: React.FC<Props> = ({ person, prevSlug }) => {
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

  const isSelected = slug === prevSlug;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLinkItem
          to={`/people/${slug}`}
          name={name}
          className={cn({
            'has-text-danger': sex === 'f',
          })}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLinkItem
            to={`/people/${mother.slug}`}
            name={mother.name}
            className="has-text-danger"
          />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <PersonLinkItem to={`/people/${father.slug}`} name={father.name} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
