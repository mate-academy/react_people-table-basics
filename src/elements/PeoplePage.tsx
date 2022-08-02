import React from 'react';
import { PersonRow } from './PersonRow';
import { Persone } from '../react-app-env';

type Props = {
  people: Persone[]
};

export const PeoplePage: React.FC<Props> = ({ people }) => {
  return (
    <table className="table">
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
          <PersonRow key={person.slug} person={person} />
        ))}

      </tbody>
    </table>
  );
};
