import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  getPersonByName: (personName: string | null) => Person | null;
};

export const PersonLink: React.FC<Props> = ({
  person,
  getPersonByName,
}) => {
  const { personName } = useParams();

  const motherInList = getPersonByName(person.motherName);
  const fatherInList = getPersonByName(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={
        cn({ 'has-background-warning': person.slug === personName })
      }
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {getPersonByName(person.motherName)
        ? (
          <td>
            <Link
              className="has-text-danger"
              to={motherInList ? `/people/${motherInList.slug}` : '#'}
            >
              {person.motherName}
            </Link>
          </td>
        )
        : (
          <td>{person.motherName || '-'}</td>
        )}

      {getPersonByName(person.fatherName)
        ? (
          <td>
            <Link
              to={fatherInList ? `/people/${fatherInList.slug}` : '#'}
            >
              {person.fatherName}
            </Link>
          </td>
        )
        : (
          <td>{person.fatherName || '-'}</td>
        )}
    </tr>
  );
};
