import React from 'react';
import { Person } from '../types';
import { NavLink } from 'react-router-dom';

interface Props {
  people: Person[];
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ people, person }) => {
  const findPersonByName = (name: string) => people.find(p => p.name === name);

  const mother = person.motherName ? findPersonByName(person.motherName) : null;
  const father = person.fatherName ? findPersonByName(person.fatherName) : null;

  return (
    <>
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
          <NavLink to={`${mother?.slug}`} className="has-text-danger">
            {person.motherName ? person.motherName : '-'}
          </NavLink>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <NavLink
            to={`${father?.slug}`}
            className={person.sex === 'f' ? 'has-text-danger' : ''}
          >
            {person.fatherName ? person.fatherName : '-'}
          </NavLink>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </>
  );
};
