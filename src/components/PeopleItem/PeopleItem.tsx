import { Person } from '../../types';
import classNames from 'classnames';
import React from 'react';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  personId: string;
};

export const PeopleTable: React.FC<Props> = ({ person, personId }) => {
  const { motherName, fatherName, sex, born, died, mother, father } = person;

  const isSelected = (human: Person) => human.slug === personId;

  // const motherFind = people.find(
  //   ({ name: personName }) => personName === person.motherName,
  // );

  // const fatherFind = people.find(
  //   ({ name: personName }) => personName === person.fatherName,
  // );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected(person),
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          <span>{motherName || '-'}</span>
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          <span>{fatherName || '-'}</span>
        )}
      </td>
    </tr>
  );
};
