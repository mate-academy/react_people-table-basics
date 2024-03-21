import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { name, fatherName, motherName, sex, born, died, slug } = person;
  const { personSlug } = useParams();

  const isMother = people.find(p => p.name === motherName);
  const isFather = people.find(p => p.name === fatherName);
  const isActivePerson = slug === personSlug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isActivePerson })}
    >
      <td>
        <Link
          to={`${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {isMother ? (
          <Link to={`${isMother.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {isFather ? (
          <Link to={`${isFather.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
