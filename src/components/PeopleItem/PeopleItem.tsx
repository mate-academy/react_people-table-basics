import React from 'react';
import { Person } from '../../types';
import { Link, NavLink, useParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

export const PeopleItem: React.FC<Props> = ({ person, people }) => {
  const { sex, motherName, fatherName, died, born, name } = person;
  const { slug } = useParams();

  const mother = motherName
    ? people.find(anotherPerson => motherName === anotherPerson.name) || null
    : null;
  const father = fatherName
    ? people.find(anotherPerson => fatherName === anotherPerson.name) || null
    : null;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={slug === person.slug ? 'has-background-warning' : ''}
    >
      <td>
        <NavLink
          to={`./${person.slug}`}
          className={sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={`./${mother.slug}`}
            className={mother.sex === 'f' ? 'has-text-danger' : ''}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`./${father.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
