import cn from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
  selectedPersonSlug: string;
  personMother: Person | string;
  personFather: Person | string;
};

export const PersonItem: React.FC<Props> = React.memo(
  ({
    person,
    selectedPersonSlug,
    personMother,
    personFather,
  }) => {
    const isSelected = (person.slug === selectedPersonSlug);

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

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>

        <td>
          {person.motherName
            // ? `${person.motherName}`
            ? <PersonLink person={personMother} />
            : '-'}
        </td>
        <td>
          {person.fatherName
            // ? `${person.fatherName}`
            ? <PersonLink person={personFather} />
            : '-'}
        </td>
      </tr>
    );
  },
);
