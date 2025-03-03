import React from 'react';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { useParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="table-container">
      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on server</p>
      ) : (
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
              <PersonRow
                key={person.slug}
                person={person}
                isSelected={slug === person.slug}
                people={people}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
