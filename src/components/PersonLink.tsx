import React, { useContext } from 'react';
import { Person } from '../types';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { PeopleContext } from '../store/PeopleContext';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { people } = useContext(PeopleContext);
  const selectedPersonSlug = slug;

  // визначили чи є мати/батько в списку people
  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);

  // визначили чи взагалі є мати/батько в обʼєкті person
  const hasMother = Boolean(person.motherName);
  const hasFather = Boolean(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn(
        person.slug === selectedPersonSlug && 'has-background-warning',
      )}
    >
      <td>
        <Link
          className={cn(person.sex === 'f' && 'has-text-danger')}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {!hasMother ? (
          '-'
        ) : mother ? (
          <Link
            to={`/people/${mother.slug}`}
            className={cn(mother.sex === 'f' && 'has-text-danger')}
          >
            {person.motherName}
          </Link>
        ) : (
          <span>{person.motherName}</span>
        )}
      </td>
      <td>
        {!hasFather ? (
          '-'
        ) : father ? (
          <Link
            to={`/people/${father.slug}`}
            className={cn(father.sex === 'f' && 'has-text-danger')}
          >
            {person.fatherName}
          </Link>
        ) : (
          <span>{person.fatherName}</span>
        )}
      </td>
    </tr>
  );
};
