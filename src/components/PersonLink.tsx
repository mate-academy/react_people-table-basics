import React from 'react';

interface Props {
  person: {
    slug: string;
    name: string;
  };
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  return person ? (
    <a href={`#/people/${person.slug}`}>{person.name.trim()}</a>
  ) : (
    <span>-</span>
  );
};
