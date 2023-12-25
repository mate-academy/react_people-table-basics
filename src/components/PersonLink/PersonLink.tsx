import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

// eslint-disable-next-line max-len
export const PersonLink: React.FC<{ person: Person; people: Person[] }> = ({
  person,
  people,
}) => {
  const isWoman = person.sex === 'f';
  const linkClass = classNames({
    'has-text-danger': isWoman,
  });

  const mother = people.find((p) => p.name === person.motherName);
  const father = people.find((p) => p.name === person.fatherName);

  return person.slug ? (
    <>
      <td>
        <Link to={`/people/${person.slug}`} className={linkClass}>
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {person.motherName}
          </Link>
        ) : (
          <span>{person.motherName ? person.motherName : '-'}</span>
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>
            {person.fatherName}
          </Link>
        ) : (
          <span>{person.fatherName ? person.fatherName : '-'}</span>
        )}
      </td>
    </>
  ) : (
    <span className={linkClass}>{person.name}</span>
  );
};
