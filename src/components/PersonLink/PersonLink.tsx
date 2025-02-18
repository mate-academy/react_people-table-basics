import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';

type Props = {
  person: Person;
  mother: Person | null;
  father: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person, mother, father }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({ 'has-background-warning': slug === person.slug })}
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
