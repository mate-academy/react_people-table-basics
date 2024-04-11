import React, { useMemo } from 'react';
import { Person } from '../../types';
import { PersonComponent } from '../PersonComponent';

export const TABLE_FIELDS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

const preparePeopleWithLinks = (peopleList: Person[]) => {
  return peopleList.map(person => {
    return {
      ...person,
      father:
        peopleList.find(candidate => candidate.name === person.fatherName) ||
        null,
      mother:
        peopleList.find(candidate => candidate.name === person.motherName) ||
        null,
    };
  });
};

export const TableList = ({ people }: { people: Person[] }) => {
  const preparedPeople = useMemo(
    () => preparePeopleWithLinks(people),
    [people],
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_FIELDS.map(field => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map((person: Person) => (
          <PersonComponent key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
