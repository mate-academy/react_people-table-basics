import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { getSlug } from '../../utils';

interface Props {
  person: Person;
  selectedSlug?: string;
}

const EMPTY_CELL = '-';
const SELECTED_PERSON_CLASS = 'has-background-warning';

export const PersonRow: React.FC<Props> = ({ person, selectedSlug }) => {
  const slug = getSlug(person);
  const isSelected = slug === selectedSlug;

  const getParentCell = (
    parent: Person | undefined,
    parentName: string | null,
  ) => {
    if (parent) {
      // Parent is in the dataset, render as a link
      return <PersonLink person={parent} />;
    }

    if (parentName) {
      // Parent name is provided but not in the dataset, render as text
      return <span>{parentName}</span>;
    }

    // Parent name is not provided
    return EMPTY_CELL;
  };

  return (
    <tr data-cy="person" className={isSelected ? SELECTED_PERSON_CLASS : ''}>
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{getParentCell(person.mother, person.motherName)}</td>
      <td>{getParentCell(person.father, person.fatherName)}</td>
    </tr>
  );
};
