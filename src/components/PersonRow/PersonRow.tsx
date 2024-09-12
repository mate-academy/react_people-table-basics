import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
  isActive?: boolean;
};

export const PersonRow: React.FC<Props> = ({ person, isActive = false }) => {
  const { slug, sex, born, died, motherName, fatherName, mother, father } =
    person;

  const renderPersonCell = (parent: Person | undefined, name: string) => {
    return parent ? <PersonLink person={parent} /> : name;
  };

  return (
    <tr
      key={slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': isActive,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName ? renderPersonCell(mother, motherName) : '-'}</td>
      <td>{fatherName ? renderPersonCell(father, fatherName) : '-'}</td>
    </tr>
  );
};
