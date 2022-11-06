import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
};

export const PeopleTableRow: React.FC<Props> = ({ person }) => {
  const { selectedPerson } = useParams();

  const isFatherObj = 'father' in person;
  const isMotherObj = 'mother' in person;

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === selectedPerson,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {isMotherObj
          ? <PersonLink person={person.mother} />
          : person.motherName || '-'}
      </td>

      <td>
        {isFatherObj
          ? <PersonLink person={person.father} />
          : person.fatherName || '-'}
      </td>
    </tr>

  );
};
