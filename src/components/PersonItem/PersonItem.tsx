import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { NOT_SET_VALUE } from '../../variables';

type Props = {
  person: Person;
  selectedSlug: string;
};

export const PersonItem: React.FC<Props> = ({ person, selectedSlug }) => {
  const {
    born,
    died,
    fatherName,
    motherName,
    sex,
    father,
    mother,
    slug,
  } = person;

  return (
    <tr
      className={
        classNames({ 'has-background-warning': selectedSlug === slug })
      }
      data-cy="person"
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother && (
          <PersonLink person={mother} />
        )}

        {!mother && motherName}
        {!motherName && NOT_SET_VALUE}
      </td>
      <td>
        {father && (
          <PersonLink person={father} />
        )}

        {!father && fatherName}
        {!fatherName && NOT_SET_VALUE}
      </td>
    </tr>
  );
};
