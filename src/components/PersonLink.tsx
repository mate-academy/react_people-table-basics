import React from 'react';
import { Person } from '../types/Person';

interface Props {
  person: Person | undefined;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (person) {
    return <a href={`#/people/${person.slug}`}>{person.name}</a>;
  } else {
    return <span>-</span>;
  }
};
