import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person,
  handleSelection: (name: string | undefined, slug: string,) => void,
  selectedName: string | undefined,
}

export const PersonElement: React.FC<Props> = ({
  person,
  handleSelection,
  selectedName,
}) => {
  return (
    <tr
      key={person.name}
      className={selectedName === person.name
        ? 'has-background-warning'
        : ''}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={person.sex === 'f'
            ? ('has-text-danger')
            : ''}
          onClick={() => {
            handleSelection(
              person.name,
              person.slug,
            );
          }}
        >
          {person.name}
        </NavLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <NavLink
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
            onClick={() => {
              handleSelection(
                person.mother?.name,
                person.mother?.slug || '',
              );
            }}
          >
            {person.mother.name}
          </NavLink>
        ) : (
          <p>
            {person.motherName}
          </p>
        )}
      </td>
      <td>
        {person.father
          ? (
            <NavLink
              to={`/people/${person.father.slug}`}
              onClick={() => {
                handleSelection(
                  person.father?.name,
                  person.father?.slug || '',
                );
              }}
            >
              {person.father.name}
            </NavLink>
          ) : (
            <p>
              {person.fatherName}
            </p>
          )}
      </td>
    </tr>
  );
};
