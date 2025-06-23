import React, { useContext } from 'react';
import { Person } from '../../types';
import { PeopleContext } from '../../context/PeopleContext';
import { PersonLink } from '../PeopleLink';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  person: Person;
}

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const { people } = useContext(PeopleContext);
  const { personSlug } = useParams();
  const selectedPersonSlug = personSlug;

  const mother = person.motherName
    ? people?.find(per => per.name === person.motherName)
    : undefined;

  const father = person.fatherName
    ? people?.find(per => per.name === person.fatherName)
    : undefined;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPersonSlug === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
