import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';

interface Props {
  person: Person,
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug: selectedPerson } = useParams();

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': slug === selectedPerson,
      })}
    >
      <td>
        <NavLink
          to={`../${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother ? (
        <td>
          <NavLink
            to={`../${mother.slug}`}
            className="has-text-danger"
          >
            {motherName}
          </NavLink>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <NavLink
            to={`../${father.slug}`}
          >
            {fatherName}
          </NavLink>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
