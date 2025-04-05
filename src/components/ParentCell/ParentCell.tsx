import React, { memo } from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  parentName: string | null;
  people: Person[];
}

const ParentCellComponent: React.FC<Props> = ({ parentName, people }) => {
  if (!parentName) {
    return <>-</>;
  }

  const parent = people.find(p => p.name === parentName);

  return parent ? <PersonLink person={parent} /> : <>{parentName}</>;
};

ParentCellComponent.displayName = 'ParentCell';

export const ParentCell = memo(ParentCellComponent);
