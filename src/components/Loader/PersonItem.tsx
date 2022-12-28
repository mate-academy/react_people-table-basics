import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  selectedPerson: string
  findRelative: (name: string | null) => string | JSX.Element
};

export const PersonItem: React.FC<Props> = ({
  person,
  selectedPerson,
  findRelative,
}) => {
  const { sex, born, died } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedPerson,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findRelative(person.motherName)}</td>
      <td>{findRelative(person.fatherName)}</td>
    </tr>
  );
};
