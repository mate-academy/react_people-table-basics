import React from 'react';
import { Link } from 'react-router-dom'; // 1. Імпортуємо Link
import { Person } from '../../types';

type Props = {
  person: Person | null | undefined;
  name?: string;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const displayName = person?.name || name;

  if (!displayName) {
    return <>-</>;
  }

  const linkClass = person?.sex === 'f' ? 'has-text-danger' : '';

  if (person && person.slug) {
    return (
      // 2. Замінюємо <a> на <Link> та href на to
      // Зверни увагу: у 'to' ми не пишемо '#', React Router сам знає, як обробити шлях
      <Link
        to={`/people/${person.slug}`}
        className={linkClass}
      >
        {displayName}
      </Link>
    );
  }

  return <span className={linkClass}>{displayName}</span>;
};