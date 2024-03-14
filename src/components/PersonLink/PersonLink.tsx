// PersonLink.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, people }) => {
  const { name, sex, born, died, fatherName, motherName } = person;
  const { slug } = useParams<{ slug: string }>();

  const mother = person.motherName
    ? people.find(p => p.name === motherName) || null
    : null;
  const father = person.fatherName
    ? people.find(p => p.name === fatherName) || null
    : null;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td aria-label="Name">
        <Link
          to={`../${person.slug}`}
          className={sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {!motherName ? (
        <td>-</td>
      ) : (
        <td>
          {!mother ? (
            motherName
          ) : (
            <Link to={`../${mother.slug}`} className="has-text-danger">
              {motherName}
            </Link>
          )}
        </td>
      )}
      {!fatherName ? (
        <td>-</td>
      ) : (
        <td>
          {!father ? (
            fatherName
          ) : (
            <Link to={`../${father.slug}`}>{fatherName}</Link>
          )}
        </td>
      )}
    </tr>
  );
};
