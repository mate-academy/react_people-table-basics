import { Link } from 'react-router-dom';
import type { Person } from '../types/Person';
import { generateSlug } from '../utils/generateSlug';
import React from 'react';

type Props = {
  name?: string | null;
  people?: Person[];
};

const PersonLink = ({ name, people }: Props) => {
  if (!name) {
    return <span>-</span>;
  }

  const person = people?.find(p => p.name.trim() === name.trim());

  if (person) {
    const slug = generateSlug(person);

    return (
      <Link
        to={`/people/${slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  return <span>{name}</span>;
};

export default PersonLink;
