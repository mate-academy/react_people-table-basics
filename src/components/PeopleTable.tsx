/* eslint-disable no-param-reassign */
import React from 'react';
import { Person } from '../types';
import Individual from './Individual';

interface Props {
  people: Person[];
}

const PeopleTable: React.FC<Props> = ({ people }) => {
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
        {people.map(person => {
          if (person.fatherName) {
            person.father = people.find(pers => pers.name === pers.fatherName);
          }

          if (person.motherName) {
            person.mother = people.find(pers => pers.name === pers.motherName);
          }

          return (
            <Individual person={person} key={person.slug} />
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
