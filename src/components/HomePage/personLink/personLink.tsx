import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../../types';
import classNames from 'classnames';

interface PersonLinkProps {
  person: Person;
  people: Person[];
  selectedSlug?: string;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  selectedSlug,
  people,
}) => {
  const findPersonSlugByName = (name: string | undefined) => {
    const foundPerson = people.find(p => p.name === name);

    return foundPerson ? foundPerson.slug : '';
  };

  const hasMother = findPersonSlugByName(person.motherName ?? undefined);
  const hasFather = findPersonSlugByName(person.fatherName ?? undefined);

  const isSelected = person.slug === selectedSlug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        {person.name ? (
          <Link
            to={`/people/${person.slug}`}
            className={classNames({
              'has-text-danger': person.sex === 'f',
            })}
          >
            {person.name}
          </Link>
        ) : (
          person.name
        )}
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          hasMother ? (
            <Link
              to={`/people/${hasMother}`}
              className={classNames({
                'has-text-danger':
                  people.find(p => p.name === person.motherName)?.sex === 'f',
                'is-disabled': !hasMother,
              })}
              aria-disabled={!hasMother}
            >
              {person.motherName}
            </Link>
          ) : (
            <span>{person.motherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          hasFather ? (
            <Link
              to={`/people/${hasFather}`}
              className={classNames({
                'has-text-danger':
                  people.find(p => p.name === person.fatherName)?.sex === 'f',
                'is-disabled': !hasFather,
              })}
              aria-disabled={!hasFather}
            >
              {person.fatherName}
            </Link>
          ) : (
            <span>{person.fatherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
