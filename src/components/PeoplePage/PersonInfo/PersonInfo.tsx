import React, { memo } from 'react';
import cn from 'classnames';
import { Person } from '../../../types';
import { PersonLink } from '../../PersonLink/PersonLink';

// eslint-disable-next-line no-lone-blocks
{ /* eslint-disable max-len */ }

interface Props {
  person: Person;
  selectedPerson: string | null;
}

export const PersonInfo: React.FC<Props> = memo(({ person, selectedPerson }) => {
  const isSelectedPerson = person.slug === selectedPerson;

  return (
    <tr
      className={cn({ 'has-background-warning': isSelectedPerson })}
      data-cy="person"
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>
        {person.sex}
      </td>
      <td>
        {person.born}
      </td>
      <td>
        {person.died}
      </td>

      <td>
        {person.mother
          ? <PersonLink person={person.mother} />
          : person.motherName || '-'}
      </td>

      <td>
        {person.father
          ? <PersonLink person={person.father} />
          : person.fatherName || '-'}
      </td>
    </tr>
  );
});
