import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import React, { FC } from 'react';

import { Person } from '../types';

const MISSING_NAME = '-';

type Props = {
  person: Person;
  people: Person[];
  slug: string | undefined;
};
export const PersonRow: FC<Props> = ({ person, people, slug }) => {
  const { sex, born, died, motherName, fatherName } = person;
  const personMother = people.find(p => p.name === motherName);
  const personFather = people.find(p => p.name === fatherName);

  const renderPerson = (name: string | null, human: Person | undefined) => {
    if (!name) {
      return MISSING_NAME;
    }

    return human ? <PersonLink person={human} /> : name;
  };

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

      <td>{renderPerson(motherName, personMother)}</td>
      <td>{renderPerson(fatherName, personFather)}</td>
    </tr>
  );
};
