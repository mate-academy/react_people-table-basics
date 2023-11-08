import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  people: Person[];
  personId: string | undefined;
};

export const PersonInfo: React.FC<Props> = ({
  person,
  people,
  personId,
}) => {
  let personMother: React.ReactNode = '-';
  let personFather: React.ReactNode = '-';

  if (person.motherName) {
    const mother = people
      .find(m => m.name === person.motherName);

    personMother = typeof mother === 'object'
      ? <PersonLink person={mother} />
      : person.motherName;
  }

  if (person.fatherName) {
    const father = people
      .find(f => f.name === person.fatherName);

    personFather = typeof father === 'object'
      ? <PersonLink person={father} />
      : person.fatherName;
  }

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn(
        { 'has-background-warning': person.slug === personId },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {personMother}
      </td>

      <td>
        {personFather}
      </td>
    </tr>
  );
};
