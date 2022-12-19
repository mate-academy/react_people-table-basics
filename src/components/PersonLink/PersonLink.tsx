import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const personExists = (personName: string | null) => {
    return people.find(pers => pers.name === personName) || null;
  };

  const { pathname } = useLocation();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': `/people/${person.slug}` === pathname,
      })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === 'f' })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      { personExists(motherName) ? (
        <td>
          <Link
            to={`/people/${personExists(motherName)?.slug}`}
            className={classNames({
              'has-text-danger': personExists(motherName)?.sex === 'f',
            })}
          >
            {motherName || '-'}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}
      { personExists(fatherName) ? (
        <td>
          <Link to={`/people/${personExists(fatherName)?.slug}`}>
            {fatherName || '-'}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
