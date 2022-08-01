import React from 'react';
import { Person } from '../Types/Person';
import { PersonRaw } from './PersonRow';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <div className="container">
      <table className="table is-hoverable is-fullwidth">
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
          {people?.map(person => (
            <PersonRaw person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
