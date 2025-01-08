import React from 'react';
import { Person } from '../../types/Person';
import { Link } from 'react-router-dom';
import classNames from 'classNames';

interface Props {
  person: Person;
  index: string;
}

export const PeopleTable: React.FC<Props> = ({ person, index }) => {
  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': person.slug === index,
      })}
    >
      <td>
        <Link
          className={classNames('', { 'has-text-danger': person.sex === 'f' })}
          to={index !== '' ? `../${person.slug}` : person.slug}
          relative="path"
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <Link
            className="has-text-danger"
            to={index !== '' ? `../${person.mother.slug}` : person.mother.slug}
            relative="path"
          >
            {person.motherName}
          </Link>
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.father ? (
          <Link
            to={index !== '' ? `../${person.father.slug}` : person.father.slug}
            relative="path"
          >
            {person.fatherName}
          </Link>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
