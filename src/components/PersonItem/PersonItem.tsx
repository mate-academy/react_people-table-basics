import React from 'react';
import cn from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person;
  isSelected: string | undefined;
};

export const PersonItem: React.FC<Props> = ({ person, isSelected }) => (
  <tr
    data-cy="person"
    key={person.slug}
    className={cn({
      'has-background-warning': isSelected === person.slug,
    })}
  >
    <td>
      <PersonLink
        person={person}
      />
    </td>

    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>
      {person.mother
        ? <PersonLink person={person.mother} />
        : person.motherName || '-'}
    </td>
    <td>
      {person.father
        ? <PersonLink person={person.father} />
        : person.fatherName || '-'}
    </td>
  </tr>
);
