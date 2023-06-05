import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person,
  handleSelection: (slug: string,) => void,
  personSlug: string | undefined,
}

export const PersonElement: React.FC<Props> = ({
  person,
  handleSelection,
  personSlug,
}) => {
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
      className={personSlug === slug
        ? 'has-background-warning'
        : ''}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={sex === 'f'
            ? ('has-text-danger')
            : ''}
          onClick={() => {
            handleSelection(
              slug,
            );
          }}
        >
          {name}
        </NavLink>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <NavLink
            to={`/people/${mother.slug}`}
            className="has-text-danger"
            onClick={() => {
              handleSelection(
                mother?.slug || '',
              );
            }}
          >
            {mother.name}
          </NavLink>
        ) : (
          <p>
            {motherName}
          </p>
        )}
      </td>
      <td>
        {father
          ? (
            <NavLink
              to={`/people/${father.slug}`}
              onClick={() => {
                handleSelection(
                  father?.slug || '',
                );
              }}
            >
              {father.name}
            </NavLink>
          ) : (
            <p>
              {fatherName}
            </p>
          )}
      </td>
    </tr>
  );
};
