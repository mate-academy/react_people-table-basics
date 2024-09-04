import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const param = useParams();
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  return (
    <>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': slug === param.slug,
        })}
      >
        <td>
          <Link
            to={`/people/${slug}`}
            className={classNames({ 'has-text-danger': sex === 'f' })}
          >
            {name}
          </Link>
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother ? (
            <Link to={`/people/${mother.slug}`} className="has-text-danger">
              {mother.name}
            </Link>
          ) : motherName ? (
            motherName
          ) : (
            '-'
          )}
        </td>
        <td>
          {father ? (
            <Link to={`/people/${father.slug}`}>{father.name}</Link>
          ) : (
            fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
