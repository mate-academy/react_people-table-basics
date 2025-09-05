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

  const activePerson = people.find(user => user.slug === slug) || null;

  const getParentSlug = (parentName: string | null) => {
    return people.find(p => p.name === parentName)?.slug || null;
  };

  const motherSlug = getParentSlug(person.motherName);
  const fatherSlug = getParentSlug(person.fatherName);

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': activePerson?.slug === person.slug,
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
        {motherSlug ? (
          <Link
            to={`/people/${motherSlug}`}
            className={cn({
              'has-text-danger': person.motherName,
            })}
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName
        )}
        {!person.motherName && '-'}
      </td>
      <td>
        {fatherSlug ? (
          <Link to={`/people/${fatherSlug}`}>{person.fatherName}</Link>
        ) : (
          person.fatherName
        )}
        {!person.fatherName && '-'}
      </td>
    </tr>
  );
};
