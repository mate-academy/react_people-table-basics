import cn from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonalLink } from '../PersonalLink';
import { findRelative } from '../../helpers/findRelative';

type Props = {
  person: Person,
  people: Person[],
  selectedUser?: Person,
};

export const User: React.FC<Props> = ({ person, people, selectedUser }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const mother = findRelative('f', person, people);
  const father = findRelative('m', person, people);

  return (
    <tr
      key={slug}
      className={cn({ 'has-background-warning': slug === selectedUser?.slug })}
      data-cy="person"
    >
      <td>
        <PersonalLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonalLink person={mother} />
        )
          : (motherName || '-')}
      </td>

      <td>
        {father ? (
          <PersonalLink person={mother} />
        )
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
