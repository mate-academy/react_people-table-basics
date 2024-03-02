import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../../types';
import { PersonLink } from '../../PersonLink';

interface Props {
  person: Person
}

export const PeopleTableRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td aria-labelledby="person-name">
        <PersonLink person={person} id="person-name" />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.mother
          ? <PersonLink person={person.mother} />
          : (person.motherName || '-')}
      </td>

      <td>
        {person.father
          ? <PersonLink person={person.father} />
          : (person.fatherName || '-')}
      </td>
    </tr>
  );
};
