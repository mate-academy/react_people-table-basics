import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { getPreparedPeople } from '../../utils/getPreparedPeople';

const COLUMN_NAMES = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const preperedPeople = getPreparedPeople(people);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMN_NAMES.map(nameColumn => (
            <th key={nameColumn}>{nameColumn}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preperedPeople.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
