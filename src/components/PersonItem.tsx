import React from 'react';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  people: Person[],
  person: Person,
  isSelected: (person: Person) => boolean,

};

export const PersonItem: React.FC<Props> = ({ person, people, isSelected }) => {
  const mother = people
    .find(parent => parent.name === person.motherName);
  const father = people
    .find(parent => parent.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({ 'has-background-warning': isSelected(person) })}
    >
      <td>
        <PersonLink person={person} slug={person.slug} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} slug={mother.slug} />
          : person.motherName || '-'}
      </td>
      <td>
        {father
          ? <PersonLink person={father} slug={father.slug} />
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
