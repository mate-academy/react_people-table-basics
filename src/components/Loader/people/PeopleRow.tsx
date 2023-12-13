import cn from 'classnames';
import React from 'react';
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
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <p>
          {person.mother ? (
            <PersonLink person={person.mother} />
          )
            : person.motherName || '-'}
        </p>
      </td>
      <td>
        <p>
          {person.father ? (
            <PersonLink person={person.father} />
          )
            : person.fatherName || '-'}
        </p>
      </td>
    </tr>
  );
};
