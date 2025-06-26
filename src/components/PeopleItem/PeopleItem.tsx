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
  const { sex, born, died, motherName, fatherName, slug } = person;
  const { people } = useContext(PeopleContext);
  const { personSlug } = useParams();
  const selectedPersonSlug = personSlug;

  const mother = motherName
    ? people?.find(per => per.name === motherName)
    : undefined;

  const father = fatherName
    ? people?.find(per => per.name === fatherName)
    : undefined;

  const motherDisplay = mother ? (
    <PersonLink person={mother} />
  ) : (
    motherName || '-'
  );

  const fatherDisplay = father ? (
    <PersonLink person={father} />
  ) : (
    fatherName || '-'
  );

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPersonSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherDisplay}</td>
      <td>{fatherDisplay}</td>
    </tr>
  );
};
