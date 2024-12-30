import { Person as IPerson } from '../../types';
import React from 'react';
import cn from 'classnames';
import { NavLink, useParams } from 'react-router-dom';

interface Props {
  person: IPerson;
}

export const Person: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  const {
    name,
    sex,
    slug,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personSlug === slug })}
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

      {person.mother ? (
        <td>
          <NavLink to={`/people/${mother?.slug}`} className="has-text-danger">
            {mother?.name}
          </NavLink>
        </td>
      ) : motherName ? (
        <td>{motherName}</td>
      ) : (
        <td>-</td>
      )}

      {person.father ? (
        <td>
          <NavLink to={`/people/${father?.slug}`}>{father?.name}</NavLink>
        </td>
      ) : fatherName ? (
        <td>{fatherName}</td>
      ) : (
        <td>-</td>
      )}
    </tr>
  );
};
