import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const { sex, born, died, fatherName, motherName, slug, mother, father } = person;
  return (
    <tr data-cy="person"
      className={cn({'has-background-warning': personSlug === slug})}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother}/> : motherName || '-'}</td>
      <td>{father ? <PersonLink person={father}/> : fatherName || '-'}</td>
    </tr>
  );
};
