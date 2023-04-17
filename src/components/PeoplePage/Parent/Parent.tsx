import { FC } from 'react';
import { Person } from '../../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { ParentProps } from '../PeoplePage.types';

function getParentByName(name: string | null, people: Person[]) {
  const parent = people.find(person => person.name === name);

  return parent || undefined;
}

export const Parent: FC<ParentProps> = ({ parentName, people }) => {
  const parent = getParentByName(parentName, people);

  if (!parentName) {
    return <span>-</span>;
  }

  if (!parent) {
    return <span>{parentName}</span>;
  }

  return <PersonLink person={parent} />;
};
