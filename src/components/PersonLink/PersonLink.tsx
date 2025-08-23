import React from 'react';
import { Person } from '../../types';
import cn from 'classnames';

interface Props {
  personName: string | null;
  allPeople: Person[];
}

export const PersonLink: React.FC<Props> = ({ personName, allPeople }) => {
  const personData = allPeople.find(humon => humon.name === personName);

  if (!personData || !personName) {
    return <span>{personName || '-'}</span>;
  }

  const isFemale = personData.sex === 'f';

  return (
    <a
      className={cn({ 'has-text-danger': isFemale })}
      href={`#/people/${personData.slug}`}
    >
      {personName}
    </a>
  );
};
