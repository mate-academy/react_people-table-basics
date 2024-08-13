import React from 'react';
import { Person } from '../types';
import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';
import { useValues } from '../PeopleContext';

type Props = {
  person: Person;
};

export const PeoplePageListItem: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
    mother,
    father,
  } = person;
  const { people } = useValues();
  const { slug: slugName } = useParams();

  const extendedPerson: Person = {
    ...person,
    mother: mother || people.find(p => p.name === motherName),
    father: father || people.find(p => p.name === fatherName),
  };

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slugName === slug })}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {extendedPerson.mother ? (
          <NavLink
            to={`/people/${extendedPerson.mother.slug}`}
            className="has-text-danger"
          >
            {motherName || '-'}
          </NavLink>
        ) : (
          <p>{motherName || '-'}</p>
        )}
      </td>
      <td>
        {extendedPerson.father ? (
          <NavLink to={`/people/${extendedPerson.father.slug}`}>
            {fatherName || '-'}
          </NavLink>
        ) : (
          <p>{fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
