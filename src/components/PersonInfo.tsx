import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
  isActive: string;
  setIsActive: (valuse: string) => void;
};

export const PersonInfo:React.FC<Props> = ({
  person,
  people,
  isActive,
  setIsActive,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const mother = people.find(parent => person.motherName === parent.name);
  const father = people.find(parent => person.fatherName === parent.name);

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isActive === slug },
      )}
    >
      <td>
        <Link
          to={`#/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
          onClick={() => setIsActive(slug)}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <Link
              to={`#/people/${mother.slug}`}
              className="has-text-danger"
              onClick={() => setIsActive(mother.slug)}
            >
              {motherName}
            </Link>
          )
          : (<>{motherName || '-'}</>)}
      </td>
      <td>
        {father
          ? (
            <Link
              to={`#/people/${father.slug}`}
              onClick={() => setIsActive(father.slug)}
            >
              {fatherName}
            </Link>
          )
          : (<>{fatherName || '-'}</>)}
      </td>
    </tr>
  );
};
