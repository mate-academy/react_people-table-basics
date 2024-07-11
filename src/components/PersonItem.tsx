import React from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const { sex, slug, born, died, fatherName, motherName, mother, father } =
    person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>

      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
