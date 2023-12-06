/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { PersonType } from '../types';
import { Person } from './Person';

type Props = {
  people: PersonType[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  useEffect(() => {
    people.map(person => {
      if (person.motherName) {
        person.mother = people.find(p => p.name === person.motherName);
      }

      if (person.fatherName) {
        person.father = people.find(p => p.name === person.fatherName);
      }

      return people;
    });
  });

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
          return (
            <Person person={person} key={person.slug} />
          );
        })}
      </tbody>
    </table>
  );
};
