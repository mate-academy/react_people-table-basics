import React from 'react';
import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  return (
    <>
      <table className="table is-bordered is-striped">
        <thead className="thead">
          <tr>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
            <th>died</th>
            <th>mother</th>
            <th>father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <PersonRow person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </>
  );
};
