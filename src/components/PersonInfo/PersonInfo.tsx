import React from 'react';
import cn from 'classnames';

import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectedPersonSlug: string;
};

const EMPTY_TABLE_CELL = '-';

export const PersonInfo: React.FC<Props> = ({ person, selectedPersonSlug }) => {
  const {
    slug,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  const isSelected = selectedPersonSlug === slug;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <PersonLink person={mother} />
          ) : (
            motherName || EMPTY_TABLE_CELL
          )}
      </td>
      <td>
        {father
          ? (
            <PersonLink person={father} />
          ) : (
            fatherName || EMPTY_TABLE_CELL
          )}
      </td>
    </tr>
  );
};
