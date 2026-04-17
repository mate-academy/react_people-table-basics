import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from './types'; // Твой интерфейс

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`/people/${person.slug}`}
    // Если пол женский - добавляем красный цвет
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);
