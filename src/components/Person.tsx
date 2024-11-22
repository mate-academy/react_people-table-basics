import React from 'react';
import { Person as PersonType } from '../types/Person';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

interface Props {
  person: PersonType;
}

export const Person: React.FC<Props> = ({ person }) => {
  const { sex, born, died, fatherName, motherName, mother, father } = person;
  const fN = fatherName || '-';
  const mN = motherName || '-';
  const { slug } = useParams();
  const className = slug === person.slug ? 'has-background-warning' : '';

  return (
    <tr data-cy="person" className={className}>
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : mN}</td>
      <td>{father ? <PersonLink person={father} /> : fN}</td>
    </tr>
  );
};
