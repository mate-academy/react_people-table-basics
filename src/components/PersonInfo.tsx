import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
  mother: string | undefined;
  father: string | undefined;
};

export const PersonInfo: React.FC<Props> = ({ person, mother, father }) => {
  const { slug, name, sex, born, died, fatherName, motherName } = person;
  const { userSlug } = useParams();

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': userSlug === slug,
      })}
    >
      <td>
        <Link
          to={`../people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName && mother ? (
          <Link to={`../people/${mother}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          <p>{motherName || '-'}</p>
        )}
      </td>
      <td>
        {fatherName && father ? (
          <Link to={`../people/${father}`}>{fatherName}</Link>
        ) : (
          <p>{fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
