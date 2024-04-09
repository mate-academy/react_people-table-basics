import React from 'react';
import { PersonType } from '../types';
import { Person } from './Person';

type Props = {
  people: PersonType[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const peopleWithParents = people.map(person => {
    const updatedPerson = { ...person };

    if (updatedPerson.motherName) {
      updatedPerson.mother = people.find(
        pers => pers.name === updatedPerson.motherName,
      );
    }

    if (updatedPerson.fatherName) {
      updatedPerson.father = people.find(
        pers => pers.name === updatedPerson.fatherName,
      );
    }

    return updatedPerson;
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
        {peopleWithParents.map(person => {
          return <Person person={person} key={person.slug} />;
        })}
      </tbody>
    </table>
  );
};
