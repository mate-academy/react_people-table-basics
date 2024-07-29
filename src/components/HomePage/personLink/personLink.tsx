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
  const { name, sex, born, died, fatherName, motherName, slug } = person;

  const findPersonSlugByName = (PeopleName: string | undefined) => {
    const foundPerson = people.find(
      currentPerson => currentPerson.name === PeopleName,
    );

    return foundPerson ? foundPerson.slug : '';
  };

  const hasMother = findPersonSlugByName(person.motherName ?? undefined);
  const hasFather = findPersonSlugByName(person.fatherName ?? undefined);

  const isFather = classNames({
    'has-text-danger': people.find(p => p.name === fatherName)?.sex === 'f',
    'is-disabled': !hasFather,
  });
  const isMother = classNames({
    'has-text-danger': people.find(p => p.name === motherName)?.sex === 'f',
    'is-disabled': !hasMother,
  });

  const isSelected = person.slug === selectedSlug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        {name ? (
          <Link
            to={`/people/${slug}`}
            className={classNames({
              'has-text-danger': sex === 'f',
            })}
          >
            {name}
          </Link>
        ) : (
          name
        )}
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? (
          hasMother ? (
            <Link
              to={`/people/${hasMother}`}
              className={isMother}
              aria-disabled={!hasMother}
            >
              {motherName}
            </Link>
          ) : (
            <span>{motherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {fatherName ? (
          hasFather ? (
            <Link
              to={`/people/${hasFather}`}
              className={isFather}
              aria-disabled={!hasFather}
            >
              {fatherName}
            </Link>
          ) : (
            <span>{fatherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
