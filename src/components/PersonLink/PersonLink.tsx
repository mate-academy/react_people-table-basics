import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  people: Person;
  findPerson: (name: string) => Person | null;
};

let fatherObj: Person | null;

let motherObj: Person | null;

export const PersonLink: React.FC<Props> = ({ people, findPerson }) => {
  const { slug } = useParams();

  if (people.motherName) {
    motherObj = findPerson(people.motherName);
  }

  if (people.fatherName) {
    fatherObj = findPerson(people.fatherName);
  }

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': people.slug === slug })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': people.sex === 'f',
          })}
          to={people.slug}
        >
          {people.name}
        </Link>
      </td>

      <td>{people.sex}</td>
      <td>{people.born}</td>
      <td>{people.died}</td>
      <td>
        {motherObj ? (
          <Link
            className={classNames({
              'has-text-danger': motherObj.sex === 'f',
            })}
            to={motherObj.slug}
          >
            {people.motherName || '-'}
          </Link>
        ) : (
          people.motherName || '-'
        )}
      </td>
      <td>
        {fatherObj ? (
          <Link
            className={classNames({
              'has-text-danger': fatherObj.sex === 'f',
            })}
            to={fatherObj.slug}
          >
            {people.fatherName || '-'}
          </Link>
        ) : (
          people.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
