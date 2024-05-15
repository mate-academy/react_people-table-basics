import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  person: {
    slug: string;
    name: string;
  };
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  // console.log(person)
  return <Link to={`/people/${person.slug}`}>{person.name.trim()}</Link>;
};
