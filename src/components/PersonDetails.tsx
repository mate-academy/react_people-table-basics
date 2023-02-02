import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  personMother: Person | undefined;
  personFather: Person | undefined;
  isSelected: (person: Person) => boolean,
};

export const PersonDetails: React.FC<Props> = ({
  person,
  personMother,
  personFather,
  isSelected,
}) => (
  <tr
    data-cy="person"
    key={person.name}
    className={classNames(
      {
        'has-background-warning': isSelected(person),
      },
    )}
  >
    <td>
      <PersonLink
        person={person}
      />
    </td>

    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>

      {
        personMother
          ? (
            <PersonLink person={personMother} />
          ) : (
            person.motherName || '-'
          )
      }
    </td>
    <td>
      {
        personFather
          ? (
            <PersonLink person={personFather} />
          ) : (
            person.fatherName || '-'
          )
      }
    </td>
  </tr>
);
