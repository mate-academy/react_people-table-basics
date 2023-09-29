import { Link } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from '../../types';

type Props = {
  person: Person,
  people: Person[],
  selectedUser?: Person,
};

const findRelative = (gender: string, user: Person, users: Person[]) => {
  if (gender === 'm') {
    return users.filter(oneUser => oneUser.sex === 'm')
      .find(oneUser => oneUser.name === user.fatherName);
  }

  if (gender === 'f') {
    return users.filter(oneUser => oneUser.sex === 'f')
      .find(oneUser => oneUser.name === user.motherName);
  }

  return undefined;
};

export const User: React.FC<Props> = ({ person, people, selectedUser }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const findMother = findRelative('f', person, people);
  const findFather = findRelative('m', person, people);

  return (
    <tr
      key={slug}
      className={cn({ 'has-background-warning': slug === selectedUser?.slug })}
      data-cy="person"
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {findMother ? (
          <Link
            to={`/people/${findMother.slug}`}
            className={cn({ 'has-text-danger': findMother.sex === 'f' })}
          >
            {findMother.name}
          </Link>
        )
          : motherName || '-'}
      </td>

      <td>
        {findFather && (
          <Link
            to={`/people/${findFather.slug}`}
            className={cn({ 'has-text-danger': findFather.sex === 'f' })}
          >
            {findFather.name}
          </Link>
        )}

        {(!findFather && fatherName) ? (
          fatherName
        ) : '-'}
      </td>
    </tr>
  );
};
