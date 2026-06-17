import React from 'react';

interface Person {
  slug: string;
  name: string;
  sex: string;
}

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <a href={`#/people/${person.slug}`} className={className}>
      {person.name}
    </a>
  );
};
