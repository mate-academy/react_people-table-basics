import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import React from 'react';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { selectedPersonSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={
        selectedPersonSlug === person.slug ? 'has-background-warning' : ''
      }
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {!!person.mother ? (
        <td>
          <Link to={`../${person.mother.slug}`} className="has-text-danger">
            {person.mother.name}
          </Link>
        </td>
      ) : (
        <td>{!!person.motherName ? person.motherName : '-'}</td>
      )}

      {!!person.father ? (
        <td>
          <Link to={`../${person.father.slug}`}>{person.father.name}</Link>
        </td>
      ) : (
        <td>{!!person.fatherName ? person.fatherName : '-'}</td>
      )}
    </tr>
  );
};
