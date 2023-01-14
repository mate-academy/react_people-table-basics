import React from 'react';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  person: Person;
  selectedUser: string;
};

export const PersonItem: React.FC<Props> = (props) => {
  const { person, people, selectedUser } = props;

  const findParent = (name: string) => {
    const findedParent = people.find(human => human.name === name);

    return findedParent
      ? <PersonLink person={findedParent} />
      : name;
  };

  return (
    <tr
      data-cy="person"
      className={cn(
        { 'has-background-warning': selectedUser === person.slug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.motherName
          ? findParent(person.motherName)
          : '-'}
      </td>

      <td>
        {person.fatherName
          ? findParent(person.fatherName)
          : '-'}
      </td>
    </tr>
  );
};
