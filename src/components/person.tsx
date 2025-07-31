import React from 'react';
import { Person } from '../types';
import { NavLink } from 'react-router-dom';

interface Props {
  person: Person;
  i: number;
  selectedSlug: string | undefined;
  people: Person[] | undefined;
}

export const Personn: React.FC<Props> = ({
  person,
  i,
  selectedSlug,
  people,
}) => {
  let mother: Person | undefined;
  let father: Person | undefined;

  if (people !== undefined) {
    mother = people.find(p => p.name === person.motherName);
    father = people.find(p => p.name === person.fatherName);
  }

  return (
    <tr
      data-cy="person"
      key={i}
      className={person.slug === selectedSlug ? 'has-background-warning' : ''}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <NavLink
            to={`/people/${mother.slug}`}
            className={person.motherName ? 'has-text-danger' : 'has-text-black'}
          >
            {mother ? mother.name : '-'}
          </NavLink>
        ) : (
          <p>-</p>
        )}
      </td>
      <td>
        {father ? (
          <NavLink
            to={`/people/${father.slug}`}
            className={person.fatherName ? 'has-text-link' : 'has-text-black'}
          >
            {father ? father.name : '-'}
          </NavLink>
        ) : (
          <p>-</p>
        )}
      </td>
    </tr>
  );
};
