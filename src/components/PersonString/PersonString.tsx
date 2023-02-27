import cn from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
  personSlug: string;
}

export const PersonString:React.FC<Props> = React.memo(
  ({ person, personSlug }) => {
    const {
      sex,
      born,
      died,
      fatherName,
      motherName,
      slug,
      mother,
      father,
    } = person;

    const isSelected = personSlug === slug;
    const displayFatherName = fatherName || '-';
    const displayMotherName = motherName || '-';

    return (
      <tr
        data-cy="person"
        className={cn({
          'has-background-warning': isSelected,
        })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother
            ? <PersonLink person={mother} />
            : displayMotherName}
        </td>
        <td>
          {father
            ? <PersonLink person={father} />
            : displayFatherName}
        </td>
      </tr>
    );
  },
);
