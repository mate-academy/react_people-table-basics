import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import React, { FC } from 'react';

import { Person } from '../types';

type Props = {
  person: Person;
  persons: Person[];
  slug: string | undefined;
};
export const PersonRow: FC<Props> = ({ person, persons, slug }) => {
  const { sex, born, died } = person;
  const personMother = persons.find(p => p.name === person.motherName);
  const personFather = persons.find(p => p.name === person.fatherName);
  const missingName = '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {person.motherName ? (
          personMother ? (
            <PersonLink person={personMother} />
          ) : (
            person.motherName
          )
        ) : (
          missingName
        )}
      </td>
      <td>
        {person.fatherName ? (
          personFather ? (
            <PersonLink person={personFather} />
          ) : (
            person.fatherName
          )
        ) : (
          missingName
        )}
      </td>
    </tr>
  );
};
