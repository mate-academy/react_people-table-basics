import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

export type Props = {
  person: Person;
  selectedPerson: string;
};

export const PersonInfo: FC<Props> = ({ person, selectedPerson }) => {
  const {
    sex, born, died, slug, fatherName, motherName, mother, father,
  }
    = person;
  const isSelected = slug === selectedPerson;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td><PersonLink person={person} /></td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
