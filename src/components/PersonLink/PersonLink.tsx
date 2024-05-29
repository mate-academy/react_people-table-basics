import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type PeopleMap = {
  [key: string]: Person | null;
};

type Props = {
  person: Person;
  people: PeopleMap;
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slugParam } = useParams();

  const { name, sex, born, died, fatherName, motherName, slug } = person;

  const {
    [motherName || "null"]: isMother,
    [fatherName || "null"]: isFather
  } = people;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === slugParam,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {isMother ? (
          <Link
            to={`/people/${isMother.slug}`}
            className={classNames({
              'has-text-danger': isMother.sex === 'f',
            })}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {isFather ? (
          <Link to={`/people/${isFather.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};