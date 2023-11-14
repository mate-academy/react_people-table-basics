import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  slug: string | undefined,
};

export const PeopleRow: React.FC<Props> = ({ person, slug }) => {
  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <PersonLink person={person.mother} />
        )
          : person.motherName || '-'}
      </td>
      <td>
        {person.father ? (
          <PersonLink person={person.father} />
        )
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
