import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const isWomen = classNames({
    'has-text-danger': person.sex === 'f',
  });

  const isMother = people
    .find(currentPerson => currentPerson.name === person.motherName);
  const isFather = people
    .find(currentPerson => currentPerson.name === person.fatherName);

  return (
    <>
      <td>
        <Link
          to={`./${person.slug}`}
          className={isWomen}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td className={isWomen}>
        {isMother
          ? (
            <Link
              to={`./${isMother.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          ) : (
            person.motherName ?? '-'
          )}
      </td>

      <td>
        {isFather
          ? (
            <Link
              to={`./${isFather.slug}`}
            >
              {person.fatherName}
            </Link>
          ) : (
            person.fatherName ?? '-'
          )}
      </td>
    </>
  );
};
