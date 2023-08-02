/* eslint-disable no-nested-ternary */
import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
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
        <a
          href={`#/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          onFindPerson(person.motherName) ? (
            <a
              className="has-text-danger"
              href={`#/people/${
                onFindPerson(person.motherName)?.slug || ''
              }`}
            >
              {person.motherName}
            </a>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          onFindPerson(person.fatherName) ? (
            <a
              href={`#/people/${
                onFindPerson(person.fatherName)?.slug
                || ''
              }`}
            >
              {person.fatherName}
            </a>
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
