import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonItem: React.FC<Props> = memo(({ people, person }) => {
  const { userSlug = '' } = useParams();

  const findParent = (name: string) => {
    const parent = people.find(human => human.name === name);

    return parent
      ? <PersonLink person={parent} />
      : name;
  };

  return (
    <tr
      data-cy="person"
      className={cn(
        { 'has-background-warning': userSlug === person.slug },
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
});
