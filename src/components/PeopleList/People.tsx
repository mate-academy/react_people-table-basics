import React from 'react';
import { Person } from '../../types';
import { Person as PersonComponent } from '../Person';

interface PeopleProps {
  people: Person[];
  slug?: string;
}

export const People: React.FC<PeopleProps> = ({ people = [], slug }) => {
  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonComponent
            key={person.slug}
            person={person}
            active={slug === person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
