import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from './types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const currLocationLink = useLocation().pathname;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': currLocationLink === `/people/${person.slug}`,
      })}
    >
      <td>
        <PersonLink person={person} personName={person.name} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <PersonLink person={person.mother} personName={person.motherName} />
      </td>
      <td>
        <PersonLink person={person.father} personName={person.fatherName} />
      </td>
    </tr>
  );
};
