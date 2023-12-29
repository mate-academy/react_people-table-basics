import React from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';

import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const mother = people.find(possibleMother => (
    possibleMother.name === person.motherName
  )) || null;
  const father = people.find(possibleFather => (
    possibleFather.name === person.fatherName
  )) || null;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother && (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        )}

        {!mother && (person.motherName ? `${person.motherName}` : '-')}
      </td>
      <td>
        {father && <Link to={`/people/${father.slug}`}>{father.name}</Link>}

        {!father && (person.fatherName ? `${person.fatherName}` : '-')}
      </td>
    </tr>
  );
};
