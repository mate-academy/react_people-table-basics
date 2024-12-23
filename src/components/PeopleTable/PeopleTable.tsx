import React from 'react';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow';
import { useParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">
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
            {people.map((person, index) => (
              <PersonRow
                key={index}
                person={person}
                people={people}
                currentSlug={slug}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
