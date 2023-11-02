import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  personInTheList: (personName: string | null) => Person | null;
  selectedPersonName: Person['name'] | null;
  changingEndOfLink: (obj: Person) => void;
};

export const PersonLink: React.FC<Props> = ({
  person,
  personInTheList,
  selectedPersonName,
  changingEndOfLink,
}) => {
  const motherInList = personInTheList(person.motherName);
  const fatherInList = personInTheList(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={
        cn({ 'has-background-warning': person.name === selectedPersonName })
      }
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={`/people/${changingEndOfLink(person)}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {personInTheList(person.motherName)
        ? (
          <td>
            <Link
              className="has-text-danger"
              to={motherInList ? `/people/${changingEndOfLink(motherInList)}` : '#'}
            >
              {person.motherName}
            </Link>
          </td>
        )
        : (
          <td>{person.motherName || '-'}</td>
        )}

      {personInTheList(person.fatherName)
        ? (
          <td>
            <Link
              to={fatherInList ? `/people/${changingEndOfLink(fatherInList)}` : '#'}
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
