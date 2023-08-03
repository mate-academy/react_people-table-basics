/* eslint-disable no-nested-ternary */
import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  onFindPerson: (name: string) => Person | undefined,
};
export const PeopleLink: React.FC<Props> = ({ person, onFindPerson }) => {
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === person.slug,
      })}
    >
      <td>
        <Link
          to={`${person.slug}`}
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
        {person.motherName !== null
        && onFindPerson(person.motherName) !== undefined && (
          <Link
            className="has-text-danger"
            to={`${
              onFindPerson(person.motherName)?.slug || ''
            }`}
          >
            {person.motherName}
          </Link>
        )}

        {person.motherName !== null
        && onFindPerson(person.motherName) === undefined && (
          `${person.motherName}`
        )}

        {!person.motherName && '-'}
      </td>
      <td>
        {person.fatherName ? (
          onFindPerson(person.fatherName) ? (
            <Link
              to={`${
                onFindPerson(person.fatherName)?.slug
                || ''
              }`}
            >
              {person.fatherName}
            </Link>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
