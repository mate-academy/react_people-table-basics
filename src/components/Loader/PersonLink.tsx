import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const findPerson = (name: string | null) => {
    return people.find(pers => pers.name === name) || null;
  };

  const mother = findPerson(person.motherName);
  const father = findPerson(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
