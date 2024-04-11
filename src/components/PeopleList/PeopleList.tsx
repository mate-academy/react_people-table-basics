import React from 'react';
import { Person } from '../../types';
import { PeopleItem } from '../PeopleItem';

type Props = {
  people: Person[];
  personId: string;
};

const columnHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleList: React.FC<Props> = ({ people, personId }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {columnHeaders.map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PeopleItem
          people={people}
          person={person}
          personId={personId}
          key={person.slug}
        />
      ))}
    </tbody>
  </table>
);
